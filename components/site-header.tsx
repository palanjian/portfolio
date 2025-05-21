import { siteConfig } from "@/config/site";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
    return (
        <header className="sticky z-10 top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex items-center min-h-[56px] md:min-h-[64px] lg:min-h-[80px] px-4 md:px-2 lg:px-4 py-2 md:py-4 mx-auto">
                <MainNav />
                <div className="flex flex-1 items-center justify-end space-x-2">
                    <nav className="flex items-center">
                        
                        <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
                            <div className={cn(buttonVariants({ variant: "ghost"}), "w-10 px-0 hidden sm:inline-flex")}>
                                <Icons.gitHub className="h-4 w-4" />
                                <span className="sr-only">GitHub Link</span>
                            </div>
                        </Link>

                        <Link href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
                            <div className={cn(buttonVariants({ variant: "ghost"}), "w-10 px-0 hidden sm:inline-flex")}>
                                <Icons.twitter className="h-4 w-4" />
                                <span className="sr-only">Twitter Link</span>
                            </div>
                        </Link>
                        <ThemeToggle />
                        <MobileNav />
                    </nav>
                </div>
            </div>
        </header>
    )
}