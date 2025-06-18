export const createPost = (postData, token) => {
  return fetch("http://localhost:8088/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(postData),
  }).then((res) => res.json())
}

export const getAllPosts = (token) => {
  return fetch("http://localhost:8088/allposts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  }).then((res) => res.json());
};