import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createPost } from "../../managers/PostManager"

export const CreatePost = ({ token }) => {
  const navigate = useNavigate()

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image_url: "",
    category_id: 1, // TEMP hardcoded category to get us moving
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setPostData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    createPost(postData, token)
      .then(() => {
        navigate("/posts") // Go back to post list after creating
      })
      .catch((err) => {
        console.error("Error creating post:", err)
        alert("Post failed. Check console.")
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a New Post</h2>

      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={postData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          value={postData.content}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="image_url">Image URL</label>
        <input
          type="text"
          name="image_url"
          value={postData.image_url}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="category_id">Category ID</label>
        <input
          type="number"
          name="category_id"
          value={postData.category_id}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Submit Post</button>
    </form>
  )
}
