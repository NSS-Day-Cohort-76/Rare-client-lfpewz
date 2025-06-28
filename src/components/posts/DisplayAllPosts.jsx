import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllPosts } from "../../managers/PostManager.js";
import"./displayAllPosts.css"

export const DisplayAllPosts = ({ user }) => {
  const [allPosts, setAllPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllPosts(user)
      .then((posts) => {
        console.log("🔍 Posts received:", posts);
        setAllPosts(posts);
      })
      .catch((err) => {
        console.error("🚨 Error loading posts:", err);
        setAllPosts([]);
      });
  }, [user]);

  const sortedPosts = allPosts
    .slice()
    .sort(
      (a, b) => new Date(b.publication_date) - new Date(a.publication_date)
    );

  const filteredPosts = sortedPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="all-posts-page">
      <div className="all-posts-container">
        <div className="section-header">
          <h1 className="section-title">All Posts</h1>
          <p className="section-subtitle">
            Browse recent posts or create a new one.
          </p>
        </div>

        {user?.isStaff && (
          <div className="admin-badge">
            <span>
              🛡️ Viewing as <strong>Admin</strong>
            </span>
          </div>
        )}

        {/* Search & Create Controls */}
        <div className="post-controls">
          <input
            className="search-input"
            type="text"
            placeholder="Search posts by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="button small outline"
              onClick={() => setSearchTerm("")}
            >
              Clear
            </button>
          )}
          <button
            className="button accent"
            onClick={() => navigate("/createpost")}
          >
            ➕ Create Post
          </button>
        </div>

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="post-grid">
            {filteredPosts.map((post) => (
              <div key={post.id} className="post-card-wrapper">
                {post.approved === -1 ? (
                  <div className="post-card post-deleted">
                    <p className="post-note">
                      This post was deleted by the admins.
                    </p>
                    <p className="post-meta">
                      <strong>Author:</strong>{" "}
                      <Link to={`/users/${post.user.id}`}>
                        {post.user.firstName} {post.user.lastName}
                      </Link>
                    </p>
                  </div>
                ) : (
                  <Link to={`/posts/${post.id}`} className="post-card-link">
                    <div
                      className={`post-card ${
                        post.approved === 0 ? "post-pending" : ""
                      }`}
                    >
                      <div className="post-header">
                        <h2 className="post-title">{post.title}</h2>
                        {post.approved === 0 && (
                          <span className="post-tag warning">
                            ⏳ Pending Approval
                          </span>
                        )}
                        <span className="post-tag">{post.category.label}</span>
                      </div>
                      <div className="post-body">
                        <p className="post-author">
                          <strong>Author:</strong> {post.user.firstName}{" "}
                          {post.user.lastName}
                        </p>
                        <p className="post-date">
                          <em>
                            Published on:{" "}
                            {new Date(
                              post.publication_date
                            ).toLocaleDateString()}
                          </em>
                        </p>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="no-posts-warning">No posts found.</p>
        )}
      </div>
    </section>
  );
};
