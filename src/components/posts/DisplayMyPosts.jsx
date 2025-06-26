import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { getAllPosts } from "../../managers/PostManager.js";

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
    <div className="container">
      <h2 className="title is-3 has-text-centered mb-5">My Posts</h2>
      <p className="subtitle is-5 has-text-centered has-text-grey-dark">
        Browse your posts or create a new one.
      </p>
      {/* Search + Create Post */}
      <div
        className="box mb-6"
        style={{ border: "1px solid #dbdbdb", backgroundColor: "#f9f9f9" }}
      >
        <div className="columns is-vcentered is-variable is-4">
          <div className="column is-9">
            <div className="field has-addons">
              <div className="control is-expanded">
                <input
                  className="input is-medium has-shadow"
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #b5b5b5",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                  type="text"
                  placeholder="Search posts by title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {searchTerm && (
                <div className="control">
                  <button
                    className="button is-medium is-light"
                    onClick={() => setSearchTerm("")}
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="column is-3 has-text-right">
            <button
              className="button is-primary is-medium is-rounded"
              onClick={() => navigate("/createpost")}
            >
              <span className="icon">
                <i className="fas fa-plus"></i>
              </span>
              <span>Create Post</span>
            </button>
          </div>
        </div>
      </div>
      {filteredPosts.length > 0 ? (
        <div className="columns is-multiline">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="column is-full-mobile is-half-tablet is-one-third-desktop"
            >
              <Link
                to={`/posts/${post.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="card is-hoverable has-shadow">
                  <header className="card-header">
                    <p className="card-header-title has-text-weight-semibold">
                      {post.title}
                    </p>
                    <span
                      className="tag is-info is-light card-header-icon"
                      aria-label="category"
                    >
                      {post.category?.label}
                    </span>
                  </header>
                  <div className="card-content">
                    <div className="content">
                      <p className="mb-2">
                        <strong>Author:</strong> {post.user?.firstName}{" "}
                        {post.user?.lastName}
                      </p>
                      <p className="is-size-7 has-text-grey">
                        <em>
                          Published on:{" "}
                          {new Date(post.publication_date).toLocaleDateString()}
                        </em>
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="notification is-warning has-text-centered">
          You have no posts yet.
        </p>
      )}
    </div>
  );
};