import type { Metadata } from "next"

import { NotebookList } from "@/components/notebooks/notebook-list"

export const metadata: Metadata = {
  title: "Shared with me",
  description: "Notebooks shared with you",
}

export default function SharedPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Shared with me</h1>
        <p className="text-muted-foreground">Notebooks that others have shared with you.</p>
      </div>
      <NotebookList shared />
    </div>
  )
}

