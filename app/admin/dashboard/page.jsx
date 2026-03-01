"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    FileText,
    Users,
    Eye,
    TrendingUp,
    PlusCircle,
    ArrowUpRight,
    MessageSquare,
    Settings
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const DashboardPage = () => {
    const [counts, setCounts] = useState({ blogs: 0, subs: 0 })
    const [loading, setLoading] = useState(true)

    const fetchCounts = async () => {
        try {
            const [blogRes, emailRes] = await Promise.all([
                axios.get('/api/blog'),
                axios.get('/api/email')
            ])
            setCounts({
                blogs: blogRes.data.blogs?.length || 0,
                subs: emailRes.data.emails?.length || 0
            })
        } catch (error) {
            console.error("Error fetching dashboard data:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCounts()
    }, [])

    const stats = [
        { label: 'Total Posts', value: loading ? '...' : counts.blogs.toString(), icon: FileText, change: '+1 since last week', color: 'text-blue-600', bg: 'bg-blue-100' },
        { label: 'Total Subscriptions', value: loading ? '...' : counts.subs.toString(), icon: Users, change: '+5% from last month', color: 'text-green-600', bg: 'bg-green-100' },
        { label: 'Total Views', value: '1.2K', icon: Eye, change: '+8% from last month', color: 'text-purple-600', bg: 'bg-purple-100' },
        { label: 'Engagement Rate', value: '4.8%', icon: TrendingUp, change: '+0.5% this week', color: 'text-orange-600', bg: 'bg-orange-100' },
    ]

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground text-center sm:text-left">Welcome back, Admin!</h2>
                    <p className="text-muted-foreground text-center sm:text-left">Here's what's happening with Blogify today.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" asChild className="rounded-full">
                        <Link href="/">View Site</Link>
                    </Button>
                    <Button asChild className="rounded-full px-6">
                        <Link href="/admin/addProduct"><PlusCircle className="mr-2 h-4 w-4" /> Create New Post</Link>
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, i) => (
                    <Card key={i} className="border-none shadow-sm rounded-2xl bg-card/50 backdrop-blur-sm overflow-hidden group hover:shadow-md transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</CardTitle>
                            <div className={`p-2 rounded-xl ${stat.bg} ${stat.color} transition-transform group-hover:scale-110`}>
                                <stat.icon className="h-5 w-5" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
                            <p className="mt-1 text-xs text-muted-foreground">
                                <span className="text-green-600 font-medium inline-flex items-center mr-1">
                                    <TrendingUp className="h-3 w-3 mr-0.5" /> {stat.change.split(' ')[0]}
                                </span>
                                {stat.change.split(' ').slice(1).join(' ')}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-none shadow-sm rounded-2xl bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-primary" />
                            Recent Activity
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                            <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <PlusCircle className="h-5 w-5" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-semibold">System Updated</p>
                                <p className="text-xs text-muted-foreground">Blogify platform successfully upgraded to v2.0.</p>
                                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Just now</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                            <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <Users className="h-5 w-5" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-semibold">New Subscription</p>
                                <p className="text-xs text-muted-foreground">A new user just subscribed to your newsletter.</p>
                                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">1 hour ago</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm rounded-2xl bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MessageSquare className="h-5 w-5 text-primary" />
                            Quick Actions
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                        <Button variant="outline" asChild className="h-24 rounded-2xl flex flex-col gap-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                            <Link href="/admin/blogList">
                                <FileText className="h-6 w-6" />
                                <span>Manage Content</span>
                            </Link>
                        </Button>
                        <Button variant="outline" asChild className="h-24 rounded-2xl flex flex-col gap-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                            <Link href="/admin/subscriptions">
                                <Users className="h-6 w-6" />
                                <span>View Subscribers</span>
                            </Link>
                        </Button>
                        <Button variant="outline" asChild className="h-24 rounded-2xl flex flex-col gap-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                            <Link href="/admin/addProduct">
                                <PlusCircle className="h-6 w-6" />
                                <span>Draft New Post</span>
                            </Link>
                        </Button>
                        <Button variant="outline" className="h-24 rounded-2xl flex flex-col gap-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                            <Settings className="h-6 w-6" />
                            <span>Site Settings</span>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default DashboardPage
