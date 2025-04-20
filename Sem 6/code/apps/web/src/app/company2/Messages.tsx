
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Search, Send, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample messages data
const sampleContacts = [
  { id: 1, name: 'TPO Office', role: 'Admin', avatar: '👨‍💼', lastSeen: 'Online', unread: 2 },
  { id: 2, name: 'Department Head - CSE', role: 'Faculty', avatar: '👩‍🏫', lastSeen: '2 hours ago', unread: 0 },
  { id: 3, name: 'Placement Coordinator', role: 'Student', avatar: '👨‍🎓', lastSeen: '1 day ago', unread: 0 },
  { id: 4, name: 'Technical Team', role: 'Staff', avatar: '👨‍💻', lastSeen: 'Online', unread: 1 },
];

const sampleMessages = [
  { id: 1, senderId: 1, text: 'Hello, I wanted to confirm the schedule for the upcoming technical interview round.', timestamp: '10:30 AM', type: 'received' },
  { id: 2, senderId: 0, text: 'Hi, yes we are planning to conduct it on the 25th of October from 11:00 AM onwards.', timestamp: '10:32 AM', type: 'sent' },
  { id: 3, senderId: 1, text: 'Great! How many students have been shortlisted for this round?', timestamp: '10:34 AM', type: 'received' },
  { id: 4, senderId: 0, text: 'We have shortlisted 25 students from the aptitude test round.', timestamp: '10:35 AM', type: 'sent' },
  { id: 5, senderId: 1, text: 'Perfect. Do you need any specific arrangements for the interview?', timestamp: '10:40 AM', type: 'received' },
  { id: 6, senderId: 0, text: 'Yes, we would need 2 interview rooms with whiteboards and projectors for presentations.', timestamp: '10:42 AM', type: 'sent' },
  { id: 7, senderId: 1, text: 'Noted. I will make sure the rooms are ready. Would you also need any refreshments for the interview panel?', timestamp: '10:45 AM', type: 'received' },
  { id: 8, senderId: 0, text: 'Coffee and light snacks would be appreciated for the 3 interviewers who will be coming.', timestamp: '10:47 AM', type: 'sent' },
];

const Messages = () => {
  const [contacts, setContacts] = useState(sampleContacts);
  const [messages, setMessages] = useState(sampleMessages);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [activeContact, setActiveContact] = useState(sampleContacts[0]);
  const { toast } = useToast();
  
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const newMsg = {
      id: messages.length + 1,
      senderId: 0, // 0 represents current user
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'sent'
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Mark active contact's unread messages as read
    setContacts(contacts.map(contact => 
      contact.id === activeContact.id ? { ...contact, unread: 0 } : contact
    ));
  };
  
  const handleSelectContact = (contact: any) => {
    setActiveContact(contact);
    
    // Mark as read
    setContacts(contacts.map(c => 
      c.id === contact.id ? { ...c, unread: 0 } : c
    ));
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Messages</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        {/* Contacts List */}
        <Card className="lg:col-span-1 overflow-hidden flex flex-col">
          <CardHeader className="border-b px-4 py-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search contacts..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-y-auto flex-grow">
            <div className="divide-y">
              {filteredContacts.map(contact => (
                <div 
                  key={contact.id} 
                  className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 ${activeContact.id === contact.id ? 'bg-gray-50' : ''}`}
                  onClick={() => handleSelectContact(contact)}
                >
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 mr-3 text-lg">
                    {contact.avatar}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{contact.name}</h3>
                      {contact.unread > 0 && (
                        <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                          {contact.unread}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500">{contact.role}</p>
                      <p className="text-xs text-gray-400">{contact.lastSeen}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredContacts.length === 0 && (
                <div className="py-8 text-center text-gray-500">
                  No contacts found
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Chat Area */}
        <Card className="lg:col-span-2 overflow-hidden flex flex-col">
          <CardHeader className="border-b px-4 py-3 flex-shrink-0">
            <div className="flex items-center">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 mr-3 text-lg">
                {activeContact.avatar}
              </div>
              <div>
                <CardTitle>{activeContact.name}</CardTitle>
                <p className="text-xs text-gray-500">{activeContact.lastSeen}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-y-auto flex-grow">
            <div className="p-4 space-y-4">
              {messages.map(message => (
                <div 
                  key={message.id} 
                  className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[70%] rounded-lg py-2 px-3 ${
                      message.type === 'sent' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p>{message.text}</p>
                    <div 
                      className={`text-xs mt-1 ${
                        message.type === 'sent' ? 'text-blue-100' : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Textarea 
                placeholder="Type your message..." 
                className="resize-none"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Messages;
