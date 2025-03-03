"use client"

import { useState } from "react"
import { Plus, Share2, Users } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

interface NoteCollaboratorsProps {
  notebookId: string
}

export function NoteCollaborators({ notebookId }: NoteCollaboratorsProps) {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [permission, setPermission] = useState("view")
  const [isInviting, setIsInviting] = useState(false)

  // Mock data for demonstration
  const collaborators = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      avatar: "/placeholder.svg",
      permission: "edit",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: "/placeholder.svg",
      permission: "view",
    },
  ]

  const handleInvite = async () => {
    if (!email) return

    setIsInviting(true)

    try {
      // In a real app, you would call your API to invite a collaborator
      // await inviteCollaborator(notebookId, email, permission)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Invitation sent",
        description: `Invitation sent to ${email} successfully.`,
      })

      setEmail("")
      setIsOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsInviting(false)
    }
  }

  const handleCopyShareLink = () => {
    // In a real app, you would generate a share link
    const shareLink = `https://yourapp.com/shared/${notebookId}`

    navigator.clipboard.writeText(shareLink)

    toast({
      title: "Link copied",
      description: "Share link copied to clipboard.",
    })
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex -space-x-2">
        {collaborators.map((collaborator) => (
          <Avatar key={collaborator.id} className="h-8 w-8 border-2 border-background">
            <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
            <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
          </Avatar>
        ))}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add collaborator</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Collaborators</DialogTitle>
              <DialogDescription>Invite others to collaborate on this notebook.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <h4 className="font-medium">Current collaborators</h4>
                <div className="space-y-2">
                  {collaborators.map((collaborator) => (
                    <div key={collaborator.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                          <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{collaborator.name}</div>
                          <div className="text-xs text-muted-foreground">{collaborator.email}</div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground capitalize">{collaborator.permission}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Invite new collaborator</h4>
                <div className="flex items-end gap-2">
                  <div className="flex-1 space-y-1">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="permission" className="text-sm font-medium">
                      Permission
                    </label>
                    <Select value={permission} onValueChange={setPermission}>
                      <SelectTrigger id="permission" className="w-[100px]">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="view">View</SelectItem>
                        <SelectItem value="edit">Edit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Or share a link</h4>
                <Button variant="outline" className="w-full justify-start gap-2" onClick={handleCopyShareLink}>
                  <Share2 className="h-4 w-4" />
                  Copy share link
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleInvite} disabled={!email || isInviting}>
                {isInviting ? "Inviting..." : "Invite"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Button variant="outline" size="sm" className="gap-2" onClick={() => setIsOpen(true)}>
        <Users className="h-4 w-4" />
        Collaborate
      </Button>
    </div>
  )
}

