"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

import { NoteCollaborators } from "./note-collaborators"
import { NotePreview } from "./note-preview"

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required.",
  }),
  content: z.string(),
})

interface NoteEditorProps {
  notebookId: string
}

export function NoteEditor({ notebookId }: NoteEditorProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("write")

  // Mock data for demonstration
  const mockNotebook = {
    id: notebookId,
    title: "Project Notes",
    notes: [
      {
        id: "1",
        title: "Getting Started",
        content:
          "# Getting Started\n\nThis is a sample note to help you get started with your project.\n\n## Key Points\n\n- Plan your work\n- Break down tasks\n- Track progress\n\n> Remember to take breaks and stay hydrated!",
        updatedAt: new Date().toISOString(),
      },
    ],
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: mockNotebook.notes[0].title,
      content: mockNotebook.notes[0].content,
    },
  })

  // Auto-save functionality
  useEffect(() => {
    const subscription = form.watch(() => {
      saveNote()
    })
    return () => subscription.unsubscribe()
  }, [form.watch])

  const saveNote = async () => {
    if (form.formState.isDirty) {
      setIsSaving(true)

      try {
        // In a real app, you would call your API to save the note
        // await saveNoteToServer(notebookId, form.getValues())

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        form.formState.isDirty = false
      } catch (error) {
        toast({
          title: "Error saving",
          description: "There was an error saving your note.",
          variant: "destructive",
        })
      } finally {
        setIsSaving(false)
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{mockNotebook.title}</h1>
          <p className="text-muted-foreground">Edit your note and collaborate with others.</p>
        </div>
        <div className="flex items-center gap-2">
          <NoteCollaborators notebookId={notebookId} />
          <Button variant="outline" onClick={() => router.push("/dashboard/notebooks")}>
            Back to Notebooks
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Note Title" className="text-xl font-medium" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Tabs defaultValue="write" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="write">Write</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <div className="text-sm text-muted-foreground">{isSaving ? "Saving..." : "Saved"}</div>
            </div>

            <TabsContent value="write" className="mt-4">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Write your note content here... Markdown is supported."
                        className="min-h-[500px] resize-none font-mono"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </TabsContent>

            <TabsContent value="preview" className="mt-4">
              <div className="rounded-md border p-4">
                <NotePreview content={form.watch("content")} />
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  )
}

