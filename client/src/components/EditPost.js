import { useState, useRef } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function EditPost({ post, onSubmitHideEditPost, onEditPost }) {
  const [caption, setCaption] = useState(post.caption);
  const [picture, setPicture] = useState(post.picture);
  const [error, setError] = useState(null);

  const ref = useRef();


  function handleEditPost(e) {
    e.preventDefault();

    fetch(`/posts/${post.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ caption: caption, picture: picture }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((updatedPost) => {
          onEditPost(updatedPost);
          onSubmitHideEditPost();
        });
      } else {
        res.json().then((err) => {
          setError(err.errors);
        });
      }
    });
  }

  return (
    <div className="edit-post-form">
      <span
        className="material-symbols-outlined"
        onClick={() => onSubmitHideEditPost()}
      >
        close
      </span>
      <div>
        <Form onSubmit={handleEditPost}>
          <Row>
            <Col xs={9}>
              <Form.Group controlId="formBasicCaption">
                <Form.Control
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  type="text"
                  name="caption"
                />
              </Form.Group>
            </Col>
            <Col>
              <Button variant="primary" type="submit">
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

export default EditPost;
