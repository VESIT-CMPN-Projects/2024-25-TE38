"use client"

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
} from "@/components/ui/company/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/company/tabs";

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

// Consistent color palette
const THEME_COLORS = {
  primary: '#4F46E5', // indigo-600
  secondary: '#10B981', // emerald-500
  accent1: '#F59E0B', // amber-500
  accent2: '#EF4444', // red-500
  accent3: '#8B5CF6', // violet-500
};

const CHART_COLORS = [
  THEME_COLORS.primary,
  THEME_COLORS.secondary,
  THEME_COLORS.accent1,
  THEME_COLORS.accent2,
  THEME_COLORS.accent3,
];

const Dashboard = () => {
  const [department, setDepartment] = useState('all');

  return (
    <div className="container mx-auto px-4 py-8 space-y-6 transition-all">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
          Placement Dashboard
        </h1>
        <div className="w-full sm:w-auto">
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-full sm:w-[200px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatsCard 
          title="Total Placements" 
          value="1,248" 
          change="12%" 
          trend="up" 
          description="from previous year"
        />
        
        <StatsCard 
          title="Average Package" 
          value="₹8.5 LPA" 
          change="8%" 
          trend="up" 
          description="from previous year"
        />
        
        <StatsCard 
          title="Highest Package" 
          value="₹25 LPA" 
          change="15%" 
          trend="up" 
          description="from previous year"
        />
        
        <StatsCard 
          title="Active Recruiters" 
          value="42" 
          change="5" 
          trend="up" 
          description="new this year"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card className="overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 md:p-6">
            <CardTitle className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">Placements by Year</CardTitle>
            <CardDescription className="text-sm text-gray-500 dark:text-gray-400">Total number of placements over the last 5 years</CardDescription>
          </CardHeader>
          <CardContent className="p-4 md:p-6 h-72 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yearlyData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="year" tick={{ fill: '#6B7280' }} />
                <YAxis tick={{ fill: '#6B7280' }} />
                <Tooltip 
                  formatter={(value) => `${value} students`} 
                  contentStyle={{ backgroundColor: '#FFF', borderRadius: '0.375rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Legend />
                <Bar dataKey="placements" fill={THEME_COLORS.primary} name="Students Placed" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 md:p-6">
            <CardTitle className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">Department-wise Placement</CardTitle>
            <CardDescription className="text-sm text-gray-500 dark:text-gray-400">Distribution of placements across departments</CardDescription>
          </CardHeader>
          <CardContent className="p-4 md:p-6 h-72 md:h-80">
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
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `${value}%`} 
                  contentStyle={{ backgroundColor: '#FFF', borderRadius: '0.375rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-2 overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 md:p-6">
            <CardTitle className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">Maximum Salary Trends</CardTitle>
            <CardDescription className="text-sm text-gray-500 dark:text-gray-400">Highest salary offered over the last 5 years (in LPA)</CardDescription>
          </CardHeader>
          <CardContent className="p-4 md:p-6 h-72 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="year" tick={{ fill: '#6B7280' }} />
                <YAxis tick={{ fill: '#6B7280' }} />
                <Tooltip 
                  formatter={(value) => `₹${value} LPA`} 
                  contentStyle={{ backgroundColor: '#FFF', borderRadius: '0.375rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Legend />
                <Bar dataKey="maxSalary" fill={THEME_COLORS.secondary} name="Maximum Salary (LPA)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Reusable stats card component
const StatsCard = ({ title, value, change, trend, description }:any) => {
  return (
    <Card className="overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
      <CardHeader className="pb-2 p-4 md:p-6">
        <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
          {title}
        </CardDescription>
        <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
          {value}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 px-4 pb-4 md:px-6 md:pb-6">
        <div className={`text-xs font-medium flex items-center ${trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
          {trend === 'up' ? '↑' : '↓'} {change} {description}
        </div>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
