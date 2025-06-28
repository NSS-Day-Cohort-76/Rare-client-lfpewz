import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { getAllPosts } from "../../managers/PostManager.js";
import"./myPosts.css"

export const DisplayMyPosts = () => {
  const [myPosts, setMyPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  // Get user from Outlet context (provided by <Authorized />)
  const { user } = useOutletContext();

  useEffect(() => {
    if (!user || (!user.userId && !user.id)) return; // silent protection

    getAllPosts(user)
      .then((posts) => {
        const filtered = posts.filter(
          (post) =>
            post.user?.id === user.userId ||
            post.user === user.userId ||
            post.user?.id === user.id ||
            post.user === user.id
        );
        setMyPosts(filtered);
      })
      .catch((err) => {
        console.error("❌ Failed to load user posts:", err);
      });
  }, [user]);

  const sortedPosts = myPosts
    .slice()
    .sort(
      (a, b) => new Date(b.publication_date) - new Date(a.publication_date)
    );

  const filteredPosts = sortedPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="myposts-container">
      <h2 className="myposts-title">My Posts</h2>
      <p className="myposts-subtitle">Browse your posts or create a new one.</p>

      {/* Search + Create Post */}
      <div className="myposts-controls">
        <input
          type="text"
          placeholder="Search posts by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="myposts-search-input"
        />
        {searchTerm && (
          <button
            className="myposts-button outline"
            onClick={() => setSearchTerm("")}
          >
            Clear
          </button>
        )}
        <button
          className="myposts-button accent"
          onClick={() => navigate("/createpost")}
        >
          ➕ Create Post
        </button>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="myposts-grid">
          {filteredPosts.map((post) => (
            <div key={post.id} className="myposts-card-wrapper">
              <Link to={`/posts/${post.id}`} className="myposts-card-link">
                <div className="myposts-card">
                  <header className="myposts-card-header">
                    <h3 className="myposts-card-title">{post.title}</h3>
                    <span className="myposts-card-tag">
                      {post.category?.label}
                    </span>
                  </header>
                  <div className="myposts-card-content">
                    <p className="myposts-author">
                      <strong>Author:</strong> {post.user?.firstName}{" "}
                      {post.user?.lastName}
                    </p>
                    <p className="myposts-date">
                      <em>
                        Published on:{" "}
                        {new Date(post.publication_date).toLocaleDateString()}
                      </em>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="myposts-no-posts">You have no posts yet.</p>
      )}
    </div>
  );
};
