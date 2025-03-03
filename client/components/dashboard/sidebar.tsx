"use client"

import Link from "next/link"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

import { DashboardNav } from "./nav"

export function DashboardSidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r md:flex">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard/notebooks/new" className="flex w-full items-center gap-1">
          <Button className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            New Notebook
          </Button>
        </Link>
      </div>
      <ScrollArea className="flex-1 px-2 py-4">
        <DashboardNav />
      </ScrollArea>
    </aside>
  )
}

