"use client";
import { useAuth } from "@/app/context/authContext";
import { Comment, Post } from "@/lib/data-types";
import { getPostComments, getPostDetails } from "@/lib/post";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Comments from "@/app/components/comments";

const PostDetails = () => {
  const params = useParams();
  const { token } = useAuth();
  const { postId } = params;
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  useEffect(() => {
    const fetchPostDetails = async () => {
      const [postResponse, commentsResponse] = await Promise.all([
        getPostDetails(token ?? "", postId.toString()),
        getPostComments(token ?? "", postId.toString()),
      ]);

      setPost(postResponse?.response?.data?.data);
    };
    fetchPostDetails();
  }, []);
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-semibold text-2xl">{post?.title}</h1>
      <p className="text-xl mt-5">{post?.content}</p>
      <Comments comments={comments} />
    </div>
  );
};

export default PostDetails;
