"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/hooks/use-toast"
import { Trash2, Edit, ExternalLink, MoreVertical } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const BlogListPage = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

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

  const deleteBlog = async (mongoId) => {
    if (!confirm("Are you sure you want to delete this blog?")) return

    try {
      const response = await axios.delete('/api/blog', {
        params: { id: mongoId }
      })
      toast({
        title: "Blog Deleted",
        description: response.data.msg,
      })
      fetchBlogs()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete the blog.",
      })
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">All Blogs</h2>
          <p className="text-muted-foreground">Manage and monitor all your blog posts in one place.</p>
        </div>
        <Button asChild className="rounded-full px-6">
          <Link href="/admin/addProduct">Create New Post</Link>
        </Button>
      </div>

      <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-card/50 backdrop-blur-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[300px] px-6 py-4 font-semibold uppercase tracking-wider text-xs">Blog Title</TableHead>
                <TableHead className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Author</TableHead>
                <TableHead className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Category</TableHead>
                <TableHead className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Date</TableHead>
                <TableHead className="text-right px-6 py-4 font-semibold uppercase tracking-wider text-xs">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="px-6 py-4"><div className="h-4 w-48 bg-muted animate-pulse rounded" /></TableCell>
                    <TableCell className="px-6 py-4"><div className="h-4 w-24 bg-muted animate-pulse rounded" /></TableCell>
                    <TableCell className="px-6 py-4"><div className="h-4 w-20 bg-muted animate-pulse rounded" /></TableCell>
                    <TableCell className="px-6 py-4"><div className="h-4 w-24 bg-muted animate-pulse rounded" /></TableCell>
                    <TableCell className="px-6 py-4 text-right"><div className="h-8 w-8 bg-muted animate-pulse rounded ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : blogs.length > 0 ? (
                blogs.map((item) => (
                  <TableRow key={item._id} className="hover:bg-muted/30 transition-colors group">
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-16 overflow-hidden rounded-md border">
                          <Image src={item.image} alt={item.title} fill className="object-cover" />
                        </div>
                        <span className="font-semibold line-clamp-1">{item.title}</span>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7 border">
                          <AvatarImage src={item.authorImg} />
                          <AvatarFallback>{item.author[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{item.author}</span>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <Badge variant="secondary" className="rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-tight">
                        {item.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </TableCell>
                    <TableCell className="text-right px-6 py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40 rounded-xl">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={`/Blogs/${item._id}`} target="_blank" className="cursor-pointer flex items-center gap-2">
                              <ExternalLink className="h-4 w-4" /> View Post
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/editProduct/${item._id}`} className="cursor-pointer flex items-center gap-2">
                              <Edit className="h-4 w-4" /> Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => deleteBlog(item._id)}
                            className="cursor-pointer flex items-center gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <p className="text-lg font-medium text-muted-foreground">No blogs found.</p>
                      <Button asChild variant="outline" className="rounded-full">
                        <Link href="/admin/addProduct">Create your first post</Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default BlogListPage