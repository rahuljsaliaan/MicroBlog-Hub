/* eslint-disable react/prop-types */
import { useCallback, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import 'react-loading-skeleton/dist/skeleton.css';
import LoadingGrid from './LoadingGrid';
import Post from './Post';
import { usePostsContext } from '../context/PostsContext';

function PostList() {
  const { posts, dispatch, isLoading, createdCount } = usePostsContext();

  const fetchPosts = useCallback(async () => {
    try {
      dispatch({ type: 'REQUEST_START' });
      const response = await axios.get('http://localhost:4002/posts');

      dispatch({ type: 'REQUEST_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'REQUEST_ERROR' });
      toast.error(error?.data?.message || error.message);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchPosts();
  }, [createdCount, fetchPosts]);

  return (
    <div className="card-grid mt-4">
      {isLoading ? (
        <LoadingGrid count={3} />
      ) : (
        <>
          {Object.values(posts).map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </>
      )}
    </div>
  );
}

export default PostList;
