"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { Trash2, Mail } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const SubscriptionsPage = () => {
  const [emails, setEmails] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchEmails = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/email')
      setEmails(response.data.emails)
    } catch (error) {
      console.error("Error fetching emails:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteEmail = async (mongoId) => {
    if (!confirm("Are you sure you want to remove this subscriber?")) return

    try {
      const response = await axios.delete('/api/email', {
        params: { id: mongoId }
      })
      if (response.data.success) {
        toast({
          title: "Subscriber Removed",
          description: response.data.msg,
        })
        fetchEmails()
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove the subscriber.",
      })
    }
  }

  useEffect(() => {
    fetchEmails()
  }, [])

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Email Subscriptions</h2>
        <p className="text-muted-foreground">Manage your newsletter audience and growth.</p>
      </div>

      <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-card/50 backdrop-blur-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Email Address</TableHead>
                <TableHead className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Date Subscribed</TableHead>
                <TableHead className="text-right px-6 py-4 font-semibold uppercase tracking-wider text-xs">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="px-6 py-4"><div className="h-4 w-64 bg-muted animate-pulse rounded" /></TableCell>
                    <TableCell className="px-6 py-4"><div className="h-4 w-24 bg-muted animate-pulse rounded" /></TableCell>
                    <TableCell className="px-6 py-4 text-right"><div className="h-8 w-8 bg-muted animate-pulse rounded ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : emails.length > 0 ? (
                emails.map((item) => (
                  <TableRow key={item._id} className="hover:bg-muted/30 transition-colors group">
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <Mail className="h-4 w-4" />
                        </div>
                        <span className="font-medium">{item.email}</span>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </TableCell>
                    <TableCell className="text-right px-6 py-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => deleteEmail(item._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="h-64 text-center">
                    <p className="text-lg font-medium text-muted-foreground">No subscriptions yet.</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default SubscriptionsPage