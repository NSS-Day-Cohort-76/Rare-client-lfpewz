import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllCategories } from "../../managers/CategoryManager.js"

export const EditPost = () => {
  const { postId } = useParams()
  const navigate = useNavigate()

  const [post, setPost] = useState({
    title: "",
    content: "",
    category_id: 1,
    image_url: ""
  })
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch(`http://localhost:8088/posts/${postId}`)
      .then(res => res.json())
      .then(setPost)
    getAllCategories().then(setCategories)
  }, [postId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setPost(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`http://localhost:8088/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
    }).then(() => {
      navigate(`/posts/${postId}`)
    })
  }

  const handleCancel = () => {
    navigate("/posts")
  }

  return (
    <form onSubmit={handleSubmit} className="box" style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h2 className="title is-3 has-text-centered mb-5">Edit Post</h2>

      <div className="field">
        <label className="label" htmlFor="title">Title</label>
        <div className="control has-icons-left">
          <input
            className="input is-primary"
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
            placeholder="Enter post title"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-heading"></i>
          </span>
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="content">Content</label>
        <div className="control">
          <textarea
            className="textarea is-info"
            name="content"
            value={post.content}
            onChange={handleChange}
            required
            placeholder="Write your post content here..."
            rows={6}
          />
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="image_url">Image URL</label>
        <div className="control has-icons-left">
          <input
            className="input is-link"
            type="url"
            name="image_url"
            value={post.image_url}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-image"></i>
          </span>
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="category_id">Select Category</label>
        <div className="control">
          <div className="select is-fullwidth is-primary">
            <select
              name="category_id"
              value={post.category_id}
              onChange={handleChange}
              required
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="field is-grouped is-grouped-right mt-5">
        <div className="control">
          <button type="submit" className="button is-primary is-medium is-rounded has-shadow">
            <span className="icon">
              <i className="fas fa-save"></i>
            </span>
            <span>Save</span>
          </button>
        </div>
        <div className="control">
          <button type="button" className="button is-light is-medium is-rounded" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  )
}