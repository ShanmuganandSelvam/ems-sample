import { BreakTrackingTable } from "@/components/dashboard/break-tracking-table";

export default function BreaksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Break Management</h2>
      </div>
      <BreakTrackingTable />
    </div>
  );
}
