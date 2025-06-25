import { useEffect, useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { createPost } from "../../managers/PostManager"
import { getAllCategories } from "../../managers/CategoryManager.js"
import { GetAllTags } from "../../services/getAllTags.jsx"

export const CreatePost = () => {
  const { user } = useOutletContext()
  const navigate = useNavigate()
  const [allTags, setAlltags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image_url: "",
    category_id: 1, // TEMP hardcoded category to get us moving
  })

  const [categories, setCategories] = useState([])
  useEffect(() => {
    getAllCategories().then(setCategories)
    GetAllTags().then(setAlltags)
  }, [])


  const handleChange = (event) => {
    const { name, value } = event.target
    setPostData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTagChange = (tagId) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleSubmit = (event) => {
    console.log("user being passed to createPost:", user)
    event.preventDefault()

    createPost(postData, user)
      .then(() => {
        navigate("/allposts")
      })
      .catch((err) => {
        console.error("Error creating post:", err)
        alert("Post failed. Check console.")
      })
  }

  return (
    <form onSubmit={handleSubmit} className="box" style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h2 className="title is-3 has-text-centered mb-5">Create a New Post</h2>

      <div className="field">
        <label className="label" htmlFor="title">Title</label>
        <div className="control has-icons-left">
          <input
            className="input is-primary"
            type="text"
            name="title"
            value={postData.title}
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
            value={postData.content}
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
            value={postData.image_url}
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
              value={postData.category_id}
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
      
      <div className="field">
        <label className="label">Select Tags</label>
        <div className="control">
          <div className="tags-list" style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {allTags
              .slice()
              .sort((a, b) => a.label.localeCompare(b.label))
              .map((tag) => (
                <label key={tag.id} className="checkbox is-size-6">
                  <input
                    type="checkbox"
                    value={tag.id}
                    checked={selectedTags.includes(tag.id)}
                    onChange={() => handleTagChange(tag.id)}
                    style={{ marginRight: "0.5em" }}
                  />
                  {tag.label}
                </label>
              ))}
          </div>
        </div>
      </div>

      <div className="field is-grouped is-grouped-right mt-5">
        <div className="control">
          <button type="submit" className="button is-primary is-medium is-rounded has-shadow">
            <span className="icon">
              <i className="fas fa-paper-plane"></i>
            </span>
            <span>Submit Post</span>
          </button>
        </div>
      </div>
    </form>
  )
}
