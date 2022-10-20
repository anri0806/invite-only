function Profile({ currentUser }) {
  return (
    <>
      <h4>User Profile</h4>
      <p>
        Username: {currentUser.username} {currentUser.admin ? "(Admin)" : null}
      </p>
      <p>Email: {currentUser.email}</p>
      <p>Member since: {currentUser.created_at.slice(0, 10)}</p>
    </>
  );
}

export default Profile;
