"use client"

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

// uses system theme by default -> might be a good idea to use dark by default
export function Providers({children} : { children: ReactNode}) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
        </ThemeProvider>
    )
}