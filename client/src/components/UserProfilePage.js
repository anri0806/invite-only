import { useEffect, useState } from "react";

import Profile from "./Profile";
import PostHistory from "./PostHistory";

function UserProfilePage({
  currentUser,
  onRenderFilteredPosts,
  onEditUpdate,
  onEditUpdateAvatar,
}) {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    fetch(`/user_posts/${currentUser.id}`)
      .then((res) => res.json())
      .then((posts) => setUserPosts(posts));
  }, []);
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
      />
    </>
  );
}

export default UserProfilePage;
