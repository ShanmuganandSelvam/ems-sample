import { AttendanceTable } from "@/components/dashboard/attendance-table";

export default function AttendancePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Attendance Records</h2>
      </div>
      <AttendanceTable />
    </div>
  );
}
