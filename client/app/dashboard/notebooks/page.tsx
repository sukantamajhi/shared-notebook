import type { Metadata } from "next"
import Link from "next/link"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { NotebookList } from "@/components/notebooks/notebook-list"

export const metadata: Metadata = {
  title: "Notebooks",
  description: "Manage your notebooks",
}

export default function NotebooksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notebooks</h1>
          <p className="text-muted-foreground">Create and manage your notebooks.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/notebooks/new">
            <Plus className="mr-2 h-4 w-4" />
            New Notebook
          </Link>
        </Button>
      </div>
      <NotebookList />
    </div>
  )
}

