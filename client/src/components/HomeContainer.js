import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "./App";

import FeedPage from "./FeedPage";
import UserProfilePage from "./UserProfilePage";
import MemberList from "./MemberList";
import InviteUserPage from "./InviteUserPage";

function HomeContainer({ onEditUpdate, onEditUpdateAvatar }) {
  const [posts, setPosts] = useState([]);

  const currentUser = useContext(UserContext);

  function renderNewPost(newPost) {
    setPosts([newPost, ...posts]);
  }

  function renderFilteredPosts(filteredPosts) {
    setPosts(filteredPosts);
  }

  function handleEditPost(updatedItem) {
    const updatedPosts = posts.map((post) =>
      post.id === updatedItem.id ? updatedItem : post
    );

    setPosts(updatedPosts);
  }

  return (
    <div className="home-container">
      <Routes>
        <Route
          path="/"
          element={
            <FeedPage
              currentUser={currentUser}
              posts={posts}
              onSubmitAdd={renderNewPost}
              onRenderFilteredPosts={renderFilteredPosts}
              onEditPost={handleEditPost}
            />
          }
        />
        <Route
          path="profile"
          element={
            <UserProfilePage
              currentUser={currentUser}
              onRenderFilteredPosts={renderFilteredPosts}
              onEditUpdate={onEditUpdate}
              onEditUpdateAvatar={onEditUpdateAvatar}
              posts={posts}
            />
          }
        />
        <Route
          path="members"
          element={<MemberList onRenderFilteredPosts={renderFilteredPosts} />}
        />
        {currentUser.admin ? (
          <Route path="invite" element={<InviteUserPage />} />
        ) : null}
      </Routes>
    </div>
  );
}

export default HomeContainer;
