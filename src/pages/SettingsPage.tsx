import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Bell, Palette, Store } from 'lucide-react';

const SettingsPage = () => {
  console.log('SettingsPage loaded');

  // Placeholder state for form fields
  const [profileName, setProfileName] = useState("Admin User");
  const [profileEmail, setProfileEmail] = useState("admin@example.com");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [storeName, setStoreName] = useState("Acme Store");

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile saved:", { profileName, profileEmail });
    // Add API call logic here
  };

  const handlePreferencesSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Preferences saved:", { notificationsEnabled, darkMode });
    // Add API call logic here
  };
  
  const handleStoreInfoSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Store Info saved:", { storeName });
  };


  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header userName="Settings" />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-4">
              <TabsTrigger value="profile" className="flex items-center gap-2"><User className="h-4 w-4"/>Profile</TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2"><Bell className="h-4 w-4"/>Notifications</TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center gap-2"><Palette className="h-4 w-4"/>Appearance</TabsTrigger>
              <TabsTrigger value="store" className="flex items-center gap-2"><Store className="h-4 w-4"/>Store Info</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>User Profile</CardTitle>
                  <CardDescription>Manage your personal information and password.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileSave} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="profileName">Full Name</Label>
                      <Input id="profileName" value={profileName} onChange={(e) => setProfileName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="profileEmail">Email</Label>
                      <Input id="profileEmail" type="email" value={profileEmail} onChange={(e) => setProfileEmail(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" placeholder="Enter current password" />
                    </div>
                     <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" placeholder="Enter new password" />
                    </div>
                    <Button type="submit">Save Profile</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Configure how you receive notifications.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePreferencesSave} className="space-y-6">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <Label htmlFor="emailNotifications" className="font-medium">Email Notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive notifications via email for important updates.</p>
                        </div>
                        <Switch 
                            id="emailNotifications" 
                            checked={notificationsEnabled} 
                            onCheckedChange={setNotificationsEnabled} 
                        />
                    </div>
                     <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <Label htmlFor="pushNotifications" className="font-medium">Push Notifications</Label>
                            <p className="text-sm text-muted-foreground">Get push notifications on your devices (if enabled).</p>
                        </div>
                        <Switch 
                            id="pushNotifications" 
                            // checked={pushEnabled} 
                            // onCheckedChange={setPushEnabled} 
                            disabled // Placeholder
                        />
                    </div>
                    <Button type="submit">Save Preferences</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize the look and feel of the dashboard.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePreferencesSave} className="space-y-6">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <Label htmlFor="darkMode" className="font-medium">Dark Mode</Label>
                            <p className="text-sm text-muted-foreground">Toggle between light and dark themes.</p>
                        </div>
                        <Switch 
                            id="darkMode" 
                            checked={darkMode} 
                            onCheckedChange={setDarkMode} 
                        />
                    </div>
                    {/* Add other appearance settings like language, timezone etc. */}
                    <Button type="submit">Save Appearance</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="store">
              <Card>
                <CardHeader>
                  <CardTitle>Store Information</CardTitle>
                  <CardDescription>Manage basic information about your store.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleStoreInfoSave} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="storeName">Store Name</Label>
                      <Input id="storeName" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
                    </div>
                    {/* Add other store settings like address, contact, currency etc. */}
                    <Button type="submit">Save Store Info</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;