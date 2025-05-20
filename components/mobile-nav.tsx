"use client"

import React, { useState } from "react"
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet"
import { Button } from "./ui/button"
import { Menu } from "lucide-react"
import { useRouter } from "next/navigation"
import Link, { LinkProps } from "next/link"
import { Icons } from "./icons"
import { siteConfig } from "@/config/site"

export function MobileNav() {
    const [open, setOpen] = useState(false)
    
    return ( 
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" className="w-10 px-0 sm:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only"></span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right">
                <MobileLink href="/" onOpenChange={setOpen} className="flex items-center">
                    <Icons.logo className="mr-2 h-4 w-4" />
                    <span className="font-bold">{siteConfig.name}</span>
                </MobileLink>

                <div className="flex flex-col gap-3 mt-3">
                    <MobileLink onOpenChange={setOpen} href="/blog">
                        Blog
                    </MobileLink>
                    <MobileLink onOpenChange={setOpen} href="/about">
                        About
                    </MobileLink>

                    {/* Don't need to make these mobile links as we dont need to close navbar */}
                    <Link target="_blank" rel="noreferrer" href={siteConfig.links.github}>
                        GitHub
                    </Link>

                    <Link target="_blank" rel="noreferrer" href={siteConfig.links.twitter}>
                        Twitter
                    </Link>
                </div>
            </SheetContent>
        </Sheet>
    )
}

interface MobileLinkProps extends LinkProps {
    children: React.ReactNode
    onOpenChange?: (open: boolean) => void
    className?: string
}


// adds logic that closes the mobile nav hamburger menu when a link is clicked
function MobileLink({
    href, 
    onOpenChange,
    children,
    className,
    ...props
}: MobileLinkProps) {
    const router = useRouter()
    return (
        <Link
            href={href}
            onClick={() => {
                router.push(href.toString())
                onOpenChange?.(false)
            }}
            className={className}
            {...props}
        >
            {children}
        </Link>
    )
}