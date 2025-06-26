import { useEffect, useState } from "react";
import { getMostRecentPost } from "../../managers/PostManager.js";
import { Link,useNavigate, useOutletContext } from "react-router-dom";

export const HomePageDisplay = ({}) => {
  const [mostRecentPost, setMostRecentPost] = useState({});
  const { user } = useOutletContext();
  const userId = user?.id
  const navigate = useNavigate()
  useEffect(() => {
    getMostRecentPost().then(setMostRecentPost);
  }, [userId]);
console.log("userId:", userId)

  return (
    <section className="section">
      <div className="container has-text-centered">
        <h1 className="title is-3 mb-4">
          Eventually these will be the currentUser's subscribed posts displayed
          on homepage
        </h1>
        {/* Create Post button */}
        <div className="mb-6">
          <button
            className="button is-primary is-medium is-rounded has-shadow create-post-button"
            onClick={() => navigate("/createpost")}
          >
            <span className="icon">
              <i className="fas fa-plus"></i>
            </span>
            <span>Click here to Create Post</span>
          </button>
        </div>

        {mostRecentPost.id && (
          <Link
            to={`/posts/${mostRecentPost.id}`}
            className="box"
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "block",
            }}
          >
            <h2 className="title is-3 mb-4">{mostRecentPost.title}</h2>

            {mostRecentPost.image_url && (
              <figure className="image mb-4 is-flex is-justify-content-center">
                <img
                  src={mostRecentPost.image_url}
                  alt={mostRecentPost.title}
                  style={{
                    maxWidth: "800px",
                    maxHeight: "500px",
                    width: "auto",
                    height: "auto",
                  }}
                />
              </figure>
            )}

            <p className="is-size-6 has-text-grey mb-2">
              <strong>By:</strong> {mostRecentPost.author} &nbsp;|&nbsp;
              <strong>Category:</strong> {mostRecentPost.category?.label}
            </p>

            {mostRecentPost.tags && mostRecentPost.tags.length > 0 && (
              <div className="mb-3">
                <strong>Tags:</strong>
                {mostRecentPost.tags.map((tag) => (
                  <span key={tag.id} className="tag is-info is-light ml-2">
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
