export const createPost = (postData, user) => {
  return fetch("http://localhost:8088/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `User ${user.userId}`,
    },
    body: JSON.stringify(postData),
  }).then((res) => res.json())
}

export const getAllPosts = () => {
  return fetch("http://localhost:8088/posts").then((res) => res.json())
}

export const getPostById = (postId) => {
  return fetch(`http://localhost:8088/posts/${postId}`).then((res) =>
    res.json()
  )
}

export const updatePost = (postId, updatedPost) => {
  return fetch(`http://localhost:8088/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPost),
  })
}

export const deletePost = (postId) => {
  return fetch(`http://localhost:8088/posts/${postId}`, {
    method: "DELETE",
  })
}
