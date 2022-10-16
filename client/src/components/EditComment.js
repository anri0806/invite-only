import { useState } from "react";

function EditComment({ com, onEditComment, onSubmitHideEdit }) {
  const [comment, setComment] = useState(com.content);
  const [error, setError] = useState(null);

  function handleEditComment(e) {
    e.preventDefault();

    fetch(`/comments/${com.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: comment }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((updatedItem) => {
          onEditComment(updatedItem);
          onSubmitHideEdit();
        });
      } else {
        res.json().then((err) => setError(err.errors));
      }
    });
  }

  return (
    <>
      <form onSubmit={handleEditComment}>
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          type="text"
          name="content"
        />
        <button>Update</button>
      </form>
      {error ? <p>{error}</p> : null}
    </>
  );
}

export default EditComment;