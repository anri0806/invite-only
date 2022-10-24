import PostForm from "./PostForm";
import PostContainer from "./PostContainer";

function FeedPage({ currentUser, posts, onSubmitAdd, onRenderFilteredPosts }) {
  return (
    <div className="feed-container">
      <PostForm onSubmitAdd={onSubmitAdd} />
      <PostContainer
        currentUser={currentUser}
        posts={posts}
        onRenderFilteredPosts={onRenderFilteredPosts}
      />
    </div>
  );
}

export default FeedPage;
