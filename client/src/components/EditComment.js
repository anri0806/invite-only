import { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

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
        res.json().then((err) => {
          setError(err.errors);
        });
      }
    });
  }

  return (
    <div className="edit-comment">
      <span
        className="material-symbols-outlined"
        onClick={() => onSubmitHideEdit()}
      >
        close
      </span>
      <div className="edit-comment-form">
        <Form onSubmit={handleEditComment}>
          <Row>
            <Col xs={10}>
              <Form.Group controlId="formBasicCaption">
                <Form.Control
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  type="text"
                  name="content"
                />
              </Form.Group>
            </Col>
            <Col>
              <Button variant="outline-secondary" type="submit">
                Update
              </Button>
            </Col>
          </Row>
        </Form>

        {error ? <p className="error">{error}</p> : null}
      </div>
    </div>
  );
}

export default EditComment;
