import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { notFound } from "next/navigation";

import "@/styles/mdx.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import BackToTopButton from "@/components/back-to-top-button";
import CommentSection from "@/components/comment-section";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = posts.find((post) => post.slugAsParams === slug);

  return post;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", post.title);

  return {
    title: post.title,
    description: post.description,
    authors: { name: siteConfig.author },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: post.slug,
      images: [
        {
          url: `/api/og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`/api/og?${ogSearchParams.toString()}`],
    },
  };
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return posts.map((post) => ({ slug: post.slugAsParams.split("/") }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <article className="mt-[64px] container py-6 prose dark:prose-invert max-w-3xl mx-auto">
      <h1 className="mb-2">{post.title}</h1>
      {post.description ? (
        <p className="text-base mt-0 text-muted-foreground">
          {post.description}
        </p>
      ) : null}
      <hr className="my-4" />
      <MDXContent code={post.body} />
      <CommentSection />
      <BackToTopButton />
    </article>
  );
}

{
  /* <div className="mt-[64px] container py-6 max-w-6xl mx-auto flex space-x-6">
<article className="prose dark:prose-invert max-w-3xl">
  <h1 className="mb-2">{post.title}</h1>
  {post.description ? (
    <p className="text-base mt-0 text-muted-foreground">
      {post.description}
    </p>
  ) : null}
  <hr className="my-4" />
  <MDXContent code={post.body} />
  <BackToTopButton />
</article> */
}

{
  /* Sidebar for "On This Page" */
}
{
  /* <aside className="w-64 flex-none">
  <OnThisPage />
</aside>
</div> */
}
