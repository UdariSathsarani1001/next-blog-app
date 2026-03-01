"use client"

import React from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Rocket, Heart, Lightbulb, Users } from 'lucide-react'

const AboutPage = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative py-20 lg:py-32 overflow-hidden bg-primary/5">
                    <div className="container px-4 text-center relative z-10">
                        <Badge variant="outline" className="mb-4 px-4 py-1 text-primary border-primary/20 bg-primary/5">
                            Our Story
                        </Badge>
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl mb-6">
                            Elevating the Art of <span className="text-primary italic">Storytelling</span>
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
                            Blogify is more than just a blog. It&apos;s a platform dedicated to sharing high-quality insights,
                            tutorials, and creative thoughts that inspire growth and innovation.
                        </p>
                    </div>
                    <div className="absolute top-1/2 left-0 h-64 w-64 -translate-y-1/2 -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]"></div>
                    <div className="absolute bottom-0 right-0 h-64 w-64 translate-y-1/2 translate-x-1/2 rounded-full bg-primary/10 blur-[100px]"></div>
                </section>

                {/* Mission & Vision */}
                <section className="py-24 container px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold tracking-tight">Fueling Curiosity, One Post at a Time</h2>
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    Founded in 2024, Blogify emerged from a simple idea: to create a space where complex
                                    concepts are simplified and creative voices are amplified. We believe in the power
                                    of shared knowledge to transform lives and businesses.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm space-y-3">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <Rocket className="h-5 w-5" />
                                    </div>
                                    <h3 className="font-bold">Our Mission</h3>
                                    <p className="text-sm text-muted-foreground">To empower creators and learners through curated, high-impact content.</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm space-y-3">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <Heart className="h-5 w-5" />
                                    </div>
                                    <h3 className="font-bold">Our Values</h3>
                                    <p className="text-sm text-muted-foreground">Integrity, creativity, and the relentless pursuit of excellence in everything we do.</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src="/assets/about_hero.jpg"
                                alt="About Blogify"
                                fill
                                className="object-cover"
                                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop' }}
                            />
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-20 bg-muted/30 border-y">
                    <div className="container px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <div className="space-y-2">
                                <p className="text-4xl font-black text-primary">500+</p>
                                <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Articles</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-4xl font-black text-primary">50k+</p>
                                <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Readers</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-4xl font-black text-primary">20+</p>
                                <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Authors</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-4xl font-black text-primary">150+</p>
                                <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Tutorials</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-24 container px-4">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">Meet the Minds Behind Blogify</h2>
                        <p className="mx-auto max-w-2xl text-muted-foreground">A diverse group of writers, designers, and developers working together to bring you the best content.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { name: "John Doe", role: "Editor-in-Chief", img: "/assets/profile_icon.png" },
                            { name: "Jane Smith", role: "Tech Lead", img: "/assets/profile_icon.png" },
                            { name: "Alex Rivera", role: "Creative Director", img: "/assets/profile_icon.png" }
                        ].map((member, i) => (
                            <Card key={i} className="border-none shadow-sm rounded-2xl hover:shadow-md transition-shadow">
                                <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                                    <Avatar className="h-24 w-24 ring-4 ring-primary/10">
                                        <AvatarImage src={member.img} />
                                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h4 className="text-xl font-bold text-foreground">{member.name}</h4>
                                        <p className="text-sm text-primary font-medium">{member.role}</p>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Passionate about crafting stories that matter and helping others navigate the digital landscape.
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default AboutPage
