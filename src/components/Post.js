import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPostAndUser = async () => {
      try {
        const [postResponse, userResponse, commentsResponse] = await Promise.all([
          axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`),
          axios.get(`https://jsonplaceholder.typicode.com/users/${postId}`),
          axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        ]);
        setPost(postResponse.data);
        setUser(userResponse.data);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPostAndUser();
  }, [postId]);

  const fetchUserByEmail = async (email) => {
    try {
      const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
      const user = usersResponse.data.find(user => user.email === email);
      return user;
    } catch (error) {
      console.error('Error fetching user by email:', error);
      return null;
    }
  };

  const handleUserButtonClick = async (email) => {
    const user = await fetchUserByEmail(email);
    if (user) {
      alert(`Commented by: ${user.name}`);
    } else {
      alert('User not found');
    }
  };

  return (
    <div className="post">
      {post && user && (
        <div className="post-details">
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <p>Posted by: <Link to={`/user/${user.id}`}>{user.name}</Link></p>
        </div>
      )}
      <h3>Comments</h3>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <p>{comment.body}</p>
            <button onClick={() => handleUserButtonClick(comment.email)}>Commented by: {comment.email}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Post;
