import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveLeft, Home, Search } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex flex-1 items-center justify-center p-4">
                <div className="container flex max-w-2xl flex-col items-center gap-8 text-center">
                    {/* Animated 404 Illustration */}
                    <div className="relative flex flex-col items-center">
                        <h1 className="text-[120px] font-black leading-none tracking-tighter text-primary/10 sm:text-[180px]">
                            404
                        </h1>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-primary/20 blur-3xl animate-pulse" />
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-y-2">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-card shadow-xl ring-1 ring-border sm:h-20 sm:w-20">
                                <Search className="h-8 w-8 text-primary sm:h-10 sm:w-10" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                            Page Not Found
                        </h2>
                        <p className="mx-auto max-w-md text-lg text-muted-foreground">
                            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Button asChild size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20">
                            <Link href="/">
                                <Home className="mr-2 h-4 w-4" /> Go back home
                            </Link>
                        </Button>
                        <Button variant="outline" size="lg" className="rounded-full px-8" asChild>
                            <Link href="/Blogs">
                                <Search className="mr-2 h-4 w-4" /> Browse Posts
                            </Link>
                        </Button>
                    </div>

                    <div className="mt-8 border-t pt-8">
                        <p className="text-sm text-muted-foreground">
                            Need help? <Link href="/contact" className="font-semibold text-primary underline-offset-4 hover:underline">Contact our support team</Link>
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
