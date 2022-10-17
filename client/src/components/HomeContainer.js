import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import FeedPage from "./FeedPage";
import UserProfilePage from "./UserProfilePage";
import MemberList from "./MemberList";
import Member from "./Member";
import InviteUserPage from "./InviteUserPage";

function HomeContainer({ currentUser }) {
  const [posts, setPosts] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  function renderNewPost(newPost) {
    setPosts([newPost, ...posts]);
  }

  function renderFilteredPosts(filteredPosts) {
    setPosts(filteredPosts);
  }

  function handleClickMember(member) {
    setSelectedMember(member);
  }

  return (
    <>
      <p>home</p>
      <Routes>
        <Route
          path="/"
          element={
            <FeedPage
              currentUser={currentUser}
              posts={posts}
              onSubmitAdd={renderNewPost}
              onRenderFilteredPosts={renderFilteredPosts}
            />
          }
        />
        <Route
          path="profile"
          element={
            <UserProfilePage
              currentUser={currentUser}
              onRenderFilteredPosts={renderFilteredPosts}
            />
          }
        />
        <Route
          path="members"
          element={
            <MemberList
              currentUser={currentUser}
              onClickedMember={handleClickMember}
            />
          }
        />
        <Route
          path="/members/:userId"
          element={
            <Member
              member={selectedMember}
              onRenderFilteredPosts={renderFilteredPosts}
            />
          }
        />
        {currentUser.admin ? (
          <Route
            path="invite"
            element={<InviteUserPage currentUser={currentUser} />}
          />
        ) : null}
      </Routes>
    </>
  );
}

export default HomeContainer;
