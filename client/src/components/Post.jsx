/* eslint-disable react/prop-types */
import CommentList from './CommentList';
import CommentCreate from './CommentCreate';

function Post({ post }) {
  return (
    <div key={post.id} className="card border border-info neon-shadow">
      <div className="card-body neon-background">
        <h3 className="align-center text-light">{post.title}</h3>
        <CommentList postId={post.id} comments={post.comments} />
        <CommentCreate postId={post.id} />
      </div>
    </div>
  );
}

export default Post;
