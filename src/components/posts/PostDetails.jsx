import { useEffect, useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { deletePost } from "../../managers/PostManager.js";
import { CommentList } from "../comments/CommentList";
import { ReactionSelector } from "../reactions/ReactionSelector.jsx";
import"./postDetails.css"

export const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();
  const { user } = useOutletContext();
  const userId = user?.id;

  const goToEdit = () => navigate(`/posts/${post.id}/edit`);

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      deletePost(post.id, user).then(() => {
        navigate("/allposts");
      });
    }
  };

  const handleApprovalChange = (newValue) => {
    fetch(`http://localhost:8088/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${user.userId}`,
      },
      body: JSON.stringify({ approved: newValue }),
    }).then(() => {
      fetch(`http://localhost:8088/posts/${post.id}`)
        .then((res) => res.json())
        .then((data) => setPost(data));
    });
  };

  useEffect(() => {
    console.log("📦 PostDetails userId:", userId, "postId:", postId);
    if (postId) {
      fetch(`http://localhost:8088/posts/${postId}`)
        .then((res) => {
          if (!res.ok) {
            setNotFound(true);
            return null;
          }
          return res.json();
        })
        .then((data) => {
          if (data) setPost(data);
        });
    }
  }, [postId, userId]);

  useEffect(() => {
    if (post) {
      console.log("🧪 PostDetails user:", user);
      console.log("🧪 PostDetails post.approved:", post.approved);
    }
  }, [post, user]);

  if (notFound) {
    return (
      <section className="section">
        <div className="container has-text-centered">
          <p className="has-text-danger is-size-4">🚫 Post not found.</p>
        </div>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="section">
        <div className="container has-text-centered">
          <p className="is-size-5">Loading post...</p>
        </div>
      </section>
    );
  }

  // Denied post: Only show message to author (unless admin)
  if (post.approved === -1 && (user?.id === post.user_id || user.isStaff)) {
    return (
      <section className="section">
        <div className="container has-text-centered">
          <div className="notification is-danger is-light">
            This post was deleted by the admins.
          </div>
        </div>
      </section>
    );
  }

  const formattedDate = post.publication_date
    ? new Date(post.publication_date).toLocaleDateString()
    : "Unknown";

  return (
    <section className="post-details-section">
      <div className="post-details-container">
        <div
          className={`post-details-box ${
            post.approved === 0 ? "pending-approval" : ""
          }`}
        >
          <h1 className="post-title">{post.title}</h1>

          {post.approved === 0 && (
            <span className="post-status-tag">⏳ Pending Approval</span>
          )}

          {post.image_url && (
            <figure className="post-image-wrapper">
              <img
                src={post.image_url}
                alt={post.title}
                className="post-image"
              />
            </figure>
          )}

          <div className="post-meta-level">
            <p className="post-meta-item">
              <strong>By:</strong> {post.author}
            </p>
            <p className="post-meta-item">
              <strong>Published:</strong> {formattedDate}
            </p>
          </div>

          <ReactionSelector post={post} user={user} setPost={setPost} />

          <article className="post-content">
            <p>{post.content}</p>
          </article>

          {/* Admin Approval Buttons */}
          {user?.isStaff && post.approved === 0 && (
            <div className="post-admin-buttons">
              <button
                className="btn approve-btn"
                onClick={() => handleApprovalChange(1)}
              >
                ✅ Approve
              </button>
              <button
                className="btn deny-btn"
                onClick={() => handleApprovalChange(-1)}
              >
                ❌ Deny
              </button>
            </div>
          )}

          <div className="post-action-buttons">
            <button className="btn edit-btn" onClick={goToEdit}>
              Edit
            </button>
            <button className="btn delete-btn" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <section className="comments-section">
          <h2 className="comments-title">Comments</h2>
          <CommentList user={user} postId={post.id} />
        </section>
      </div>
    </section>
  );
};
