import React from "react";

import { Post } from "@/lib/data-types";
import { ArrowDown, ArrowUp, MessageSquare, Share2 } from "lucide-react";

const view = (post: Post) => {
    console.log({post})
  return (
    <div key={post.id} className="bg-gray-900 rounded-lg shadow-md p-4 mb-4">
      <div className="flex">
        <div className="flex flex-col items-center mr-4">
          <button className="text-gray-400 hover:text-orange-500">
            <ArrowUp size={20} />
          </button>
          <span className="font-bold text-orange-500">{post.upvotes}</span>
          <button className="text-gray-400 hover:text-orange-500">
            <ArrowDown size={20} />
          </button>
        </div>
        <div className="flex-grow">
          <h2 className="text-xl font-semibold text-gray-100">{post.title}</h2>
          <p className="text-sm text-gray-400">Posted by u/{post.author}</p>
          <p className="text-gray-300 mt-2">{post.content}646</p>
          <div className="flex items-center mt-2">
            <button className="flex items-center text-gray-400 hover:bg-gray-800 rounded px-2 py-1 mr-2">
              <MessageSquare size={16} className="mr-1" />
              {post.comments} Comments
            </button>
            <button className="flex items-center text-gray-400 hover:bg-gray-800 rounded px-2 py-1">
              <Share2 size={16} className="mr-1" />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default view;
