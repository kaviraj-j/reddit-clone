import React from "react";

import { Post } from "@/lib/data-types";
import { ArrowDown, ArrowUp, MessageSquare, Share2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const view = (post: Post) => {
  const postDetailsLink = post.subreddit?.name
    ? `/r/${post.subreddit.name}/comments/${post.id}`
    : `/u/${post.author.username}/comments/${post.id}`;
  return (
    <Link href={postDetailsLink}>
      <div key={post.id} className="bg-gray-900 rounded-lg shadow-md p-4 mb-4">
        <div className="flex">
          <div className="flex flex-col items-center mr-4">
            <Button className="text-gray-400 hover:text-orange-500">
              <ArrowUp size={20} />
            </Button>
            <span className="font-bold text-orange-500">{post.upvotes}</span>
            <Button className="text-gray-400 hover:text-orange-500">
              <ArrowDown size={20} />
            </Button>
          </div>
          <div className="flex-grow">
            <span>
              {post.subreddit?.name ? `r/${post.subreddit?.name}` : ""}
            </span>
            <h2 className="text-xl font-semibold text-gray-100">
              {post.title}
            </h2>
            <p className="text-sm text-gray-400">
              Posted by u/{post.author.username}
            </p>
            <p className="text-gray-300 mt-2">{post.content}</p>
            <div className="flex items-center mt-2">
              <Button className="flex items-center text-gray-400 hover:bg-gray-800 rounded px-2 py-1 mr-2">
                <MessageSquare size={16} className="mr-1" />
                Comments
              </Button>
              <Button className="flex items-center text-gray-400 hover:bg-gray-800 rounded px-2 py-1">
                <Share2 size={16} className="mr-1" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default view;
