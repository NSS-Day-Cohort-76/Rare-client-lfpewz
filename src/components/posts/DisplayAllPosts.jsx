import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAllPosts } from "../../managers/PostManager.js"


export const DisplayAllPosts = ({user}) => {
    const [allPosts, setAllPosts] = useState([]);

useEffect(() => {
    getAllPosts().then(setAllPosts)
     console.log("🔍 Posts received:"); // see what came back
}, []);

  // Sort posts by publication_date ascending (earliest first)
  const sortedPosts = allPosts.slice().sort(
    (a, b) => new Date(a.publication_date) - new Date(b.publication_date)
  );

return (
  <div className="container">
    <h2 className="title is-3">All Posts</h2>
    {sortedPosts.length > 0 ? (
      <ul>
        {sortedPosts.map(post => (
          <li key={post.id} className="box mb-4">
            <Link to={`/posts/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <h3 className="title is-5">{post.title}</h3>
              <p className="tag is-info">{post.category.label}</p>
              <p className="has-text-grey">
                Author: {post.user.firstName} {post.user.lastName}
              </p>
              <p className="has-text-grey">
                Publication Date: {post.publication_date}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    ) : (
      <p className="notification is-warning">No posts found.</p>
    )}
  </div>
);
}