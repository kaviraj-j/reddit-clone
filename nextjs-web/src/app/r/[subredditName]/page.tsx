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
import { getPosts } from "@/lib/post";
import { Post } from "@/lib/data-types";
import ViewPost from "@/app/components/post/view";
interface SubReddit {
  id: string;
  name: string;
  description: string;
  bannerImageUrl: string | null;
  iconImageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
  membersCount: number;
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
  const [posts, setPosts] = useState<Post[]>([]);
  const [subreddit, setSubreddit] = useState<SubReddit | null>(null);
  useEffect(() => {
    if (!subredditName) {
      redirect("/", RedirectType.replace);
    }
    const fetchSubredditAndPosts = async () => {
      try {
        const [subredditResponse, postResponse] = await Promise.all([
          getSubredditDetails(subredditName, token ?? ""),
          getPosts(token ?? "", { subredditName }),
        ]);

        setSubreddit(subredditResponse?.data ?? null);
        console.log({ postResponse });
        setPosts(postResponse?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSubredditAndPosts();
  }, []);

  return (
    <div className="bg-black text-gray-200 min-h-screen">
      <div className="container mx-auto mt-4 flex">
        <main className="w-2/3 pr-4">
          {posts.map((post: Post) => (
            <ViewPost key={post.id} {...post} />
          ))}
        </main>
        <aside className="w-1/3">
          {subreddit && (
            <div className="bg-gray-900 rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-2 text-orange-500">
                About r/{subredditName}
              </h2>
              <p className="text-sm text-gray-300 mb-4">
                {subreddit.description}
              </p>
              <div className="mb-4">
                <div className="flex text-sm mb-2">
                  <span>Members {subreddit.membersCount}</span>
                </div>
              </div>
              <button className="bg-orange-500 text-white rounded px-4 py-2 w-full hover:bg-orange-600">
                Create Post
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default SubredditPage;
