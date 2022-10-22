import { useState, useRef } from "react";
import { useContext } from "react";
import { UserContext } from "./App";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function PostForm({ onSubmitAdd }) {
  const [caption, setCaption] = useState("");
  const [picture, setPicture] = useState(null);
  const [errors, setErrors] = useState([]);

  const currentUser = useContext(UserContext);

  const ref = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("user_id", currentUser.id);
    formData.append("group_id", currentUser.group_id);
    formData.append("caption", caption);
    if (picture) formData.append("picture", picture);

    fetch("/posts", {
      method: "POST",
      body: formData,
    }).then((res) => {
      if (res.ok) {
        res.json().then((newPost) => {
          onSubmitAdd(newPost);
          // console.log(newPost)
        });
      } else {
        res.json().then((err) => setErrors(err.errors));
      }
    });

    setCaption("");
    ref.current.value = "";
    setPicture(null);
    setErrors([]);
  }

  return (
    <div className="feed-form-box">
      <Form onSubmit={handleSubmit} id="form">
        <Row>
          <Col xs={6}>
            <Form.Group className="mb-3" controlId="formBasicCaption">
              <Form.Control
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                type="text"
                name="caption"
                placeholder="What's in your mind?"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPicture">
              <Form.Control
                onChange={(e) => setPicture(e.target.files[0])}
                ref={ref}
                type="file"
                name="picture"
                placeholder="Add picture"
              />
            </Form.Group>
          </Col>
          <Col>
            <Button variant="primary" type="submit">
              Post
            </Button>
          </Col>
        </Row>
      </Form>
      {errors ? (
        <>
          {errors.map((err) => (
            <p key={err} className="error">
              {err}
            </p>
          ))}
        </>
      ) : null}
    </div>
  );
}

export default PostForm;
