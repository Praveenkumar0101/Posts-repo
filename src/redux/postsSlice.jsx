import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push({
        ...action.payload,
        likes: 0,
        comments: [],
        shares: 0,
      });
    },
    updatePost: (state, action) => {
      const { id, title, content, image } = action.payload;
      const existingPost = state.posts.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
        existingPost.image = image;
      }
    },
    likePost: (state, action) => {
      const post = state.posts.find((post) => post.id === action.payload);
      if (post) {
        post.likes += 1;
      }
    },
    addComment: (state, action) => {
      const post = state.posts.find((post) => post.id === action.payload.id);
      if (post) {
        post.comments.push(action.payload.comment);
      }
    },
    sharePost: (state, action) => {
      const post = state.posts.find((post) => post.id === action.payload);
      if (post) {
        post.shares += 1;
      }
    },
  },
});

export const { addPost, updatePost, likePost, addComment, sharePost } = postsSlice.actions;

export default postsSlice.reducer;
