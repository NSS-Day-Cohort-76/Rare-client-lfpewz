import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { deletePost } from "../../managers/PostManager.js"
import { useOutletContext } from "react-router-dom"

export const PostDetails = () => {
  const { postId } = useParams()
  const [post, setPost] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const navigate = useNavigate()

const goToEdit = () => navigate(`/posts/${post.id}/edit`)

const { user } = useOutletContext()

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
      <div className="container box">
        <h1 className="title is-3 mb-4">{post.title}</h1>

        {post.image_url && (
          <figure className="image mb-4">
            <img src={post.image_url} alt={post.title} />
          </figure>
        )}

        <p className="is-size-6 has-text-grey mb-2">
          <strong>By:</strong> {post.author} &nbsp;|&nbsp; 
          <strong>Published:</strong> {formattedDate}
        </p>

        <div className="content mt-4">
          <p>{post.content}</p>
        </div>
      </div>

      <div className="buttons mt-5">
        <button className="button is-warning" onClick={goToEdit}>Edit</button>
        <button className="button is-danger" onClick={handleDelete}>Delete</button>
      </div>
    </section>
  )
}
