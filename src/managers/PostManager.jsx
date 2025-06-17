export const createNewPost = (newPost) => {
  return fetch("http://localhost:8088/create-post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newPost)
  }).then(res => {
    if (!res.ok) {
      // If it's a 400 from backend, return the error message as a rejected promise
      return res.json().then(error => Promise.reject(error))
    }
    return res.json()
  })
}