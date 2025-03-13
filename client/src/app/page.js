"use client";
import NavBar from "@/Components/NavBar";
import { useCallback, useEffect, useRef } from "react";
import {useFetchUsers} from "@/hooks/fetchUser";
import { useRouter } from "next/navigation";

export default function Home() {
  const observerRef = useRef(null);
  const getUsersQuery = useFetchUsers()
  const router = useRouter()

  
  // set up the intersection observer to detect when user scrolls to bottom
  const handleObserver = useCallback((entries) => {
    const [entry] = entries;
    if (entry.isIntersecting && getUsersQuery.hasNextPage && !getUsersQuery.isFetchingNextPage) {
      getUsersQuery.fetchNextPage();
    }
  }, [getUsersQuery.fetchNextPage, getUsersQuery.hasNextPage, getUsersQuery.isFetchingNextPage]);


  // initialize the intersection observer
  useEffect(() => {
    const element = observerRef.current;
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    });

    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [handleObserver]);

 
  if (getUsersQuery.status === 'pending') return <div className="text-center p-4">Loading...</div>;
  if (getUsersQuery.status === 'error') return <div className="text-center p-4 text-red-500">Error: {getUsersQuery.error.message}</div>;


  const handleViewDetail = (id) => {
    router.push(`/user-detail/${id}`);
  };

  return (
    <>
      <NavBar />
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Users List</h1>

        <div className="space-y-4">
          {getUsersQuery.data.pages.map((page, pageIndex) => (
            <div key={pageIndex}>
              {page.data.map((user) => (
                <div
                  key={user._id}
                  className="cursor-pointer p-4 mt-5 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  onClick={()=> handleViewDetail(user._id)}
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
                        <span className="text-sm capitalize">
                          {user.status}
                        </span>
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
              ))}
            </div>
          ))}
        </div>

        {getUsersQuery.isFetchingNextPage && (
          <div className="text-center p-4">Loading more...</div>
        )}

        <div ref={observerRef} className="h-10 w-full" />
      </div>
    </>
  );
}
