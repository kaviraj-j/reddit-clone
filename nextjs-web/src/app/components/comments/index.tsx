import { useAuth } from "@/app/context/authContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Comment } from "@/lib/data-types";
import { addComment } from "@/lib/post";
import React, { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import moment from "moment";

export default function Comments({
  initialComments,
  postId,
}: {
  initialComments: Comment[];
  postId: string;
}) {
  const { token, user } = useAuth();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [commentContent, setCommentContent] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCommentSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    setIsSubmitting(true);
    const response = await addComment(token ?? "", commentContent, postId);

    if (response.response?.data?.type === "success") {
      const newComment = response.response.data.data;
      console.log({ newComment });
      setComments((prevComments) => [...prevComments, { ...newComment, user }]);
      setCommentContent("");
    } else {
      console.log("Error in adding comment");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="mt-8">
      <CardTitle className="text-2xl font-semibold mb-4 bg-black text-gray-300">
        Comments
      </CardTitle>
      {user && (
        <div className="space-y-4">
          <Textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.currentTarget.value)}
            className="w-full"
            placeholder="Add a comment..."
            rows={3}
          />
          <Button
            onClick={handleCommentSubmit}
            disabled={!commentContent || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Add Comment"}
          </Button>
        </div>
      )}
      <Separator className="my-6" />

      {comments.length > 0 ? (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <Card key={comment.id}>
              <CardContent className="pt-4 bg-black text-gray-300">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">{comment.user.username}</p>
                    <p className="text-sm text-muted-foreground">
                      {moment(comment.createdAt).fromNow()}
                    </p>
                    <p className="mt-2">{comment.content}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground italic">No comments yet.</p>
      )}
    </div>
  );
}
