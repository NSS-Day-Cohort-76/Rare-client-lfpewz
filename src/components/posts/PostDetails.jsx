import { useEffect, useState } from "react"
import { useParams, useNavigate, useOutletContext } from "react-router-dom"
import { deletePost } from "../../managers/PostManager.js"
import { CommentList } from "../comments/CommentList"

export const PostDetails = () => {
  const { postId } = useParams()
  const [post, setPost] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const navigate = useNavigate()
  const { user } = useOutletContext()

  const goToEdit = () => navigate(`/posts/${post.id}/edit`)

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?")
    if (confirmDelete) {
      deletePost(post.id, user).then(() => {
        navigate("/allposts")
      })
    }
  }

  useEffect(() => {
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
  }, [postId])

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

  const formattedDate = post.publication_date
    ? new Date(post.publication_date).toLocaleDateString()
    : "Unknown"

  return (
    <section className="section">
      <div className="container">
        <div className="box">
          <h1 className="title is-3 mb-4">{post.title}</h1>

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

          <div className="content mb-5" style={{ whiteSpace: "pre-line" }}>
            <p>{post.content}</p>
          </div>

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
