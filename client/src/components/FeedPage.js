import PostForm from "./PostForm";
import PostContainer from "./PostContainer";

function FeedPage({ currentUser, posts, onSubmitAdd, onRenderFilteredPosts }) {
  return (
    <>
      <h2>This is Feed Page</h2>
      <PostForm currentUser={currentUser} onSubmitAdd={onSubmitAdd} />
      <PostContainer
        currentUser={currentUser}
        posts={posts}
        onRenderFilteredPosts={onRenderFilteredPosts}
      />
    </>
  );
}

export default FeedPage;
