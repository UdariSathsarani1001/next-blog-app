import AdminSidebar from "@/components/admin/AdminSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export default function Layout({ children }) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen bg-muted/30 w-full">
                <AdminSidebar />
                <SidebarInset className="flex flex-col flex-1 overflow-hidden transition-all duration-300">
                    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur px-8 supports-[backdrop-filter]:bg-background/60">
                        <h1 className="text-xl font-bold tracking-tight">Admin Dashboard</h1>
                        <div className="flex items-center gap-4">
                            <ModeToggle />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex items-center gap-2 outline-none">
                                        <Avatar className="h-9 w-9 border-2 border-primary/10 transition-transform hover:scale-105">
                                            <AvatarImage src="/assets/profile_icon.png" />
                                            <AvatarFallback>AD</AvatarFallback>
                                        </Avatar>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 rounded-xl mt-2">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2">Profile</DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2">Settings</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2 text-destructive">Logout</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </header>
                    <main className="flex-1 overflow-y-auto p-8 lg:p-10">
                        {children}
                    </main>
                </SidebarInset>
            </div>
            <Toaster />
        </SidebarProvider>
    )
}