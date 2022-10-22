import PostForm from "./PostForm";
import PostContainer from "./PostContainer";

function FeedPage({ currentUser, posts, onSubmitAdd, onRenderFilteredPosts }) {
  return (
    <>
      <PostForm onSubmitAdd={onSubmitAdd} />
      <PostContainer
        currentUser={currentUser}
        posts={posts}
        onRenderFilteredPosts={onRenderFilteredPosts}
      />
    </>
  );
}

export default FeedPage;
