import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Post({ currentUser, post, onClickDelete }) {
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
    <Card className="post" border="white">
      <Card.Body>
        <div id="post-title">
          <Card.Title>{post.posted_by}</Card.Title>
        </div>
        {post.user_id === currentUser.id ? (
          <span onClick={handleClick} class="material-symbols-outlined">
            delete
          </span>
        ) : null}
        <Card.Text style={{ fontSize: "12px" }}>
          {post.created_at.slice(0, 10)}
        </Card.Text>
        <Card.Text>{post.caption}</Card.Text>
        {post.picture === null ? null : (
          <img src={post.picture} width="100%" alt="" />
        )}
      </Card.Body>
    </Card>
  );
}

export default Post;
