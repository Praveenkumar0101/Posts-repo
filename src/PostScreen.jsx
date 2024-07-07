import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from './redux/postsSlice';
import { useNavigate } from 'react-router-dom';
import './createpost.css';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPost({ id: Date.now(), title, content }));
    navigate('/create');
  };

  return (
    <div className="parent_container">
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit} className="form_child">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreatePost;
