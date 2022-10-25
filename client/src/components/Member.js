import UserProfilePage from "./UserProfilePage";
import { Link } from "react-router-dom";

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
