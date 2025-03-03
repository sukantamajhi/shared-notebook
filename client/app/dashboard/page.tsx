import type { Metadata } from "next"

import { DashboardOverview } from "@/components/dashboard/overview"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your notebooks and notes",
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Manage your notebooks and collaborate with others.</p>
      </div>
      <DashboardOverview />
    </div>
  )
}

