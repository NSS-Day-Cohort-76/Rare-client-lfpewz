export const createPost = (postData, user) => {
  return fetch("http://localhost:8088/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `User ${user}`,
    },
    body: JSON.stringify(postData),
  }).then((res) => res.json())
}

export const getAllPosts = () => {
  return fetch("http://localhost:8088/posts")
  .then((res) => res.json());
};