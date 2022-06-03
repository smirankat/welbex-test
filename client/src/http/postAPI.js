import { $host, $authHost } from "./index";

export const createPost = async (post) => {
  const { data } = await $authHost.post("api/post", post);
  return data;
};

export const fetchPosts = async () => {
  const { data } = await $host.get("api/post");
  return data;
};

export const updatePost = async (post) => {
  const { data } = await $authHost.put(`api/post/${post.id}`, post);
  return data;
};

export const deletePost = async (id) => {
  const { data } = await $authHost.delete(`api/post/${id}`, id);
  return data;
};
