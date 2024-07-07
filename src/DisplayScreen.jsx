import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updatePost } from './components/postsReducer';
import './postdisplayscreen.css';

const PostsDisplay = () => {
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');

  const handleEditClick = (post) => {
    setEditingPostId(post.id);
    setEditedTitle(post.title);
    setEditedContent(post.content);
  };

  const handleUpdatePost = (e) => {
    e.preventDefault();
    dispatch(updatePost({ id: editingPostId, title: editedTitle, content: editedContent }));
    setEditingPostId(null);
    setEditedTitle('');
    setEditedContent('');
  };

  return (
    <div className="overal_container">
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>
          {editingPostId === post.id ? (
            <form onSubmit={handleUpdatePost} className="post_display_form_container">
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
              <button type="submit">Save</button>
            </form>
          ) : (
            <div className="post_lists_container">
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <button onClick={() => handleEditClick(post)}>Edit</button>
            </div>
          )}
        </div>
      ))}
      <Link to="/">Create New Post</Link>
    </div>
  );
};

export default PostsDisplay;
