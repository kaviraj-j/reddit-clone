"use client";

import { Post } from "@/lib/data-types";
import { useEffect, useState } from "react";
import ViewPost from "@/app/components/post/view";
import { getPosts } from "@/lib/post";
import { useAuth } from "./context/authContext";
export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { token } = useAuth();
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts(token ?? "", {});
      setPosts(response?.data);
    };
    fetchPosts();
  }, []);

  return (
    <>
      <h1 className=""></h1>
      <div className="container mx-auto mt-4 flex">
        <main className="w-2/3 pr-4">
          {posts.map((post: Post) => (
            <ViewPost key={post.id} {...post} />
          ))}
        </main>
      </div>
    </>
  );
}
