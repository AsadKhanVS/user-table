"use client";
import { fetchUserById, fetchUsers } from "@/apis/users-api";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

//fetch all users
export const useFetchUsers = () => {
  return useInfiniteQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasNextPage
        ? lastPage.pagination.page + 1
        : undefined;
    },
    initialPageParam: 1,
  });
}

//fetch single user
export const useFetchUserById = (id) =>{
  return useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUserById(id)
  })
}