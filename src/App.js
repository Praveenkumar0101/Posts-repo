import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostsDisplay from './components/PostsDisplayScreen';
import CreatePost from './components/CreatePostScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/create" element={<PostsDisplay />} />
        <Route path="/" element={<CreatePost />} />
      </Routes>
    </Router>
  );
}

export default App;
