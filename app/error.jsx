"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCcw } from "lucide-react"

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex h-[70vh] w-full flex-col items-center justify-center space-y-6 px-4 text-center">
            <div className="rounded-full bg-destructive/10 p-4 text-destructive">
                <AlertCircle className="h-12 w-12" />
            </div>
            <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Something went wrong!</h2>
                <p className="text-muted-foreground max-w-md">
                    We encountered an unexpected error. Don't worry, our team has been notified.
                </p>
            </div>
            <div className="flex gap-4">
                <Button onClick={() => reset()} className="rounded-full px-8">
                    <RefreshCcw className="mr-2 h-4 w-4" /> Try again
                </Button>
                <Button variant="outline" onClick={() => window.location.href = '/'} className="rounded-full px-8">
                    Go Home
                </Button>
            </div>
        </div>
    )
}
