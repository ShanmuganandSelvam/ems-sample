import { OverviewStats } from "@/components/dashboard/overview-stats";
import { AttendanceChart } from "@/components/dashboard/attendance-chart";
import { BreakChart } from "@/components/dashboard/break-chart";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { SystemIdleTable } from "@/components/dashboard/system-idle-table";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <OverviewStats />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <AttendanceChart />
        <BreakChart />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <RecentActivity />
        <SystemIdleTable />
      </div>
    </div>
  );
}
