"use client";
import NavBar from "@/Components/NavBar";
import { useFetchUserById } from "@/hooks/fetchUser";
import { useParams } from "next/navigation";
import React from "react";

const UserDetail = () => {
  const { id } = useParams();
  const getUserById = useFetchUserById(id);

  if (getUserById.status === "pending")
    return <div className="text-center p-4">Loading...</div>;
  if (getUserById.status === "error")
    return (
      <div className="text-center p-4 text-red-500">
        Error: {getUsersQuery.error.message}
      </div>
    );

  return (
    <>
      <NavBar />
      <div className="container mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-6">Users Record</h1>

        <div className="cursor-pointer p-4 mt-5 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-4">
            {getUserById.data?.avatar && (
              <img
                src={getUserById.data?.avatar}
                alt={`${getUserById.data?.name} avatar`}
                className="w-12 h-12 rounded-full object-cover"
              />
            )}
            <div>
              <h2 className="font-semibold">{getUserById.data?.name}</h2>
              <p className="text-gray-600">{getUserById.data?.email}</p>
              <div className="flex items-center mt-1">
                <span
                  className={`inline-block w-2 h-2 rounded-full mr-2 ${
                    getUserById.data?.status === "active"
                      ? "bg-green-500"
                      : getUserById.data?.status === "pending"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                ></span>
                <span className="text-sm capitalize">
                  {getUserById.data?.status}
                </span>
              </div>
            </div>
          </div>
          {getUserById.data?.bio && (
            <p className="mt-2 text-gray-700">{getUserById.data?.bio}</p>
          )}
          <div className="mt-2 text-sm text-gray-500 flex justify-between">
            {getUserById.data?.location && (
              <span>{getUserById.data?.location}</span>
            )}
            <span>
              Joined:
              {new Date(getUserById.data?.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetail;
