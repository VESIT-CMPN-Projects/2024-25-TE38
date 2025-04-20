"use client";
import React, { useState } from 'react';
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
import { Button } from '@/components/ui/company/button';
import { Input } from '@/components/ui/company/input';
import { Label } from '@/components/ui/company/label';
import { Textarea } from '@/components/ui/company/textarea';
import { Edit, Save, Upload, Clock, Users, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CompanyProfile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  const [profile, setProfile] = useState({
    company: {
      name: 'Accenture',
      logo: '/lovable-uploads/4dfc8aad-3b4d-43b9-b234-d769143e643c.png',
      website: 'https://www.accenture.com',
      industry: 'Information Technology',
      founded: '1989',
      headquarters: 'Dublin, Ireland',
      employees: '721,000+'
    },
    overview: {
      mission: 'To deliver on the promise of technology and human ingenuity.',
      about: 'Accenture is a global professional services company with leading capabilities in digital, cloud and security. Combining unmatched experience and specialized skills across more than 40 industries, we offer Strategy and Consulting, Interactive, Technology and Operations services — all powered by the world\'s largest network of Advanced Technology and Intelligent Operations centers.',
      values: 'Our core values shape the culture and define the character of our company. We live the core values through individual behaviors. They serve as a foundation for how we act and make decisions.',
      services: 'Strategy & Consulting, Interactive, Technology, Operations'
    },
    culture: {
      workEnvironment: 'We strive to create an inclusive, innovative environment where people can be successful, both professionally and personally.',
      benefits: 'Competitive salaries, generous benefits, and a commitment to work-life balance. Professional development and training opportunities.',
      diversity: 'We embrace diversity and foster a culture of inclusion where everyone feels they have equal opportunities.',
      workSchedule: 'We offer flexible work arrangements with a focus on results rather than time spent in the office.'
    },
    gallery: [
      '/lovable-uploads/4dfc8aad-3b4d-43b9-b234-d769143e643c.png',
      '/lovable-uploads/4dfc8aad-3b4d-43b9-b234-d769143e643c.png',
      '/lovable-uploads/4dfc8aad-3b4d-43b9-b234-d769143e643c.png'
    ]
  });
  
  const handleInputChange = (section: string, field: string, value: string) => {
    setProfile({
      ...profile,
      [section]: {
        ...profile[section as keyof typeof profile],
        [field]: value
      }
    });
  };
  
  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your company profile has been updated successfully."
    });
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Company Profile</h1>
        <Button onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
          {isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Company Card */}
        <Card className="col-span-1">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="h-32 w-32 rounded-full overflow-hidden bg-white p-2 border">
                <img src={profile.company.logo} alt="Company Logo" className="h-full w-full object-contain" />
              </div>
            </div>
            <CardTitle className="text-center">{profile.company.name}</CardTitle>
            <CardDescription className="text-center">
              <a href={profile.company.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {profile.company.website}
              </a>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {isEditing ? (
                <>
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input 
                    id="company-name"
                    value={profile.company.name}
                    onChange={(e) => handleInputChange('company', 'name', e.target.value)}
                  />
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">Industry:</span>
                  </div>
                  <div className="text-sm">{profile.company.industry}</div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">Founded:</span>
                  </div>
                  <div className="text-sm">{profile.company.founded}</div>
                  
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">HQ:</span>
                  </div>
                  <div className="text-sm">{profile.company.headquarters}</div>
                  
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">Employees:</span>
                  </div>
                  <div className="text-sm">{profile.company.employees}</div>
                </div>
              )}
            </div>
            
            {isEditing && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="company-website">Website</Label>
                  <Input 
                    id="company-website"
                    value={profile.company.website}
                    onChange={(e) => handleInputChange('company', 'website', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company-industry">Industry</Label>
                  <Input 
                    id="company-industry"
                    value={profile.company.industry}
                    onChange={(e) => handleInputChange('company', 'industry', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company-founded">Founded</Label>
                  <Input 
                    id="company-founded"
                    value={profile.company.founded}
                    onChange={(e) => handleInputChange('company', 'founded', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company-headquarters">Headquarters</Label>
                  <Input 
                    id="company-headquarters"
                    value={profile.company.headquarters}
                    onChange={(e) => handleInputChange('company', 'headquarters', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company-employees">Employees</Label>
                  <Input 
                    id="company-employees"
                    value={profile.company.employees}
                    onChange={(e) => handleInputChange('company', 'employees', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company-logo">Logo</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      id="company-logo"
                      value={profile.company.logo}
                      onChange={(e) => handleInputChange('company', 'logo', e.target.value)}
                    />
                    <Button variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Main Content */}
        <Card className="col-span-1 lg:col-span-2">
          <CardContent className="pt-6">
            <Tabs defaultValue="overview">
              <TabsList className="w-full">
                <TabsTrigger value="overview" className="flex-grow">Overview</TabsTrigger>
                <TabsTrigger value="culture" className="flex-grow">Work Culture</TabsTrigger>
                <TabsTrigger value="gallery" className="flex-grow">Gallery</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="pt-6 space-y-6">
                {isEditing ? (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="mission">Mission</Label>
                      <Textarea 
                        id="mission"
                        value={profile.overview.mission}
                        onChange={(e) => handleInputChange('overview', 'mission', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="about">About</Label>
                      <Textarea 
                        id="about"
                        value={profile.overview.about}
                        onChange={(e) => handleInputChange('overview', 'about', e.target.value)}
                        className="min-h-[150px]"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="values">Values</Label>
                      <Textarea 
                        id="values"
                        value={profile.overview.values}
                        onChange={(e) => handleInputChange('overview', 'values', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="services">Services</Label>
                      <Textarea 
                        id="services"
                        value={profile.overview.services}
                        onChange={(e) => handleInputChange('overview', 'services', e.target.value)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Mission</h3>
                      <p className="text-gray-700">{profile.overview.mission}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">About Us</h3>
                      <p className="text-gray-700">{profile.overview.about}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Our Values</h3>
                      <p className="text-gray-700">{profile.overview.values}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Services</h3>
                      <p className="text-gray-700">{profile.overview.services}</p>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="culture" className="pt-6 space-y-6">
                {isEditing ? (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="work-environment">Work Environment</Label>
                      <Textarea 
                        id="work-environment"
                        value={profile.culture.workEnvironment}
                        onChange={(e) => handleInputChange('culture', 'workEnvironment', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="benefits">Benefits</Label>
                      <Textarea 
                        id="benefits"
                        value={profile.culture.benefits}
                        onChange={(e) => handleInputChange('culture', 'benefits', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="diversity">Diversity & Inclusion</Label>
                      <Textarea 
                        id="diversity"
                        value={profile.culture.diversity}
                        onChange={(e) => handleInputChange('culture', 'diversity', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="work-schedule">Work Schedule</Label>
                      <Textarea 
                        id="work-schedule"
                        value={profile.culture.workSchedule}
                        onChange={(e) => handleInputChange('culture', 'workSchedule', e.target.value)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Work Environment</h3>
                      <p className="text-gray-700">{profile.culture.workEnvironment}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Employee Benefits</h3>
                      <p className="text-gray-700">{profile.culture.benefits}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Diversity & Inclusion</h3>
                      <p className="text-gray-700">{profile.culture.diversity}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Work Schedule</h3>
                      <p className="text-gray-700">{profile.culture.workSchedule}</p>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="gallery" className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.gallery.map((image, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden">
                      <img src={image} alt={`Gallery Image ${index + 1}`} className="w-full h-48 object-cover" />
                    </div>
                  ))}
                  {isEditing && (
                    <div className="border rounded-lg border-dashed flex items-center justify-center h-48 bg-gray-50">
                      <Button variant="ghost" className="flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        Add Image
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyProfile;
