import type { Metadata } from "next"

import { NoteEditor } from "@/components/notes/note-editor"

export const metadata: Metadata = {
  title: "Notebook",
  description: "View and edit your notebook",
}

export default function NotebookPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <NoteEditor notebookId={params.id} />
    </div>
  )
}

