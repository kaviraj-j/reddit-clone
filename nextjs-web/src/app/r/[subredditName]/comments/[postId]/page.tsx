"use client";

import { useAuth } from "@/app/context/authContext";
import { Comment, Post } from "@/lib/data-types";
import { getPostDetails } from "@/lib/post";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Comments from "@/app/components/comments";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface PostDetails extends Post {
  comments: Comment[];
}

export default function PostDetails() {
  const params = useParams();
  const { token } = useAuth();
  const { postId } = params;
  const [post, setPost] = useState<PostDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostDetails = async () => {
      setLoading(true);
      const postResponse = await getPostDetails(token ?? "", postId.toString());
      setPost(postResponse?.response?.data?.data);
      setLoading(false);
    };
    fetchPostDetails();
  }, [postId, token]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto mt-8">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <Card className="bg-black text-gray-300">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{post?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-8">{post?.content}</p>
          <Comments
            initialComments={post?.comments ?? []}
            postId={postId.toString()}
          />
        </CardContent>
      </Card>
    </div>
  );
}
