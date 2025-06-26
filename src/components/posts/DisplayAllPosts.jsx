import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllPosts } from "../../managers/PostManager.js";

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
    <section className="section">
      <div className="container">
        {/* Hero Heading */}
        <div className="mb-6">
          <h1 className="title is-2 has-text-centered">All Posts</h1>
          <p className="subtitle is-5 has-text-centered has-text-grey-dark">
            Browse recent posts or create a new one.
          </p>
        </div>

        {user.isStaff && (
          <div className="has-text-centered mb-4">
            <span className="tag is-success is-light is-medium is-rounded">
              🛡️ Viewing as <strong className="ml-1">Admin</strong>
            </span>
          </div>
        )}

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

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="columns is-multiline">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="column is-full-mobile is-half-tablet is-one-third-desktop"
              >
                {post.approved === -1 ? (
                  <div className="card has-background-danger-light has-text-centered">
                    <div className="card-content">
                      <p className="notification is-danger is-light">
                        This post was deleted by the admins.
                      </p>
                      <p className="has-text-grey-dark mt-2">
                        <strong>Author:</strong>{" "}
                        <Link to={`/users/${post.user.id}`}>
                          {post.user.firstName} {post.user.lastName}
                        </Link>
                      </p>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={`/posts/${post.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div
                      className={`card is-hoverable has-shadow ${
                        post.approved === 0 ? "has-background-warning-light" : ""
                      }`}
                    >
                      <header className="card-header">
                        <p className="card-header-title has-text-weight-semibold">
                          {post.title}
                          {post.approved === 0 && (
                            <span className="tag is-warning is-light is-rounded ml-3">
                              ⏳ Pending Approval
                            </span>
                          )}
                        </p>
                        <span
                          className="tag is-info is-light card-header-icon"
                          aria-label="category"
                        >
                          {post.category.label}
                        </span>
                      </header>
                      <div className="card-content">
                        <div className="content">
                          <p className="mb-2">
                            <strong>Author:</strong> {post.user.firstName}{" "}
                            {post.user.lastName}
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
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="notification is-warning has-text-centered">
            No posts found.
          </p>
        )}
      </div>
    </section>
  );
};
