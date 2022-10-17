import InviteForm from "./InviteForm";

function InviteUserPage({ currentUser }) {
  return (
    <>
      <InviteForm currentUser={currentUser} />
    </>
  );
}

export default InviteUserPage;
