import { useEffect, useState } from "react";

import Profile from "./Profile";
import PostHistory from "./PostHistory";

function UserProfilePage({
  currentUser,
  posts,
  onRenderFilteredPosts,
  onEditUpdate,
  onEditUpdateAvatar,
}) {
  const [userPosts, setUserPosts] = useState([]);


  useEffect(() => {
    fetch(`/user_posts/${currentUser.id}`)
      .then((res) => res.json())
      .then((posts) => setUserPosts(posts));
  }, [posts]);

  function handleEditPost(updatedItem) {
    const updatedPosts = userPosts.map((post) =>
      post.id === updatedItem.id ? updatedItem : post
    );

    setUserPosts(updatedPosts);
  }

  return (
    <>
      <Profile
        currentUser={currentUser}
        onEditUpdate={onEditUpdate}
        onEditUpdateAvatar={onEditUpdateAvatar}
      />
      <PostHistory
        currentUser={currentUser}
        userPosts={userPosts}
        onRenderFilteredPosts={onRenderFilteredPosts}
        onEditPost={handleEditPost}
      />
    </>
  );
}

export default UserProfilePage;
