"use client"
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/company/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/company/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/company/table";
import { Button } from '@/components/ui/company/button';
import { Calendar, Clock, Edit, Filter, Mail, Plus, Trash } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/company/dialog";
import { Input } from '@/components/ui/company/input';
import { Label } from '@/components/ui/company/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/company/select";
import { useToast } from '@/hooks/use-toast';
import axios from "axios";
import { BackendUrl } from "@/utils/constants";


// Sample rounds data
const initialRounds = [
  {
    id: 1,
    name: 'Resume Screening',
    date: '2024-10-15',
    time: '09:00',
    mode: 'Online',
    status: 'completed',
    students: [
      { id: 1, name: 'Rahul Sharma', email: 'rahul.s@example.com', status: 'selected' },
      { id: 2, name: 'Priya Patel', email: 'priya.p@example.com', status: 'selected' },
      { id: 3, name: 'Amit Kumar', email: 'amit.k@example.com', status: 'rejected' },
      { id: 4, name: 'Sneha Gupta', email: 'sneha.g@example.com', status: 'selected' },
      { id: 5, name: 'Vikram Singh', email: 'vikram.s@example.com', status: 'selected' },
    ]
  },
  {
    id: 2,
    name: 'Aptitude Test',
    date: '2024-10-20',
    time: '10:00',
    mode: 'Online',
    status: 'upcoming',
    students: [
      { id: 1, name: 'Rahul Sharma', email: 'rahul.s@example.com', status: 'pending' },
      { id: 2, name: 'Priya Patel', email: 'priya.p@example.com', status: 'pending' },
      { id: 4, name: 'Sneha Gupta', email: 'sneha.g@example.com', status: 'pending' },
      { id: 5, name: 'Vikram Singh', email: 'vikram.s@example.com', status: 'pending' },
    ]
  },
  {
    id: 3,
    name: 'Technical Interview',
    date: '2024-10-25',
    time: '11:00',
    mode: 'Offline',
    status: 'upcoming',
    students: []
  },
  {
    id: 4,
    name: 'HR Interview',
    date: '2024-10-30',
    time: '14:00',
    mode: 'Offline',
    status: 'upcoming',
    students: []
  }
];

const HiringRounds = () => {
  const [rounds, setRounds] = useState(initialRounds);
  const [activeRound, setActiveRound] = useState("1");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentRound, setCurrentRound] = useState({
    id: 0,
    name: '',
    date: '',
    time: '',
    mode: 'Online'
  });
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentRound({
      ...currentRound,
      [name]: value
    });
  };
  
  const handleModeChange = (value: string) => {
    setCurrentRound({
      ...currentRound,
      mode: value
    });
  };
  
  const handleSubmit = () => {
    if (editMode) {
      // Update existing round
      setRounds(rounds.map(round => 
        round.id === currentRound.id ? { ...round, ...currentRound } : round
      ));
      toast({
        title: "Round Updated",
        description: `${currentRound.name} has been updated successfully.`,
        variant: "default",
      });
    } else {
      // Add new round
      const newRound = {
        ...currentRound,
        id: rounds.length + 1,
        status: 'upcoming',
        students: []
      };
      setRounds([...rounds, newRound]);
      toast({
        title: "Round Added",
        description: `${currentRound.name} has been added to the hiring process.`,
        variant: "default",
      });
    }
    
    setDialogOpen(false);
    resetForm();
  };
  
  const resetForm = () => {
    setCurrentRound({
      id: 0,
      name: '',
      date: '',
      time: '',
      mode: 'Online'
    });
    setEditMode(false);
  };
  
  const handleEditRound = (round: any) => {
    setCurrentRound({
      id: round.id,
      name: round.name,
      date: round.date,
      time: round.time,
      mode: round.mode
    });
    setEditMode(true);
    setDialogOpen(true);
  };
  
 

