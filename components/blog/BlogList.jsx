"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Hero from '@/components/layout/Hero'
import CategoryFilter from '@/components/blog/CategoryFilter'
import BlogCard from '@/components/blog/BlogCard'
import { Skeleton } from '@/components/ui/skeleton'

const BlogList = () => {
    const [menu, setMenu] = useState("All")
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)

    const categories = ["Technology", "Startup", "Lifestyle"]

    const fetchBlogs = async () => {
        try {
            setLoading(true)
            const response = await axios.get('/api/blog')
            setBlogs(response.data.blogs)
        } catch (error) {
            console.error("Error fetching blogs:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBlogs()
    }, [])

    const filteredBlogs = blogs.filter((item) =>
        menu === "All" ? true : item.category === menu
    )

    return (
        <section className="container py-12">
            <CategoryFilter
                categories={categories}
                selected={menu}
                onSelect={setMenu}
            />

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {loading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="space-y-4">
                            <Skeleton className="aspect-[16/10] w-full rounded-xl" />
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-20 w-full" />
                        </div>
                    ))
                ) : filteredBlogs.length > 0 ? (
                    filteredBlogs.map((item) => (
                        <BlogCard key={item._id} blog={item} />
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center">
                        <h3 className="text-xl font-semibold text-muted-foreground">No blogs found in this category.</h3>
                    </div>
                )}
            </div>
        </section>
    )
}

export default BlogList
