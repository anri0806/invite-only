import Post from "./Post";
import ReadOnlyComment from "./ReadOnlyComment";

function PostCard({
  currentUser,
  posts,
  comments,
  onSubmitAddCom,
  onClickDelete,
  onDeleteComment,
  onEditComment,
  onEditPost,
}) {
  const postCards = posts.map((post) => (
    <div className="post-card" key={post.id}>
      <Post
        post={post}
        currentUser={currentUser}
        onClickDelete={onClickDelete}
        onEditPost={onEditPost}
      />
      <ReadOnlyComment
        currentUser={currentUser}
        comments={comments}
        post={post}
        postId={post.id}
        onSubmitAddCom={onSubmitAddCom}
        onDeleteComment={onDeleteComment}
        onEditComment={onEditComment}
      />
    </div>
  ));

  return <>{postCards}</>;
}

export default PostCard;
