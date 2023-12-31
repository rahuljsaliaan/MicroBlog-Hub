import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { usePostsContext } from '../context/PostsContext';

/* eslint-disable react/prop-types */
function CommentCreate({ postId }) {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = usePostsContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await axios.post(
        `http://posts.com/posts/${postId}/comments`,
        {
          content,
        },
      );

      if (response.status === 201)
        toast.success('Comment created successfully...!');

      setContent('');
      dispatch({ type: 'CREATED' });
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        <div className="input-group">
          <span className="input-group-text text-dark fs-6 fw-bold bg-info-subtle">
            New Comment
          </span>
          <input
            type="text"
            id="comment-input"
            name="comment-input"
            className="form-control"
            value={content}
            disabled={isLoading}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">
          {isLoading ? 'Commenting...!' : 'Comment'}
        </button>
      </form>
    </div>
  );
}

export default CommentCreate;
