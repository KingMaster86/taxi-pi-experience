
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapPin, Clock, Car, CarTaxiFront, Users, ChevronRight, CalendarDays, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

const vehicleTypes = [
  {
    id: "economy",
    name: "Economy",
    capacity: "4",
    price: "$20",
    time: "15 min",
    icon: <Car className="h-5 w-5" />,
    description: "Affordable rides for everyday use"
  },
  {
    id: "comfort",
    name: "Comfort",
    capacity: "4",
    price: "$35",
    time: "12 min",
    icon: <CarTaxiFront className="h-5 w-5" />,
    description: "Enhanced comfort for a better experience"
  },
  {
    id: "premium",
    name: "Premium",
    capacity: "4",
    price: "$45",
    time: "10 min",
    icon: <CarTaxiFront className="h-5 w-5" />,
    description: "Luxury vehicles with premium service"
  },
  {
    id: "van",
    name: "Van",
    capacity: "6",
    price: "$55",
    time: "20 min",
    icon: <Users className="h-5 w-5" />,
    description: "Spacious rides for groups and families"
  }
];

type BookingStep = "location" | "vehicle" | "details" | "summary";

const RideBooking = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const paymentSuccess = location.state?.paymentSuccess || false;

  const [currentStep, setCurrentStep] = useState<BookingStep>("location");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("comfort");
  const [bookingType, setBookingType] = useState("now");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Show payment success toast if redirected from payment
  useEffect(() => {
    if (paymentSuccess) {
      toast({
        title: "Payment Successful",
        description: "Your ride has been booked successfully!",
      });
      // Clear the state so the toast doesn't show again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [paymentSuccess, toast]);

  const handleNext = () => {
    if (currentStep === "location") {
      if (!pickup || !destination) {
        toast({
          title: "Missing Information",
          description: "Please enter both pickup and destination",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep("vehicle");
    } else if (currentStep === "vehicle") {
      setCurrentStep("details");
    } else if (currentStep === "details") {
      if (bookingType === "schedule" && (!scheduleDate || !scheduleTime)) {
        toast({
          title: "Missing Information",
          description: "Please select both date and time for scheduled ride",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep("summary");
    }
  };

  const handlePrevious = () => {
    if (currentStep === "vehicle") setCurrentStep("location");
    else if (currentStep === "details") setCurrentStep("vehicle");
    else if (currentStep === "summary") setCurrentStep("details");
  };

  const handleBookRide = () => {
    setIsLoading(true);
    
    // Simulate booking process
    setTimeout(() => {
      setIsLoading(false);
      navigate("/payment");
    }, 1500);
  };

  // Determine if the next button should be disabled
  const nextDisabled = 
    (currentStep === "location" && (!pickup || !destination)) ||
    (currentStep === "details" && bookingType === "schedule" && (!scheduleDate || !scheduleTime));

  const renderStepIndicator = () => {
    const steps = [
      { key: "location", label: "Location" },
      { key: "vehicle", label: "Vehicle" },
      { key: "details", label: "Details" },
      { key: "summary", label: "Summary" }
    ];

    return (
      <div className="flex justify-between items-center w-full mb-8 max-w-md mx-auto">
        {steps.map((step, index) => (
          <div key={step.key} className="flex flex-col items-center">
            <div 
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                currentStep === step.key 
                  ? "bg-taxi-purple text-white" 
                  : Object.keys(steps).findIndex(k => k === currentStep) > index
                    ? "bg-taxi-purple/20 text-taxi-purple"
                    : "bg-gray-200 text-gray-500"
              )}
            >
              {index + 1}
            </div>
            <span className="text-xs mt-1 text-muted-foreground">{step.label}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "location":
        return (
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-2">
              <Label htmlFor="pickup">Pickup Location</Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                </div>
                <Input
                  id="pickup"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="Enter pickup address"
                  className="pl-10 input-focus"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                </div>
                <Input
                  id="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Enter destination address"
                  className="pl-10 input-focus"
                />
              </div>
            </div>
          </div>
        );
        
      case "vehicle":
        return (
          <div className="space-y-4 animate-fade-in">
            <div className="text-center mb-2">
              <h3 className="text-lg font-medium">Select Vehicle Type</h3>
              <p className="text-sm text-muted-foreground">Choose the ride that suits your needs</p>
            </div>
            
            <RadioGroup 
              value={selectedVehicle} 
              onValueChange={setSelectedVehicle}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {vehicleTypes.map((vehicle) => (
                <div key={vehicle.id} className="relative">
                  <RadioGroupItem
                    value={vehicle.id}
                    id={vehicle.id}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={vehicle.id}
                    className={cn(
                      "flex flex-col p-4 rounded-xl border border-border cursor-pointer transition-all",
                      "peer-focus-visible:ring-2 peer-focus-visible:ring-taxi-purple peer-focus-visible:ring-offset-2 peer-checked:border-taxi-purple peer-checked:bg-taxi-purple/5"
                    )}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-taxi-purple">
                          {vehicle.icon}
                        </div>
                        <span className="font-medium">{vehicle.name}</span>
                      </div>
                      <span className="font-semibold text-base">{vehicle.price}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {vehicle.description}
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Users className="h-3.5 w-3.5" />
                        <span>{vehicle.capacity} seats</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>ETA: {vehicle.time}</span>
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );
        
      case "details":
        return (
          <div className="space-y-5 animate-fade-in">
            <div className="text-center mb-2">
              <h3 className="text-lg font-medium">Booking Details</h3>
              <p className="text-sm text-muted-foreground">When would you like to ride?</p>
            </div>
            
            <RadioGroup 
              value={bookingType} 
              onValueChange={setBookingType}
              className="flex space-x-4 justify-center"
            >
              <div className="relative">
                <RadioGroupItem
                  value="now"
                  id="now"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="now"
                  className={cn(
                    "flex items-center space-x-2 px-4 py-3 rounded-lg border border-border cursor-pointer transition-all",
                    "peer-focus-visible:ring-2 peer-focus-visible:ring-taxi-purple peer-focus-visible:ring-offset-2 peer-checked:border-taxi-purple peer-checked:bg-taxi-purple/5"
                  )}
                >
                  <Clock className="h-5 w-5 text-taxi-purple" />
                  <span>Ride Now</span>
                </Label>
              </div>
              
              <div className="relative">
                <RadioGroupItem
                  value="schedule"
                  id="schedule"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="schedule"
                  className={cn(
                    "flex items-center space-x-2 px-4 py-3 rounded-lg border border-border cursor-pointer transition-all",
                    "peer-focus-visible:ring-2 peer-focus-visible:ring-taxi-purple peer-focus-visible:ring-offset-2 peer-checked:border-taxi-purple peer-checked:bg-taxi-purple/5"
                  )}
                >
                  <CalendarDays className="h-5 w-5 text-taxi-purple" />
                  <span>Schedule</span>
                </Label>
              </div>
            </RadioGroup>
            
            {bookingType === "schedule" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 animate-fade-in">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="input-focus"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="input-focus"
                  />
                </div>
              </div>
            )}
            
            <div className="mt-4 space-y-2">
              <Label htmlFor="notes">Special Instructions (Optional)</Label>
              <textarea
                id="notes"
                placeholder="Any special instructions for the driver"
                className="w-full p-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-taxi-purple/50 focus:border-taxi-purple resize-none min-h-[100px]"
              />
            </div>
          </div>
        );
        
      case "summary":
        const selectedVehicleData = vehicleTypes.find(v => v.id === selectedVehicle)!;
        
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-2">
              <h3 className="text-lg font-medium">Booking Summary</h3>
              <p className="text-sm text-muted-foreground">Review your ride details</p>
            </div>
            
            <div className="space-y-5">
              <div className="p-4 rounded-lg bg-secondary space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-taxi-purple/10 flex items-center justify-center text-taxi-purple">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Pickup Location</p>
                    <p className="font-medium">{pickup}</p>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-taxi-purple/10 flex items-center justify-center text-taxi-purple">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Destination</p>
                    <p className="font-medium">{destination}</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-secondary">
                  <p className="text-xs text-muted-foreground mb-1">Vehicle Type</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-taxi-purple/10 flex items-center justify-center text-taxi-purple">
                      {selectedVehicleData.icon}
                    </div>
                    <span className="font-medium">{selectedVehicleData.name}</span>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-secondary">
                  <p className="text-xs text-muted-foreground mb-1">Schedule</p>
                  <div className="flex items-center space-x-2">
                    {bookingType === "now" ? (
                      <>
                        <Clock className="h-5 w-5 text-taxi-purple" />
                        <span className="font-medium">Now</span>
                      </>
                    ) : (
                      <>
                        <CalendarDays className="h-5 w-5 text-taxi-purple" />
                        <span className="font-medium">
                          {scheduleDate} at {scheduleTime}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-secondary">
                <p className="text-xs text-muted-foreground mb-2">Fare Estimate</p>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Fare</span>
                  <span className="text-xl font-semibold">{selectedVehicleData.price}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Final fare may vary based on traffic and waiting time
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-20 md:py-24">
        <div className="container max-w-lg mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-center">Book Your Ride</h1>
          </div>
          
          {renderStepIndicator()}
          
          <div className="bg-white rounded-xl shadow-sm border border-border p-6 mb-6">
            {renderStepContent()}
          </div>
          
          <div className="flex justify-between">
            {currentStep !== "location" && (
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                className="border-taxi-purple/50 text-taxi-purple hover:bg-taxi-purple/5"
              >
                Back
              </Button>
            )}
            
            {currentStep !== "summary" ? (
              <Button 
                className="bg-taxi-purple hover:bg-taxi-purple-dark button-animation ml-auto"
                onClick={handleNext}
                disabled={nextDisabled}
              >
                Continue
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button 
                className="bg-taxi-purple hover:bg-taxi-purple-dark button-animation ml-auto"
                onClick={handleBookRide}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Proceed to Payment"}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RideBooking;
