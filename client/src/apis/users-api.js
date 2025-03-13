import request from "@/utils/request";

//fetch all users
export const fetchUsers = async ({ pageParam = 1 }) => {
  const response = await request.get("/users/", {
    params: {
      page: pageParam,
      limit: 10,
    },
  });
  return response.data;
};

//fetch single user
export const fetchUserById = async (id) => {
  const response = await request.get(`/users/${id}`);
  console.log(response.data)
  return response.data.data;
};
