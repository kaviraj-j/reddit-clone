import { Route, Routes, BrowserRouter } from 'react-router-dom';
import PostList from './components/PostList';
import Post from './components/Post';
import User from './components/User';
import "./App.css"

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/post/:postId" element={<Post />} />
        <Route path="/user/:userId" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
