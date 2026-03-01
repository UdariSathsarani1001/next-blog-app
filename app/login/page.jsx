"use client"

import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from '@/hooks/use-toast'
import { LogIn, Loader2 } from 'lucide-react'
import Link from 'next/link'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false
            })

            if (res.error) {
                toast({
                    variant: "destructive",
                    title: "Login Failed",
                    description: res.error,
                })
            } else {
                toast({
                    title: "Success",
                    description: "Redirecting to dashboard...",
                })
                router.push('/admin/dashboard')
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
        <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
            <Card className="w-full max-w-md border-none shadow-2xl rounded-2xl overflow-hidden">
                <CardHeader className="space-y-2 bg-primary text-primary-foreground py-10 text-center">
                    <div className="mx-auto bg-primary-foreground/10 p-3 rounded-full w-fit mb-4">
                        <LogIn className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-3xl font-bold tracking-tight">Admin Login</CardTitle>
                    <CardDescription className="text-primary-foreground/80">
                        Enter your credentials to access the dashboard
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-8 px-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-11 rounded-lg"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="h-11 rounded-lg"
                            />
                        </div>
                        <Button type="submit" className="w-full h-11 text-base font-semibold rounded-lg transition-all hover:scale-[1.02]" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Logging in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="pb-8 pt-2 px-8 flex flex-col space-y-4">
                    <Separator className="my-2" />
                    <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors text-center w-full">
                        ← Back to Home
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}

function Separator({ className }) {
    return <div className={`h-[1px] w-full bg-border ${className}`} />
}

export default LoginPage
