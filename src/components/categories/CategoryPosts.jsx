import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostsByCategory } from "../../managers/PostManager.js";

export const CategoryPosts = () => {
  const { categoryId } = useParams();
  const [categoryPosts, setCategoryPosts] = useState([]);

  // Optional: derive category label from the first post
  const categoryLabel =
    categoryPosts.length > 0 ? categoryPosts[0].category.label : "";

  useEffect(() => {
    getPostsByCategory(categoryId).then((data) => {
      console.log("Fetched category posts:", data);
      setCategoryPosts(Array.isArray(data) ? data : []);
    });
  }, [categoryId]);

  return (
    <section className="section">
      <div className="container">
        <h1 className="title has-text-centered mb-5">
          Posts for Category{" "}
          {categoryLabel ? `"${categoryLabel}"` : `#${categoryId}`}
        </h1>

        {categoryPosts.length === 0 ? (
          <p className="has-text-centered has-text-grey">No posts found.</p>
        ) : (
          <div className="columns is-multiline">
            {categoryPosts.map((post) => (
              <div key={post.id} className="column is-half">
                <div className="box">
                  <h2 className="subtitle">
                    <Link to={`/posts/${post.id}`} className="has-text-link">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="content">Posted by:{post.author}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
