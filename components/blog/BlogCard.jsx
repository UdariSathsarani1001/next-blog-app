import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, User } from 'lucide-react'

const BlogCard = ({ blog }) => {
    return (
        <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 group rounded-xl bg-card/50 backdrop-blur-sm">
            <Link href={`/Blogs/${blog._id}`}>
                <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-background/80 backdrop-blur-md text-xs font-semibold uppercase tracking-wider">
                            {blog.category}
                        </Badge>
                    </div>
                </div>
            </Link>
            <CardHeader className="p-5 pb-2">
                <Link href={`/Blogs/${blog._id}`}>
                    <h3 className="text-xl font-bold leading-tight line-clamp-2 transition-colors hover:text-primary">
                        {blog.title}
                    </h3>
                </Link>
            </CardHeader>
            <CardContent className="px-5 py-2">
                <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                    {blog.description}
                </p>
            </CardContent>
            <CardFooter className="px-5 pb-5 pt-4 flex items-center justify-between border-t border-border/50 mt-auto">
                <div className="flex items-center gap-2">
                    <div className="relative h-8 w-8 rounded-full overflow-hidden border border-border">
                        <Image
                            src={blog.authorImg}
                            alt={blog.author}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">{blog.author}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
            </CardFooter>
        </Card>
    )
}

export default BlogCard
