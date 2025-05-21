// ... is a catch all -> catches everything after /blog/ 
// thats why we need a string array and not just a string

import { posts } from "#site/content"
import { MDXContent } from "@/components/mdx-components"
import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import { notFound } from "next/navigation"

interface PostPageProps {
    params: {
        slug: string[]
    }
}

// this is a special function that tells nextjs to generate metadata for the page
// used for SEO
export async function generateMetadata({params} : PostPageProps) : Promise<Metadata>  {
    const post = await getPostFromParams(params)
    if(!post) {
        return {}
    }
    const ogSearchParams = new URLSearchParams()
    ogSearchParams.set("title", post.title)
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
                    alt: post.title
                }
            ]
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
            images: [`/api/og?${ogSearchParams.toString()}`]
        }
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