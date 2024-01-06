/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { usePostsContext } from '../context/PostsContext';

function PostCreate() {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = usePostsContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.post('http://posts.com/posts-create', {
        title,
      });
      console.log(response);

      if (response.status === 201)
        toast.success('Post created successfully...!');
      setTitle('');
      dispatch({ type: 'CREATED' });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid bg-info bg-gradient py-4 px-5 rounded-3 neon-shadow">
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column justify-content-center align-items-start gap-3"
      >
        <h1 className="text-light-emphasis">Create Post</h1>
        <div className="input-group">
          <span className="input-group-text text-info fs-4 fw-bold">Title</span>
          <input
            type="text"
            id="post-input"
            name="post-input"
            className="form-control text-secondary fs-5"
            placeholder="Enter Post"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <button className="btn btn-primary float-start fw-bold fs-5">
          {isLoading ? 'Creating' : 'Create'}
        </button>
      </form>
    </div>
  );
}

export default PostCreate;
