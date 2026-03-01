import BlogList from "@/components/blog/BlogList";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <BlogList />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
