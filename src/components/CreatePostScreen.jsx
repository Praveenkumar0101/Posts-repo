import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../redux/postsSlice'; // updated import path
import { useNavigate } from 'react-router-dom';
import './createpost.css';

const CreatePostScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(addPost({ id: Date.now(), title, content, image: reader.result }));
      navigate('/create');
    };
    if (image) {
      reader.readAsDataURL(image);
    } else {
      dispatch(addPost({ id: Date.now(), title, content, image: null }));
      navigate('/create');
    }
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
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreatePostScreen;
