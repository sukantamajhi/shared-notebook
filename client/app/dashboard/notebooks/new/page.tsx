import type { Metadata } from "next"

import { NewNotebookForm } from "@/components/notebooks/new-notebook-form"

export const metadata: Metadata = {
  title: "New Notebook",
  description: "Create a new notebook",
}

export default function NewNotebookPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New Notebook</h1>
        <p className="text-muted-foreground">Create a new notebook to organize your notes.</p>
      </div>
      <NewNotebookForm />
    </div>
  )
}

