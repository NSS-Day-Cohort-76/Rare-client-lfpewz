import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

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
    fetch("http://localhost:8088/categories")
    .then(res => res.json())
    .then(setCategories)
  }, [])

  useEffect(() => {
    fetch(`http://localhost:8088/posts/${postId}`)
      .then(res => res.json())
      .then(setPost)
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
    <section className="section">
      <div className="container box">
        <h1 className="title is-3 mb-5">Edit Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="title"
                value={post.title}
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
                value={post.content}
                onChange={handleChange}
                required
              />
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
        <option value="" disabled>Select a category</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.label}
          </option>
        ))}
      </select>
    </div>
  </div>
</div>


          <div className="field">
            <label className="label">Image URL (optional)</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="image_url"
                value={post.image_url}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="buttons mt-5">
            <button type="submit" className="button is-primary">Save</button>
            <button type="button" className="button is-light" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </section>
  )
}
