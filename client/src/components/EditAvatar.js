import { useState, useRef } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

function EditAvatar({ userId, onClickClose, onEditUpdateAvatar }) {
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState(null);

  const ref = useRef();


  function handleEditAvatar(e) {
    const formData = new FormData();
    if (avatar) formData.append("avatar", avatar);

    e.preventDefault();
    fetch(`/users/${userId}`, {
      method: "PATCH",
      body: formData,
    }).then((res) => {
      if (res.ok) {
        res.json().then((updatedData) => {
          onEditUpdateAvatar(updatedData);
          onClickClose();
        });
      } else {
        res.json().then((err) => {
          console.log(err);
          setError(err.error);
        });
      }
    });
  }

  
  return (
    <div className="popup-box">
      <div className="box">
        <span
          className="material-symbols-outlined close_button"
          onClick={onClickClose}
        >
          close
        </span>
        <br />
        <br />
        <Form onSubmit={handleEditAvatar}>
          <Form.Group className="mb-3" controlId="formBasicPicture">
            <Form.Control
              onChange={(e) => setAvatar(e.target.files[0])}
              ref={ref}
              type="file"
              name="avatar"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
        {error ? <p className="error">{error}</p> : null}
      </div>
    </div>
  );
}

export default EditAvatar;
