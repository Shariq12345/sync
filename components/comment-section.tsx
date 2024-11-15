"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  MessageSquare,
  ThumbsUp,
  Reply,
  Trash,
  Heart,
  Share2,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

interface User {
  name: string;
  username: string;
  role: string;
  avatar: string;
}

interface BaseComment {
  id: number;
  user: User;
  content: string;
  timestamp: string;
  likes: number;
  hearts: number;
}

interface Reply extends BaseComment {}

interface Comment extends BaseComment {
  replies?: Reply[];
}

interface CommentProps {
  comment: Comment | Reply;
  isReply?: boolean;
}

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      user: {
        name: "John Doe",
        username: "@johndoe",
        role: "Senior Developer",
        avatar: "/api/placeholder/32/32",
      },
      content:
        "Great article! The explanation of async/await patterns is particularly insightful. I've been using a similar approach in my projects and it's been a game-changer for handling complex API interactions.",
      timestamp: "2 hours ago",
      likes: 5,
      hearts: 3,
      replies: [
        {
          id: 2,
          user: {
            name: "Jane Smith",
            username: "@janesmith",
            role: "Tech Lead",
            avatar: "/api/placeholder/32/32",
          },
          content:
            "Totally agree! The examples were particularly helpful. Would love to see a follow-up post about error handling patterns in async operations.",
          timestamp: "1 hour ago",
          likes: 2,
          hearts: 1,
        },
      ],
    },
  ]);

  const [newComment, setNewComment] = useState<string>("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  const handleAddComment = (): void => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      user: {
        name: "Current User",
        username: "@currentuser",
        role: "Full Stack Developer",
        avatar: "/api/placeholder/32/32",
      },
      content: newComment,
      timestamp: "Just now",
      likes: 0,
      hearts: 0,
      replies: [],
    };

    setComments((prev) => [comment, ...prev]);
    setNewComment("");
  };

  const handleAddReply = (parentId: number): void => {
    if (!newComment.trim()) return;

    const reply: Reply = {
      id: Date.now(),
      user: {
        name: "Current User",
        username: "@currentuser",
        role: "Full Stack Developer",
        avatar: "/api/placeholder/32/32",
      },
      content: newComment,
      timestamp: "Just now",
      likes: 0,
      hearts: 0,
    };

    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), reply],
          };
        }
        return comment;
      })
    );

    setNewComment("");
    setReplyingTo(null);
  };

  const Comment: React.FC<CommentProps> = ({ comment, isReply = false }) => (
    <div className={`flex gap-2 md:gap-4 ${!isReply ? "mb-8" : "mt-6"} w-full`}>
      <div className="flex flex-col items-center">
        <Avatar className="w-8 h-8 md:w-10 md:h-10 border-2 border-primary/10">
          <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
          <AvatarFallback className="bg-primary/5 text-xs md:text-sm">
            {comment.user.name[0]}
          </AvatarFallback>
        </Avatar>
        {!isReply &&
          "replies" in comment &&
          comment.replies &&
          comment.replies.length > 0 && (
            <div className="w-0.5 flex-1 bg-border mt-4 hidden md:block" />
          )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="bg-card border rounded-lg p-3 md:p-4 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-2 gap-2">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold hover:text-primary cursor-pointer truncate">
                  {comment.user.name}
                </span>
                <span className="text-xs md:text-sm text-muted-foreground truncate">
                  {comment.user.username}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                {comment.user.role}
              </div>
            </div>
            <div className="flex items-center justify-between md:justify-start gap-2">
              <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">
                {comment.timestamp}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem className="cursor-pointer">
                    <Share2 className="mr-2 h-4 w-4" /> Share
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive cursor-pointer">
                    <Trash className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <p className="text-sm leading-relaxed mb-3 break-words">
            {comment.content}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
              <ThumbsUp className="w-4 h-4" />
              <span className="text-xs font-medium">{comment.likes}</span>
            </button>
            <button className="text-sm text-muted-foreground hover:text-red-500 flex items-center gap-1 transition-colors">
              <Heart className="w-4 h-4" />
              <span className="text-xs font-medium">{comment.hearts}</span>
            </button>
            {!isReply && (
              <button
                onClick={() => setReplyingTo(comment.id)}
                className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
              >
                <Reply className="w-4 h-4" />
                <span className="text-xs font-medium">Reply</span>
              </button>
            )}
          </div>
        </div>

        {replyingTo === comment.id && (
          <div className="mt-4 px-2 md:px-4">
            <div className="bg-muted/50 rounded-lg p-3 md:p-4">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a thoughtful reply..."
                className="mb-2 bg-background resize-none text-sm"
                rows={3}
              />
              <div className="flex flex-wrap gap-2">
                <Button size="sm" onClick={() => handleAddReply(comment.id)}>
                  Post Reply
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setReplyingTo(null);
                    setNewComment("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {"replies" in comment &&
          comment.replies &&
          comment.replies.length > 0 && (
            <div className="space-y-4 mt-4 pl-2 md:pl-4">
              {comment.replies.map((reply) => (
                <Comment key={reply.id} comment={reply} isReply={true} />
              ))}
            </div>
          )}
      </div>
    </div>
  );

  return (
    <div className="mt-16">
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <MessageSquare className="w-5 h-5" />
        <h2 className="text-xl font-semibold">Discussion</h2>
        <Separator orientation="vertical" className="h-6 hidden md:block" />
        <span className="text-muted-foreground font-medium">
          {comments.length} comments
        </span>
      </div>

      <div className="mb-8 bg-card border rounded-lg p-3 md:p-4">
        <div className="flex gap-3 md:gap-4 mb-4">
          <Avatar className="w-8 h-8 md:w-10 md:h-10">
            <AvatarImage src="/api/placeholder/32/32" alt="Your avatar" />
            <AvatarFallback>YA</AvatarFallback>
          </Avatar>
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            className="resize-none text-sm"
            rows={3}
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={handleAddComment}>Post Comment</Button>
        </div>
      </div>

      <div className="space-y-6">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
