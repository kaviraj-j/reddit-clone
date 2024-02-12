import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <div className="logo">
        <h1>Reddit Clone</h1>
      </div>
      <div className="logo">
        <h5>(trust me this is a reddit clone)</h5>
      </div>
      <div className="post-list">
        {posts.map((post) => (
          <Link key={post.id} to={`/post/${post.id}`}>
            <div className="post-box">
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PostList;
