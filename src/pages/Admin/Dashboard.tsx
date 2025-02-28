
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Car,
  Package,
  CreditCard,
  Settings,
  LogOut,
  Search,
  Filter,
  ArrowUpDown,
  UserCheck,
  UserX,
  Plus,
  Edit,
  Trash2,
  Eye
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock data for demonstration
const driversData = [
  { 
    id: "D1001", 
    name: "John Driver", 
    phone: "+1234567890", 
    email: "john.driver@example.com",
    rating: 4.8,
    rides: 124,
    status: "active",
    vehicle: "Toyota Avanza",
    balance: "Rp 350,000",
    lastActive: "2 hours ago",
    verified: true
  },
  { 
    id: "D1002", 
    name: "Sarah Driver", 
    phone: "+1234567891", 
    email: "sarah.driver@example.com",
    rating: 4.6,
    rides: 87,
    status: "inactive",
    vehicle: "Honda Jazz",
    balance: "Rp 125,000",
    lastActive: "5 days ago",
    verified: true
  },
  { 
    id: "D1003", 
    name: "Robert Driver", 
    phone: "+1234567892", 
    email: "robert.driver@example.com",
    rating: 4.9,
    rides: 156,
    status: "active",
    vehicle: "Suzuki Ertiga",
    balance: "Rp 480,000",
    lastActive: "30 minutes ago",
    verified: true
  },
  { 
    id: "D1004", 
    name: "Anna Driver", 
    phone: "+1234567893", 
    email: "anna.driver@example.com",
    rating: 4.5,
    rides: 42,
    status: "pending",
    vehicle: "Daihatsu Xenia",
    balance: "Rp 50,000",
    lastActive: "never",
    verified: false
  },
];

const passengersData = [
  { 
    id: "P2001", 
    name: "Emily User", 
    phone: "+9876543210", 
    email: "emily.user@example.com",
    rating: 4.7,
    rides: 32,
    status: "active",
    lastRide: "Today",
    totalSpent: "Rp 1,250,000",
    verified: true
  },
  { 
    id: "P2002", 
    name: "Daniel User", 
    phone: "+9876543211", 
    email: "daniel.user@example.com",
    rating: 4.3,
    rides: 18,
    status: "active",
    lastRide: "Yesterday",
    totalSpent: "Rp 876,000",
    verified: true
  },
  { 
    id: "P2003", 
    name: "Lisa User", 
    phone: "+9876543212", 
    email: "lisa.user@example.com",
    rating: 4.9,
    rides: 45,
    status: "inactive",
    lastRide: "3 weeks ago",
    totalSpent: "Rp 1,723,000",
    verified: true
  },
  { 
    id: "P2004", 
    name: "Michael User", 
    phone: "+9876543213", 
    email: "michael.user@example.com",
    rating: 4.5,
    rides: 5,
    status: "active",
    lastRide: "2 days ago",
    totalSpent: "Rp 245,000",
    verified: true
  },
];

const AdminDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [tab, setTab] = useState("drivers");

  // Filter data based on search term
  const filteredDrivers = driversData.filter(driver => 
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    driver.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPassengers = passengersData.filter(passenger => 
    passenger.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    passenger.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Verify a driver
  const verifyDriver = (driverId: string) => {
    toast({
      title: "Driver Verified",
      description: `Driver ID ${driverId} has been verified successfully`,
    });
  };

  // Suspend a user
  const suspendUser = (userId: string, userType: string) => {
    toast({
      title: "User Suspended",
      description: `${userType} ID ${userId} has been suspended`,
      variant: "destructive",
    });
  };

  // Handle logout
  const handleLogout = () => {
    navigate("/auth/login");
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-20 md:py-24">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-border mb-4">
              <div className="flex items-center space-x-3 mb-6">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://i.pravatar.cc/150?u=admin" alt="Admin" />
                  <AvatarFallback className="bg-taxi-purple text-white">AD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Admin User</p>
                  <p className="text-xs text-muted-foreground">System Administrator</p>
                </div>
              </div>
              
              <nav>
                <ul className="space-y-1">
                  <li>
                    <Button 
                      variant="ghost" 
                      className={cn(
                        "w-full justify-start",
                        tab === "dashboard" && "bg-taxi-purple/10 text-taxi-purple font-medium"
                      )}
                      onClick={() => setTab("dashboard")}
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                  </li>
                  <li>
                    <Button 
                      variant="ghost" 
                      className={cn(
                        "w-full justify-start",
                        tab === "drivers" && "bg-taxi-purple/10 text-taxi-purple font-medium"
                      )}
                      onClick={() => setTab("drivers")}
                    >
                      <Car className="mr-2 h-4 w-4" />
                      Drivers
                    </Button>
                  </li>
                  <li>
                    <Button 
                      variant="ghost" 
                      className={cn(
                        "w-full justify-start",
                        tab === "passengers" && "bg-taxi-purple/10 text-taxi-purple font-medium"
                      )}
                      onClick={() => setTab("passengers")}
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Passengers
                    </Button>
                  </li>
                  <li>
                    <Button 
                      variant="ghost" 
                      className={cn(
                        "w-full justify-start",
                        tab === "trips" && "bg-taxi-purple/10 text-taxi-purple font-medium"
                      )}
                      onClick={() => setTab("trips")}
                    >
                      <Package className="mr-2 h-4 w-4" />
                      Trips & Orders
                    </Button>
                  </li>
                  <li>
                    <Button 
                      variant="ghost" 
                      className={cn(
                        "w-full justify-start",
                        tab === "payments" && "bg-taxi-purple/10 text-taxi-purple font-medium"
                      )}
                      onClick={() => setTab("payments")}
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Payments
                    </Button>
                  </li>
                  <li>
                    <Button 
                      variant="ghost" 
                      className={cn(
                        "w-full justify-start",
                        tab === "settings" && "bg-taxi-purple/10 text-taxi-purple font-medium"
                      )}
                      onClick={() => setTab("settings")}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                  </li>
                </ul>
              </nav>
              
              <div className="pt-6 mt-6 border-t border-border">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </Button>
              </div>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="flex-grow">
            {tab === "dashboard" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-border">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Drivers</p>
                        <p className="text-2xl font-bold">248</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-taxi-purple/10 flex items-center justify-center">
                        <Car className="h-5 w-5 text-taxi-purple" />
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-sm">
                      <span className="text-green-600 font-medium">+12% </span>
                      <span className="text-muted-foreground ml-1">from last month</span>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-border">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Passengers</p>
                        <p className="text-2xl font-bold">1,243</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-taxi-purple/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-taxi-purple" />
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-sm">
                      <span className="text-green-600 font-medium">+18% </span>
                      <span className="text-muted-foreground ml-1">from last month</span>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-border">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Revenue</p>
                        <p className="text-2xl font-bold">Rp 24.5M</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-taxi-purple/10 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-taxi-purple" />
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-sm">
                      <span className="text-green-600 font-medium">+22% </span>
                      <span className="text-muted-foreground ml-1">from last month</span>
                    </div>
                  </div>
                </div>
                
                {/* Dashboard charts and additional info would go here */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
                  <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                  <p className="text-muted-foreground text-center py-12">
                    Dashboard statistics and charts will appear here
                  </p>
                </div>
              </div>
            )}
            
            {tab === "drivers" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold">Manage Drivers</h1>
                  <Button className="bg-taxi-purple hover:bg-taxi-purple-dark">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Driver
                  </Button>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-grow">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search drivers..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    <Button variant="outline" className="md:w-auto">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-border text-left">
                          <th className="pb-3 font-medium text-muted-foreground">
                            <div className="flex items-center">
                              ID
                              <ArrowUpDown className="ml-1 h-3 w-3" />
                            </div>
                          </th>
                          <th className="pb-3 font-medium text-muted-foreground">Driver</th>
                          <th className="pb-3 font-medium text-muted-foreground">
                            <div className="flex items-center">
                              Status
                              <ArrowUpDown className="ml-1 h-3 w-3" />
                            </div>
                          </th>
                          <th className="pb-3 font-medium text-muted-foreground">
                            <div className="flex items-center">
                              Rating
                              <ArrowUpDown className="ml-1 h-3 w-3" />
                            </div>
                          </th>
                          <th className="pb-3 font-medium text-muted-foreground">
                            <div className="flex items-center">
                              Balance
                              <ArrowUpDown className="ml-1 h-3 w-3" />
                            </div>
                          </th>
                          <th className="pb-3 font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredDrivers.length > 0 ? (
                          filteredDrivers.map((driver) => (
                            <tr key={driver.id} className="border-b border-border hover:bg-secondary/50">
                              <td className="py-4 pr-4">
                                <span className="font-mono text-sm">{driver.id}</span>
                              </td>
                              <td className="py-4 pr-4">
                                <div className="flex items-center space-x-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={`https://i.pravatar.cc/150?u=${driver.id}`} alt={driver.name} />
                                    <AvatarFallback className="bg-taxi-purple/10 text-taxi-purple">
                                      {driver.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">{driver.name}</p>
                                    <p className="text-xs text-muted-foreground">{driver.vehicle}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 pr-4">
                                <Badge 
                                  className={cn(
                                    driver.status === "active" && "bg-green-100 text-green-700 hover:bg-green-100",
                                    driver.status === "inactive" && "bg-amber-100 text-amber-700 hover:bg-amber-100",
                                    driver.status === "pending" && "bg-blue-100 text-blue-700 hover:bg-blue-100"
                                  )}
                                >
                                  {driver.status.charAt(0).toUpperCase() + driver.status.slice(1)}
                                </Badge>
                              </td>
                              <td className="py-4 pr-4">
                                <div className="flex items-center">
                                  <span className="font-medium mr-1">{driver.rating}</span>
                                  <svg 
                                    className="w-4 h-4 text-yellow-400" 
                                    fill="currentColor" 
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                </div>
                              </td>
                              <td className="py-4 pr-4">
                                <p className="font-medium">{driver.balance}</p>
                              </td>
                              <td className="py-4">
                                <div className="flex items-center space-x-2">
                                  {!driver.verified && (
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                      onClick={() => verifyDriver(driver.id)}
                                    >
                                      <UserCheck className="h-4 w-4" />
                                    </Button>
                                  )}
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="text-taxi-purple hover:text-taxi-purple-dark hover:bg-taxi-purple/5"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => suspendUser(driver.id, "Driver")}
                                  >
                                    <UserX className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="py-8 text-center text-muted-foreground">
                              No drivers found with the search term "{searchTerm}"
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="flex justify-between items-center mt-6">
                    <p className="text-sm text-muted-foreground">
                      Showing {filteredDrivers.length} of {driversData.length} drivers
                    </p>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" disabled>
                        Previous
                      </Button>
                      <Button variant="outline" size="sm" className="bg-taxi-purple/10">
                        1
                      </Button>
                      <Button variant="outline" size="sm">
                        2
                      </Button>
                      <Button variant="outline" size="sm">
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {tab === "passengers" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Manage Passengers</h1>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-grow">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search passengers..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    <Button variant="outline" className="md:w-auto">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-border text-left">
                          <th className="pb-3 font-medium text-muted-foreground">
                            <div className="flex items-center">
                              ID
                              <ArrowUpDown className="ml-1 h-3 w-3" />
                            </div>
                          </th>
                          <th className="pb-3 font-medium text-muted-foreground">Passenger</th>
                          <th className="pb-3 font-medium text-muted-foreground">
                            <div className="flex items-center">
                              Status
                              <ArrowUpDown className="ml-1 h-3 w-3" />
                            </div>
                          </th>
                          <th className="pb-3 font-medium text-muted-foreground">
                            <div className="flex items-center">
                              Trips
                              <ArrowUpDown className="ml-1 h-3 w-3" />
                            </div>
                          </th>
                          <th className="pb-3 font-medium text-muted-foreground">
                            <div className="flex items-center">
                              Total Spent
                              <ArrowUpDown className="ml-1 h-3 w-3" />
                            </div>
                          </th>
                          <th className="pb-3 font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPassengers.length > 0 ? (
                          filteredPassengers.map((passenger) => (
                            <tr key={passenger.id} className="border-b border-border hover:bg-secondary/50">
                              <td className="py-4 pr-4">
                                <span className="font-mono text-sm">{passenger.id}</span>
                              </td>
                              <td className="py-4 pr-4">
                                <div className="flex items-center space-x-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={`https://i.pravatar.cc/150?u=${passenger.id}`} alt={passenger.name} />
                                    <AvatarFallback className="bg-taxi-purple/10 text-taxi-purple">
                                      {passenger.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">{passenger.name}</p>
                                    <p className="text-xs text-muted-foreground">{passenger.email}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 pr-4">
                                <Badge 
                                  className={cn(
                                    passenger.status === "active" && "bg-green-100 text-green-700 hover:bg-green-100",
                                    passenger.status === "inactive" && "bg-amber-100 text-amber-700 hover:bg-amber-100"
                                  )}
                                >
                                  {passenger.status.charAt(0).toUpperCase() + passenger.status.slice(1)}
                                </Badge>
                              </td>
                              <td className="py-4 pr-4">
                                <p className="font-medium">{passenger.rides}</p>
                              </td>
                              <td className="py-4 pr-4">
                                <p className="font-medium">{passenger.totalSpent}</p>
                              </td>
                              <td className="py-4">
                                <div className="flex items-center space-x-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="text-taxi-purple hover:text-taxi-purple-dark hover:bg-taxi-purple/5"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => suspendUser(passenger.id, "Passenger")}
                                  >
                                    <UserX className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="py-8 text-center text-muted-foreground">
                              No passengers found with the search term "{searchTerm}"
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="flex justify-between items-center mt-6">
                    <p className="text-sm text-muted-foreground">
                      Showing {filteredPassengers.length} of {passengersData.length} passengers
                    </p>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" disabled>
                        Previous
                      </Button>
                      <Button variant="outline" size="sm" className="bg-taxi-purple/10">
                        1
                      </Button>
                      <Button variant="outline" size="sm">
                        2
                      </Button>
                      <Button variant="outline" size="sm">
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {(tab === "trips" || tab === "payments" || tab === "settings") && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">
                  {tab === "trips" && "Trips & Orders"}
                  {tab === "payments" && "Payment Management"}
                  {tab === "settings" && "System Settings"}
                </h1>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-border min-h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-taxi-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      {tab === "trips" && <Package className="h-8 w-8 text-taxi-purple" />}
                      {tab === "payments" && <CreditCard className="h-8 w-8 text-taxi-purple" />}
                      {tab === "settings" && <Settings className="h-8 w-8 text-taxi-purple" />}
                    </div>
                    <h2 className="text-xl font-semibold mb-2">
                      {tab === "trips" && "Trip Management"}
                      {tab === "payments" && "Payment Management"}
                      {tab === "settings" && "System Settings"}
                    </h2>
                    <p className="text-muted-foreground max-w-md">
                      This section is under development. It will allow you to manage 
                      {tab === "trips" && " all trips, orders, and deliveries."}
                      {tab === "payments" && " payment methods, transactions, and financial reports."}
                      {tab === "settings" && " system preferences, security settings, and user roles."}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
