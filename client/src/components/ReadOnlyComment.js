import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import EditComment from "./EditComment";

var moment = require("moment");

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

  const current = new Date();
  const date = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;

  const filteredComment = comments
    .filter((com) => com.post_id === postId)
    .map((com) => (
      <div key={com.id} className="comment-card">
        {editCommentId === com.id ? (
          <EditComment
            com={com}
            onEditComment={onEditComment}
            onSubmitHideEdit={handleHideEdit}
          />
        ) : (
          <div className="comment">
            <div id="comment-title">
              <p>
                <b>{com.posted_by}</b>
              </p>
            </div>
            {com.user_id === currentUser.id ? (
              <>
                <span
                  onClick={() => handleDeleteCom(com.id)}
                  className="material-symbols-outlined"
                >
                  delete
                </span>
                <span
                  onClick={() => setEditCommentId(com.id)}
                  className="material-symbols-outlined"
                >
                  edit
                </span>
              </>
            ) : null}

            {com.created_at.slice(0, 10) === date ? (
              <p style={{ fontSize: "12px" }}>
                {moment.parseZone(com.created_at).startOf("day").fromNow()}
              </p>
            ) : (
              <p style={{ fontSize: "12px" }}>{com.created_at.slice(0, 10)}</p>
            )}

            <p style={{ marginTop: "4px" }}>{com.content}</p>
          </div>
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
      <Form onSubmit={handleAddComment}>
        <Row>
          <Col xs={11}>
            <Form.Group className="mb-3" controlId="formBasicCaption">
              <Form.Control
                value={content}
                onChange={(e) => setContent(e.target.value)}
                name="content"
                type="text"
                placeholder="Add comment..."
                size="sm"
              />
            </Form.Group>
          </Col>
          <Col>
            <Button variant="outline-secondary" size="sm" type="submit">
              Add
            </Button>
          </Col>
        </Row>
      </Form>
      {error ? <p className="error">{error}</p> : null}
    </>
  );
}

export default ReadOnlyComment;
