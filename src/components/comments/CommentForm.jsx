import { useEffect, useState } from "react"
import { useNavigate, useParams, useOutletContext } from "react-router-dom"
import {
  createComment,
  updateComment,
  getCommentById
} from "../../managers/CommentManager"

export const CommentForm = () => {
  const [comment, setComment] = useState({
    subject: "",
    content: ""
  })

  const navigate = useNavigate()
  const { postId, commentId } = useParams()
  const { user } = useOutletContext()
  const userId = user?.userId || user?.id
  const isEdit = !!commentId

useEffect(() => {
  if (isEdit) {
    getCommentById(commentId).then(existing => {
      if (existing) {
        setComment({
          subject: existing.subject,
          content: existing.content,
          post_id: existing.post_id  // ✅ crucial!
        })
      }
    })
  }
}, [isEdit, commentId])


  const handleChange = (evt) => {
    setComment(prev => ({
      ...prev,
      [evt.target.name]: evt.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!userId) {
      alert("No user ID found. Please log in again.")
      return
    }

    if (isEdit) {
      updateComment(commentId, comment).then(() =>
        navigate(`/posts/${comment.post_id || postId}`)
      )
    } else {
      const newComment = {
        ...comment,
        post_id: parseInt(postId),
        author_id: userId
      }

      console.log("📦 Sending payload:", newComment)

      createComment(newComment).then(() =>
        navigate(`/posts/${postId}`)
      )
    }
  }

  return (
    <section className="section">
      <div className="container">
        <h2 className="title is-4">{isEdit ? "Edit" : "Add"} Comment</h2>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Subject</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="subject"
                value={comment.subject}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Content</label>
            <div className="control">
              <textarea
                className="textarea"
                name="content"
                value={comment.content}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button type="submit" className="button is-link">
                Save
              </button>
            </div>
            <div className="control">
              <button
                type="button"
                className="button is-light"
                onClick={() => navigate(`/posts/${postId}`)}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
