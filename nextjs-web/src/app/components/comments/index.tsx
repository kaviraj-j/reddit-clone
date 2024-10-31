import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Comment } from "@/lib/data-types";
import React from "react";

const Comments = ({ comments }: { comments: Comment[] }) => {
  return (
    <>
      <div>
        <div className="flex space-x-2 mt-5">
          <Textarea className="max-w-96" placeholder="Add Comment" />
          <Button>Add Comment</Button>
        </div>
      </div>
    </>
  );
};

export default Comments;
