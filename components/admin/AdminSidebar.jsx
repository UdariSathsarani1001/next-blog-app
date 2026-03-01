"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    FileText,
    PlusCircle,
    Settings,
    LogOut,
    Users
} from 'lucide-react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton
} from '@/components/ui/sidebar'
import { signOut } from 'next-auth/react'

const AdminSidebar = () => {
    const pathname = usePathname()

    const navItems = [
        { label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
        { label: 'All Blogs', icon: FileText, href: '/admin/blogList' },
        { label: 'Add Blog', icon: PlusCircle, href: '/admin/addProduct' },
        { label: 'Subscriptions', icon: Users, href: '/admin/subscriptions' },
        { label: 'Settings', icon: Settings, href: '/admin/settings' },
    ]

    return (
        <Sidebar variant="inset" collapsible="icon">
            <SidebarHeader className="p-4">
                <Link href="/admin/dashboard" className="flex items-center gap-2 overflow-hidden border-b pb-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <FileText className="h-5 w-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">Admin<span className="text-muted-foreground font-normal">Panel</span></span>
                </Link>
            </SidebarHeader>
            <SidebarContent className="px-2 py-4">
                <SidebarMenu>
                    {navItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                            <SidebarMenuButton
                                asChild
                                isActive={pathname === item.href}
                                tooltip={item.label}
                                className="h-11 rounded-lg px-4 transition-all data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
                            >
                                <Link href={item.href} className="flex items-center gap-3">
                                    <item.icon className="h-5 w-5" />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="p-4 border-t">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className="h-11 rounded-lg px-4 text-destructive hover:bg-destructive/10 hover:text-destructive w-full justify-start"
                        >
                            <LogOut className="h-5 w-5 mr-3" />
                            <span className="font-medium">Logout</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AdminSidebar
