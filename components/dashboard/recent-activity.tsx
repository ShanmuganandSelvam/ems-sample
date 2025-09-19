"use client";

import { useState } from "react";
import { format } from "date-fns";
import { 
  ArrowDownUp, 
  Clock, 
  Coffee, 
  LogOut, 
  MoreHorizontal, 
  UserCheck 
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const activities = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    initials: "JD",
    action: "checked in",
    time: new Date(2023, 5, 15, 8, 55),
    status: "on-time",
    icon: UserCheck,
  },
  {
    id: 2,
    name: "Sarah Smith",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    initials: "SS",
    action: "started break",
    time: new Date(2023, 5, 15, 10, 30),
    status: "break",
    icon: Coffee,
  },
  {
    id: 3,
    name: "Mike Johnson",
    avatar: "https://randomuser.me/api/portraits/men/86.jpg",
    initials: "MJ",
    action: "ended break",
    time: new Date(2023, 5, 15, 11, 0),
    status: "active",
    icon: Clock,
  },
  {
    id: 4,
    name: "Emily Davis",
    avatar: "https://randomuser.me/api/portraits/women/67.jpg",
    initials: "ED",
    action: "checked out",
    time: new Date(2023, 5, 15, 17, 0),
    status: "inactive",
    icon: LogOut,
  },
  {
    id: 5,
    name: "Alex Wilson",
    avatar: "https://randomuser.me/api/portraits/men/54.jpg",
    initials: "AW",
    action: "checked in",
    time: new Date(2023, 5, 15, 9, 10),
    status: "late",
    icon: UserCheck,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "on-time":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "late":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
    case "break":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "inactive":
      return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300";
    default:
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
  }
};

export function RecentActivity() {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  
  const sortedActivities = [...activities].sort((a, b) => {
    return sortOrder === "desc" 
      ? b.time.getTime() - a.time.getTime() 
      : a.time.getTime() - b.time.getTime();
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="flex-1">
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Employee status changes and activities
          </CardDescription>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSortOrder}
          className="ml-auto"
        >
          <ArrowDownUp className="h-4 w-4" />
          <span className="sr-only">Sort by date</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedActivities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div
                key={activity.id}
                className="flex items-center justify-between space-x-4"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={activity.avatar} alt={activity.name} />
                    <AvatarFallback>{activity.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{activity.name}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Icon className="mr-1 h-3 w-3" />
                      <span>{activity.action}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className={getStatusColor(activity.status)}>
                    {activity.status}
                  </Badge>
                  <div className="text-xs text-muted-foreground">
                    {format(activity.time, "h:mm a")}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Contact employee</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
