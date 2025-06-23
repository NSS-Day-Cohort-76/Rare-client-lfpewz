import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAllPosts } from "../../managers/PostManager.js";


export const DisplayAllPosts = ({ user }) => {
  const [allPosts, setAllPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllPosts().then(setAllPosts);
    console.log("🔍 Posts received:");
  }, []);

  const sortedPosts = allPosts.slice().sort(
    (a, b) => new Date(b.publication_date) - new Date(a.publication_date)
  );

  return (
    <div className="container">
      <h2 className="title is-3 has-text-centered mb-5">All Posts</h2>
      
      {/* Create Post button */}
      <div className="has-text-centered mb-6">
        <button
          className="button is-primary is-medium is-rounded has-shadow"
          onClick={() => navigate("/createpost")}
        >
          <span className="icon">
            <i className="fas fa-plus"></i>
          </span>
          <span>Create Post</span>
        </button>
      </div>

      {sortedPosts.length > 0 ? (
        <div className="columns is-multiline">
          {sortedPosts.map(post => (
            <div key={post.id} className="column is-full-mobile is-half-tablet is-one-third-desktop">
              <Link
                to={`/posts/${post.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="card is-hoverable has-shadow">
                  <header className="card-header">
                    <p className="card-header-title has-text-weight-semibold">
                      {post.title}
                    </p>
                    <span className="tag is-info is-light card-header-icon" aria-label="category">
                      {post.category.label}
                    </span>
                  </header>
                  <div className="card-content">
                    <div className="content">
                      <p className="mb-2">
                        <strong>Author:</strong> {post.user.firstName} {post.user.lastName}
                      </p>
                      <p className="is-size-7 has-text-grey">
                        <em>Published on: {new Date(post.publication_date).toLocaleDateString()}</em>
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="notification is-warning has-text-centered">No posts found.</p>
      )}
    </div>
  );
}
