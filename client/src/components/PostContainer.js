import { useState, useEffect } from "react";
import PostCard from "./PostCard";

function PostContainer({ currentUser, posts, onRenderFilteredPosts }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`/group_posts/${currentUser.group_id}`)
      .then((res) => res.json())
      .then((psts) => onRenderFilteredPosts(psts));
  }, [posts.id]);

  useEffect(() => {
    fetch(`/group_comments/${currentUser.group_id}`)
      .then((res) => res.json())
      .then((comments) => setComments(comments));
  }, [comments.id]);

  function handleDeletePost(deletedItem) {
    const updatedPosts = posts.filter((post) => post.id !== deletedItem.id);
    onRenderFilteredPosts(updatedPosts);
  }

  function handleAddComment(newComment) {
    setComments([...comments, newComment]);
  }

  function handleDeleteComment(deletedItemID) {
    const updatedComments = comments.filter((com) => com.id !== deletedItemID);
    setComments(updatedComments);
  }

  function handleEditComment(updatedItem) {
    const updatedComments = comments.map((com) =>
      com.id === updatedItem.id ? updatedItem : com
    );

    setComments(updatedComments);
  }

  const sortedPosts = [...posts].sort((a, b) =>
    a.created_at > b.created_at ? -1 : 1
  );

  return (
    <>
      <PostCard
        currentUser={currentUser}
        posts={sortedPosts}
        comments={comments}
        onClickDelete={handleDeletePost}
        onSubmitAddCom={handleAddComment}
        onDeleteComment={handleDeleteComment}
        onEditComment={handleEditComment}
      />
    </>
  );
}

export default PostContainer;