"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { toast } from '@/hooks/use-toast'
import { Upload, X, Loader2, Edit, Save } from 'lucide-react'

const EditProductPage = () => {
    const { id } = useParams()
    const router = useRouter()
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [existingImage, setExistingImage] = useState("")
    const [data, setData] = useState({
        title: '',
        description: '',
        category: 'Startup',
        author: 'Antigravity Admin',
        authorImg: '/assets/profile_icon.png'
    })

    const fetchBlogData = async () => {
        try {
            const response = await axios.get('/api/blog', { params: { id } })
            const blog = response.data.blog
            setData({
                title: blog.title,
                description: blog.description,
                category: blog.category,
                author: blog.author,
                authorImg: blog.authorImg
            })
            setExistingImage(blog.image)
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to fetch blog data.",
            })
            router.push('/admin/blogList')
        } finally {
            setFetching(false)
        }
    }

    useEffect(() => {
        if (id) fetchBlogData()
    }, [id])

    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setData(prev => ({ ...prev, [name]: value }))
    }

    const onCategoryChange = (value) => {
        setData(prev => ({ ...prev, category: value }))
    }

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData()
        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('category', data.category)
        formData.append('author', data.author)
        formData.append('authorImg', data.authorImg)
        if (image) {
            formData.append('image', image)
        }

        try {
            const response = await axios.put(`/api/blog?id=${id}`, formData)
            if (response.data.success) {
                toast({
                    title: "Updated!",
                    description: "Your blog post has been updated successfully.",
                })
                router.push('/admin/blogList')
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: response.data.msg || "Something went wrong.",
                })
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to update the blog post.",
            })
        } finally {
            setLoading(false)
        }
    }

    if (fetching) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
                    <Edit className="h-8 w-8 text-primary" />
                    Edit Post
                </h2>
                <p className="text-muted-foreground">Modify your content and keep your audience updated.</p>
            </div>

            <form onSubmit={onSubmitHandler} className="space-y-8">
                <Card className="border-none shadow-sm rounded-2xl bg-card/50 backdrop-blur-sm overflow-hidden">
                    <CardHeader className="border-b bg-muted/30">
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                            <Upload className="h-5 w-5 text-primary" />
                            Blog Thumbnail
                        </CardTitle>
                        <CardDescription>Upload a new image or keep the current one.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8">
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/20 rounded-2xl p-10 bg-muted/10 transition-colors hover:bg-muted/20 relative group">
                            {image ? (
                                <div className="relative w-full aspect-video max-w-xl overflow-hidden rounded-xl shadow-lg">
                                    <Image
                                        src={URL.createObjectURL(image)}
                                        alt="Preview"
                                        fill
                                        className="object-cover"
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-2 right-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => setImage(null)}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ) : existingImage ? (
                                <div className="relative w-full aspect-video max-w-xl overflow-hidden rounded-xl shadow-lg">
                                    <img
                                        src={existingImage}
                                        alt="Existing"
                                        className="object-cover w-full h-full"
                                    />
                                    <label htmlFor="image" className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                        <div className="flex flex-col items-center gap-2 text-white">
                                            <Upload className="h-8 w-8" />
                                            <span className="font-bold">Change Image</span>
                                        </div>
                                    </label>
                                    <Input
                                        id="image"
                                        type="file"
                                        className="hidden"
                                        onChange={onImageChange}
                                        accept="image/*"
                                    />
                                </div>
                            ) : (
                                <label htmlFor="image" className="flex flex-col items-center justify-center cursor-pointer space-y-4 text-center">
                                    <div className="p-4 rounded-full bg-primary/10 text-primary">
                                        <Upload className="h-8 w-8" />
                                    </div>
                                    <div>
                                        <p className="text-base font-semibold">Click to upload or drag and drop</p>
                                        <p className="text-sm text-muted-foreground">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                                    </div>
                                    <Input
                                        id="image"
                                        type="file"
                                        className="hidden"
                                        onChange={onImageChange}
                                        accept="image/*"
                                    />
                                    <Button type="button" variant="outline" className="rounded-full px-6 pointer-events-none">Select File</Button>
                                </label>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm rounded-2xl bg-card/50 backdrop-blur-sm">
                    <CardHeader className="border-b bg-muted/30">
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                            <Save className="h-5 w-5 text-primary" />
                            Post Content
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Blog Title</Label>
                            <Input
                                id="title"
                                name="title"
                                value={data.title}
                                onChange={onChangeHandler}
                                placeholder="Enter an eye-catching title"
                                className="h-12 text-lg font-semibold rounded-xl"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="category" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Category</Label>
                                <Select value={data.category} onValueChange={onCategoryChange}>
                                    <SelectTrigger className="h-11 rounded-xl">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        <SelectItem value="Startup">Startup</SelectItem>
                                        <SelectItem value="Technology">Technology</SelectItem>
                                        <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="author" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Author</Label>
                                <Input
                                    id="author"
                                    value={data.author}
                                    className="h-11 rounded-xl bg-muted/30"
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Content (HTML Support)</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={data.description}
                                onChange={onChangeHandler}
                                placeholder="Write your blog content here. You can use HTML for rich styling."
                                className="min-h-[300px] rounded-xl text-base leading-relaxed p-6"
                                required
                            />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex items-center justify-end gap-4">
                    <Button type="button" variant="ghost" className="rounded-full px-8" onClick={() => router.back()}>Cancel</Button>
                    <Button type="submit" className="rounded-full px-12 h-12 text-base font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105" disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            'Save Changes'
                        )}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default EditProductPage
