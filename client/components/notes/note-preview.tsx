"use client"

import { useEffect, useState } from "react"

interface NotePreviewProps {
  content: string
}

export function NotePreview({ content }: NotePreviewProps) {
  const [html, setHtml] = useState("")

  useEffect(() => {
    // In a real app, you would use a markdown library like marked or remark
    // This is a simple mock implementation
    const mockMarkdownToHtml = (markdown: string) => {
      const html = markdown
        // Headers
        .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold my-4">$1</h1>')
        .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold my-3">$1</h2>')
        .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold my-2">$1</h3>')
        // Bold
        .replace(/\*\*(.*)\*\*/gm, "<strong>$1</strong>")
        // Italic
        .replace(/\*(.*)\*/gm, "<em>$1</em>")
        // Lists
        .replace(/^- (.*$)/gm, '<li class="ml-4">$1</li>')
        // Blockquotes
        .replace(/^> (.*$)/gm, '<blockquote class="pl-4 border-l-4 border-gray-300 italic my-2">$1</blockquote>')
        // Line breaks
        .replace(/\n/gm, "<br />")

      return html
    }

    setHtml(mockMarkdownToHtml(content))
  }, [content])

  return <div className="prose max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: html }} />
}

