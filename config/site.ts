// Local config that should be shared across the site

export const siteConfig = {
    name: "PalanjianBlog",
    url: "https://palanjian.com",
    description: "Peter Palanjian's personal website and blog",
    author: "Peter Palanjian",
    email: "testemail@gmail.com",
    links: {
        twitter: "https://www.twitter.com/test",
        github: "https://www.github.com/palanjian",
    }
}

export type SiteConfig = typeof siteConfig