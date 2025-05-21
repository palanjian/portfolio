import { posts } from "#site/content"
import { PostItem } from "@/components/post-item"
import { QueryPagination } from "@/components/query-pagination"
import { sortPosts } from "@/lib/utils"
import "@/styles/mdx.css"

const POSTS_PER_PAGE = 10 // CONST FOR PAGINATION

interface BlogPageProps {
    searchParams: {
        page?: string
    }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const currentPage = Number(searchParams?.page) || 1
    
    const sortedPosts = sortPosts(posts.filter(post => post.published))
    const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE)
    const displayPosts = sortedPosts.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE
    )
    
    return <div className="container mx-auto max-w-4xl py-6 lg:py-10 px-4">
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
                <QueryPagination totalPages={totalPages} />
            </div>
        </div>
    </div>
}