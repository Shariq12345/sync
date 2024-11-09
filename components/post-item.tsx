import {
  Bookmark,
  BookmarkCheck,
  Calendar,
  ChevronRight,
  Clock,
  Eye,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { cn, formatDate } from "@/lib/utils";
import { Badge } from "./ui/badge";
import Image from "next/image";

interface PostItemProps {
  slug: string;
  title: string;
  description?: string;
  date: string;
  category?: string;
  readTime?: string;
  tags?: string[];
  views?: string;
  comments?: string;
  thumbnail?: string;
}

export function PostItem({
  slug,
  title,
  description,
  date,
  category,
  readTime,
  tags,
  views,
  comments,
  thumbnail,
}: PostItemProps) {
  return (
    <article className="group bg-background/50 border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-[16/9] overflow-hidden">
        {/* <img
          src={
            "https://cdni.pornpics.de/460/5/223/43659428/43659428_015_c955.jpg"
          }
          alt={""}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        /> */}
        <Image
          src={thumbnail || "/default-thumbnail.png"}
          alt="No image found"
          fill
        />
        {/* <img
          src={thumbnail}
          alt={""}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        /> */}
        <div className="absolute top-4 left-4">
          <Badge
            variant="secondary"
            className="bg-background/50 backdrop-blur-sm"
          >
            {category}
          </Badge>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-4 right-4 bg-background/50 backdrop-blur-sm"
          // onClick={() => toggleSavePost(blog.id)}
        >
          {/* {savedPosts.includes(blog.id) ? ( */}
          {/* <BookmarkCheck className="w-4 h-4" /> */}
          {/* ) : ( */}
          <Bookmark className="w-4 h-4" />
          {/* )} */}
        </Button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title and Excerpt */}
        <div className="space-y-2">
          <Link href={slug}>
            <h2 className="text-xl font-semibold line-clamp-1 hover:text-primary transition-colors">
              {title}
            </h2>
          </Link>
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags?.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Author and Metadata */}
        <div className="flex items-center justify-between pt-4 border-t">
          {/* <div className="flex items-center gap-3">
            <img
              src={blog.author.avatar}
              alt={blog.author.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-medium text-sm">{blog.author.name}</p>
              <p className="text-xs text-muted-foreground">
                {blog.author.role}
              </p>
            </div>
          </div> */}

          <div className="flex items-center justify-between gap-3 text-muted-foreground">
            {/* Left-aligned section with icons */}
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="flex items-center gap-1 text-sm">
                <Clock className="w-4 h-4" />
                <span>{readTime}</span>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-sm">
                <Eye className="w-4 h-4" />
                <span>{views}</span>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-sm">
                <MessageSquare className="w-4 h-4" />
                <span>{comments}</span>
              </div>
            </div>

            {/* Right-aligned date section */}
            <div className="flex items-center gap-1 text-sm ml-auto font-semibold">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(date)}</span>
            </div>
          </div>
        </div>

        {/* Read More Link */}
        <Link
          href={slug}
          className="inline-flex items-center text-sm text-primary hover:underline mt-2"
        >
          Read More
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </article>
  );
}
