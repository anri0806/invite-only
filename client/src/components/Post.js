function Post({ currentUser,post, onClickDelete }) {

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
    <div>
      <p>{post.posted_by}</p>
      <p>{post.created_at}</p>
      <p>{post.caption}</p>
      {post.picture === null ? null : (
        <img src={post.picture} width="300px" alt="" />
      )}
      {post.user_id === currentUser.id ? (
        <button onClick={handleClick}>🗑️</button>
      ) : null}
    </div>
  );
}

export default Post;
