import { useEffect, useState } from "react";
import { getMostRecentPost } from "../../managers/PostManager.js";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import "./homeEditorial.css"; // <-- new stylesheet you'll create

export const HomePageDisplay = () => {
  const [mostRecentPost, setMostRecentPost] = useState({});
  const { user } = useOutletContext();
  const userId = user?.id;
  const navigate = useNavigate();

  useEffect(() => {
    getMostRecentPost().then(setMostRecentPost);
  }, [userId]);

  return (
  <section className="home-section">
    <div className="home-container">
      <h1 className="home-heading">Your Subscribed Feed (Coming Soon)</h1>

      <button
        className="nb-button"
        onClick={() => navigate("/createpost")}
      >
        ➕ Create Post
      </button>

      {mostRecentPost?.id && (
        <Link to={`/posts/${mostRecentPost.id}`} className="post-card">
          <h2 className="post-title">{mostRecentPost.title}</h2>

          {mostRecentPost.image_url && (
            <div className="post-image-wrapper">
              <img
                src={mostRecentPost.image_url}
                alt={mostRecentPost.title}
                className="post-image"
              />
            </div>
          )}

          <p className="post-meta">
            <strong>By:</strong> {mostRecentPost.author} &nbsp;|&nbsp;
            <strong>Category:</strong> {mostRecentPost.category?.label}
          </p>

          {mostRecentPost.tags?.length > 0 && (
            <div className="post-tags">
              <strong>Tags:</strong>
              {mostRecentPost.tags.map((tag) => (
                <span key={tag.id} className="post-tag">
                  {tag.label}
                </span>
              ))}
            </div>
          )}
        </Link>
      )}
    </div>
  </section>
);

};
