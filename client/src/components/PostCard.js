
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
}) {
  const postCards = posts.map((post) => (
    <div
      key={post.id}
      style={{ border: "2px solid black", margin: "5px", padding: "3px" }}
    >
      <Post
        post={post}
        currentUser={currentUser}
        onClickDelete={onClickDelete}
      />
      {/* <ReadOnlyComment
        comments={comments}
        currentUser={currentUser}
        postId={post.id}
        onSubmitAddCom={onSubmitAddCom}
        onDeleteComment={onDeleteComment}
        onEditComment={onEditComment}
      /> */}
    </div>
  ));

  return <>{postCards}</>;
}

export default PostCard;