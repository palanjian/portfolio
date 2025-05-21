import { buttonVariants } from "@/components/ui/button"; 
import { siteConfig } from "@/config/site";
import { cn, sortPosts } from "@/lib/utils";
import Link from "next/link";
import { posts } from "#site/content";
import { PostItem } from "@/components/post-item";

export default function Home() {
  const POSTS_TO_SHOW = 5;
  const latestPosts = sortPosts(posts).slice(0, POSTS_TO_SHOW);

  return (
    <section className="py-12 md:py-20 lg:py-24">
      <div className="container px-6 mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-12 text-left">
        {/* Left side */}
        <div className="md:w-1/2 max-w-xl">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight">
            Hello, <br /> I&apos;m Peter 
          </h1>
          <p className="mt-6 text-muted-foreground sm:text-2xl leading-relaxed">
            Welcome to my personal website! I’m a software engineer passionate about building web applications, exploring new tech, and sharing what I learn.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-start mt-8">
            <Link href="/blog" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}>
              View my blog
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto")}
            >
              GitHub
            </Link>
          </div>
        </div>

        {/* Right side: Latest posts */}
        <div className="md:w-1/2 w-full max-w-xl">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold">Latest Blog Posts</h2>
            <ul className="flex flex-col divide-y divide-border">
              {latestPosts.map((post) => (
                <li key={post.slug} className="pt-4 first:pt-0">
                  <PostItem
                    slug={post.slug}
                    title={post.title}
                    description={post.description}
                    date={post.date}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
