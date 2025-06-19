import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createPost } from "../../managers/PostManager"
import { useOutletContext } from "react-router-dom"


export const CreatePost = () => {
  const { user } = useOutletContext()
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
    console.log("user being passed to createPost:", user)
    event.preventDefault()

    createPost(postData, user)
      .then(() => {
        navigate("/posts") // Go back to post list after creating
      })
      .catch((err) => {
        console.error("Error creating post:", err)
        alert("Post failed. Check console.")
      })
  }

  return (
  <form onSubmit={handleSubmit} className="box">
    <h2 className="title is-4">Create a New Post</h2>

    <div className="field">
      <label className="label" htmlFor="title">Title</label>
      <div className="control">
        <input
          className="input"
          type="text"
          name="title"
          value={postData.title}
          onChange={handleChange}
          required
        />
      </div>
    </div>

    <div className="field">
      <label className="label" htmlFor="content">Content</label>
      <div className="control">
        <textarea
          className="textarea"
          name="content"
          value={postData.content}
          onChange={handleChange}
          required
        />
      </div>
    </div>

    <div className="field">
      <label className="label" htmlFor="image_url">Image URL</label>
      <div className="control">
        <input
          className="input"
          type="text"
          name="image_url"
          value={postData.image_url}
          onChange={handleChange}
        />
      </div>
    </div>

    <div className="field">
      <label className="label" htmlFor="category_id">Category ID</label>
      <div className="control">
        <input
          className="input"
          type="number"
          name="category_id"
          value={postData.category_id}
          onChange={handleChange}
          required
        />
      </div>
    </div>

    <div className="field is-grouped is-grouped-right">
      <div className="control">
        <button type="submit" className="button is-link">Submit Post</button>
      </div>
    </div>
  </form>
)
}
