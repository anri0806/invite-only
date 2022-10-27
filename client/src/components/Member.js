import UserProfilePage from "./UserProfilePage";

function Member({ member, onRenderFilteredPosts }) {

  return (
    <>
      <UserProfilePage
        currentUser={member}
        onRenderFilteredPosts={onRenderFilteredPosts}
      />
    </>
  );
}

export default Member;
