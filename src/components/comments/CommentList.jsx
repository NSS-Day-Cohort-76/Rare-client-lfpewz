import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getCommentsByPostId, deleteComment } from "../../managers/CommentManager"

export const CommentList = ({ user }) => {
  const [comments, setComments] = useState([])
  const { postId } = useParams()
  const navigate = useNavigate()
  const currentUserId = user?.userId || user?.id

  useEffect(() => {
    getCommentsByPostId(postId).then(data => {
      console.log("💬 Loaded comments:", data)
      setComments(data)
    })
  }, [postId])

  const handleDelete = (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      deleteComment(commentId).then(() => {
        getCommentsByPostId(postId).then(setComments)
      })
    }
  }

  return (
    <section className="section">
      <div className="container">
        <h2 className="title is-4">Comments</h2>

        <button
          className="button is-primary mb-4"
          onClick={() => navigate(`/posts/${postId}/comments/new`)}
        >
          Add Comment
        </button>

        {comments.length === 0 && <p>No comments yet.</p>}

        <div className="box">
          {comments.map(comment => (
            <article key={comment.id} className="media mb-4">
              <div className="media-content">
                <div className="content">
                  <p>
                    <strong>{comment.subject}</strong> <em>by {comment.username}</em>
                    <br />
                    <small>{new Date(comment.created_on).toLocaleString()}</small>
                    <br />
                    {comment.content}
                  </p>
                </div>

                {comment.author_id === currentUserId && (
                  <div className="buttons">
                    <button
                      className="button is-small is-info"
                      onClick={() => navigate(`/comments/${comment.id}/edit`)}
                    >
                      Edit
                    </button>
                    <button
                      className="button is-small is-danger"
                      onClick={() => handleDelete(comment.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
