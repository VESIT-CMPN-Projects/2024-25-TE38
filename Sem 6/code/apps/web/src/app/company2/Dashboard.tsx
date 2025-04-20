
import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data for charts
const yearlyData = [
  { year: '2019', placements: 120 },
  { year: '2020', placements: 150 },
  { year: '2021', placements: 180 },
  { year: '2022', placements: 210 },
  { year: '2023', placements: 250 },
];

const salaryData = [
  { year: '2019', maxSalary: 12 },
  { year: '2020', maxSalary: 15 },
  { year: '2021', maxSalary: 18 },
  { year: '2022', maxSalary: 22 },
  { year: '2023', maxSalary: 25 },
];

const departmentData = [
  { name: 'CSE', value: 45 },
  { name: 'IT', value: 25 },
  { name: 'ECE', value: 15 },
  { name: 'Mechanical', value: 10 },
  { name: 'Others', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Dashboard = () => {
  const [department, setDepartment] = useState('all');

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex items-center gap-4">
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="cse">Computer Science</SelectItem>
              <SelectItem value="it">Information Technology</SelectItem>
              <SelectItem value="ece">Electronics</SelectItem>
              <SelectItem value="mech">Mechanical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Placements</CardDescription>
            <CardTitle className="text-3xl">1,248</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-green-500">↑ 12% from previous year</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Average Package</CardDescription>
            <CardTitle className="text-3xl">₹8.5 LPA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-green-500">↑ 8% from previous year</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Highest Package</CardDescription>
            <CardTitle className="text-3xl">₹25 LPA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-green-500">↑ 15% from previous year</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Recruiters</CardDescription>
            <CardTitle className="text-3xl">42</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-green-500">↑ 5 new this year</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Placements by Year</CardTitle>
            <CardDescription>Total number of placements over the last 5 years</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yearlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value) => `${value} students`} />
                <Legend />
                <Bar dataKey="placements" fill="#3B82F6" name="Students Placed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Department-wise Placement</CardTitle>
            <CardDescription>Distribution of placements across departments</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Maximum Salary Trends</CardTitle>
            <CardDescription>Highest salary offered over the last 5 years (in LPA)</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value) => `₹${value} LPA`} />
                <Legend />
                <Bar dataKey="maxSalary" fill="#10B981" name="Maximum Salary (LPA)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
