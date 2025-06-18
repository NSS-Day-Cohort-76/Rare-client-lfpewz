import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllPosts } from "../../managers/PostManager.js"


export const DisplayAllPosts = ({token}) => {
    const [allPosts, setAllPosts] = useState([]);

useEffect(() => {
    getAllPosts().then(setAllPosts)
     console.log("🔍 Posts received:"); // see what came back
}, []);


  return (
    <div>
      <h2>All Posts</h2>
      {allPosts.length > 0 ? (
        <ul>
          {allPosts.map(post => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.category}</p>
              <p>{post.user_id}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}