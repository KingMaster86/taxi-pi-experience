
import { useState } from "react";
import { Clock, MapPin, Search, ChevronDown, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

interface RideHistoryItem {
  id: string;
  date: string;
  pickup: string;
  destination: string;
  status: "completed" | "cancelled" | "ongoing";
  amount: string;
  vehicle: string;
}

const rideHistory: RideHistoryItem[] = [
  {
    id: "TX-1234",
    date: "Today, 2:30 PM",
    pickup: "123 Main St, Anytown",
    destination: "456 Oak Ave, Othertown",
    status: "completed",
    amount: "$35.50",
    vehicle: "Comfort"
  },
  {
    id: "TX-1235",
    date: "Yesterday, 10:15 AM",
    pickup: "789 Pine Rd, Somewhere",
    destination: "101 Maple Dr, Nowhere",
    status: "completed",
    amount: "$22.75",
    vehicle: "Economy"
  },
  {
    id: "TX-1236",
    date: "Mar 15, 2023, 4:45 PM",
    pickup: "222 Beach Blvd, Seaside",
    destination: "333 Mountain View, Highland",
    status: "cancelled",
    amount: "$0.00",
    vehicle: "Premium"
  },
  {
    id: "TX-1237",
    date: "Mar 12, 2023, 9:20 AM",
    pickup: "444 Downtown Ave, Cityville",
    destination: "555 Suburb St, Townsville",
    status: "completed",
    amount: "$18.30",
    vehicle: "Economy"
  },
  {
    id: "TX-1238",
    date: "Mar 10, 2023, 7:00 PM",
    pickup: "666 Airport Rd, Flyville",
    destination: "777 Hotel Blvd, Staytown",
    status: "completed",
    amount: "$42.00",
    vehicle: "Premium"
  }
];

const RideHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRide, setExpandedRide] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredRides = rideHistory.filter(ride => {
    // Filter by tab
    if (activeTab === "completed" && ride.status !== "completed") return false;
    if (activeTab === "cancelled" && ride.status !== "cancelled") return false;
    
    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        ride.id.toLowerCase().includes(query) ||
        ride.pickup.toLowerCase().includes(query) ||
        ride.destination.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  const toggleRideDetails = (rideId: string) => {
    setExpandedRide(expandedRide === rideId ? null : rideId);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-20 md:py-24">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold">Your Ride History</h1>
            <p className="text-muted-foreground mt-1">View and manage your past rides</p>
          </div>
          
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <div className="relative flex-grow">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Search className="h-4 w-4" />
                </div>
                <Input
                  placeholder="Search by ride ID or location"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 input-focus"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                    onClick={clearSearch}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <Button
                variant="outline"
                className="w-full sm:w-auto border-taxi-purple/50 text-taxi-purple hover:bg-taxi-purple/5"
              >
                <Clock className="mr-2 h-4 w-4" />
                Filter by Date
              </Button>
            </div>
            
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Rides</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-0 animate-fade-in">
                {filteredRides.length > 0 ? (
                  <div className="space-y-4">
                    {filteredRides.map((ride) => (
                      <div key={ride.id} className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
                        <div 
                          className="p-4 cursor-pointer hover:bg-secondary/50 transition-colors"
                          onClick={() => toggleRideDetails(ride.id)}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                              <div className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center",
                                ride.status === "completed" ? "bg-green-100 text-green-600" : 
                                ride.status === "cancelled" ? "bg-red-100 text-red-600" : 
                                "bg-blue-100 text-blue-600"
                              )}>
                                <Clock className="h-5 w-5" />
                              </div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <p className="font-medium">{ride.id}</p>
                                  <span className={cn(
                                    "text-xs px-2 py-0.5 rounded-full",
                                    ride.status === "completed" ? "bg-green-100 text-green-600" : 
                                    ride.status === "cancelled" ? "bg-red-100 text-red-600" : 
                                    "bg-blue-100 text-blue-600"
                                  )}>
                                    {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                                  </span>
                                </div>
                                <p className="text-xs text-muted-foreground">{ride.date}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="text-right hidden sm:block">
                                <p className="font-medium">{ride.amount}</p>
                                <p className="text-xs text-muted-foreground">{ride.vehicle}</p>
                              </div>
                              {expandedRide === ride.id ? (
                                <ChevronDown className="h-5 w-5 text-muted-foreground" />
                              ) : (
                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                              )}
                            </div>
                          </div>
                          
                          <div className="sm:hidden mt-2 flex justify-between">
                            <p className="text-sm font-medium">{ride.amount}</p>
                            <p className="text-xs text-muted-foreground">{ride.vehicle}</p>
                          </div>
                        </div>
                        
                        {expandedRide === ride.id && (
                          <div className="p-4 pt-0 border-t border-border animate-fade-in">
                            <div className="space-y-4 mt-4">
                              <div className="flex items-start space-x-3">
                                <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-xs text-muted-foreground">Pickup</p>
                                  <p className="text-sm">{ride.pickup}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-start space-x-3">
                                <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-xs text-muted-foreground">Destination</p>
                                  <p className="text-sm">{ride.destination}</p>
                                </div>
                              </div>
                              
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" size="sm">
                                  Get Receipt
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="border-taxi-purple/50 text-taxi-purple hover:bg-taxi-purple/5"
                                >
                                  Book Again
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                      <Clock className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">No rides found</h3>
                    <p className="text-muted-foreground">
                      {searchQuery ? "Try a different search term" : "You haven't taken any rides yet"}
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RideHistory;
