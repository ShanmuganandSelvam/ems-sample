"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  MoreHorizontal,
  ArrowUpDown,
  ChevronDown,
  Clock,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const idleData = [
  {
    id: 1,
    name: "Mike Johnson",
    avatar: "https://randomuser.me/api/portraits/men/86.jpg",
    initials: "MJ",
    department: "Engineering",
    duration: 25,
    startTime: new Date(2023, 5, 15, 10, 30),
    status: "resolved",
  },
  {
    id: 2,
    name: "Emily Davis",
    avatar: "https://randomuser.me/api/portraits/women/67.jpg",
    initials: "ED",
    department: "Marketing",
    duration: 18,
    startTime: new Date(2023, 5, 15, 11, 45),
    status: "active",
  },
  {
    id: 3,
    name: "Alex Wilson",
    avatar: "https://randomuser.me/api/portraits/men/54.jpg",
    initials: "AW",
    department: "Sales",
    duration: 32,
    startTime: new Date(2023, 5, 15, 14, 15),
    status: "active",
  },
  {
    id: 4,
    name: "Sarah Smith",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    initials: "SS",
    department: "Customer Support",
    duration: 15,
    startTime: new Date(2023, 5, 15, 15, 30),
    status: "resolved",
  },
  {
    id: 5,
    name: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    initials: "JD",
    department: "HR",
    duration: 22,
    startTime: new Date(2023, 5, 15, 16, 0),
    status: "active",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    case "resolved":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    default:
      return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300";
  }
};

export function SystemIdleTable() {
  const [data, setData] = useState(idleData);
  const [sortBy, setSortBy] = useState<"duration" | "startTime">("duration");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const handleSort = (column: "duration" | "startTime") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  const filteredData = data
    .filter((item) => statusFilter === "all" || item.status === statusFilter)
    .sort((a, b) => {
      if (sortBy === "duration") {
        return sortOrder === "asc" ? a.duration - b.duration : b.duration - a.duration;
      } else {
        return sortOrder === "asc"
          ? a.startTime.getTime() - b.startTime.getTime()
          : b.startTime.getTime() - a.startTime.getTime();
      }
    });

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div>
            <CardTitle>Time Away From System</CardTitle>
            <CardDescription>
              Employees with extended system idle time
            </CardDescription>
          </div>
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("duration")}
                  className="flex items-center p-0 h-auto font-medium"
                >
                  Duration (min)
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("startTime")}
                  className="flex items-center p-0 h-auto font-medium"
                >
                  Start Time
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No idle time records found
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={item.avatar} alt={item.name} />
                        <AvatarFallback>{item.initials}</AvatarFallback>
                      </Avatar>
                      <div>{item.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{item.department}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      {item.duration}
                    </div>
                  </TableCell>
                  <TableCell>{format(item.startTime, "h:mm a")}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getStatusColor(item.status)}
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Contact employee</DropdownMenuItem>
                        <DropdownMenuItem>Mark as resolved</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
