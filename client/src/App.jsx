import PostCreate from './components/PostCreate';
import './app.css';
import { Toaster } from 'react-hot-toast';
import PostList from './components/PostList';
import { useState } from 'react';

const common = 'bg-gradient text-light fw-500 fs-5';

const options = {
  success: {
    className: `bg-success ${common}`,
  },
  error: {
    className: `bg-danger ${common}`,
  },
};

function App() {
  const [title, setTitle] = useState('');

  return (
    <div className="d-flex flex-column gap-4 justify-content-center p-5">
      <PostCreate title={title} setTitle={setTitle} />
      <PostList title={title} />
      <Toaster
        position="top-center"
        gutter={8}
        toastOptions={{
          ...options,
        }}
      />
    </div>
  );
}

export default App;
