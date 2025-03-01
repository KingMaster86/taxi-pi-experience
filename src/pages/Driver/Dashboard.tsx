
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Clock,
  MapPin,
  User,
  Phone,
  MessageSquare,
  Check,
  X,
  DollarSign,
  AlertCircle,
  Wallet,
  Plus,
  HelpCircle,
  Car,
  Bike,
  UserCircle,
  FileText,
  License,
  FileCheck,
  Upload,
  ArrowRight
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type TripRequest = {
  id: string;
  passengerName: string;
  passengerRating: number;
  pickupLocation: string;
  destination: string;
  estimatedDistance: string;
  estimatedDuration: string;
  proposedFare: string;
  status: "pending" | "accepted" | "completed" | "cancelled";
  timestamp: string;
};

type DriverProfile = {
  vehicleType: "motorcycle" | "car" | null;
  idCardUploaded: boolean;
  drivingLicenseUploaded: boolean;
  vehicleRegistrationUploaded: boolean;
  vehiclePlateNumber: string;
  isVerified: boolean;
}

const mockTripRequests: TripRequest[] = [
  {
    id: "TR-1001",
    passengerName: "John Doe",
    passengerRating: 4.8,
    pickupLocation: "Jl. Sudirman No. 123, Jakarta",
    destination: "Mall Grand Indonesia, Jakarta",
    estimatedDistance: "5.2 km",
    estimatedDuration: "20 mins",
    proposedFare: "Rp 45,000",
    status: "pending",
    timestamp: "2 mins ago",
  },
  {
    id: "TR-1002",
    passengerName: "Sarah Smith",
    passengerRating: 4.5,
    pickupLocation: "Jl. Thamrin No. 456, Jakarta",
    destination: "Plaza Indonesia, Jakarta",
    estimatedDistance: "3.5 km",
    estimatedDuration: "15 mins",
    proposedFare: "Rp 35,000",
    status: "pending",
    timestamp: "5 mins ago",
  },
];

const DriverDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [balance, setBalance] = useState("Rp 150,000");
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [tripRequests, setTripRequests] = useState<TripRequest[]>(mockTripRequests);
  const [activeTripId, setActiveTripId] = useState<string | null>(null);
  const [showLowBalanceWarning, setShowLowBalanceWarning] = useState(true);
  const [userRole, setUserRole] = useState<"driver" | "passenger">("driver");
  const [driverProfile, setDriverProfile] = useState<DriverProfile>({
    vehicleType: null,
    idCardUploaded: false,
    drivingLicenseUploaded: false,
    vehicleRegistrationUploaded: false,
    vehiclePlateNumber: "",
    isVerified: false
  });
  
  const [showProfileSetup, setShowProfileSetup] = useState(true);
  const [uploadStep, setUploadStep] = useState<number>(1);
  const [idCardFile, setIdCardFile] = useState<File | null>(null);
  const [drivingLicenseFile, setDrivingLicenseFile] = useState<File | null>(null);
  const [vehicleRegistrationFile, setVehicleRegistrationFile] = useState<File | null>(null);

  // Toggle driver online status
  const toggleOnlineStatus = () => {
    if (!driverProfile.isVerified) {
      toast({
        title: "Profile Not Verified",
        description: "Please complete your profile setup to go online",
        variant: "destructive"
      });
      return;
    }
    
    setOnlineStatus(!onlineStatus);
    toast({
      title: onlineStatus ? "You are now offline" : "You are now online",
      description: onlineStatus
        ? "You won't receive new trip requests"
        : "You will now receive trip requests",
    });
  };

  // Accept a trip request
  const acceptTrip = (tripId: string) => {
    setTripRequests(
      tripRequests.map((trip) =>
        trip.id === tripId ? { ...trip, status: "accepted" } : trip
      )
    );
    setActiveTripId(tripId);
    toast({
      title: "Trip Accepted",
      description: "You have accepted the trip request",
    });
  };

  // Reject a trip request
  const rejectTrip = (tripId: string) => {
    setTripRequests(tripRequests.filter((trip) => trip.id !== tripId));
    toast({
      title: "Trip Rejected",
      description: "You have rejected the trip request",
    });
  };

  // Complete a trip
  const completeTrip = (tripId: string) => {
    setTripRequests(
      tripRequests.map((trip) =>
        trip.id === tripId ? { ...trip, status: "completed" } : trip
      )
    );
    setActiveTripId(null);
    
    // Deduct platform fee from balance
    const currentBalance = parseInt(balance.replace(/\D/g, ''));
    const platformFee = 1000; // 1,000 rupiah fee
    const newBalance = currentBalance - platformFee;
    setBalance(`Rp ${newBalance.toLocaleString()}`);
    
    // Show toast notification about the fee deduction
    toast({
      title: "Platform Fee Deducted",
      description: "Rp 1,000 has been deducted as platform fee",
    });
    
    // Navigate to rating screen
    navigate(`/driver/rate-passenger/${tripId}`);
  };

  // Open chat with passenger
  const openChat = (tripId: string) => {
    navigate(`/driver/chat/${tripId}`);
  };

  // Navigate to deposit screen
  const navigateToDeposit = () => {
    navigate("/driver/deposit");
  };

  // Navigate to customer support
  const navigateToSupport = () => {
    navigate("/driver/support");
  };

  // Change user role
  const handleRoleChange = (newRole: "driver" | "passenger") => {
    setUserRole(newRole);
    if (newRole === "passenger") {
      navigate("/passenger/dashboard");
      toast({
        title: "Role Changed",
        description: "You are now a passenger",
      });
    }
  };

  // Upload document handler
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, documentType: string) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      
      switch(documentType) {
        case "idCard":
          setIdCardFile(file);
          setDriverProfile(prev => ({ ...prev, idCardUploaded: true }));
          break;
        case "drivingLicense":
          setDrivingLicenseFile(file);
          setDriverProfile(prev => ({ ...prev, drivingLicenseUploaded: true }));
          break;
        case "vehicleRegistration":
          setVehicleRegistrationFile(file);
          setDriverProfile(prev => ({ ...prev, vehicleRegistrationUploaded: true }));
          break;
      }
      
      toast({
        title: "File Uploaded",
        description: `Your ${documentType.replace(/([A-Z])/g, ' $1').toLowerCase()} has been uploaded successfully`,
      });
    }
  };

  // Set vehicle type
  const handleVehicleTypeChange = (type: "motorcycle" | "car") => {
    setDriverProfile(prev => ({ ...prev, vehicleType: type }));
  };

  // Set vehicle plate number
  const handlePlateNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDriverProfile(prev => ({ ...prev, vehiclePlateNumber: event.target.value }));
  };

  // Next step in profile setup
  const handleNextStep = () => {
    if (uploadStep === 1 && !driverProfile.vehicleType) {
      toast({
        title: "Error",
        description: "Please select a vehicle type",
        variant: "destructive"
      });
      return;
    }
    
    if (uploadStep === 2) {
      if (!idCardFile) {
        toast({
          title: "Error",
          description: "Please upload your ID Card",
          variant: "destructive"
        });
        return;
      }
      
      if (!drivingLicenseFile) {
        toast({
          title: "Error",
          description: "Please upload your Driving License",
          variant: "destructive"
        });
        return;
      }
    }
    
    if (uploadStep === 3) {
      if (!vehicleRegistrationFile) {
        toast({
          title: "Error",
          description: "Please upload your Vehicle Registration",
          variant: "destructive"
        });
        return;
      }
      
      if (!driverProfile.vehiclePlateNumber) {
        toast({
          title: "Error",
          description: "Please enter your vehicle plate number",
          variant: "destructive"
        });
        return;
      }
    }

    if (uploadStep < 3) {
      setUploadStep(prev => prev + 1);
    } else {
      // Complete profile setup
      setDriverProfile(prev => ({ ...prev, isVerified: true }));
      setShowProfileSetup(false);
      toast({
        title: "Profile Setup Complete",
        description: "Your profile is now under review. You will be notified once verified.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-grow container max-w-4xl mx-auto px-4 py-20 md:py-24">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Driver Dashboard</h1>
          <div className="flex gap-3">
            <Select
              value={userRole}
              onValueChange={(value: "driver" | "passenger") => handleRoleChange(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="driver">Driver</SelectItem>
                <SelectItem value="passenger">Passenger</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant={onlineStatus ? "default" : "outline"}
              className={cn(
                "button-animation",
                onlineStatus
                  ? "bg-green-600 hover:bg-green-700"
                  : "border-muted-foreground text-muted-foreground"
              )}
              onClick={toggleOnlineStatus}
              disabled={!driverProfile.isVerified}
            >
              {onlineStatus ? "Online" : "Offline"}
            </Button>
          </div>
        </div>

        {/* Profile Setup Wizard */}
        {showProfileSetup && (
          <div className="bg-white rounded-xl shadow-sm border border-border p-6 mb-6 animate-fade-in">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold mb-1">Complete Your Driver Profile</h2>
                <p className="text-sm text-muted-foreground">
                  Please complete your profile setup to start accepting trips
                </p>
              </div>
              <Badge className="bg-amber-600 text-white">Required</Badge>
            </div>

            {/* Step indicators */}
            <div className="flex justify-between mb-8 relative">
              <div className="absolute left-0 right-0 top-4 h-1 bg-muted">
                <div 
                  className="h-1 bg-taxi-purple transition-all" 
                  style={{ width: `${((uploadStep - 1) / 2) * 100}%` }}
                />
              </div>
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex flex-col items-center relative z-10">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mb-2",
                      step < uploadStep
                        ? "bg-taxi-purple text-white"
                        : step === uploadStep
                        ? "bg-taxi-purple/20 text-taxi-purple border border-taxi-purple"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {step}
                  </div>
                  <div className="text-xs text-center">
                    {step === 1 
                      ? "Vehicle Type" 
                      : step === 2 
                      ? "Personal Documents" 
                      : "Vehicle Documents"}
                  </div>
                </div>
              ))}
            </div>

            {/* Step 1: Vehicle Type Selection */}
            {uploadStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Select Vehicle Type</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Choose the type of vehicle you will use for driving
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className={cn(
                      "p-6 border rounded-xl cursor-pointer transition-all",
                      driverProfile.vehicleType === "motorcycle"
                        ? "border-taxi-purple bg-taxi-purple/5"
                        : "border-border hover:border-taxi-purple/50"
                    )}
                    onClick={() => handleVehicleTypeChange("motorcycle")}
                  >
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-taxi-purple mb-4">
                      <Bike className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold mb-1">Motorcycle</h3>
                    <p className="text-sm text-muted-foreground">
                      For faster trips in busy traffic
                    </p>
                  </div>
                  
                  <div
                    className={cn(
                      "p-6 border rounded-xl cursor-pointer transition-all",
                      driverProfile.vehicleType === "car"
                        ? "border-taxi-purple bg-taxi-purple/5"
                        : "border-border hover:border-taxi-purple/50"
                    )}
                    onClick={() => handleVehicleTypeChange("car")}
                  >
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-taxi-purple mb-4">
                      <Car className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold mb-1">Car</h3>
                    <p className="text-sm text-muted-foreground">
                      For comfortable rides with more space
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Personal Documents Upload */}
            {uploadStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Upload Personal Documents</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Please upload clear photos of your documents
                </p>

                <div className="space-y-6">
                  {/* ID Card Upload */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-full bg-taxi-purple/10 flex items-center justify-center text-taxi-purple flex-shrink-0">
                        <UserCircle className="h-5 w-5" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium mb-1">ID Card / KTP / Passport</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Upload your government-issued ID for verification
                        </p>
                        
                        <div className="mt-2">
                          <div className="relative">
                            <Input
                              type="file"
                              id="idCardUpload"
                              className="hidden"
                              accept="image/*,.pdf"
                              onChange={(e) => handleFileUpload(e, "idCard")}
                            />
                            <Label
                              htmlFor="idCardUpload"
                              className={cn(
                                "flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer",
                                idCardFile ? "border-green-400 bg-green-50" : "border-muted-foreground/20 hover:border-taxi-purple/40"
                              )}
                            >
                              {idCardFile ? (
                                <div className="text-center space-y-2">
                                  <Check className="h-8 w-8 mx-auto text-green-500" />
                                  <p className="text-sm font-medium truncate max-w-full">
                                    {idCardFile.name}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Click to change
                                  </p>
                                </div>
                              ) : (
                                <div className="text-center space-y-2">
                                  <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                                  <p className="text-sm">
                                    Click to upload your ID Card
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    JPG, PNG or PDF up to 5MB
                                  </p>
                                </div>
                              )}
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Driving License Upload */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-full bg-taxi-purple/10 flex items-center justify-center text-taxi-purple flex-shrink-0">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium mb-1">Driving License (SIM)</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Upload your valid driving license
                        </p>
                        
                        <div className="mt-2">
                          <div className="relative">
                            <Input
                              type="file"
                              id="drivingLicenseUpload"
                              className="hidden"
                              accept="image/*,.pdf"
                              onChange={(e) => handleFileUpload(e, "drivingLicense")}
                            />
                            <Label
                              htmlFor="drivingLicenseUpload"
                              className={cn(
                                "flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer",
                                drivingLicenseFile ? "border-green-400 bg-green-50" : "border-muted-foreground/20 hover:border-taxi-purple/40"
                              )}
                            >
                              {drivingLicenseFile ? (
                                <div className="text-center space-y-2">
                                  <Check className="h-8 w-8 mx-auto text-green-500" />
                                  <p className="text-sm font-medium truncate max-w-full">
                                    {drivingLicenseFile.name}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Click to change
                                  </p>
                                </div>
                              ) : (
                                <div className="text-center space-y-2">
                                  <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                                  <p className="text-sm">
                                    Click to upload your Driving License
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    JPG, PNG or PDF up to 5MB
                                  </p>
                                </div>
                              )}
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Vehicle Documents */}
            {uploadStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Vehicle Information</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Please provide details about your vehicle
                </p>

                <div className="space-y-6">
                  {/* Vehicle Registration Upload */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-full bg-taxi-purple/10 flex items-center justify-center text-taxi-purple flex-shrink-0">
                        <FileCheck className="h-5 w-5" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium mb-1">Vehicle Registration (STNK)</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Upload your valid vehicle registration document
                        </p>
                        
                        <div className="mt-2">
                          <div className="relative">
                            <Input
                              type="file"
                              id="vehicleRegistrationUpload"
                              className="hidden"
                              accept="image/*,.pdf"
                              onChange={(e) => handleFileUpload(e, "vehicleRegistration")}
                            />
                            <Label
                              htmlFor="vehicleRegistrationUpload"
                              className={cn(
                                "flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer",
                                vehicleRegistrationFile ? "border-green-400 bg-green-50" : "border-muted-foreground/20 hover:border-taxi-purple/40"
                              )}
                            >
                              {vehicleRegistrationFile ? (
                                <div className="text-center space-y-2">
                                  <Check className="h-8 w-8 mx-auto text-green-500" />
                                  <p className="text-sm font-medium truncate max-w-full">
                                    {vehicleRegistrationFile.name}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Click to change
                                  </p>
                                </div>
                              ) : (
                                <div className="text-center space-y-2">
                                  <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                                  <p className="text-sm">
                                    Click to upload your Vehicle Registration
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    JPG, PNG or PDF up to 5MB
                                  </p>
                                </div>
                              )}
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Plate Number */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-full bg-taxi-purple/10 flex items-center justify-center text-taxi-purple flex-shrink-0">
                        <Car className="h-5 w-5" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium mb-1">Vehicle Plate Number</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Enter your vehicle's license plate number
                        </p>
                        
                        <div className="mt-2">
                          <Label htmlFor="plateNumber" className="sr-only">
                            Plate Number
                          </Label>
                          <Input
                            id="plateNumber"
                            placeholder="e.g., B 1234 ABC"
                            value={driverProfile.vehiclePlateNumber}
                            onChange={handlePlateNumberChange}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8">
              <Button 
                className="w-full bg-taxi-purple hover:bg-taxi-purple-dark button-animation"
                onClick={handleNextStep}
              >
                {uploadStep === 3 ? "Complete Setup" : "Next Step"}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Driver Stats and Balance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-border p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Wallet className="h-5 w-5 text-taxi-purple" />
              <h3 className="font-medium">Balance</h3>
            </div>
            <p className="text-2xl font-bold">{balance}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2 border-taxi-purple/50 text-taxi-purple hover:bg-taxi-purple/5 w-full"
              onClick={navigateToDeposit}
            >
              <Plus className="mr-1 h-4 w-4" /> Add Funds
            </Button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-border p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="h-5 w-5 text-taxi-purple" />
              <h3 className="font-medium">Today's Trips</h3>
            </div>
            <p className="text-2xl font-bold">3</p>
            <p className="text-sm text-muted-foreground">Total earnings: Rp 125,000</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-border p-4">
            <div className="flex items-center space-x-2 mb-2">
              <User className="h-5 w-5 text-taxi-purple" />
              <h3 className="font-medium">Your Rating</h3>
            </div>
            <div className="flex items-center">
              <p className="text-2xl font-bold mr-2">4.8</p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-4 h-4 ${
                      star <= 4.8 ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Based on 45 trips</p>
          </div>
        </div>

        {/* Low Balance Warning */}
        {showLowBalanceWarning && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-start">
            <AlertCircle className="h-5 w-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
            <div className="flex-grow">
              <p className="text-amber-800 font-medium">Low balance warning</p>
              <p className="text-sm text-amber-700 mt-1">
                Your current balance is below the recommended amount. Please deposit
                at least Rp 50,000 to ensure uninterrupted service.
              </p>
              <div className="mt-3 flex space-x-3">
                <Button
                  size="sm"
                  className="bg-amber-600 hover:bg-amber-700 text-white button-animation"
                  onClick={navigateToDeposit}
                >
                  Deposit Now
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-amber-700 border-amber-400 hover:bg-amber-100"
                  onClick={() => setShowLowBalanceWarning(false)}
                >
                  Dismiss
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Active Trip Section */}
        {activeTripId && !showProfileSetup && (
          <div className="bg-white rounded-xl shadow-sm border border-border p-6 mb-6 animate-fade-in">
            <div className="flex justify-between items-start mb-4">
              <div>
                <Badge className="bg-green-600 text-white mb-2">Active Trip</Badge>
                <h2 className="text-xl font-bold">
                  {tripRequests.find((trip) => trip.id === activeTripId)?.id}
                </h2>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-taxi-purple/50 text-taxi-purple hover:bg-taxi-purple/5"
                onClick={() => openChat(activeTripId)}
              >
                <MessageSquare className="mr-1 h-4 w-4" />
                Chat
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Avatar className="h-10 w-10 mt-1">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${activeTripId}`} />
                  <AvatarFallback className="bg-taxi-purple text-white">
                    {tripRequests
                      .find((trip) => trip.id === activeTripId)
                      ?.passengerName.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {tripRequests.find((trip) => trip.id === activeTripId)?.passengerName}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <div className="flex mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-3 h-3 ${
                            star <= 4.8 ? "text-yellow-400" : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p>
                      {
                        tripRequests.find((trip) => trip.id === activeTripId)
                          ?.passengerRating
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-secondary space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-taxi-purple/10 flex items-center justify-center text-taxi-purple flex-shrink-0 mt-0.5">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Pickup Location</p>
                    <p className="font-medium">
                      {
                        tripRequests.find((trip) => trip.id === activeTripId)
                          ?.pickupLocation
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-taxi-purple/10 flex items-center justify-center text-taxi-purple flex-shrink-0 mt-0.5">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Destination</p>
                    <p className="font-medium">
                      {
                        tripRequests.find((trip) => trip.id === activeTripId)
                          ?.destination
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center border rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Distance</p>
                  <p className="font-medium">
                    {
                      tripRequests.find((trip) => trip.id === activeTripId)
                        ?.estimatedDistance
                    }
                  </p>
                </div>
                <div className="text-center border rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Duration</p>
                  <p className="font-medium">
                    {
                      tripRequests.find((trip) => trip.id === activeTripId)
                        ?.estimatedDuration
                    }
                  </p>
                </div>
                <div className="text-center border rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Fare</p>
                  <p className="font-medium">
                    {
                      tripRequests.find((trip) => trip.id === activeTripId)
                        ?.proposedFare
                    }
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 button-animation"
                  onClick={() => completeTrip(activeTripId)}
                >
                  Complete Trip
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Trip Requests Section */}
        {!showProfileSetup && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Trip Requests</h2>
            {!onlineStatus && (
              <div className="text-center py-8 bg-white rounded-xl shadow-sm border border-border">
                <p className="text-muted-foreground">
                  You are currently offline. Go online to receive trip requests.
                </p>
              </div>
            )}

            {onlineStatus && tripRequests.filter((trip) => trip.status === "pending").length === 0 && (
              <div className="text-center py-8 bg-white rounded-xl shadow-sm border border-border">
                <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">
                  No new trip requests. Please wait for incoming requests.
                </p>
              </div>
            )}

            {onlineStatus &&
              tripRequests
                .filter((trip) => trip.status === "pending")
                .map((trip) => (
                  <div
                    key={trip.id}
                    className="bg-white rounded-xl shadow-sm border border-border p-6 mb-4 animate-fade-in"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center mb-1">
                          <h3 className="font-bold mr-2">{trip.id}</h3>
                          <Badge className="bg-amber-600">New</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{trip.timestamp}</p>
                      </div>
                      <p className="font-bold text-lg">{trip.proposedFare}</p>
                    </div>

                    <div className="space-y-4 mb-4">
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-10 w-10 mt-1">
                          <AvatarImage src={`https://i.pravatar.cc/150?u=${trip.id}`} />
                          <AvatarFallback className="bg-taxi-purple text-white">
                            {trip.passengerName.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{trip.passengerName}</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <div className="flex mr-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  className={`w-3 h-3 ${
                                    star <= trip.passengerRating
                                      ? "text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <p>{trip.passengerRating}</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-secondary space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-full bg-taxi-purple/10 flex items-center justify-center text-taxi-purple flex-shrink-0 mt-0.5">
                            <MapPin className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Pickup Location</p>
                            <p className="font-medium">{trip.pickupLocation}</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-full bg-taxi-purple/10 flex items-center justify-center text-taxi-purple flex-shrink-0 mt-0.5">
                            <MapPin className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Destination</p>
                            <p className="font-medium">{trip.destination}</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center border rounded-lg p-3">
                          <p className="text-xs text-muted-foreground mb-1">Distance</p>
                          <p className="font-medium">{trip.estimatedDistance}</p>
                        </div>
                        <div className="text-center border rounded-lg p-3">
                          <p className="text-xs text-muted-foreground mb-1">Duration</p>
                          <p className="font-medium">{trip.estimatedDuration}</p>
                        </div>
                        <div className="text-center border rounded-lg p-3">
                          <p className="text-xs text-muted-foreground mb-1">Fare</p>
                          <p className="font-medium">{trip.proposedFare}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button
                        className="flex-1 bg-green-600 hover:bg-green-700 button-animation"
                        onClick={() => acceptTrip(trip.id)}
                      >
                        <Check className="mr-1 h-4 w-4" />
                        Accept
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 border-red-300 text-red-500 hover:bg-red-50"
                        onClick={() => rejectTrip(trip.id)}
                      >
                        <X className="mr-1 h-4 w-4" />
                        Decline
                      </Button>
                    </div>
                  </div>
                ))}
          </div>
        )}

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

export default DriverDashboard;

