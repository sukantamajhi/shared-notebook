"use client"
import Link from "next/link"
import { MoreHorizontal, Share2 } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"

interface NotebookListProps {
  shared?: boolean
  limit?: number
}

export function NotebookList({ shared = false, limit }: NotebookListProps) {
  const { toast } = useToast()

  // Mock data for demonstration
  const mockNotebooks = [
    {
      id: "1",
      title: "Project Notes",
      updatedAt: "2023-05-15T10:00:00Z",
      owner: {
        name: "You",
        avatar: "/placeholder.svg",
      },
      collaborators: 2,
    },
    {
      id: "2",
      title: "Meeting Minutes",
      updatedAt: "2023-05-14T14:30:00Z",
      owner: {
        name: "You",
        avatar: "/placeholder.svg",
      },
      collaborators: 0,
    },
    {
      id: "3",
      title: "Research Findings",
      updatedAt: "2023-05-12T09:15:00Z",
      owner: {
        name: "You",
        avatar: "/placeholder.svg",
      },
      collaborators: 3,
    },
    {
      id: "4",
      title: "Product Roadmap",
      updatedAt: "2023-05-10T16:45:00Z",
      owner: {
        name: "Sarah K.",
        avatar: "/placeholder.svg",
      },
      collaborators: 5,
      shared: true,
    },
    {
      id: "5",
      title: "Design System",
      updatedAt: "2023-05-08T11:20:00Z",
      owner: {
        name: "Mike T.",
        avatar: "/placeholder.svg",
      },
      collaborators: 4,
      shared: true,
    },
    {
      id: "6",
      title: "Marketing Strategy",
      updatedAt: "2023-05-05T13:10:00Z",
      owner: {
        name: "Lisa R.",
        avatar: "/placeholder.svg",
      },
      collaborators: 2,
      shared: true,
    },
  ]

  const notebooks = shared
    ? mockNotebooks.filter((notebook) => notebook.shared)
    : mockNotebooks.filter((notebook) => !notebook.shared)

  const displayedNotebooks = limit ? notebooks.slice(0, limit) : notebooks

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  const handleDelete = (id: string) => {
    toast({
      title: "Notebook deleted",
      description: "The notebook has been deleted successfully.",
    })
  }

  const handleShare = (id: string) => {
    toast({
      title: "Share link copied",
      description: "The share link has been copied to your clipboard.",
    })
  }

  if (displayedNotebooks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <p className="text-muted-foreground">No notebooks found</p>
        <Button asChild className="mt-4">
          <Link href="/dashboard/notebooks/new">Create a notebook</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {displayedNotebooks.map((notebook) => (
        <div key={notebook.id} className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50">
          <Link href={`/dashboard/notebooks/${notebook.id}`} className="flex flex-1 items-center gap-3">
            <div className="flex-1 space-y-1 truncate">
              <div className="font-medium">{notebook.title}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <span>Updated {formatDate(notebook.updatedAt)}</span>
                {notebook.collaborators > 0 && (
                  <>
                    <span className="mx-1">•</span>
                    <Share2 className="mr-1 h-3 w-3" />
                    <span>
                      {notebook.collaborators} collaborator{notebook.collaborators !== 1 ? "s" : ""}
                    </span>
                  </>
                )}
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={notebook.owner.avatar} alt={notebook.owner.name} />
              <AvatarFallback>{notebook.owner.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleShare(notebook.id)}>Share</DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/notebooks/${notebook.id}/edit`}>Edit</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleDelete(notebook.id)}
                  className="text-destructive focus:text-destructive"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  )
}

