"use client"

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/mode-toggle'
import { Search, Menu } from 'lucide-react'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
                <div className="flex items-center gap-4 md:gap-8">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-xl md:text-2xl font-bold tracking-tight text-primary">Blogify</span>
                    </Link>
                    <div className="hidden md:flex gap-6 text-sm font-medium">
                        <Link href="/" className="transition-colors hover:text-primary">Home</Link>
                        <Link href="/Blogs" className="transition-colors hover:text-primary">Blogs</Link>
                        <Link href="/about" className="transition-colors hover:text-primary">About</Link>
                        <Link href="/contact" className="transition-colors hover:text-primary">Contact</Link>
                    </div>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                    <div className="hidden lg:flex relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            type="search"
                            placeholder="Search posts..."
                            className="h-9 w-48 xl:w-64 rounded-full border border-input bg-background pl-9 pr-4 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                    <ModeToggle />
                    <Button asChild variant="default" className="hidden sm:inline-flex rounded-full px-6">
                        <Link href="/login">Admin Login</Link>
                    </Button>

                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px]">
                            <SheetHeader>
                                <SheetTitle className="text-left font-bold text-2xl">Menu</SheetTitle>
                            </SheetHeader>
                            <div className="grid gap-6 py-10">
                                <Link href="/" className="text-lg font-medium hover:text-primary transition-colors">Home</Link>
                                <Link href="/Blogs" className="text-lg font-medium hover:text-primary transition-colors">Blogs</Link>
                                <Link href="/about" className="text-lg font-medium hover:text-primary transition-colors">About</Link>
                                <Link href="/contact" className="text-lg font-medium hover:text-primary transition-colors">Contact</Link>
                                <Separator />
                                <Link href="/login" className="text-lg font-medium text-primary">Admin Login</Link>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    )
}

const Separator = () => <div className="h-px w-full bg-border" />

export default Navbar
