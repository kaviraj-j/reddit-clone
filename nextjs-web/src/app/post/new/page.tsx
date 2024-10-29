"use client";
import { useAuth } from "@/app/context/authContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SubReddit } from "@/lib/data-types";
import { createPost } from "@/lib/post";
import { getFollwedSubreddits } from "@/lib/subreddit";
import React, { useEffect, useState, useRef, FormEvent } from "react";

type Props = {};

const NewPost = (props: Props) => {
  const [subreddits, setSubreddits] = useState<SubReddit[]>([]);

  const [filteredSubreddits, setFilteredSubreddits] = useState<SubReddit[]>([]);
  const [selectedsubreddit, setSelectedSubreddit] = useState<SubReddit | null>(
    null
  );

  const { token } = useAuth();
  const [showCommunities, setShowCommunities] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const searchSubredditInputRef = useRef<HTMLInputElement | null>(null);
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const contentTextAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const fetchFollwedSubreddits = async () => {
      try {
        if (token) {
          const response = await getFollwedSubreddits(token);
          const subReddits = response?.data;
          setSubreddits(subReddits ?? []);
          setFilteredSubreddits(subReddits ?? []);
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
      searchSubredditInputRef.current?.focus();
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCommunities]);

  const handleSubredditSearch = () => {
    if (searchSubredditInputRef.current?.value) {
      const inputValue = searchSubredditInputRef.current.value.toLowerCase();
      const _filteredSubreddits = subreddits.filter((subreddit) =>
        subreddit.name.toLowerCase().startsWith(inputValue)
      );
      setFilteredSubreddits(_filteredSubreddits);
    } else {
      setFilteredSubreddits(subreddits);
    }
  };

  const handleNewPostSubmit = async (event: FormEvent<HTMLFormElement>) => {
    if (!token) {
      return;
    }
    event.preventDefault();
    const title = titleInputRef?.current?.value ?? "";
    if (!title) {
      titleInputRef?.current?.focus();
      return;
    }
    const content = contentTextAreaRef?.current?.value ?? "";
    if (!content) {
      contentTextAreaRef?.current?.focus();
      return;
    }
    const response = await createPost(token, {
      title,
      content,
      subredditId: selectedsubreddit?.id,
    });
  };

  return (
    <form onSubmit={handleNewPostSubmit}>
      <div>
        <h1 className="bold text-2xl">Create post</h1>
        {/* Select Community */}
        <div className="mt-2">
          {!showCommunities && (
            <Button onClick={() => setShowCommunities(true)}>
              <span className="rounded-full bg-white text-black w-6 h-6 mr-1.5">
                r/
              </span>
              {selectedsubreddit?.name ?? "Select Community"}
            </Button>
          )}
          {showCommunities && (
            <div ref={dropdownRef} className="">
              <Input
                onChange={handleSubredditSearch}
                ref={searchSubredditInputRef}
                className="w-52"
                placeholder="Search Subreddit"
              />
              <ul className="fixed z-10 bg-black bg-opacity-90">
                {filteredSubreddits.map((subreddit) => (
                  <li
                    key={subreddit.id}
                    onClick={() => {
                      setSelectedSubreddit(subreddit);
                      setShowCommunities(false);
                    }}
                    className="cursor-pointer hover:bg-white hover:text-black hover:bg-opacity-90 w-52 mt-1.5 py-0.5 px-2"
                  >
                    {subreddit.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-6">
          <div className="mb-2">
            {/* Title */}

            <Label className="cursor-pointer pt-4">
              Title *
              <Input placeholder="Write title" ref={titleInputRef} />
            </Label>
          </div>
          {/* Content */}
          <Label className="cursor-pointer pt-4">
            Content *
            <Textarea
              placeholder="Write Content"
              className="min-h-20"
              ref={contentTextAreaRef}
            />
          </Label>
        </div>
        <div className="mt-4 flex flex-row-reverse">
          <Button type="submit">Create Post</Button>
        </div>
      </div>
    </form>
  );
};

export default NewPost;
