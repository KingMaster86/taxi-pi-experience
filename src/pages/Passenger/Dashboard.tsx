
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Clock,
  Package,
  Car,
  ArrowRight,
  PhoneCall,
  MessageSquare,
  Star,
  HelpCircle,
  Activity
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const PassengerDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"ride" | "courier">("ride");
  const [hasActiveRide, setHasActiveRide] = useState(false);
  
  // Navigate to booking screen
  const navigateToBooking = () => {
    navigate(activeTab === "ride" ? "/book" : "/book-courier");
  };
  
  // Navigate to chat with driver
  const openChat = () => {
    navigate("/passenger/chat/driver-123");
  };
  
  // Call driver
  const callDriver = () => {
    toast({
      title: "Calling Driver",
      description: "Connecting you to the driver...",
    });
  };
  
  // Navigate to customer support
  const navigateToSupport = () => {
    navigate("/passenger/support");
  };

  // Cancel active ride
  const cancelRide = () => {
    toast({
      title: "Ride Cancelled",
      description: "Your ride has been cancelled successfully",
    });
    setHasActiveRide(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-grow container max-w-4xl mx-auto px-4 py-20 md:py-24">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Hello, John</h1>
          <p className="text-muted-foreground">What are you looking for today?</p>
        </div>

        {/* Service Selection Tabs */}
        <Tabs 
          defaultValue="ride" 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as "ride" | "courier")}
          className="mb-6"
        >
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="ride">Ride</TabsTrigger>
            <TabsTrigger value="courier">Courier</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ride" className="animate-fade-in">
            <div className="bg-white rounded-xl shadow-sm border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Book a Ride</h2>
                <Car className="h-5 w-5 text-taxi-purple" />
              </div>
              <p className="text-muted-foreground mb-6">
                Get a comfortable ride to your destination with our trusted drivers
              </p>
              <Button 
                className="w-full bg-taxi-purple hover:bg-taxi-purple-dark button-animation"
                onClick={navigateToBooking}
              >
                Book Now
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="courier" className="animate-fade-in">
            <div className="bg-white rounded-xl shadow-sm border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Send a Package</h2>
                <Package className="h-5 w-5 text-taxi-purple" />
              </div>
              <p className="text-muted-foreground mb-6">
                Send packages and documents quickly and securely across the city
              </p>
              <Button 
                className="w-full bg-taxi-purple hover:bg-taxi-purple-dark button-animation"
                onClick={navigateToBooking}
              >
                Send Package
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Active Ride Section */}
        {hasActiveRide && (
          <div className="bg-white rounded-xl shadow-sm border border-border p-6 mb-6 animate-fade-in">
            <div className="flex justify-between items-start mb-4">
              <div>
                <Badge className="bg-green-600 text-white mb-2">On The Way</Badge>
                <h2 className="text-xl font-bold">Your driver is coming</h2>
                <p className="text-sm text-muted-foreground">Estimated arrival: 5 mins</p>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full bg-green-50 border-green-200 text-green-600 hover:bg-green-100 hover:text-green-700"
                  onClick={callDriver}
                >
                  <PhoneCall className="h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full bg-taxi-purple/10 border-taxi-purple/20 text-taxi-purple hover:bg-taxi-purple/20"
                  onClick={openChat}
                >
                  <MessageSquare className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 mb-4">
              <Avatar className="h-12 w-12 mt-1">
                <AvatarImage src="https://i.pravatar.cc/150?u=driver123" />
                <AvatarFallback className="bg-taxi-purple text-white">
                  SD
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Satya Danuarta</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="flex mr-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={cn(
                          "w-3 h-3",
                          star <= 4.8 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        )}
                      />
                    ))}
                  </div>
                  <p>4.8</p>
                </div>
                <div className="flex items-center space-x-4 mt-1">
                  <p className="text-xs font-medium">Toyota Avanza</p>
                  <Badge variant="outline" className="bg-secondary text-xs">
                    B 1234 CD
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-secondary space-y-4 mb-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-taxi-purple/10 flex items-center justify-center text-taxi-purple flex-shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Pickup Location</p>
                  <p className="font-medium">Jl. Sudirman No. 123, Jakarta</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-taxi-purple/10 flex items-center justify-center text-taxi-purple flex-shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Destination</p>
                  <p className="font-medium">Mall Grand Indonesia, Jakarta</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center p-3 border rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Distance</p>
                <p className="font-medium">5.2 km</p>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Duration</p>
                <p className="font-medium">20 mins</p>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Fare</p>
                <p className="font-medium">Rp 45,000</p>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full border-red-300 text-red-500 hover:bg-red-50"
              onClick={cancelRide}
            >
              Cancel Ride
            </Button>
          </div>
        )}
        
        {/* Recent Activity Section */}
        <div className="bg-white rounded-xl shadow-sm border border-border p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <Activity className="h-5 w-5 text-taxi-purple" />
          </div>
          
          {/* Mock recent activities */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-secondary transition-colors">
              <div className="w-8 h-8 rounded-full bg-taxi-purple/10 flex items-center justify-center text-taxi-purple flex-shrink-0 mt-0.5">
                <Car className="h-4 w-4" />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between">
                  <p className="font-medium text-sm">Ride to Mall Grand Indonesia</p>
                  <p className="text-sm font-medium">Rp 45,000</p>
                </div>
                <p className="text-xs text-muted-foreground">Today, 10:30 AM</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-secondary transition-colors">
              <div className="w-8 h-8 rounded-full bg-taxi-purple/10 flex items-center justify-center text-taxi-purple flex-shrink-0 mt-0.5">
                <Package className="h-4 w-4" />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between">
                  <p className="font-medium text-sm">Package to Jl. Thamrin No. 456</p>
                  <p className="text-sm font-medium">Rp 35,000</p>
                </div>
                <p className="text-xs text-muted-foreground">Yesterday, 2:15 PM</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-secondary transition-colors">
              <div className="w-8 h-8 rounded-full bg-taxi-purple/10 flex items-center justify-center text-taxi-purple flex-shrink-0 mt-0.5">
                <Car className="h-4 w-4" />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between">
                  <p className="font-medium text-sm">Ride to Plaza Indonesia</p>
                  <p className="text-sm font-medium">Rp 38,000</p>
                </div>
                <p className="text-xs text-muted-foreground">Mar 15, 4:45 PM</p>
              </div>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full mt-4 border-taxi-purple/50 text-taxi-purple hover:bg-taxi-purple/5"
            onClick={() => navigate("/history")}
          >
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        {/* Promotions Section */}
        <div className="bg-taxi-purple text-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-2">Get 20% off your next ride!</h2>
            <p className="text-white/90 mb-4">Use code TAXIPI20 for a discount on your next trip</p>
            <Button className="bg-white text-taxi-purple hover:bg-white/90 button-animation">
              Apply Code
            </Button>
          </div>
          <div className="relative h-1.5 w-full bg-taxi-purple-dark overflow-hidden">
            <div className="absolute inset-0 flex">
              <div className="w-3 h-1.5 bg-white/30 transform -skew-x-[40deg] mr-8"></div>
              <div className="w-3 h-1.5 bg-white/30 transform -skew-x-[40deg] mr-8"></div>
              <div className="w-3 h-1.5 bg-white/30 transform -skew-x-[40deg] mr-8"></div>
              <div className="w-3 h-1.5 bg-white/30 transform -skew-x-[40deg] mr-8"></div>
              <div className="w-3 h-1.5 bg-white/30 transform -skew-x-[40deg] mr-8"></div>
              <div className="w-3 h-1.5 bg-white/30 transform -skew-x-[40deg] mr-8"></div>
              <div className="w-3 h-1.5 bg-white/30 transform -skew-x-[40deg] mr-8"></div>
            </div>
          </div>
        </div>
        
        {/* Help Button */}
        <div className="fixed bottom-20 right-4 md:bottom-8 md:right-8">
          <Button 
            className="rounded-full w-12 h-12 bg-taxi-purple hover:bg-taxi-purple-dark shadow-lg"
            onClick={navigateToSupport}
          >
            <HelpCircle className="h-6 w-6" />
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PassengerDashboard;
