import { Route, Routes, BrowserRouter, Link } from 'react-router-dom';
import PostList from './components/PostList';
import Post from './components/Post';
import User from './components/User';
import "./App.css"

function App() {
  
  return (
    <div className='app'>
      <div className="logo">
        <a href={'/'}><img src={"https://seeklogo.com/images/R/reddit-logo-23F13F6A6A-seeklogo.com.png"}></img><h1>Reddit Clone</h1></a>
        
      </div>
      <div className="logo">
        <h5>(trust me this is a reddit clone)</h5>
      </div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/post/:postId" element={<Post />} />
        <Route path="/user/:userId" element={<User />} />
      </Routes>
    </BrowserRouter>


    </div>
    
  );
}

export default App;
