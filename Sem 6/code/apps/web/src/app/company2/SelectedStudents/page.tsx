"use client";
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/company/table";
import { Button } from '@/components/ui/company/button';
import { Input } from '@/components/ui/company/input';
import { Search, Download, Mail, FileSpreadsheet, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/company/card';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/company/select";
import axios from "axios";
import { BackendUrl } from "@/utils/constants";


// Sample selected students data
const sampleStudents = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul.s@example.com', department: 'Computer Science', cgpa: 8.7, package: '12 LPA', position: 'Software Engineer' },
  { id: 2, name: 'Priya Patel', email: 'priya.p@example.com', department: 'Information Technology', cgpa: 9.2, package: '14 LPA', position: 'Frontend Developer' },
  { id: 3, name: 'Sneha Gupta', email: 'sneha.g@example.com', department: 'Computer Science', cgpa: 8.9, package: '13 LPA', position: 'Backend Developer' },
  { id: 4, name: 'Vikram Singh', email: 'vikram.s@example.com', department: 'Electronics', cgpa: 8.5, package: '10 LPA', position: 'Hardware Engineer' },
  { id: 5, name: 'Ananya Desai', email: 'ananya.d@example.com', department: 'Information Technology', cgpa: 9.0, package: '15 LPA', position: 'Full Stack Developer' },
  { id: 6, name: 'Arjun Mehta', email: 'arjun.m@example.com', department: 'Computer Science', cgpa: 8.8, package: '13.5 LPA', position: 'DevOps Engineer' },
  { id: 7, name: 'Neha Reddy', email: 'neha.r@example.com', department: 'Electronics', cgpa: 8.6, package: '11 LPA', position: 'System Engineer' },
  { id: 8, name: 'Karan Malhotra', email: 'karan.m@example.com', department: 'Mechanical', cgpa: 8.3, package: '9 LPA', position: 'Design Engineer' },
];

const SelectedStudents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState(sampleStudents);
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [positionFilter, setPositionFilter] = useState('all');
  const { toast } = useToast();
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Calculate metrics
  const calculateAveragePackage = () => {
    const packages = students.map(student => parseFloat(student.package.split(' ')[0]));
    const sum = packages.reduce((total, curr) => total + curr, 0);
    return (sum / packages.length).toFixed(2);
  };
  
  const calculateHighestPackage = () => {
    const packages = students.map(student => parseFloat(student.package.split(' ')[0]));
    return Math.max(...packages).toFixed(2);
  };
  
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = departmentFilter === 'all' || student.department === departmentFilter;
    const matchesPosition = positionFilter === 'all' || student.position === positionFilter;
    
    return matchesSearch && matchesDepartment && matchesPosition;
  });
  
  // Get unique departments for filter
  const departments = ['all', ...Array.from(new Set(students.map(student => student.department)))];
  
  // Get unique positions for filter
  const positions = ['all', ...Array.from(new Set(students.map(student => student.position)))];
  
  const handleDownload = () => {
    // Create CSV content
    const headers = ['Name', 'Email', 'Department', 'CGPA', 'Package', 'Position'];
    const rows = filteredStudents.map(student => 
      [student.name, student.email, student.department, student.cgpa, student.package, student.position]
    );
    
    let csvContent = headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.join(',') + '\n';
    });
    
    // Create a blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'selected_students.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Report Downloaded",
      description: "The selected students report has been downloaded as a CSV file.",
      variant: "default",
    });
  };
  
  const handleSendToTPO = async () => {
    if (filteredStudents.length === 0) {
        toast({
            title: "No Students Selected",
            description: "Please select students before sending the report.",
            variant: "destructive",
        });
        return;
    }

    // Construct email body dynamically
    const emailBody = `
        <h3>Final Selected Students Report</h3>
        <p>The following students have been selected for the job:</p>
        <table border="1" cellpadding="5" cellspacing="0">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>CGPA</th>
                    <th>Package</th>
                    <th>Position</th>
                </tr>
            </thead>
            <tbody>
                ${filteredStudents.map(student => `
                    <tr>
                        <td>${student.id}</td>
                        <td>${student.name}</td>
                        <td>${student.email}</td>
                        <td>${student.department}</td>
                        <td>${student.cgpa}</td>
                        <td>${student.package}</td>
                        <td>${student.position}</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
        <p>Regards,</p>
        <p>Campus Recruitment Team</p>
    `;

    try {

      // const response = await axios.get(
      //   `${BackendUrl}/api/company/send-email`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${localStorage.getItem("token")}`,
      //     },
      //   }
      // );
      const response = await axios.post(
        `${BackendUrl}/api/company/send_email`, // Corrected endpoint
        {
          to: "2022.ayush.verma@ves.ac.in", // TPO email
          subject: "Final Selected Students Report",
          text: `The final selected students list (${filteredStudents.length} students) has been sent to the TPO.`,
          html: emailBody, // Send HTML email
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // If required
          },
        }
      );
      
        const result = await response.json();

        if (response.ok) {
            toast({
                title: "Report Sent to TPO",
                description: `The final selected students list (${filteredStudents.length} students) has been sent to the TPO successfully.`,
                variant: "success",
            });
        } else {
            throw new Error(result.message || "Failed to send email");
        }
    } catch (error) {
        console.error("Error sending email:", error);
        toast({
            title: "Error",
            description: "Failed to send report to TPO.",
            variant: "destructive",
        });
    }
};
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Final Selected Students</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download Excel
          </Button>
          <Button onClick={handleSendToTPO}>
            <Mail className="h-4 w-4 mr-2" />
            Send to TPO
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Selected</CardDescription>
            <CardTitle className="text-3xl">{students.length}</CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Average Package</CardDescription>
            <CardTitle className="text-3xl">₹{calculateAveragePackage()} LPA</CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Highest Package</CardDescription>
            <CardTitle className="text-3xl">₹{calculateHighestPackage()} LPA</CardTitle>
          </CardHeader>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search by name, email, department, or position..." 
            className="pl-10"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="max-w-xs">
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.filter(d => d !== 'all').map(dept => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <Select value={positionFilter} onValueChange={setPositionFilter}>
            <SelectTrigger className="max-w-xs">
              <SelectValue placeholder="Filter by position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Positions</SelectItem>
              {positions.filter(p => p !== 'all').map(position => (
                <SelectItem key={position} value={position}>{position}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileSpreadsheet className="h-5 w-5 mr-2" />
            Selected Students Report
          </CardTitle>
          <CardDescription>
            Final list of students who have been selected after all hiring rounds.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>CGPA</TableHead>
                <TableHead>Package</TableHead>
                <TableHead>Position</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map(student => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.department}</TableCell>
                  <TableCell>{student.cgpa}</TableCell>
                  <TableCell className="font-semibold">{student.package}</TableCell>
                  <TableCell>{student.position}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredStudents.length === 0 && (
            <div className="text-center py-10">
              <h3 className="text-lg font-medium text-gray-500">No students found</h3>
              <p className="text-sm text-gray-400">Try adjusting your search criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SelectedStudents;
