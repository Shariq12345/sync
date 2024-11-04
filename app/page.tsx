import { sortPosts } from "@/lib/utils";
import { posts } from "#site/content";
import { PostItem } from "@/components/post-item";
import { Button } from "@/components/ui/button";
import { ChevronRight, Code2, Cpu, Globe, Terminal } from "lucide-react";

export default function Home() {
  const latestPosts = sortPosts(posts).slice(0, 3);
  return (
    <div className="min-h-screen relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Gradient Blob */}
      <div className="absolute -z-10 top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20 bg-gradient-to-r from-purple-500 to-blue-500 blur-3xl" />

      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Hero Content */}
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
            {/* Left Column - Text Content */}
            <div className="flex-1 space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full border bg-background/50 backdrop-blur-sm">
                  <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                    Latest in Tech & Development
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                  Explore the Future of{" "}
                  <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                    Technology
                  </span>
                </h1>

                <p className="text-lg text-muted-foreground">
                  Deep dive into expert insights on software development, tech
                  trends, and innovative solutions. Join our community of tech
                  enthusiasts and stay ahead of the curve.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="group">
                  Start Reading
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline">
                  Subscribe to Newsletter
                </Button>
              </div>

              {/* Stats Section */}
              <div className="pt-8 grid grid-cols-2 md:grid-cols-3 gap-4 text-center sm:text-left">
                <div className="space-y-2">
                  <p className="text-2xl font-bold">500+</p>
                  <p className="text-sm text-muted-foreground">
                    Articles Published
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold">50K+</p>
                  <p className="text-sm text-muted-foreground">
                    Monthly Readers
                  </p>
                </div>
                <div className="space-y-2 col-span-2 sm:col-span-1">
                  <p className="text-2xl font-bold">100+</p>
                  <p className="text-sm text-muted-foreground">Tech Topics</p>
                </div>
              </div>
            </div>

            {/* Right Column - Visual Elements */}
            <div className="flex-1 w-full max-w-xl">
              <div className="relative">
                {/* Floating Icons */}
                <div className="absolute -z-10 inset-0">
                  <Terminal className="absolute top-0 left-[10%] h-8 w-8 text-purple-500 animate-float" />
                  <Code2 className="absolute top-[20%] right-[10%] h-8 w-8 text-blue-500 animate-float-delayed" />
                  <Cpu className="absolute bottom-[30%] left-[20%] h-8 w-8 text-purple-500 animate-float" />
                  <Globe className="absolute bottom-[10%] right-[20%] h-8 w-8 text-blue-500 animate-float-delayed" />
                </div>

                {/* Featured Article Preview */}
                <div className="bg-background/50 backdrop-blur-sm border rounded-xl p-6 space-y-4 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-sm text-muted-foreground">
                        Featured Article
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold line-clamp-2">
                      Understanding Modern Web Architecture: A Deep Dive
                    </h3>
                    <p className="text-muted-foreground line-clamp-3">
                      Explore the latest trends in web development architecture,
                      from microservices to serverless computing and everything
                      in between.
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-500" />
                      <div>
                        <p className="text-sm font-medium">John Doe</p>
                        <p className="text-xs text-muted-foreground">
                          Tech Lead
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">5 min read</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="container py-6 lg:py-10 flex flex-col space-y-6 mt-[150px]">
          <h2 className="text-2xl sm:text-5xl md:text-6xl lg:text-5xl font-black text-center">
            Latest Posts
          </h2>

          {/* Grid layout for latest posts */}
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <li key={post.slug} className="">
                <PostItem
                  slug={post.slug}
                  title={post.title}
                  description={post.description}
                  date={post.date}
                />
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* <FeaturedBlogs />

      <PricingSection /> */}
    </div>
  );
}
