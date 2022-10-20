import { useState, useRef } from "react";
import { useContext } from "react";
import { UserContext } from "./App";


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
    formData.append("group_id", currentUser.group_id)
    formData.append("caption", caption);
    if (picture) formData.append("picture", picture);

    fetch("/posts", {
      method: "POST",
      body: formData,
    }).then((res) => {
      if (res.ok) {
        res.json().then((newPost) => {
          onSubmitAdd(newPost)
          // console.log(newPost)
        });
      } else {
        res.json().then((err) => setErrors(err.errors));
      }
    });

    setCaption("");
    ref.current.value = "";
    setPicture(null);
    setErrors([])
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          type="text"
          name="caption"
          placeholder="Type caption"
        />
        <br />
        <input
          onChange={(e) => setPicture(e.target.files[0])}
          ref={ref}
          type="file"
          name="picture"
          placeholder="Add picture"
        />
        <br />
        <button>Post</button>
      </form>
      {errors ? (
        <>
          {errors.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </>
      ) : null}
    </>
  );
}

export default PostForm;