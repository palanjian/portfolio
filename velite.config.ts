import { defineConfig, defineCollection, s } from "velite"
import rehypeSlug from "rehype-slug"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeAutolinkHeadings from "rehype-autolink-headings"

// allows you to read any data from collection, and ADD a field based some 
// transformation of our data (can't obviously do it from the collection definition)
// in our case, we modify slug based on the value of slug itself
const computedFields = <T extends {slug : string}>(data: T) => ({
    ...data,
    slugAsParams: data.slug.split("/").slice(1).join("/")
})

const posts = defineCollection({
    name: "Post",
    pattern: "blog/**/*.mdx", //looks in blog folder or any nested folder for mdx file
    schema: s.object({
        slug: s.path(),
        title: s.string().max(99),
        description: s.string().max(999).optional(),
        date: s.isodate(),
        published: s.boolean().default(true),
        body: s.mdx()
    }).transform(computedFields)
})

export default defineConfig({
    root: "content", 
    output: {
        data: ".velite",
        assets: "public/static",
        base: "/static/",
        name: "[name]-[hash:6].[ext]",
        clean: true
    },
    collections: { posts },
    mdx: {
        rehypePlugins: [rehypeSlug, 
            [rehypePrettyCode, {theme: "github-dark"}], 
            [rehypeAutolinkHeadings, { behavior: "wrap", properties: { className: ["subheading-anchor"], ariaLabel: "Link to section"} }],
        ],
        remarkPlugins: []
    }
})