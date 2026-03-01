"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { Github, Twitter, Linkedin, Mail, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'

const Footer = () => {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('email', email)
            const response = await axios.post('/api/email', formData)
            if (response.data.success) {
                toast({
                    title: "Success",
                    description: "You've been subscribed to our newsletter!",
                })
                setEmail("")
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Something went wrong. Please try again.",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <footer className="border-t bg-muted/30">
            <div className="container py-12 md:py-16 px-4 sm:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <Link href="/" className="text-xl font-bold tracking-tight text-primary">
                            Blogify
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            A modern platform for sharing thoughts, tutorials, and insights with the world. Built with Next.js and Tailwind CSS.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Github className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">Company</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                            <li><Link href="/press" className="hover:text-primary transition-colors">Press</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">Support</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">Newsletter</h3>
                        <p className="text-sm text-muted-foreground">Subscribe to our newsletter for the latest updates.</p>
                        <form onSubmit={handleSubmit} className="flex gap-2">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email address"
                                className="h-10 w-full rounded-full border border-input bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                                required
                            />
                            <Button type="submit" size="sm" className="shrink-0 rounded-full px-4" disabled={loading}>
                                {loading ? "..." : "Join"}
                            </Button>
                        </form>
                    </div>
                </div>
                <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} Blogify. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
