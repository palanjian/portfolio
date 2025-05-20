// ... is a catch all -> catches everything after /blog/ 
// thats why we need a string array and not just a string

import { posts } from "#site/content"
import { MDXContent } from "@/components/mdx-components"
import { notFound } from "next/navigation"

interface PostPageProps {
    params: {
        slug: string[]
    }
}

async function getPostFromParams(params: PostPageProps["params"]) {
    //if there are nested slashes, join int oa single string
    const slug = params?.slug?.join("/")
    const post = posts.find(post => post.slugAsParams === slug) 

    return post
}

//tells nextjs to pre-render the page at build time using the paths returned
export async function generateStaticParams() : Promise<PostPageProps["params"][]> {
    return posts.map(post => ({slug: post.slugAsParams.split("/")}))
}

export default async function PostPage({params} : PostPageProps) {
    const post = await getPostFromParams(params)

    if(!post || !post.published) {
        notFound() //returns 404
    }
    
    return <article className="container py-6 prose dark:prose-invert max-w-3xl mx-auto">
        <h1 className="mb-2">{post.title}</h1>
        {post.description ? (<p className="text-xl mt-0 text-muted-foreground">{post.description}</p>) : null} 
        <hr className="my-4"></hr>
        <MDXContent code={post.body} />

    </article>
}