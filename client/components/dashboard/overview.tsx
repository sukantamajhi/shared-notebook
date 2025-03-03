"use client"

import Link from "next/link"
import { Book, Clock, Share2, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { NotebookList } from "../notebooks/notebook-list"

export function DashboardOverview() {
  // Mock data for demonstration
  const stats = [
    {
      title: "Total Notebooks",
      value: "12",
      icon: Book,
      description: "Across all your projects",
    },
    {
      title: "Shared Notebooks",
      value: "4",
      icon: Share2,
      description: "Notebooks you've shared with others",
    },
    {
      title: "Collaborators",
      value: "7",
      icon: Users,
      description: "People you're working with",
    },
    {
      title: "Recent Activity",
      value: "23",
      icon: Clock,
      description: "Changes in the last 30 days",
    },
  ]

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Notebooks</CardTitle>
            <CardDescription>Your recently updated notebooks</CardDescription>
          </CardHeader>
          <CardContent>
            <NotebookList limit={5} />
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard/notebooks">View all notebooks</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Shared with me</CardTitle>
            <CardDescription>Notebooks shared by others</CardDescription>
          </CardHeader>
          <CardContent>
            <NotebookList shared limit={5} />
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard/shared">View all shared notebooks</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

