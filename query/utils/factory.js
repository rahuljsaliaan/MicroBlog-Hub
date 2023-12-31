// Separate functions for each event type
exports.handlePostCreated = (data, posts) => {
  const { id, title } = data;
  posts[id] = { id, title, comments: [] };
};

exports.handleCommentCreated = (data, posts) => {
  const { id, content, postId, status } = data;
  posts[postId].comments.push({ id, content, status });
};

exports.handleCommentUpdated = (data, posts) => {
  const { id, content, postId, status } = data;
  const { comments } = posts[postId];
  const comment = comments.find((comment) => comment.id === id);

  if (comment) {
    comment.content = content;
    comment.status = status;
  }
};
