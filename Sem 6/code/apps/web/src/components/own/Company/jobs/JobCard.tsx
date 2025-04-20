
import React from 'react';
import { Clock, MapPin, Edit, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils2';
import { Button } from '@/components/ui/company/button';

interface JobCardProps {
  id: number;
  title: string;
  company: string;
  location: string;
  postDate: string;
  description: string;
  salary: string;
  className?: string;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export function JobCard({
  id,
  title,
  company,
  location,
  postDate,
  description,
  salary,
  className,
  onEdit,
  onDelete
}: JobCardProps) {
  return (
    <div className={cn("job-card", className)}>
      <h3 className="job-title">{title}</h3>
      <p className="company-name">{company}</p>
      
      <div className="flex justify-between mb-3">
        <div className="job-location">
          <MapPin className="h-3 w-3" />
          <span>{location}</span>
        </div>
        <div className="job-date">
          <Clock className="h-3 w-3" />
          <span>POSTED: {postDate}</span>
        </div>
      </div>
      
      <p className="job-description">{description}</p>
      
      <div className="flex justify-between items-center">
        <div className="job-salary">₹{salary} LPA</div>
        <div className="flex gap-2">
          {onEdit && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onEdit(id)}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              <Edit className="h-3.5 w-3.5 mr-1" />
              Edit
            </Button>
          )}
          {onDelete && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onDelete(id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-3.5 w-3.5 mr-1" />
              Delete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
