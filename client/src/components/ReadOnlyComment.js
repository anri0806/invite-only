import { useState } from "react";

import EditComment from "./EditComment";

function ReadOnlyComment({
  currentUser,
  comments,
  postId,
  onSubmitAddCom,
  onDeleteComment,
  onEditComment,
}) {
  const [content, setContent] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [error, setError] = useState(null);

  const filteredComment = comments
    .filter((com) => com.post_id === postId)
    .map((com) => (
      <div
        key={com.id}
        style={{ fontSize: "13px", backgroundColor: "#DEDEDE" }}
      >
        {editCommentId === com.id ? (
          <EditComment
            com={com}
            onEditComment={onEditComment}
            onSubmitHideEdit={handleHideEdit}
          />
        ) : (
          <>
            <p>{com.posted_by}</p>
            <p>{com.content}</p>
            {com.user_id === currentUser.id ? (
              <>
                <button onClick={() => setEditCommentId(com.id)}>✏️</button>
                <button onClick={() => handleDeleteCom(com.id)}>🗑️</button>
              </>
            ) : null}
          </>
        )}
      </div>
    ));

  function handleDeleteCom(commentId) {
    fetch(`/comments/${commentId}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        onDeleteComment(commentId);
      }
    });
  }

  function handleAddComment(e) {
    e.preventDefault();

    fetch("/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: content,
        user_id: currentUser.id,
        post_id: postId,
        group_id: currentUser.group_id,
      }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((newComment) => onSubmitAddCom(newComment));
      } else {
        res.json().then((err) => setError(err.errors));
      }
    });

    setContent("");
  }

  function handleHideEdit() {
    setEditCommentId(null);
  }

  return (
    <>
      {filteredComment}
      <br />
      <form onSubmit={handleAddComment}>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          name="content"
          type="text"
          placeholder="Add comment..."
        />
        <button>Add</button>
      </form>
      {error ? <p>{error}</p> : null}
    </>
  );
}

export default ReadOnlyComment;
