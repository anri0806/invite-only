import PostForm from "./PostForm";
import PostContainer from "./PostContainer";

function FeedPage({
  currentUser,
  posts,
  onSubmitAdd,
  onRenderFilteredPosts,
  onEditPost,
}) {
  return (
    <div className="feed-container">
      <PostForm onSubmitAdd={onSubmitAdd} />
      <PostContainer
        currentUser={currentUser}
        posts={posts}
        onRenderFilteredPosts={onRenderFilteredPosts}
        onEditPost={onEditPost}
      />
    </div>
  );
}

export default FeedPage;
