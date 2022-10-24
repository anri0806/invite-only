function Profile({ currentUser }) {
  return (
    <div className="profile">
      <h3>
        <b>
          {currentUser.username}
        </b>
      </h3>
      {currentUser.admin ? <p>Admin</p> : null}
      <p>Member since: {currentUser.created_at.slice(0, 10)}</p>
    </div>
  );
}

export default Profile;
