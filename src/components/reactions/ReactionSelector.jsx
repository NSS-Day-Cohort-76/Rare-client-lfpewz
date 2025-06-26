import { useEffect, useState } from "react";
import {
  getAllReactions,
  addOrUpdatePostReaction,
  getUserReaction,
} from "../../managers/ReactionManager";
import { getPostById } from "../../managers/PostManager.js";

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
    <div className="reactions buttons are-small mb-4">
      {reactions.map((reaction) => (
        <button
          key={reaction.id}
          className={`button ${
            selectedReactionId === reaction.id ? "is-primary" : "is-light"
          }`}
          onClick={() => handleReactionClick(reaction.id)}
        >
          <img
            src={reaction.image_url}
            alt={reaction.label}
            style={{ width: "20px", height: "20px", marginRight: "6px" }}
          />
          {reaction.label}
        </button>
      ))}
    </div>
  );
};
