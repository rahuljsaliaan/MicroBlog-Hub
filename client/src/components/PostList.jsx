/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import 'react-loading-skeleton/dist/skeleton.css';
import LoadingGrid from './LoadingGrid';
import Post from './Post';

function PostList({ postCreatedCount }) {
  const [posts, setPosts] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:4000/posts');

      setPosts(response.data);
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [postCreatedCount]);

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
