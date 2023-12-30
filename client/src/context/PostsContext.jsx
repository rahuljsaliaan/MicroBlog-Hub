/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from 'react';

const PostsContext = createContext();

const initialState = {
  createdCount: 0,
  posts: {},
  isLoading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATED':
      return { ...state, createdCount: state.createdCount + 1 };

    case 'REQUEST_START':
      return { ...state, isLoading: true };

    case 'REQUEST_SUCCESS':
      return { ...state, isLoading: false, posts: action.payload };

    case 'REQUEST_ERROR':
      return { ...state, isLoading: false };

    default:
      return state;
  }
};

function PostsContextProvider({ children }) {
  const [{ posts, isLoading, createdCount }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  return (
    <PostsContext.Provider value={{ posts, isLoading, createdCount, dispatch }}>
      {children}
    </PostsContext.Provider>
  );
}

function usePostsContext() {
  const context = useContext(PostsContext);

  if (!context)
    throw new Error('Posts Context is used outside the Posts Provider...!');

  return context;
}

export { PostsContextProvider, usePostsContext };
