import { useEffect, useState } from "react"
import { useParams, useNavigate, useOutletContext } from "react-router-dom"
import { deletePost } from "../../managers/PostManager.js"
import { CommentList } from "../comments/CommentList"
import { ReactionSelector } from "../reactions/ReactionSelector.jsx"

export const PostDetails = () => {
  const { postId } = useParams()
  const [post, setPost] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const navigate = useNavigate()
  const { user } = useOutletContext()
  const userId = user?.id;

  const goToEdit = () => navigate(`/posts/${post.id}/edit`)

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?")
    if (confirmDelete) {
      deletePost(post.id, user).then(() => {
        navigate("/allposts")
      })
    }
  }

  const handleApprovalChange = (newValue) => {
    fetch(`http://localhost:8088/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${user.userId}`
      },
      body: JSON.stringify({ approved: newValue })
    }).then(() => {
      fetch(`http://localhost:8088/posts/${post.id}`)
        .then(res => res.json())
        .then(data => setPost(data))
    })
  }

  useEffect(() => {
      console.log("📦 PostDetails userId:", userId, "postId:", postId);
    if (postId) {
      fetch(`http://localhost:8088/posts/${postId}`)
        .then(res => {
          if (!res.ok) {
            setNotFound(true)
            return null
          }
          return res.json()
        })
        .then(data => {
          if (data) setPost(data)
        })
    }
  }, [postId, userId])


  useEffect(() => {
    if (post) {
      console.log("🧪 PostDetails user:", user)
      console.log("🧪 PostDetails post.approved:", post.approved)
    }
  }, [post, user])

  if (notFound) {
    return (
      <section className="section">
        <div className="container has-text-centered">
          <p className="has-text-danger is-size-4">🚫 Post not found.</p>
        </div>
      </section>
    )
  }

  if (!post) {
    return (
      <section className="section">
        <div className="container has-text-centered">
          <p className="is-size-5">Loading post...</p>
        </div>
      </section>
    )
  }

  // Denied post: Only show message to author (unless admin)
  if (post.approved === -1 && (user.id === post.user_id || user.isStaff)) {
    return (
      <section className="section">
        <div className="container has-text-centered">
          <div className="notification is-danger is-light">
            This post was deleted by the admins.
          </div>
        </div>
      </section>
    )
  }

  const formattedDate = post.publication_date
    ? new Date(post.publication_date).toLocaleDateString()
    : "Unknown"

  return (
    <section className="section">
      <div className="container">
        <div className={`box ${post.approved === 0 ? "has-background-warning-light" : ""}`}>
          <h1 className="title is-3 mb-4">{post.title}</h1>

          {post.approved === 0 && (
            <span className="tag is-warning is-light is-rounded mb-2">⏳ Pending Approval</span>
          )}

          {post.image_url && (
            <figure className="image is-4by3 mb-5">
              <img src={post.image_url} alt={post.title} style={{ objectFit: "cover" }} />
            </figure>
          )}

          <div className="level is-mobile mb-4">
            <div className="level-left">
              <div className="level-item">
                <p className="is-size-6 has-text-grey">
                  <strong>By:</strong> {post.author}
                </p>
              </div>
              <div className="level-item">
                <p className="is-size-6 has-text-grey">
                  <strong>Published:</strong> {formattedDate}
                </p>
              </div>
            </div>
          </div>

          <ReactionSelector post={post} user={user} setPost={setPost} /> 
          
          <div className="content mb-5" style={{ whiteSpace: "pre-line" }}>
            <p>{post.content}</p>
          </div>

          {/* Admin Approval Buttons */}
          {user?.isStaff && post.approved === 0 && (
            <div className="buttons mb-4">
              <button
                className="button is-success"
                onClick={() => handleApprovalChange(1)}
              >
                ✅ Approve
              </button>
              <button
                className="button is-danger"
                onClick={() => handleApprovalChange(-1)}
              >
                ❌ Deny
              </button>
            </div>
          )}

          <div className="buttons">
            <button className="button is-warning is-medium" onClick={goToEdit}>
              Edit
            </button>
            <button className="button is-danger is-medium" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="section">
          <h2 className="title is-4">Comments</h2>
          <CommentList user={user} postId={post.id} />
        </div>
      </div>
    </section>
  )
}
