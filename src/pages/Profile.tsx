
import { useState } from "react";
import { User, Phone, Mail, Shield, LogOut, Edit, Save, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  // User profile state
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, Anytown, CA 12345"
  });

  const [formData, setFormData] = useState({...profileData});
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setProfileData({...formData});
      
      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved successfully."
      });
    }
    setIsEditing(!isEditing);
  };
  
  const handleCancel = () => {
    setFormData({...profileData});
    setIsEditing(false);
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully."
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-20 md:py-24">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold">My Profile</h1>
            <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Profile Summary */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-border p-6 space-y-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src="https://i.pravatar.cc/150?u=jdoe" alt={profileData.name} />
                    <AvatarFallback className="bg-taxi-purple text-white text-xl">
                      {profileData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold">{profileData.name}</h2>
                  <p className="text-sm text-muted-foreground">{profileData.email}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-secondary">
                    <Phone className="h-5 w-5 text-taxi-purple" />
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="font-medium">{profileData.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-secondary">
                    <Mail className="h-5 w-5 text-taxi-purple" />
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="font-medium">{profileData.email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    className="w-full text-destructive hover:bg-destructive/5 hover:text-destructive border-destructive/30"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Right Column - Profile Details */}
            <div className="md:col-span-2">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="profile">Profile Details</TabsTrigger>
                  <TabsTrigger value="payment">Payment Methods</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile" className="animate-fade-in">
                  <div className="bg-white rounded-xl shadow-sm border border-border p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold">Personal Information</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleEditToggle}
                        className={cn(
                          "border-taxi-purple/50 text-taxi-purple hover:bg-taxi-purple/5",
                          isEditing && "bg-taxi-purple text-white hover:bg-taxi-purple-dark hover:text-white"
                        )}
                      >
                        {isEditing ? (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                          </>
                        ) : (
                          <>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Profile
                          </>
                        )}
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="input-focus"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="input-focus"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="input-focus"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="input-focus"
                          />
                        </div>
                      </div>
                      
                      {isEditing && (
                        <div className="flex justify-end space-x-2 mt-4">
                          <Button
                            variant="outline"
                            onClick={handleCancel}
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="payment" className="animate-fade-in">
                  <div className="bg-white rounded-xl shadow-sm border border-border p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold">Saved Payment Methods</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-taxi-purple/50 text-taxi-purple hover:bg-taxi-purple/5"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Manage
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg border border-border flex items-center justify-between hover:border-taxi-purple/50 transition-colors cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-8 bg-secondary rounded flex items-center justify-center">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4" />
                          </div>
                          <div>
                            <p className="font-medium">Visa ending in 4242</p>
                            <p className="text-xs text-muted-foreground">Expires 12/25</p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                      
                      <div className="p-4 rounded-lg border border-border flex items-center justify-between hover:border-taxi-purple/50 transition-colors cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-8 bg-secondary rounded flex items-center justify-center">
                            <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png" alt="Ethereum" className="h-5" />
                          </div>
                          <div>
                            <p className="font-medium">Ethereum Wallet</p>
                            <p className="text-xs text-muted-foreground">Connected</p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                      
                      <Button className="w-full mt-4 bg-taxi-purple hover:bg-taxi-purple-dark button-animation">
                        Add Payment Method
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="security" className="animate-fade-in">
                  <div className="bg-white rounded-xl shadow-sm border border-border p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold">Security Settings</h3>
                      <Shield className="h-5 w-5 text-taxi-purple" />
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg border border-border">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Password</h4>
                            <p className="text-sm text-muted-foreground">Last changed 2 months ago</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-taxi-purple/50 text-taxi-purple hover:bg-taxi-purple/5"
                          >
                            Change
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg border border-border">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Two-Factor Authentication</h4>
                            <p className="text-sm text-muted-foreground">Enhance your account security</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                          >
                            Enable
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg border border-border">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Connected Devices</h4>
                            <p className="text-sm text-muted-foreground">Manage devices that can access your account</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                          >
                            View All
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
