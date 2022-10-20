import PostContainer from "./PostContainer";

function PostHistory({ currentUser, userPosts, onRenderFilteredPosts }) {
  return (
    <>
      <h2>User Post history</h2>
      <PostContainer
        currentUser={currentUser}
        posts={userPosts}
        onRenderFilteredPosts={onRenderFilteredPosts}
      />
    </>
  );
}

export default PostHistory;
