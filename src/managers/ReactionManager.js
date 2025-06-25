export const getAllReactions = () => {
  return fetch("http://localhost:8088/reactions").then((res) => res.json())
}

export function getUserReaction(postId, userId) {
  return fetch(`http://localhost:8088/postreactions?post_id=${postId}&user_id=${userId}`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch user reaction");
      return res.json();
    })
    .then((data) => (Array.isArray(data) && data.length > 0 ? data[0] : null));
}
export function addOrUpdatePostReaction({ post_id, user_id, reaction_id }) {
  return getUserReaction(post_id, user_id)
    .then((existingReaction) => {
      if (existingReaction) {
        return fetch(`http://localhost:8088/postreactions/${existingReaction.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reaction_id }),
        });
      } else {
        return fetch(`http://localhost:8088/postreactions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ post_id, user_id, reaction_id }),
        });
      }
    })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((err) => Promise.reject(err));
      }
      return res.json();
    })
    .catch((err) => {
      console.error("Failed to add or update reaction:", err);
      throw err;
    });
}
