import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"

export const AdminDashboard = () => {
  const { user } = useOutletContext()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch("http://localhost:8088/posts", {
      headers: {
        Authorization: `Token ${user.id}`
      }
    })
      .then((res) => res.json())
      .then(setPosts)
  }, [user])

  const handleApproval = (postId, approved) => {
    fetch(`http://localhost:8088/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${user.id}`
      },
      body: JSON.stringify({ approved })
    }).then(() => {
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, approved } : p))
      )
    })
  }

  const reviewablePosts = posts.filter((p) => p.approved !== 1)

  return (
    <section className="section">
      <h1 className="title">Admin Post Approval</h1>
      {reviewablePosts.length === 0 ? (
        <p>No pending or denied posts 🎉</p>
      ) : (
        reviewablePosts.map((post) => (
          <div key={post.id} className="box">
            <h2 className="title is-5">{post.title}</h2>
            <p>{post.content}</p>
            <p>
              <strong>Author:</strong> {post.author}
            </p>
            <div className="buttons mt-2">
              <button
                className="button is-success is-small"
                onClick={() => handleApproval(post.id, 1)}
              >
                Approve ✅
              </button>
              <button
                className="button is-warning is-small"
                onClick={() => handleApproval(post.id, 0)}
              >
                Un-approve ⏳
              </button>
              <button
                className="button is-danger is-small"
                onClick={() => handleApproval(post.id, -1)}
              >
                Deny ❌
              </button>
            </div>
          </div>
        ))
      )}
    </section>
  )
}