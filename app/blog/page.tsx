import { posts } from "#site/content";
import { PostItem } from "@/components/post-item";
import { QueryPagination } from "@/components/query-pagination";
import SearchFilter from "@/components/search-filter";
import { sortPosts } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sync - Blog",
  description:
    "Discover the latest insights, tutorials, and best practices in software development and technology.",
};

const categories = [
  "All",
  "Frontend",
  "Backend",
  "DevOps",
  "AI/ML",
  "System Design",
  "Security",
];

const POSTS_PER_PAGE = 6;

interface BlogPageProps {
  searchParams: {
    page?: string;
    category?: string;
    query?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const category = searchParams?.category;
  const query = searchParams?.query?.toLowerCase();

  // Filter posts based on publication status, category, and search query
  let filteredPosts = posts.filter((post) => post.published);

  if (category && category !== "All") {
    filteredPosts = filteredPosts.filter((post) => post.category === category);
  }

  if (query) {
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.description?.toLowerCase().includes(query) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  const sortedPosts = sortPosts(filteredPosts);
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);

  const displayPosts = sortedPosts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage
  );

  return (
    <div className="min-h-screen bg-background relative py-16 mt-10">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Gradient Blob */}
      {/* <div className="absolute z-10 top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20 bg-gradient-to-r from-purple-500 to-blue-500 blur-3xl" /> */}

      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Latest{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Articles
            </span>
          </h1>
          <p className="text-muted-foreground">
            Discover the latest insights, tutorials, and best practices in
            software development and technology.
          </p>
        </div>

        <SearchFilter categories={categories} />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayPosts.map((post) => {
            const {
              slug,
              date,
              thumbnail,
              title,
              description,
              category,
              readTime,
              tags,
              views,
              comments,
            } = post;
            return (
              <PostItem
                key={slug}
                slug={slug}
                date={date}
                title={title}
                description={description}
                category={category}
                readTime={readTime}
                tags={tags}
                views={views}
                comments={comments}
                thumbnail={thumbnail}
              />
            );
          })}
        </div>

        {sortedPosts.length > 0 ? (
          <QueryPagination
            totalPages={totalPages}
            className="justify-end mt-4"
          />
        ) : (
          <p className="text-center text-muted-foreground mt-8">
            No posts found matching your criteria.
          </p>
        )}
      </div>
    </div>
  );
}
