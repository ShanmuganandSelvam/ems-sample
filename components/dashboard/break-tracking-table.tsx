"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  ArrowUpDown,
  Calendar,
  Clock,
  Coffee,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const breakData = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    initials: "JD",
    department: "Engineering",
    date: new Date(2023, 5, 15),
    startTime: new Date(2023, 5, 15, 10, 30),
    endTime: new Date(2023, 5, 15, 10, 45),
    duration: 15,
    type: "coffee",
  },
  {
    id: 2,
    name: "Sarah Smith",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    initials: "SS",
    department: "Marketing",
    date: new Date(2023, 5, 15),
    startTime: new Date(2023, 5, 15, 12, 0),
    endTime: new Date(2023, 5, 15, 12, 45),
    duration: 45,
    type: "lunch",
  },
  {
    id: 3,
    name: "Mike Johnson",
    avatar: "https://randomuser.me/api/portraits/men/86.jpg",
    initials: "MJ",
    department: "Sales",
    date: new Date(2023, 5, 15),
    startTime: new Date(2023, 5, 15, 15, 0),
    endTime: new Date(2023, 5, 15, 15, 10),
    duration: 10,
    type: "personal",
  },
  {
    id: 4,
    name: "Emily Davis",
    avatar: "https://randomuser.me/api/portraits/women/67.jpg",
    initials: "ED",
    department: "HR",
    date: new Date(2023, 5, 15),
    startTime: new Date(2023, 5, 15, 11, 30),
    endTime: new Date(2023, 5, 15, 11, 40),
    duration: 10,
    type: "coffee",
  },
  {
    id: 5,
    name: "Alex Wilson",
    avatar: "https://randomuser.me/api/portraits/men/54.jpg",
    initials: "AW",
    department: "Customer Support",
    date: new Date(2023, 5, 15),
    startTime: new Date(2023, 5, 15, 13, 0),
    endTime: new Date(2023, 5, 15, 13, 30),
    duration: 30,
    type: "lunch",
  },
  {
    id: 6,
    name: "Lisa Brown",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    initials: "LB",
    department: "Design",
    date: new Date(2023, 5, 15),
    startTime: new Date(2023, 5, 15, 14, 15),
    endTime: new Date(2023, 5, 15, 14, 30),
    duration: 15,
    type: "personal",
  },
  {
    id: 7,
    name: "Robert Taylor",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    initials: "RT",
    department: "Engineering",
    date: new Date(2023, 5, 15),
    startTime: new Date(2023, 5, 15, 16, 0),
    endTime: new Date(2023, 5, 15, 16, 15),
    duration: 15,
    type: "coffee",
  },
];

const getBreakTypeColor = (type: string) => {
  switch (type) {
    case "coffee":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "lunch":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "personal":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
    default:
      return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300";
  }
};

export function BreakTrackingTable() {
  const [data] = useState(breakData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "startTime" | "duration">("startTime");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(2023, 5, 15));
  const [breakTypeFilter, setBreakTypeFilter] = useState<string>("all");

  const handleSort = (column: "name" | "startTime" | "duration") => {
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
      
      const matchesType = breakTypeFilter === "all" || item.type === breakTypeFilter;
      
      return matchesSearch && matchesDate && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy === "startTime") {
        return sortOrder === "asc"
          ? a.startTime.getTime() - b.startTime.getTime()
          : b.startTime.getTime() - a.startTime.getTime();
      } else {
        return sortOrder === "asc"
          ? a.duration - b.duration
          : b.duration - a.duration;
      }
    });

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div>
            <CardTitle>Break Tracking</CardTitle>
            <CardDescription>
              Comprehensive break tracking with start/end times
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
          <Select
            value={breakTypeFilter}
            onValueChange={setBreakTypeFilter}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Break type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="coffee">Coffee</SelectItem>
              <SelectItem value="lunch">Lunch</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
            </SelectContent>
          </Select>
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
                    onClick={() => handleSort("startTime")}
                    className="flex items-center p-0 h-auto font-medium"
                  >
                    Start Time
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>End Time</TableHead>
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
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No break records found
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
                        {format(item.startTime, "h:mm a")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        {format(item.endTime, "h:mm a")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Coffee className="mr-2 h-4 w-4 text-muted-foreground" />
                        {item.duration}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getBreakTypeColor(item.type)}
                      >
                        {item.type}
                      </Badge>
                    </TableCell>
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
