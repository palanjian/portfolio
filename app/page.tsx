import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn, sortPosts } from "@/lib/utils";
import Link from "next/link";
import { text } from "stream/consumers";
import { posts } from "#site/content";
import { PostItem } from "@/components/post-item";

export default function Home() {
  const POSTS_TO_SHOW = 5;
  const latestPosts = sortPosts(posts).slice(0, POSTS_TO_SHOW);

  return (
    <><section className="space-y-6 pb-8 pt-6 md:pb-12 md:mt-10 lg:py-32">
      <div className="container mx-auto flex flex-col gap-4 text-center">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-balance">
          Hello, I&apos;m Peter
        </h1>
        <p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl text-balance">
          Welcome to my personal website! I am a software engineer with a passion for building
          web applications. I love to explore new technologies and share my knowledge with others.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link href="/blog" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-fit")}>
            View my blog
          </Link>

          <Link href={siteConfig.links.github} target="_blank" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-fit")}>
            GitHub
          </Link>
        </div>
      </div>
    </section>
    <section className="container mx-auto max-w-4xl py-6 lg:py-10 flex flex-col space-y-6 mt-60">
      <h2 className="test-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center">
        Latest Posts
      </h2>
      <ul className="flex flex-col">
        {
          latestPosts.map(post => 
            <li key={post.slug} className="first:border-t first:border-border">
              <PostItem slug={post.slug} title={post.title} description={post.description} date={post.date}/>
            </li>
          )
        }
      </ul>
    </section></>
  );
}
