/* eslint-disable react/prop-types */
import { useState } from 'react';

function CommentList({ postId, comments }) {
  const [showComments, setShowComments] = useState(false);

  const renderedComments = comments.map((comment) => {
    const statusConfig = {
      pending: {
        content: 'This comment is awaiting moderation',
        textColor: 'text-warning',
      },
      rejected: {
        content: 'This comment is rejected',
        textColor: 'text-danger',
      },
      approved: {
        content: comment.content,
        textColor: 'text-secondary',
      },
    };

    const commentStatus = statusConfig[comment.status];

    return (
      <li
        className={`${commentStatus.textColor} fw-medium list-group-item`}
        key={comment.id}
      >
        {commentStatus.content}
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
          <ul className="list-group">{renderedComments}</ul>
        </div>
      </div>
    )
  );
}

export default CommentList;
