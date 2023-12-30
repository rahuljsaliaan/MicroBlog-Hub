/* eslint-disable react/prop-types */
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import LoadingGrid from './LoadingGrid';

function CommentList({ postId, commentCreatedCount }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const fetchComments = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:4001/posts/${postId}/comments`,
      );

      setComments(response.data);
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments, commentCreatedCount]);

  const renderedComments = comments.map((comment) => {
    return (
      <li className="text-secondary fw-medium list-group-item" key={comment.id}>
        {comment.content}
      </li>
    );
  });

  return (
    comments.length > 0 && (
      <div className="container-fluid bg-info-subtle rounded-2 mb-2 py-2">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5>Comments</h5>
          <button
            className="btn btn-secondary"
            onClick={() => setShowComments(!showComments)}
            aria-expanded="false"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapseComments${postId}`}
            aria-controls={`collapseComments${postId}`}
          >
            {showComments ? 'Hide Comments' : 'Show Comments'}
          </button>
        </div>
        <div className="collapse" id={`collapseComments${postId}`}>
          {isLoading ? (
            <LoadingGrid count={1} />
          ) : (
            <ul className="list-group">{renderedComments}</ul>
          )}
        </div>
      </div>
    )
  );
}

export default CommentList;
