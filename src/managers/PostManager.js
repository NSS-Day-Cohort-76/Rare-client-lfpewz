export const createPost = (postData, user) => {
  if (!user || !user.userId) {
    return Promise.reject("❌ createPost: No user provided")
  }

  console.log("Sending auth headers:", `Token ${user.userId}`);
  console.log("POST BVODY:", postData);

  return fetch("http://localhost:8088/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${user.userId}`,
    },
    body: JSON.stringify(postData),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Unauthorized or invalid post")
    }
    return res.json()
  })
}


export const getAllPosts = (user) => {
  if (!user || !user.userId) {
    return Promise.reject("❌ getAllPosts: No user provided")
  }

  return fetch("http://localhost:8088/posts", {
    headers: {
      Authorization: `Token ${user.userId}`
    }
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Unauthorized or failed to fetch posts")
    }
    return res.json()
  })
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

export const deletePost = (postId, user) => {
  if (!user || !user.userId) {
    return Promise.reject("❌ deletePost: No user provided")
  }

  return fetch(`http://localhost:8088/posts/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${user.userId}`,
    },
  })
}


export const getMostRecentPost = () => {
  return fetch("http://localhost:8088/posts/mostRecentPost").then((res) => res.json())
}

export const getPostsByCategory = (categoryId) => {
  return fetch(`http://localhost:8088/posts?category_id=${categoryId}`)
    .then((res) => res.json());
};
