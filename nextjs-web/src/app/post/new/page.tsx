"use client";
import { useAuth } from "@/app/context/authContext";
import { Button } from "@/components/ui/button";
import { SubReddit } from "@/lib/data-types";
import { getFollwedSubreddits } from "@/lib/subreddit";
import React, { useEffect, useState, useRef } from "react";

type Props = {};

const NewPost = (props: Props) => {
  const [subreddits, setSubreddits] = useState<SubReddit[]>([]);
  const [selectedsubreddit, setSelectedSubreddit] = useState<SubReddit | null>(
    null
  );
  const { user, token } = useAuth();
  const [showCommunities, setShowCommunities] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchFollwedSubreddits = async () => {
      try {
        if (token) {
          const response = await getFollwedSubreddits(token);
          const subReddits = response?.data;
          setSubreddits(subReddits ?? []);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchFollwedSubreddits();
  }, [token]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowCommunities(false);
      }
    };

    if (showCommunities) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCommunities]);

  return (
    <div>
      <h1 className="bold text-2xl">Create post</h1>

      {/* Select Community */}
      <div className="mt-2">
        <Button onClick={() => setShowCommunities(true)}>
          <span className="rounded-full bg-white text-black w-6 h-6 mr-1.5">
            r/
          </span>
          {selectedsubreddit?.name ?? "Select Community"}
        </Button>
        {showCommunities && (
          <div ref={dropdownRef} className="z-20 scroll-auto">
            <ul>
              {subreddits.map((subreddit) => (
                <li
                  key={subreddit.id}
                  onClick={() => {
                    setSelectedSubreddit(subreddit);
                    setShowCommunities(false); // Close dropdown after selection
                  }}
                  className="cursor-pointer"
                >
                  {subreddit.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewPost;
