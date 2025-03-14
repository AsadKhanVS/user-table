"use client";
import NavBar from "@/Components/NavBar";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFetchUsers } from "@/hooks/fetchUser";
import { useRouter } from "next/navigation";

export default function Home() {
  const observerRef = useRef(null);
  const getUsersQuery = useFetchUsers();
  const router = useRouter();

  // Sorting and filtering states
  const [sortOption, setSortOption] = useState("newest");
  const [filterStatus, setFilterStatus] = useState("all");

  // set up the intersection observer to detect when user scrolls to bottom
  const handleObserver = useCallback(
    (entries) => {
      const [entry] = entries;
      if (
        entry.isIntersecting &&
        getUsersQuery.hasNextPage &&
        !getUsersQuery.isFetchingNextPage
      ) {
        getUsersQuery.fetchNextPage();
      }
    },
    [
      getUsersQuery.fetchNextPage,
      getUsersQuery.hasNextPage,
      getUsersQuery.isFetchingNextPage,
    ]
  );

  // initialize the intersection observer
  useEffect(() => {
    const element = observerRef.current;
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    });

    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [handleObserver]);

  if (getUsersQuery.status === "pending")
    return <div className="text-center p-4">Loading...</div>;
  if (getUsersQuery.status === "error")
    return (
      <div className="text-center p-4 text-red-500">
        Error: {getUsersQuery.error.message}
      </div>
    );

  const handleViewDetail = (id) => {
    router.push(`/user-detail/${id}`);
  };

  // Function to get all users from all pages
  const getAllUsers = () => {
    return getUsersQuery.data.pages.flatMap((page) => page.data);
  };

  // Function to filter users
  const filterUsers = (users) => {
    return users.filter((user) => {
      const statusMatch =
        filterStatus === "all" || user.status === filterStatus;
      return statusMatch;
    });
  };

  // Function to sort users
  const sortUsers = (users) => {
    const sortedUsers = [...users];

    switch (sortOption) {
      case "name-asc":
        return sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return sortedUsers.sort((a, b) => b.name.localeCompare(a.name));
      case "newest":
        return sortedUsers.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "oldest":
        return sortedUsers.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      default:
        return sortedUsers;
    }
  };

  // Process the users with sorting and filtering
  const users = sortUsers(filterUsers(getAllUsers()));

  return (
    <>
      <NavBar />
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Users List</h1>

        {/* Sorting and filtering controls */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Status filter */}
            <div>
              <label
                htmlFor="status-filter"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Status
              </label>
              <select
                id="status-filter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Sorting control */}
          <div>
            <label
              htmlFor="sort-option"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Sort By
            </label>
            <select
              id="sort-option"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
            </select>
          </div>
        </div>

        {/* Results summary */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {users.length} {users.length === 1 ? "user" : "users"}
        </div>

        {/* User list */}
        <div className="space-y-4">
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user._id}
                className="cursor-pointer p-4 mt-5 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                onClick={() => handleViewDetail(user._id)}
              >
                <div className="flex items-center space-x-4">
                  {user.avatar && (
                    <img
                      src={user.avatar}
                      alt={`${user.name} avatar`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <h2 className="font-semibold">{user.name}</h2>
                    <p className="text-gray-600">{user.email}</p>
                    <div className="flex items-center mt-1">
                      <span
                        className={`inline-block w-2 h-2 rounded-full mr-2 ${
                          user.status === "active"
                            ? "bg-green-500"
                            : user.status === "pending"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      ></span>
                      <span className="text-sm capitalize">{user.status}</span>
                      {user.role && (
                        <span className="ml-3 text-xs bg-gray-100 px-2 py-1 rounded-full">
                          {user.role}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {user.bio && <p className="mt-2 text-gray-700">{user.bio}</p>}
                <div className="mt-2 text-sm text-gray-500 flex justify-between">
                  {user.location && <span>{user.location}</span>}
                  <span>
                    Joined: {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-8 border rounded-lg bg-gray-50">
              <p className="text-gray-500">
                No users match the selected filters
              </p>
            </div>
          )}
        </div>

        {users.length > 0 && getUsersQuery.isFetchingNextPage && (
          <div className="text-center p-4">Loading more...</div>
        )}

        <div ref={observerRef} className="h-10 w-full" />
      </div>
    </>
  );
}
