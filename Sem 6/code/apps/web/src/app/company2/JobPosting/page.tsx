"use client";
import React, { useState, useEffect } from 'react';
import { JobCard } from '@/components/own/Company/jobs/JobCard';
// import { JobCard } from 'C:/Users/mruna/Documents/project/sem6/placenext/apps/web/src/components/own/Company/jobs/JobCard';
import { Button } from '@/components/own/Company/ui/button';
import { PlusCircle, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/company/input';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/company/dialog";
import { Label } from '@/components/ui/company/label';
import { Textarea } from '@/components/ui/company/textarea';
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


// Sample job data
// const sampleJobs = [
//   {
//     id: 1,
//     title: 'FINANCIAL ANALYST',
//     company: 'MORGAN STANLEY',
//     location: 'NAGPUR, INDIA',
//     postDate: '7/10/2024',
//     description: 'ANALYZE FINANCIAL DATA, PREPARE REPORTS, AND ASSIST IN INVESTMENT DECISIONS.',
//     salary: '8'
//   },
//   {
//     id: 2,
//     title: 'SOFTWARE ENGINEER',
//     company: 'J.P. MORGAN & CHASE',
//     location: 'MUMBAI, INDIA',
//     postDate: '28/9/2024',
//     description: 'DEVELOP AND MAINTAIN SOFTWARE SOLUTIONS FOR BANKING OPERATIONS.',
//     salary: '9.5'
//   },
//   {
//     id: 3,
//     title: 'INVESTMENT ANALYST',
//     company: 'NOMURA',
//     location: 'GURGAON',
//     postDate: '2/10/2024',
//     description: 'SUPPORT SENIOR ANALYSTS IN EVALUATING INVESTMENT OPPORTUNITIES.',
//     salary: '9'
//   },
//   {
//     id: 4,
//     title: 'MARKETING SPECIALIST',
//     company: 'GENERAL MILLS',
//     location: 'DELHI',
//     postDate: '20/9/2024',
//     description: 'DEVELOP AND IMPLEMENT MARKETING STRATEGIES FOR CONSUMER PRODUCTS.',
//     salary: '7.5'
//   },
//   {
//     id: 5,
//     title: 'DATA ANALYST',
//     company: 'ACCENTURE',
//     location: 'MUMBAI, INDIA',
//     postDate: '3/10/2024',
//     description: 'ANALYZE BUSINESS DATA AND PROVIDE INSIGHTS FOR STRATEGIC DECISIONS.',
//     salary: '8.5'
//   },
//   {
//     id: 6,
//     title: 'IT CONSULTANT',
//     company: 'CAPGEMINI',
//     location: 'BANGALORE, INDIA',
//     postDate: '25/9/2024',
//     description: 'PROVIDE IT CONSULTING SERVICES TO CLIENTS ACROSS VARIOUS INDUSTRIES.',
//     salary: '8.2'
//   }
// ];
// const [jobs, setJobs] = useState([]);

const JobPostings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [filterJobType, setFilterJobType] = useState('all');
  const { toast } = useToast();
  
  const [newJob, setNewJob] = useState({
    id: 0,
    title: '',
    company: '',
    location: '',
    description: '',
    salary: ''
  });
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${BackendUrl}/api/company/getJobs`);
        setJobs(response.data); // Update state with fetched jobs
        console.log(response)
        console.log("1")
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
  
    fetchJobs();
  }, []);
  
  const [isEditMode, setIsEditMode] = useState(false);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterJobType === 'all') return matchesSearch;
    
    const normalizedTitle = job.title.toLowerCase();
    
    if (filterJobType === 'software' && normalizedTitle.includes('software')) return matchesSearch;
    if (filterJobType === 'data' && (normalizedTitle.includes('data') || normalizedTitle.includes('analyst'))) return matchesSearch;
    if (filterJobType === 'finance' && (normalizedTitle.includes('finance') || normalizedTitle.includes('financial') || normalizedTitle.includes('investment'))) return matchesSearch;
    if (filterJobType === 'marketing' && normalizedTitle.includes('marketing')) return matchesSearch;
    if (filterJobType === 'it' && (normalizedTitle.includes('it') || normalizedTitle.includes('consultant'))) return matchesSearch;
    return false;
  });
  console.log(filteredJobs)

  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };
  
  const handleSubmit = async () => {
    try {
      if (isEditMode) {
        // Update existing job in the database
        try {
          const response = await axios.put(`${BackendUrl}/api/company/updateJob`, newJob);

          setJobs(jobs.map(job => (job._id === response.data._id ? response.data : job)));

          console.log("Job updated successfully");

          toast({
            title: "Job Updated Successfully",
            description: "Your job has been updated and notifications sent to TPO",
          });
        //   const response = await axios.post(${BackendUrl}/api/company/updateJob, newJob);
  
        // setJobs([response.data, ...jobs]);
  
        // toast({
        //   title: "Job Posted Successfully",
        //   description: "Your job has been posted and notifications sent to TPO",
        // });
        }
       catch (error) {
          console.error("Error updating job:", error);
        }
      } else {
        // Add new job to the database
        const jobToAdd = {
          ...newJob,
          postDate: new Date().toLocaleDateString("en-GB"),
        };
  
        const response = await axios.post(`${BackendUrl}/api/company/addJob`, jobToAdd);
  
        setJobs([response.data, ...jobs]);
  
        toast({
          title: "Job Posted Successfully",
          description: "Your job has been posted and notifications sent to TPO",
        });
      }
  
      setOpen(false);
  
      // Reset form
      setNewJob({
        id:0,
        title: "",
        company: "",
        location: "",
        description: "",
        salary: "",
      });
  
      setIsEditMode(false);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    }
  };
  
  const handleEditJob = (id: number) => {
    console.log(id)
    const jobToEdit = jobs.find(job => job._id === id);
    if (jobToEdit) {
      setNewJob(jobToEdit);
      setIsEditMode(true);
      setOpen(true);
    }
  };
  
  const handleDeleteJob = async (id: string) => {
    try {
      console.log("Deleting job with ID:", id);
  
      await axios.delete(`${BackendUrl}/api/company/deleteJob/${id}`);
  
      setJobs(jobs.filter(job => job._id !== id));
  
      toast({
        title: "Job Deleted",
        description: "The job posting has been removed successfully.",
      });
  
      console.log("Job deleted successfully");
    } catch (error) {
      console.error("Error deleting job:", error);
      toast({
        title: "Error Deleting Job",
        description: "Something went wrong. Please try again.",
        status: "error",
      });
    }
  };
   
  const handleFilterChange = (value: string) => {
    setFilterJobType(value);
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Job Postings</h1>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="flex items-center gap-2" onClick={() => {
              setIsEditMode(false);
              setNewJob({
                id: 0,
                title: '',
                company: '',
                location: '',
                description: '',
                salary: ''
              });
            }}>
              <PlusCircle className="h-4 w-4" />
              Post New Job
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{isEditMode ? 'Edit Job Posting' : 'Post New Job'}</DialogTitle>
              <DialogDescription>
                {isEditMode 
                  ? 'Update the job posting details. This will notify the TPO of the changes.'
                  : 'Create a new job posting. This will be visible to students and TPO.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input 
                    id="title" 
                    name="title" 
                    value={newJob.title} 
                    onChange={handleInputChange} 
                    placeholder="e.g. Software Engineer" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input 
                    id="company" 
                    name="company" 
                    value={newJob.company} 
                    onChange={handleInputChange} 
                    placeholder="e.g. Accenture" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    name="location" 
                    value={newJob.location} 
                    onChange={handleInputChange} 
                    placeholder="e.g. Mumbai, India" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary (LPA)</Label>
                  <Input 
                    id="salary" 
                    name="salary" 
                    type="number" 
                    value={newJob.salary} 
                    onChange={handleInputChange} 
                    placeholder="e.g. 8" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={newJob.description} 
                  onChange={handleInputChange} 
                  placeholder="Describe the job responsibilities and requirements..." 
                  className="h-24"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmit}>{isEditMode ? 'Update' : 'Post'} Job</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search jobs by title, company, or location..." 
            className="pl-10"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <Select value={filterJobType} onValueChange={handleFilterChange}>
            <SelectTrigger className="max-w-xs">
              <SelectValue placeholder="Filter by job type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Jobs</SelectItem>
              <SelectItem value="software">Software Engineering</SelectItem>
              <SelectItem value="data">Data Analysis</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="it">IT & Consulting</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {filteredJobs.map(job => (
          <JobCard 
            key={job._id}
            id={job._id}
            title={job.title} 
            company={job.company}
            location={job.location}
            postDate={job.postDate}
            description={job.description}
            salary={job.salary}
            onEdit={handleEditJob}
            onDelete={handleDeleteJob}
          />
        ))}
      </div>
      
      {filteredJobs.length === 0 && (
        <div className="text-center py-10">
          <h3 className="text-lg font-medium text-gray-500">No jobs found</h3>
          <p className="text-sm text-gray-400">Try adjusting your search or post a new job</p>
        </div>
      )}
    </div>
  );
};

export default JobPostings;
// 
// "use client";
// import React, { useState } from 'react';
// import { JobCard } from '@/components/own/Company/jobs/JobCard';
// // import { JobCard } from 'C:/Users/mruna/Documents/project/sem6/placenext/apps/web/src/components/own/Company/jobs/JobCard';
// import { Button } from '@/components/own/Company/ui/button';
// import { PlusCircle, Search, Filter } from 'lucide-react';
// import { Input } from '@/components/ui/company/input';
// import { 
//   Dialog, 
//   DialogContent, 
//   DialogDescription, 
//   DialogFooter, 
//   DialogHeader, 
//   DialogTitle, 
//   DialogTrigger 
// } from "@/components/ui/company/dialog";
// import { Label } from '@/components/ui/company/label';
// import { Textarea } from '@/components/ui/company/textarea';
// import { useToast } from '@/hooks/use-toast';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/company/select";

// // Sample job data
// const sampleJobs = [
//   {
//     id: 1,
//     title: 'FINANCIAL ANALYST',
//     company: 'MORGAN STANLEY',
//     location: 'NAGPUR, INDIA',
//     postDate: '7/10/2024',
//     description: 'ANALYZE FINANCIAL DATA, PREPARE REPORTS, AND ASSIST IN INVESTMENT DECISIONS.',
//     salary: '8'
//   },
//   {
//     id: 2,
//     title: 'SOFTWARE ENGINEER',
//     company: 'J.P. MORGAN & CHASE',
//     location: 'MUMBAI, INDIA',
//     postDate: '28/9/2024',
//     description: 'DEVELOP AND MAINTAIN SOFTWARE SOLUTIONS FOR BANKING OPERATIONS.',
//     salary: '9.5'
//   },
//   {
//     id: 3,
//     title: 'INVESTMENT ANALYST',
//     company: 'NOMURA',
//     location: 'GURGAON',
//     postDate: '2/10/2024',
//     description: 'SUPPORT SENIOR ANALYSTS IN EVALUATING INVESTMENT OPPORTUNITIES.',
//     salary: '9'
//   },
//   {
//     id: 4,
//     title: 'MARKETING SPECIALIST',
//     company: 'GENERAL MILLS',
//     location: 'DELHI',
//     postDate: '20/9/2024',
//     description: 'DEVELOP AND IMPLEMENT MARKETING STRATEGIES FOR CONSUMER PRODUCTS.',
//     salary: '7.5'
//   },
//   {
//     id: 5,
//     title: 'DATA ANALYST',
//     company: 'ACCENTURE',
//     location: 'MUMBAI, INDIA',
//     postDate: '3/10/2024',
//     description: 'ANALYZE BUSINESS DATA AND PROVIDE INSIGHTS FOR STRATEGIC DECISIONS.',
//     salary: '8.5'
//   },
//   {
//     id: 6,
//     title: 'IT CONSULTANT',
//     company: 'CAPGEMINI',
//     location: 'BANGALORE, INDIA',
//     postDate: '25/9/2024',
//     description: 'PROVIDE IT CONSULTING SERVICES TO CLIENTS ACROSS VARIOUS INDUSTRIES.',
//     salary: '8.2'
//   }
// ];

// const JobPostings = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [jobs, setJobs] = useState(sampleJobs);
//   const [open, setOpen] = useState(false);
//   const [filterJobType, setFilterJobType] = useState('all');
//   const { toast } = useToast();
  
//   const [newJob, setNewJob] = useState({
//     id: 0,
//     title: '',
//     company: '',
//     location: '',
//     description: '',
//     salary: ''
//   });
  
//   const [isEditMode, setIsEditMode] = useState(false);
  
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//   };
  
//   const filteredJobs = jobs.filter(job => {
//     const matchesSearch = 
//       job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
//       job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
//     if (filterJobType === 'all') return matchesSearch;
    
//     const normalizedTitle = job.title.toLowerCase();
    
//     if (filterJobType === 'software' && normalizedTitle.includes('software')) return matchesSearch;
//     if (filterJobType === 'data' && (normalizedTitle.includes('data') || normalizedTitle.includes('analyst'))) return matchesSearch;
//     if (filterJobType === 'finance' && (normalizedTitle.includes('finance') || normalizedTitle.includes('financial') || normalizedTitle.includes('investment'))) return matchesSearch;
//     if (filterJobType === 'marketing' && normalizedTitle.includes('marketing')) return matchesSearch;
//     if (filterJobType === 'it' && (normalizedTitle.includes('it') || normalizedTitle.includes('consultant'))) return matchesSearch;
    
//     return false;
//   });
  
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setNewJob({ ...newJob, [name]: value });
//   };
  
//   const handleSubmit = () => {
//     if (isEditMode) {
//       // Update existing job
//       setJobs(jobs.map(job => job.id === newJob.id ? { ...newJob, postDate: job.postDate } : job));
//       toast({
//         title: "Job Updated Successfully",
//         description: "Your job has been updated and notifications sent to TPO",
//       });
//     } else {
//       // Add new job
//       const jobToAdd = {
//         ...newJob,
//         id: jobs.length > 0 ? Math.max(...jobs.map(job => job.id)) + 1 : 1,
//         postDate: new Date().toLocaleDateString('en-GB')
//       };
      
//       setJobs([jobToAdd, ...jobs]);
//       toast({
//         title: "Job Posted Successfully",
//         description: "Your job has been posted and notifications sent to TPO",
//       });
//     }
    
//     setOpen(false);
    
//     // Reset form
//     setNewJob({
//       id: 0,
//       title: '',
//       company: '',
//       location: '',
//       description: '',
//       salary: ''
//     });
    
//     setIsEditMode(false);
//   };
  
//   const handleEditJob = (id: number) => {
//     const jobToEdit = jobs.find(job => job.id === id);
//     if (jobToEdit) {
//       setNewJob(jobToEdit);
//       setIsEditMode(true);
//       setOpen(true);
//     }
//   };
  
//   const handleDeleteJob = (id: number) => {
//     setJobs(jobs.filter(job => job.id !== id));
//     toast({
//       title: "Job Deleted",
//       description: "The job posting has been removed successfully.",
//     });
//   };
  
//   const handleFilterChange = (value: string) => {
//     setFilterJobType(value);
//   };
  
//   return (
//     <div className="space-y-6 animate-fade-in">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold text-gray-800">Job Postings</h1>
        
//         <Dialog open={open} onOpenChange={setOpen}>
//           <DialogTrigger asChild>
//             <Button variant="default" className="flex items-center gap-2" onClick={() => {
//               setIsEditMode(false);
//               setNewJob({
//                 id: 0,
//                 title: '',
//                 company: '',
//                 location: '',
//                 description: '',
//                 salary: ''
//               });
//             }}>
//               <PlusCircle className="h-4 w-4" />
//               Post New Job
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[600px]">
//             <DialogHeader>
//               <DialogTitle>{isEditMode ? 'Edit Job Posting' : 'Post New Job'}</DialogTitle>
//               <DialogDescription>
//                 {isEditMode 
//                   ? 'Update the job posting details. This will notify the TPO of the changes.'
//                   : 'Create a new job posting. This will be visible to students and TPO.'}
//               </DialogDescription>
//             </DialogHeader>
//             <div className="grid gap-4 py-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="title">Job Title</Label>
//                   <Input 
//                     id="title" 
//                     name="title" 
//                     value={newJob.title} 
//                     onChange={handleInputChange} 
//                     placeholder="e.g. Software Engineer" 
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="company">Company</Label>
//                   <Input 
//                     id="company" 
//                     name="company" 
//                     value={newJob.company} 
//                     onChange={handleInputChange} 
//                     placeholder="e.g. Accenture" 
//                   />
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="location">Location</Label>
//                   <Input 
//                     id="location" 
//                     name="location" 
//                     value={newJob.location} 
//                     onChange={handleInputChange} 
//                     placeholder="e.g. Mumbai, India" 
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="salary">Salary (LPA)</Label>
//                   <Input 
//                     id="salary" 
//                     name="salary" 
//                     type="number" 
//                     value={newJob.salary} 
//                     onChange={handleInputChange} 
//                     placeholder="e.g. 8" 
//                   />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="description">Job Description</Label>
//                 <Textarea 
//                   id="description" 
//                   name="description" 
//                   value={newJob.description} 
//                   onChange={handleInputChange} 
//                   placeholder="Describe the job responsibilities and requirements..." 
//                   className="h-24"
//                 />
//               </div>
//             </div>
//             <DialogFooter>
//               <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
//               <Button onClick={handleSubmit}>{isEditMode ? 'Update' : 'Post'} Job</Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//           <Input 
//             placeholder="Search jobs by title, company, or location..." 
//             className="pl-10"
//             value={searchTerm}
//             onChange={handleSearchChange}
//           />
//         </div>
        
//         <div className="flex items-center space-x-2">
//           <Filter className="h-4 w-4 text-gray-500" />
//           <Select value={filterJobType} onValueChange={handleFilterChange}>
//             <SelectTrigger className="max-w-xs">
//               <SelectValue placeholder="Filter by job type" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Jobs</SelectItem>
//               <SelectItem value="software">Software Engineering</SelectItem>
//               <SelectItem value="data">Data Analysis</SelectItem>
//               <SelectItem value="finance">Finance</SelectItem>
//               <SelectItem value="marketing">Marketing</SelectItem>
//               <SelectItem value="it">IT & Consulting</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredJobs.map(job => (
//           <JobCard 
//             key={job.id}
//             id={job.id}
//             title={job.title} 
//             company={job.company}
//             location={job.location}
//             postDate={job.postDate}
//             description={job.description}
//             salary={job.salary}
//             onEdit={handleEditJob}
//             onDelete={handleDeleteJob}
//           />
//         ))}
//       </div>
      
//       {filteredJobs.length === 0 && (
//         <div className="text-center py-10">
//           <h3 className="text-lg font-medium text-gray-500">No jobs found</h3>
//           <p className="text-sm text-gray-400">Try adjusting your search or post a new job</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default JobPostings;