const handleSendResults = async (roundId: number) => {
  const roundInfo = rounds.find((r) => r.id === roundId);
  if (!roundInfo) return;

  const selectedStudents = roundInfo.students.filter((s) => s.status === "selected").length || 0;
  const totalStudents = roundInfo.students.length || 0;

  try {
    const response = await axios.post(
      `${BackendUrl}/api/company/send_email`, // Corrected API endpoint
      {
        to: "2022.ayush.verma@ves.ac.in", // Replace with actual TPO email
        subject: `Results for ${roundInfo.name}`,
        text: `The results for ${roundInfo.name}: ${selectedStudents} out of ${totalStudents} students have been selected.`,
        html: `<p>The results for <strong>${roundInfo.name}</strong>: <strong>${selectedStudents}</strong> out of <strong>${totalStudents}</strong> students have been selected.</p>`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // If required
        },
      }
    );

    // Success toast
    toast({
      title: "Results Sent to TPO",
      description: `The results for ${roundInfo.name} (${selectedStudents} out of ${totalStudents} students selected) have been sent to the TPO.`,
      variant: "default",
    });

    console.log("✅ Email sent:", response.data);
  } catch (error) {
    console.error("❌ Error sending email:", error);

    // Error toast
    toast({
      title: "Failed to Send Results",
      description: "There was an issue sending the results to the TPO. Please try again.",
      variant: "destructive",
    });
  }
};

  
  const handleStudentStatusChange = (roundId: number, studentId: number, newStatus: 'selected' | 'rejected' | 'pending') => {
    setRounds(rounds.map(round => {
      if (round.id === roundId) {
        return {
          ...round,
          students: round.students.map(student => 
            student.id === studentId ? { ...student, status: newStatus } : student
          )
        };
      }
      return round;
    }));
  };
  
  const handleAddSelectedStudents = (currentRoundId: number) => {
    const currentRoundIndex = rounds.findIndex(round => round.id === currentRoundId);
    if (currentRoundIndex <= 0) return; // First round or invalid round
    
    const previousRound = rounds[currentRoundIndex - 1];
    const selectedStudents = previousRound.students.filter(student => student.status === 'selected');
    
    if (selectedStudents.length === 0) {
      toast({
        title: "No Students to Add",
        description: "There are no selected students from the previous round.",
        variant: "destructive",
      });
      return;
    }
    
    const currentRound = rounds[currentRoundIndex];
    const currentStudentIds = new Set(currentRound.students.map(student => student.id));
    
    // Only add students that aren't already in the current round
    const newStudents = selectedStudents.filter(student => !currentStudentIds.has(student.id))
      .map(student => ({ ...student, status: 'pending' }));
    
    if (newStudents.length === 0) {
      toast({
        title: "Students Already Added",
        description: "All selected students from the previous round are already in this round.",
        variant: "default",
      });
      return;
    }
    
    // Update the current round with new students
    const updatedRounds = [...rounds];
    updatedRounds[currentRoundIndex] = {
      ...currentRound,
      students: [...currentRound.students, ...newStudents]
    };
    
    setRounds(updatedRounds);
    
    toast({
      title: "Students Added",
      description: `${newStudents.length} selected students from ${previousRound.name} have been added to ${currentRound.name}.`,
      variant: "default",
    });
  };
  
  // Filter the students based on the search term and status filter
  const getFilteredStudents = (students: any[]) => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           student.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (statusFilter === 'all') return matchesSearch;
      return student.status === statusFilter && matchesSearch;
    });
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Hiring Rounds</h1>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              resetForm();
              setDialogOpen(true);
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Round
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editMode ? 'Edit Hiring Round' : 'Add New Hiring Round'}</DialogTitle>
              <DialogDescription>
                {editMode 
                  ? 'Update the details for this hiring round.' 
                  : 'Add a new round to the hiring process. You can schedule and manage candidates for this round.'
                }
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Round Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={currentRound.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Technical Interview"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={currentRound.date}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    value={currentRound.time}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="mode">Mode</Label>
                <Select value={currentRound.mode} onValueChange={handleModeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Online">Online</SelectItem>
                    <SelectItem value="Offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setDialogOpen(false);
                resetForm();
              }}>Cancel</Button>
              <Button onClick={handleSubmit}>{editMode ? 'Update' : 'Add'} Round</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="1" value={activeRound} onValueChange={setActiveRound}>
        <TabsList className="w-full">
          {rounds.map(round => (
            <TabsTrigger key={round.id} value={String(round.id)} className="flex-grow">
              {round.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {rounds.map(round => (
          <TabsContent key={round.id} value={String(round.id)} className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{round.name}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-6 mt-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>{round.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>{round.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                            {round.mode}
                          </span>
                        </div>
                      </div>
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleEditRound(round)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="default" onClick={() => handleSendResults(round.id)}>
                      <Mail className="h-4 w-4 mr-2" />
                      Send Results to TPO
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">Students</h3>
                    {round.students.filter(s => s.status === 'selected').length > 0 && (
                      <div className="text-sm text-muted-foreground">
                        {round.students.filter(s => s.status === 'selected').length} selected of {round.students.length} total
                      </div>
                    )}
                  </div>
                  
                  {/* Add search and filter controls */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <Input 
                        placeholder="Search students..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Filter className="h-4 w-4 text-gray-500" />
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="max-w-xs">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Students</SelectItem>
                          <SelectItem value="selected">Selected</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {round.students.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getFilteredStudents(round.students).map(student => (
                          <TableRow key={student.id}>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.email}</TableCell>
                            <TableCell>
                              <span className={
                                student.status === 'selected' 
                                  ? 'text-green-600 font-medium' 
                                  : student.status === 'rejected' 
                                    ? 'text-red-600 font-medium' 
                                    : 'text-amber-600 font-medium'
                              }>
                                {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              {student.status === 'pending' && (
                                <div className="flex justify-end gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                    onClick={() => handleStudentStatusChange(round.id, student.id, 'selected')}
                                  >
                                    Select
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => handleStudentStatusChange(round.id, student.id, 'rejected')}
                                  >
                                    Reject
                                  </Button>
                                </div>
                              )}
                              {student.status !== 'pending' && (
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleStudentStatusChange(round.id, student.id, 'pending')}
                                >
                                  Reset
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-10 text-muted-foreground">
                      {round.status === 'upcoming' 
                        ? "Students will be added after previous rounds are completed." 
                        : "No students in this round yet."}
                    </div>
                  )}
                  
                  {getFilteredStudents(round.students).length === 0 && round.students.length > 0 && (
                    <div className="text-center py-4 text-muted-foreground">
                      No students match the current filter criteria.
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <div className="text-sm text-muted-foreground">
                  {round.status === 'completed' 
                    ? "This round has been completed." 
                    : round.status === 'upcoming' 
                      ? "This round is upcoming." 
                      : "This round is in progress."}
                </div>
                {round.status === 'upcoming' && Number(activeRound) > 1 && (
                  <Button 
                    variant="outline"
                    onClick={() => handleAddSelectedStudents(round.id)}
                  >
                    Add Selected Students from Previous Round
                  </Button>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default HiringRounds;
