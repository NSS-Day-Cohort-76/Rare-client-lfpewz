const api = "http://localhost:8088"

export const getCommentsByPostId = (postId) => {
  return fetch(`${api}/comments?post_id=${postId}`).then(res => res.json())
}

export const createComment = (commentData) => {
  return fetch(`${api}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(commentData)
  }).then(res => res.json())
}

export const updateComment = (commentId, updatedData) => {
  return fetch(`${api}/comments/${commentId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData)
  })
}

export const deleteComment = (commentId) => {
  return fetch(`${api}/comments/${commentId}`, {
    method: "DELETE"
  })
}
export const getCommentById = (commentId) => {
  return fetch(`http://localhost:8088/comments/${commentId}`).then(res => res.json())
}
