import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostsByCategory } from "../../managers/PostManager.js";
import"./categoryPosts.css"

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
    <h1 className="title is-3 has-text-centered mb-4">
      Posts in Category{" "}
      <span className="has-text-primary">
        {categoryLabel ? `"${categoryLabel}"` : `#${categoryId}`}
      </span>
    </h1>
    <p className="subtitle is-6 has-text-centered has-text-grey mb-6">
      Browse all posts filed under this category.
    </p>

    {categoryPosts.length === 0 ? (
      <div className="notification is-light has-text-centered">
        No posts found for this category.
      </div>
    ) : (
      <div className="columns is-multiline">
        {categoryPosts.map((post) => (
          <div key={post.id} className="column is-full-mobile is-half-tablet is-one-third-desktop">
            <div className="box has-shadow">
              <h2 className="subtitle is-5 mb-2">
                <Link to={`/posts/${post.id}`} className="has-text-link">
                  {post.title}
                </Link>
              </h2>
              <p className="is-size-7 has-text-grey">
                Posted by: <strong>{post.author}</strong>
              </p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</section>

  );
};
