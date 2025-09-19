"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Clock,
  Coffee,
  Home,
  Users,
  CalendarDays,
  Settings,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  setOpen?: (open: boolean) => void;
}

export function Sidebar({ setOpen }: SidebarProps) {
  const pathname = usePathname();

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Attendance",
      icon: Clock,
      href: "/dashboard/attendance",
      active: pathname === "/dashboard/attendance",
    },
    {
      label: "Break Tracking",
      icon: Coffee,
      href: "/dashboard/breaks",
      active: pathname === "/dashboard/breaks",
    },
    {
      label: "Employees",
      icon: Users,
      href: "/dashboard/employees",
      active: pathname === "/dashboard/employees",
    },
    {
      label: "Reports",
      icon: BarChart3,
      href: "/dashboard/reports",
      active: pathname === "/dashboard/reports",
    },
    {
      label: "Calendar",
      icon: CalendarDays,
      href: "/dashboard/calendar",
      active: pathname === "/dashboard/calendar",
    },
  ];

  return (
    <div className="flex h-full flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-semibold"
          onClick={() => setOpen?.(false)}
        >
          <Clock className="h-6 w-6" />
          <span>AttendanceTrack</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => setOpen?.(false)}
            >
              <Button
                variant={route.active ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  route.active ? "bg-primary text-primary-foreground" : ""
                )}
              >
                <route.icon className="mr-2 h-4 w-4" />
                {route.label}
              </Button>
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <nav className="grid gap-1">
          <Link href="/dashboard/settings" onClick={() => setOpen?.(false)}>
            <Button
              variant="ghost"
              className="w-full justify-start"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
          <Link href="/dashboard/help" onClick={() => setOpen?.(false)}>
            <Button
              variant="ghost"
              className="w-full justify-start"
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              Help & Support
            </Button>
          </Link>
        </nav>
      </div>
    </div>
  );
}
