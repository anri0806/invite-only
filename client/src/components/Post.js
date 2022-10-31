import { useState, useContext } from "react";
import { UserContext } from "./App";

import Card from "react-bootstrap/Card";
import EditPost from "./EditPost";

var moment = require("moment");

function Post({ post, onClickDelete, onEditPost }) {
  const [editPostId, setEditPostId] = useState(null);
  const current = new Date();
  const date = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;

  const loggedInUser = useContext(UserContext);

  function handleHideEditPost() {
    setEditPostId(null);
  }

  function handleClick() {
    fetch(`/posts/${post.id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        onClickDelete(post);
      }
    });
  }

  return (
    <Card className="post" border="white" style={{ position: "inherit" }}>
      {editPostId === post.id ? (
        <Card.Body>
          <div className="feed-flex">
            <img className="feed-avatar" src={post.user.avatar} alt="avatar" />
            <div id="post-title">
              <Card.Title>{post.posted_by}</Card.Title>
              {post.created_at.slice(0, 10) === date ? (
                <Card.Text style={{ fontSize: "12px" }}>
                  {/* {moment.parseZone(post.updated_at).startOf("day").fromNow()} */}
                  {moment(post.created_at).startOf("minutes").fromNow()}
                </Card.Text>
              ) : (
                <Card.Text style={{ fontSize: "12px" }}>
                  {post.created_at.slice(0, 10)}
                </Card.Text>
              )}
            </div>
          </div>
          <EditPost
            post={post}
            onSubmitHideEditPost={handleHideEditPost}
            onEditPost={onEditPost}
          />
          {post.picture === null ? null : (
            <img src={post.picture} className="feed-post-image" alt="" />
          )}
        </Card.Body>
      ) : (
        <>
          <Card.Body>
            {post.user_id === loggedInUser.id ? (
              <div className="feed-span">
                <span
                  onClick={handleClick}
                  className="material-symbols-outlined"
                >
                  delete
                </span>
                <span
                  onClick={() => setEditPostId(post.id)}
                  className="material-symbols-outlined"
                >
                  edit
                </span>
              </div>
            ) : null}
            <div className="feed-flex">
              <img
                className="feed-avatar"
                src={post.user.avatar}
                alt="avatar"
              />
              <div id="post-title">
                <Card.Title>{post.posted_by}</Card.Title>
                {post.created_at.slice(0, 10) === date ? (
                  <Card.Text style={{ fontSize: "12px" }}>
                    {moment(post.created_at).startOf("minutes").fromNow()}
                  </Card.Text>
                ) : (
                  <Card.Text style={{ fontSize: "12px" }}>
                    {post.created_at.slice(0, 10)}
                  </Card.Text>
                )}
              </div>
            </div>

            <Card.Text>{post.caption}</Card.Text>
            {post.picture === null ? null : (
              <img src={post.picture} className="feed-post-image" alt="" />
            )}
          </Card.Body>
        </>
      )}
    </Card>
  );
}

export default Post;
