import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const Hero = () => {
    return (
        <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_50%,rgba(var(--primary),0.05)_0%,transparent_100%)]"></div>
            <div className="container relative text-center px-4">
                <div className="mx-auto max-w-3xl space-y-6 md:space-y-8">
                    <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs md:text-sm font-semibold text-primary">
                        ✨ Discover the latest insights
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
                        Unleash Your <span className="text-primary italic">Creative</span> Potential
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-muted-foreground sm:text-xl leading-relaxed">
                        Explore expert-curated content on design, technology, and personal growth. Join our community of lifelong learners.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button size="lg" className="w-full sm:w-auto rounded-full px-8">
                            Start Reading <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8">
                            Join Newsletter
                        </Button>
                    </div>
                </div>
            </div>
            <div className="absolute top-1/2 left-0 h-48 w-48 md:h-64 md:w-64 -translate-y-1/2 -translate-x-1/2 rounded-full bg-primary/10 blur-[80px] md:blur-[100px]"></div>
            <div className="absolute bottom-0 right-0 h-48 w-48 md:h-64 md:w-64 translate-y-1/2 translate-x-1/2 rounded-full bg-primary/10 blur-[80px] md:blur-[100px]"></div>
        </section>
    )
}

export default Hero
