"use client"

import React, { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from '@/hooks/use-toast'
import { Mail, Phone, MapPin, Send, MessageSquare, User, AtSign } from 'lucide-react'

const ContactPage = () => {
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        // Simulate API call
        setTimeout(() => {
            setLoading(false)
            toast({
                title: "Message Sent!",
                description: "We've received your message and will get back to you soon.",
            })
            e.target.reset()
        }, 1500)
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative py-20 lg:py-24 overflow-hidden bg-primary/5">
                    <div className="container px-4 text-center relative z-10">
                        <Badge variant="outline" className="mb-4 px-4 py-1 text-primary border-primary/20 bg-primary/5">
                            Contact Us
                        </Badge>
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl mb-6">
                            Let's Start a <span className="text-primary italic">Conversation</span>
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
                            Have a question, feedback, or a story to share? We'd love to hear from you.
                            Our team is here to help and listen.
                        </p>
                    </div>
                </section>

                <section className="py-24 container px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Contact Info */}
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold tracking-tight">Get in Touch</h2>
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    Whether you're a reader with a question or a creator looking to collaborate,
                                    reach out through any of these channels.
                                </p>
                            </div>

                            <div className="grid gap-8">
                                <div className="flex gap-6 items-start">
                                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-bold text-lg">Email Us</h4>
                                        <p className="text-muted-foreground italic">For general inquiries and support.</p>
                                        <p className="font-medium text-primary">hello@blogify.com</p>
                                    </div>
                                </div>
                                <div className="flex gap-6 items-start">
                                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <Phone className="h-6 w-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-bold text-lg">Call Us</h4>
                                        <p className="text-muted-foreground italic">Mon-Fri from 9am to 6pm.</p>
                                        <p className="font-medium text-primary">+1 (555) 000-0000</p>
                                    </div>
                                </div>
                                <div className="flex gap-6 items-start">
                                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <MapPin className="h-6 w-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-bold text-lg">Visit Us</h4>
                                        <p className="text-muted-foreground italic">Our headquarters in the heart of the city.</p>
                                        <p className="font-medium text-primary">123 Creative Way, Story City, ST 12345</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <Card className="border-none shadow-2xl rounded-3xl bg-card overflow-hidden">
                            <CardHeader className="p-8 pb-4">
                                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                                    <MessageSquare className="h-6 w-6 text-primary" />
                                    Send us a Message
                                </CardTitle>
                                <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-8 pt-4">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                                <User className="h-4 w-4" /> Full Name
                                            </Label>
                                            <Input id="name" placeholder="John Doe" className="h-12 rounded-xl" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                                <AtSign className="h-4 w-4" /> Email Address
                                            </Label>
                                            <Input id="email" type="email" placeholder="john@example.com" className="h-12 rounded-xl" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="subject" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Subject</Label>
                                        <Input id="subject" placeholder="How can we help?" className="h-12 rounded-xl" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="message" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Message</Label>
                                        <Textarea
                                            id="message"
                                            placeholder="Write your message here..."
                                            className="min-h-[150px] rounded-xl p-4"
                                            required
                                        />
                                    </div>
                                    <Button type="submit" className="w-full h-14 rounded-xl text-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform" disabled={loading}>
                                        {loading ? "Sending..." : (
                                            <>
                                                <Send className="mr-2 h-5 w-5" /> Send Message
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default ContactPage
