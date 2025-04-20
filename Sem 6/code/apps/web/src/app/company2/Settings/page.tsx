
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
import { Label } from '@/components/ui/company/label';
import { Input } from '@/components/ui/company/input';
import { Switch } from '@/components/ui/company/switch';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/company/select";
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();
  
  const [accountSettings, setAccountSettings] = useState({
    email: 'company@accenture.com',
    name: 'Accenture',
    password: '********'
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    applicationUpdates: true,
    marketingEmails: false,
    newMessages: true
  });
  
  const [displaySettings, setDisplaySettings] = useState({
    language: 'english',
    timezone: 'UTC+5:30',
    dateFormat: 'DD/MM/YYYY'
  });
  
  const handleAccountChange = (field: string, value: string) => {
    setAccountSettings({
      ...accountSettings,
      [field]: value
    });
  };
  
  const handleNotificationToggle = (field: string) => {
    setNotificationSettings({
      ...notificationSettings,
      [field]: !notificationSettings[field as keyof typeof notificationSettings]
    });
  };
  
  const handleDisplayChange = (field: string, value: string) => {
    setDisplaySettings({
      ...displaySettings,
      [field]: value
    });
  };
  
  const handleSaveAccount = () => {
    toast({
      title: "Account Settings Saved",
      description: "Your account settings have been updated successfully."
    });
  };
  
  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Saved",
      description: "Your notification preferences have been updated."
    });
  };
  
  const handleSaveDisplay = () => {
    toast({
      title: "Display Settings Saved",
      description: "Your display settings have been updated."
    });
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Account & Preferences</CardTitle>
          <CardDescription>
            Manage your account settings and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="account">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="display">Display</TabsTrigger>
            </TabsList>
            
            <TabsContent value="account" className="space-y-6 pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    value={accountSettings.email}
                    onChange={(e) => handleAccountChange('email', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="name">Company Name</Label>
                  <Input 
                    id="name" 
                    value={accountSettings.name}
                    onChange={(e) => handleAccountChange('name', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password"
                    value={accountSettings.password}
                    onChange={(e) => handleAccountChange('password', e.target.value)}
                  />
                  <p className="text-sm text-gray-500">Leave blank to keep current password</p>
                </div>
                
                <Button onClick={handleSaveAccount}>Save Account Settings</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6 pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email notifications for important updates
                    </p>
                  </div>
                  <Switch 
                    id="email-notifications"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={() => handleNotificationToggle('emailNotifications')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="application-updates">Application Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when students apply to your job postings
                    </p>
                  </div>
                  <Switch 
                    id="application-updates"
                    checked={notificationSettings.applicationUpdates}
                    onCheckedChange={() => handleNotificationToggle('applicationUpdates')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketing-emails">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive promotional emails and offers
                    </p>
                  </div>
                  <Switch 
                    id="marketing-emails"
                    checked={notificationSettings.marketingEmails}
                    onCheckedChange={() => handleNotificationToggle('marketingEmails')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="new-messages">New Messages</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when you receive new messages
                    </p>
                  </div>
                  <Switch 
                    id="new-messages"
                    checked={notificationSettings.newMessages}
                    onCheckedChange={() => handleNotificationToggle('newMessages')}
                  />
                </div>
                
                <Button onClick={handleSaveNotifications}>Save Notification Settings</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="display" className="space-y-6 pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select 
                    value={displaySettings.language}
                    onValueChange={(value) => handleDisplayChange('language', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select 
                    value={displaySettings.timezone}
                    onValueChange={(value) => handleDisplayChange('timezone', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                      <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                      <SelectItem value="UTC+0">Greenwich Mean Time (UTC+0)</SelectItem>
                      <SelectItem value="UTC+1">Central European Time (UTC+1)</SelectItem>
                      <SelectItem value="UTC+5:30">Indian Standard Time (UTC+5:30)</SelectItem>
                      <SelectItem value="UTC+8">China Standard Time (UTC+8)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select 
                    value={displaySettings.dateFormat}
                    onValueChange={(value) => handleDisplayChange('dateFormat', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button onClick={handleSaveDisplay}>Save Display Settings</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
