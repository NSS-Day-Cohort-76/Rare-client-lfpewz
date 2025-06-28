import { useEffect, useState } from "react";
import {
  getAllReactions,
  addOrUpdatePostReaction,
  getUserReaction,
} from "../../managers/ReactionManager";
import { getPostById } from "../../managers/PostManager.js";
import "./reactionSelector.css";
export const ReactionSelector = ({ post, user, setPost }) => {
  const [reactions, setReactions] = useState([]);
  const [selectedReactionId, setSelectedReactionId] = useState(null);

  const userId = user?.id;
  const postId = post?.id;

  useEffect(() => {
    console.log("userId:", userId, "postId:", postId);

    getAllReactions().then(setReactions);
    if (postId && userId) {
      getUserReaction(postId, userId).then((reaction) => {
        if (reaction) setSelectedReactionId(reaction.reaction_id);
      });
    }
  }, [postId, userId]);
  console.log(reactions.image_url);
  const handleReactionClick = (reactionId) => {
    if (reactionId === selectedReactionId) return;

    addOrUpdatePostReaction({
      post_id: post.id,
      user_id: user.id,
      reaction_id: reactionId,
    })
      .then(() => setSelectedReactionId(reactionId))
      .then(() => {
        getPostById(post.id).then(setPost); // 🔁 Refresh full post data (with updated reactions)
      });
  };

  // const handleReactionClick = (reactionId) => {
  //   if (!postId || !userId) return;
  //   if (reactionId === selectedReactionId) return;

  //   addOrUpdatePostReaction({
  //     post_id: postId,
  //     user_id: userId,
  //     reaction_id: reactionId,
  //   }).then(() => setSelectedReactionId(reactionId));
  // };

  return (
    <div className="reactions-container">
      {reactions.map((reaction) => (
        <button
          key={reaction.id}
          className={`reaction-button ${
            selectedReactionId === reaction.id ? "is-selected" : ""
          }`}
          onClick={() => handleReactionClick(reaction.id)}
          aria-label={`React with ${reaction.label}`}
        >
          <img
            src={reaction.image_url}
            alt={reaction.label}
            className="reaction-icon"
          />
          {/* <span>{reaction.image_url}</span> */}
        </button>
      ))}
    </div>
  );
};
