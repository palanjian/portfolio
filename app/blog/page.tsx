import { posts } from "#site/content"
import { PostItem } from "@/components/post-item"
import { sortPosts } from "@/lib/utils"

export default async function BlogPage() {
    const sortedPosts = sortPosts(posts.filter(post => post.published))
    const displayPosts = sortedPosts
    
    return <div className="container max-w-4xl py-6 lg:py-10 px-4">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
            <div className="flex-1 space-y-4">
                <h1 className="inline-block font-black text-4xl lg:text-5xl">
                    Blog
                </h1>
                <p className="text-xl text-muted-foreground">
                    A description of my blog.
                </p>

                <hr className="mt-8" />
                {displayPosts?.length > 0 ? 
                    (
                    <ul className="flex flex-col">
                        {displayPosts.map((post) => {
                            return <li key={post.slug}>
                                <PostItem slug={post.slug} date={post.date} title={post.title} description={post.description} />
                            </li>
                        })}
                    </ul>) : (
                    <p> No posts found. </p>
                    )
                }
            </div>
        </div>
    </div>
}