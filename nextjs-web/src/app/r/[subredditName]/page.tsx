"use client";
import React, { useEffect, useState } from "react";
import { ArrowUp, ArrowDown, MessageSquare, Share2 } from "lucide-react";
import {
  redirect,
  RedirectType,
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useAuth } from "@/app/context/authContext";
import { getSubredditDetails } from "@/lib/subreddit";

interface Post {
  id: number;
  title: string;
  author: string;
  upvotes: number;
  comments: number;
  content: string;
}

interface SubReddit {
  id: string;
  name: string;
  description: string;
  bannerImageUrl: string | null;
  iconImageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
}

const SubredditPage: React.FC = () => {
  const params = useParams();
  let subredditName: string;

  if (Array.isArray(params.subredditName)) {
    subredditName = params.subredditName[0];
  } else {
    subredditName = params.subredditName || "";
  }
  const { token } = useAuth();
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: "Welcome to r/SpaceTalk!",
      author: "CosmicMod",
      upvotes: 42,
      comments: 7,
      content: "This is a place to discuss all things space-related!",
    },
    {
      id: 2,
      title: "Just saw a meteor shower. It was breathtaking!",
      author: "StarGazer",
      upvotes: 128,
      comments: 23,
      content: "Has anyone else seen it? Share your experiences!",
    },
    {
      id: 3,
      title: "New images from James Webb Telescope",
      author: "AstroEnthusiast",
      upvotes: 315,
      comments: 56,
      content: "Check out these amazing new images of distant galaxies!",
    },
  ]);
  const [subreddit, setSubreddit] = useState<SubReddit | null>(null);
  console.log({ subredditName });
  useEffect(() => {
    if (!subredditName) {
      redirect("/", RedirectType.replace);
    }
    const fetchSubredditDetails = async () => {
      try {
        const response = await getSubredditDetails(subredditName, token ?? "");
        if (!response?.data) return;
        setSubreddit(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSubredditDetails();
  }, []);

  return (
    <div className="bg-black text-gray-200 min-h-screen">
      <header className="bg-gray-900 p-2"></header>
      <div className="container mx-auto mt-4 flex">
        <main className="w-2/3 pr-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-900 rounded-lg shadow-md p-4 mb-4"
            >
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <button className="text-gray-400 hover:text-orange-500">
                    <ArrowUp size={20} />
                  </button>
                  <span className="font-bold text-orange-500">
                    {post.upvotes}
                  </span>
                  <button className="text-gray-400 hover:text-orange-500">
                    <ArrowDown size={20} />
                  </button>
                </div>
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold text-gray-100">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-400">
                    Posted by u/{post.author}
                  </p>
                  <p className="text-gray-300 mt-2">{post.content}</p>
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
          ))}
        </main>
        <aside className="w-1/3">
          {subreddit && <div className="bg-gray-900 rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2 text-orange-500">
              About r/{subredditName}
            </h2>
            <p className="text-sm text-gray-300 mb-4">
              {subreddit.description}
            </p>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Members</span>
                <span>{}</span>
              </div>
              
            </div>
            <button className="bg-orange-500 text-white rounded px-4 py-2 w-full hover:bg-orange-600">
              Create Post
            </button>
          </div>}
        </aside>
      </div>
    </div>
  );
};

export default SubredditPage;
