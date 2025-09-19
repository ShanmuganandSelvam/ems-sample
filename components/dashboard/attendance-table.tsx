"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  ArrowUpDown,
  Calendar,
  Clock,
  Download,
  Search,
  X,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

const attendanceData = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    initials: "JD",
    department: "Engineering",
    date: new Date(2023, 5, 15),
    checkIn: new Date(2023, 5, 15, 8, 55),
    checkOut: new Date(2023, 5, 15, 17, 5),
    status: "on-time",
    totalHours: "8h 10m",
  },
  {
    id: 2,
    name: "Sarah Smith",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    initials: "SS",
    department: "Marketing",
    date: new Date(2023, 5, 15),
    checkIn: new Date(2023, 5, 15, 9, 10),
    checkOut: new Date(2023, 5, 15, 17, 30),
    status: "late",
    totalHours: "8h 20m",
  },
  {
    id: 3,
    name: "Mike Johnson",
    avatar: "https://randomuser.me/api/portraits/men/86.jpg",
    initials: "MJ",
    department: "Sales",
    date: new Date(2023, 5, 15),
    checkIn: new Date(2023, 5, 15, 8, 45),
    checkOut: new Date(2023, 5, 15, 16, 50),
    status: "on-time",
    totalHours: "8h 5m",
  },
  {
    id: 4,
    name: "Emily Davis",
    avatar: "https://randomuser.me/api/portraits/women/67.jpg",
    initials: "ED",
    department: "HR",
    date: new Date(2023, 5, 15),
    checkIn: null,
    checkOut: null,
    status: "absent",
    totalHours: "0h 0m",
  },
  {
    id: 5,
    name: "Alex Wilson",
    avatar: "https://randomuser.me/api/portraits/men/54.jpg",
    initials: "AW",
    department: "Customer Support",
    date: new Date(2023, 5, 15),
    checkIn: new Date(2023, 5, 15, 8, 50),
    checkOut: new Date(2023, 5, 15, 17, 0),
    status: "on-time",
    totalHours: "8h 10m",
  },
  {
    id: 6,
    name: "Lisa Brown",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    initials: "LB",
    department: "Design",
    date: new Date(2023, 5, 15),
    checkIn: new Date(2023, 5, 15, 9, 20),
    checkOut: new Date(2023, 5, 15, 17, 45),
    status: "late",
    totalHours: "8h 25m",
  },
  {
    id: 7,
    name: "Robert Taylor",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    initials: "RT",
    department: "Engineering",
    date: new Date(2023, 5, 15),
    checkIn: new Date(2023, 5, 15, 8, 30),
    checkOut: new Date(2023, 5, 15, 16, 45),
    status: "on-time",
    totalHours: "8h 15m",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "on-time":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "late":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
    case "absent":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300";
  }
};

export function AttendanceTable() {
  const [data] = useState(attendanceData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "checkIn" | "checkOut" | "totalHours">("checkIn");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(2023, 5, 15));

  const handleSort = (column: "name" | "checkIn" | "checkOut" | "totalHours") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const filteredData = data
    .filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.department.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDate = selectedDate 
        ? item.date.toDateString() === selectedDate.toDateString()
        : true;
      
      return matchesSearch && matchesDate;
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy === "checkIn") {
        if (!a.checkIn) return sortOrder === "asc" ? 1 : -1;
        if (!b.checkIn) return sortOrder === "asc" ? -1 : 1;
        return sortOrder === "asc"
          ? a.checkIn.getTime() - b.checkIn.getTime()
          : b.checkIn.getTime() - a.checkIn.getTime();
      } else if (sortBy === "checkOut") {
        if (!a.checkOut) return sortOrder === "asc" ? 1 : -1;
        if (!b.checkOut) return sortOrder === "asc" ? -1 : 1;
        return sortOrder === "asc"
          ? a.checkOut.getTime() - b.checkOut.getTime()
          : b.checkOut.getTime() - a.checkOut.getTime();
      } else {
        // Sort by total hours (convert "8h 10m" to minutes for comparison)
        const getMinutes = (timeStr: string) => {
          const match = timeStr.match(/(\d+)h\s+(\d+)m/);
          if (!match) return 0;
          return parseInt(match[1]) * 60 + parseInt(match[2]);
        };
        const aMinutes = getMinutes(a.totalHours);
        const bMinutes = getMinutes(b.totalHours);
        return sortOrder === "asc" ? aMinutes - bMinutes : bMinutes - aMinutes;
      }
    });

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div>
            <CardTitle>Attendance Records</CardTitle>
            <CardDescription>
              Complete attendance log with check-in/check-out times
            </CardDescription>
          </div>
          <Button variant="outline" className="sm:ml-auto">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search employees or departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={() => setSearchTerm("")}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <Calendar className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("name")}
                    className="flex items-center p-0 h-auto font-medium"
                  >
                    Employee
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Department</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("checkIn")}
                    className="flex items-center p-0 h-auto font-medium"
                  >
                    Check In
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("checkOut")}
                    className="flex items-center p-0 h-auto font-medium"
                  >
                    Check Out
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("totalHours")}
                    className="flex items-center p-0 h-auto font-medium"
                  >
                    Total Hours
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No attendance records found
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
                      {item.checkIn ? (
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          {format(item.checkIn, "h:mm a")}
                        </div>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell>
                      {item.checkOut ? (
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          {format(item.checkOut, "h:mm a")}
                        </div>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getStatusColor(item.status)}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.totalHours}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
