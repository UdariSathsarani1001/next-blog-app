"use client"

import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Badge } from '@/components/ui/badge'
import { Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

const BlogDetails = ({ id }) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                setLoading(true)
                const response = await axios.get('/api/blog', {
                    params: { id }
                })
                setData(response.data.blog)
            } catch (error) {
                console.error("Error fetching blog data:", error)
            } finally {
                setLoading(false)
            }
        }
        if (id) fetchBlogData()
    }, [id])

    if (loading) {
        return (
            <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1 container py-20 px-4">
                    <div className="mx-auto max-w-3xl space-y-8">
                        <Skeleton className="h-10 w-3/4" />
                        <div className="flex gap-4">
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-6 w-32" />
                        </div>
                        <Skeleton className="aspect-video w-full rounded-2xl" />
                        <div className="space-y-4">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

    if (!data) return null

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <article className="container py-20 px-4">
                    <div className="mx-auto max-w-3xl">
                        <div className="space-y-6 text-center mb-12">
                            <Badge variant="secondary" className="rounded-full px-4 py-1 text-sm font-semibold uppercase tracking-wider">
                                {data.category}
                            </Badge>
                            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground">
                                {data.title}
                            </h1>
                            <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-primary/10">
                                        <Image src={data.authorImg} alt={data.author} fill className="object-cover" />
                                    </div>
                                    <span className="font-medium text-foreground">{data.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>{new Date(data.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    <span>6 min read</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative aspect-video overflow-hidden rounded-3xl shadow-2xl mb-12 border border-border">
                            <Image
                                src={data.image}
                                alt={data.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        <div
                            className="prose prose-neutral dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: data.description }}
                        />

                        <Separator className="my-12" />

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-muted/30 p-8 rounded-2xl border border-border">
                            <div className="flex items-center gap-4">
                                <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-primary/10">
                                    <Image src={data.authorImg} alt={data.author} fill className="object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-foreground">{data.author}</h4>
                                    <p className="text-sm text-muted-foreground italic">Content Creator & Tech Enthusiast</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold text-muted-foreground mr-2">Share:</span>
                                <Button variant="outline" size="icon" className="rounded-full transition-colors hover:bg-primary/10 hover:text-primary">
                                    <Twitter className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon" className="rounded-full transition-colors hover:bg-primary/10 hover:text-primary">
                                    <Facebook className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon" className="rounded-full transition-colors hover:bg-primary/10 hover:text-primary">
                                    <Linkedin className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon" className="rounded-full transition-colors hover:bg-primary/10 hover:text-primary">
                                    <Share2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    )
}

export default BlogDetails
