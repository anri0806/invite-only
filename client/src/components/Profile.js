import { useState, useEffect } from "react";
import avatar from "../Images/avatar.jpg";
import EditProfile from "./EditProfile";
import EditAvatar from "./EditAvatar";

import { useContext } from "react";
import { UserContext } from "./App";

function Profile({ currentUser, onEditUpdate, onEditUpdateAvatar }) {
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [userId, setUserId] = useState(null);
  const [showAvatarForm, setShowAvatarForm] = useState(false);

  const loggedInUser = useContext(UserContext);

  function handleCloseProfilePopup() {
    setShowProfileForm(false);
  }

  function handleCloseAvatarPopup() {
    setShowAvatarForm(false);
  }

  function handleShowProfileForm() {
    setShowProfileForm((showProfileForm) => !showProfileForm);
  }

  function handleShowAvatarForm(id) {
    setShowAvatarForm((showAvatarForm) => !showAvatarForm);
    setUserId(id);
  }

  return (
    <>
      {showAvatarForm ? (
        <EditAvatar
          onClickClose={handleCloseAvatarPopup}
          userId={userId}
          onEditUpdateAvatar={onEditUpdateAvatar}
        />
      ) : null}
      {showProfileForm ? (
        <EditProfile
          currentUser={currentUser}
          onClickClose={handleCloseProfilePopup}
          onEditUpdate={onEditUpdate}
        />
      ) : null}
      <div className="profile">
        <div className="flex">
          <img
            className="profile-avatar"
            src={currentUser.avatar}
            alt="avatar"
          />
          <div id="profile-info">
            <div id="profile-title">
              <h3>
                <b>{currentUser.username}</b>
              </h3>
            </div>{" "}
            {loggedInUser.id === currentUser.id ? (
              <span
                onClick={handleShowProfileForm}
                className="material-symbols-outlined"
                style={{ fontSize: "20px", cursor: "pointer" }}
              >
                edit
              </span>
            ) : null}
            <p>{currentUser.email}</p>
            {currentUser.admin ? <p>Admin</p> : null}
            <p>Member since: {currentUser.created_at.slice(0, 10)}</p>
          </div>
        </div>

        {loggedInUser.id === currentUser.id ? (
          <p
            id="edit-avatar"
            onClick={() => handleShowAvatarForm(currentUser.id)}
          >
            change avatar
          </p>
        ) : null}
      </div>
    </>
  );
}

export default Profile;
