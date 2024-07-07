import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updatePost } from '../redux/postsSlice'; // updated import path
import './postdisplayscreen.css';

const PostsDisplayScreen = () => {
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [editedImage, setEditedImage] = useState(null);

  const handleEditClick = (post) => {
    setEditingPostId(post.id);
    setEditedTitle(post.title);
    setEditedContent(post.content);
    setEditedImage(null);
  };

  const handleImageChange = (e) => {
    setEditedImage(e.target.files[0]);
  };

  const handleUpdatePost = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(updatePost({ id: editingPostId, title: editedTitle, content: editedContent, image: reader.result }));
      setEditingPostId(null);
      setEditedTitle('');
      setEditedContent('');
      setEditedImage(null);
    };
    if (editedImage) {
      reader.readAsDataURL(editedImage);
    } else {
      dispatch(updatePost({ id: editingPostId, title: editedTitle, content: editedContent, image: null }));
      setEditingPostId(null);
      setEditedTitle('');
      setEditedContent('');
      setEditedImage(null);
    }
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
              <input type="file" accept="image/*" onChange={handleImageChange} />
              <button type="submit">Save</button>
            </form>
          ) : (
            <div className="post_lists_container">
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              {post.image && <img src={post.image} alt={post.title} className="post_image" />}
              <button onClick={() => handleEditClick(post)}>Edit</button>
            </div>
          )}
        </div>
      ))}
      <Link to="/">Create New Post</Link>
    </div>
  );
};

export default PostsDisplayScreen;
