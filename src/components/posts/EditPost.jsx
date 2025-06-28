import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import"./editPost.css"

export const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    content: "",
    category_id: 1,
    image_url: "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8088/categories")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8088/posts/${postId}`)
      .then((res) => res.json())
      .then(setPost);
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8088/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }).then(() => {
      navigate(`/posts/${postId}`);
    });
  };

  const handleCancel = () => {
    navigate("/posts");
  };

  return (
    <section className="edit-post-section">
      <div className="edit-post-container">
        <h1 className="form-title">Edit Post</h1>
        <form onSubmit={handleSubmit} className="edit-post-form">
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              className="form-input"
              type="text"
              name="title"
              value={post.title}
              onChange={handleChange}
              required
              placeholder="Enter post title"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Content</label>
            <textarea
              className="form-textarea"
              name="content"
              value={post.content}
              onChange={handleChange}
              required
              placeholder="Write your post content here..."
              rows={6}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="category_id">
              Select Category
            </label>
            <select
              className="form-select"
              name="category_id"
              value={post.category_id}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Image URL (optional)</label>
            <input
              className="form-input"
              type="text"
              name="image_url"
              value={post.image_url}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
