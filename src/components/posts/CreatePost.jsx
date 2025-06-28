import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { createPost } from "../../managers/PostManager";
import { getAllCategories } from "../../managers/CategoryManager.js";
import { GetAllTags } from "../../services/getAllTags.jsx";
import"./createPost.css"

export const CreatePost = () => {
  const { user } = useOutletContext();
  const navigate = useNavigate();
  const [allTags, setAlltags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image_url: "",
    category_id: 1, // TEMP hardcoded category to get us moving
  });

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getAllCategories().then(setCategories);
    GetAllTags().then(setAlltags);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (tagId) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleSubmit = (event) => {
    console.log("user being passed to createPost:", user);
    event.preventDefault();

    createPost(postData, user)
      .then(() => {
        navigate("/allposts");
      })
      .catch((err) => {
        console.error("Error creating post:", err);
        alert("Post failed. Check console.");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="create-post-form">
      <h2 className="form-title">Create a New Post</h2>

      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <div className="input-wrapper">
          <input
            type="text"
            name="title"
            value={postData.title}
            onChange={handleChange}
            required
            placeholder="Enter post title"
            className="form-input"
          />
          <span className="input-icon">
            <i className="fas fa-heading"></i>
          </span>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="content" className="form-label">
          Content
        </label>
        <textarea
          name="content"
          value={postData.content}
          onChange={handleChange}
          required
          placeholder="Write your post content here..."
          rows={6}
          className="form-textarea"
        />
      </div>

      <div className="form-group">
        <label htmlFor="image_url" className="form-label">
          Image URL
        </label>
        <div className="input-wrapper">
          <input
            type="url"
            name="image_url"
            value={postData.image_url}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="form-input"
          />
          <span className="input-icon">
            <i className="fas fa-image"></i>
          </span>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="category_id" className="form-label">
          Select Category
        </label>
        <select
          name="category_id"
          value={postData.category_id}
          onChange={handleChange}
          required
          className="form-select"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Select Tags</label>
        <div className="tags-list">
          {allTags
            .slice()
            .sort((a, b) => a.label.localeCompare(b.label))
            .map((tag) => (
              <label key={tag.id} className="checkbox-label">
                <input
                  type="checkbox"
                  value={tag.id}
                  checked={selectedTags.includes(tag.id)}
                  onChange={() => handleTagChange(tag.id)}
                  className="checkbox-input"
                />
                {tag.label}
              </label>
            ))}
        </div>
      </div>

      <div className="form-group form-actions">
        <button type="submit" className="btn btn-primary">
          <span className="icon">
            <i className="fas fa-paper-plane"></i>
          </span>
          <span>Submit Post</span>
        </button>
      </div>
    </form>
  );
};
