
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Car, 
  Bike, 
  User, 
  FileText, 
  CreditCard, 
  Upload, 
  Check, 
  Clock, 
  AlertTriangle,
  Car as CarIcon, // Using Car icon but with a different name
  Truck,
  Cpu
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

const DriverDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Driver state
  const [driverRole, setDriverRole] = useState<"car" | "motorcycle" | "passenger">("car");
  const [isVerified, setIsVerified] = useState(false);
  const [verificationStep, setVerificationStep] = useState(1);
  const [plateNumber, setPlateNumber] = useState("");
  const [vehicleBrand, setVehicleBrand] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [licenseDocument, setLicenseDocument] = useState<File | null>(null);
  const [vehicleDocument, setVehicleDocument] = useState<File | null>(null);
  
  // Balance and trip state
  const [balance, setBalance] = useState(0);
  const [trips, setTrips] = useState([]);
  const [hasActiveTrip, setHasActiveTrip] = useState(false);
  
  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setFile(file);
      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
    }
  };
  
  // Handle driver type change
  const handleDriverTypeChange = (value: "car" | "motorcycle" | "passenger") => {
    setDriverRole(value);
    // Reset verification if driver type changes
    if (isVerified) {
      setIsVerified(false);
      setVerificationStep(1);
      toast({
        title: "Verification Required",
        description: "Please complete the verification process for your new role.",
        variant: "destructive",
      });
    }
  };
  
  // Handle verification submission
  const submitVerification = () => {
    if (verificationStep < 3) {
      setVerificationStep(verificationStep + 1);
    } else {
      // Final submission
      if (!idDocument || !licenseDocument || !vehicleDocument || !plateNumber) {
        toast({
          title: "Incomplete Information",
          description: "Please upload all required documents and enter your vehicle plate number.",
          variant: "destructive",
        });
        return;
      }
      
      // Simulate verification process
      toast({
        title: "Verification Submitted",
        description: "Your documents are being reviewed. This may take up to 24 hours.",
      });
      
      // For demo purposes, we'll verify immediately
      setTimeout(() => {
        setIsVerified(true);
        toast({
          title: "Verification Approved",
          description: "You are now verified as a driver. You can start accepting trips.",
        });
      }, 2000);
    }
  };
  
  // Handle deposit navigation
  const navigateToDeposit = () => {
    navigate("/driver/deposit");
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow container max-w-4xl mx-auto px-4 py-20 md:py-24">
        <h1 className="text-2xl font-bold mb-6">Driver Dashboard</h1>
        
        {/* Driver Type Selection */}
        <div className="mb-6 bg-white p-6 rounded-xl shadow-sm border border-border">
          <h2 className="text-lg font-semibold mb-4">Choose Your Role</h2>
          <div className="grid grid-cols-3 gap-4">
            <Button
              variant={driverRole === "car" ? "default" : "outline"}
              className={cn("flex flex-col h-24 items-center justify-center", 
                driverRole === "car" ? "bg-taxi-purple hover:bg-taxi-purple-dark" : ""
              )}
              onClick={() => handleDriverTypeChange("car")}
            >
              <Car className="h-6 w-6 mb-2" />
              <span>Car Driver</span>
            </Button>
            
            <Button
              variant={driverRole === "motorcycle" ? "default" : "outline"}
              className={cn("flex flex-col h-24 items-center justify-center", 
                driverRole === "motorcycle" ? "bg-taxi-purple hover:bg-taxi-purple-dark" : ""
              )}
              onClick={() => handleDriverTypeChange("motorcycle")}
            >
              <Bike className="h-6 w-6 mb-2" />
              <span>Motorcycle Driver</span>
            </Button>
            
            <Button
              variant={driverRole === "passenger" ? "default" : "outline"}
              className={cn("flex flex-col h-24 items-center justify-center", 
                driverRole === "passenger" ? "bg-taxi-purple hover:bg-taxi-purple-dark" : ""
              )}
              onClick={() => handleDriverTypeChange("passenger")}
            >
              <User className="h-6 w-6 mb-2" />
              <span>Passenger</span>
            </Button>
          </div>
        </div>
        
        {/* Verification Section - Only show if driver role is selected */}
        {(driverRole === "car" || driverRole === "motorcycle") && !isVerified && (
          <div className="mb-6 bg-white p-6 rounded-xl shadow-sm border border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Driver Verification</h2>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>Step {verificationStep} of 3</span>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-secondary h-2 rounded-full mb-6">
              <div 
                className="bg-taxi-purple h-2 rounded-full transition-all"
                style={{ width: `${(verificationStep / 3) * 100}%` }}
              ></div>
            </div>
            
            {/* Step 1: ID Verification */}
            {verificationStep === 1 && (
              <div className="space-y-4">
                <div className="bg-secondary/50 p-4 rounded-lg mb-4">
                  <h3 className="font-medium mb-2">Upload Identification Document</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Please upload a clear photo of your ID card, KTP, or Passport.
                  </p>
                  
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    {idDocument ? (
                      <div className="flex items-center justify-center space-x-2">
                        <Check className="h-5 w-5 text-green-500" />
                        <span>{idDocument.name}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          SVG, PNG, JPG or PDF (max. 10MB)
                        </p>
                      </>
                    )}
                    <Input
                      id="id-upload"
                      type="file"
                      className="hidden"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload(e, setIdDocument)}
                    />
                    <Label
                      htmlFor="id-upload"
                      className="block w-full h-full absolute inset-0 cursor-pointer"
                    />
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-taxi-purple hover:bg-taxi-purple-dark"
                  onClick={submitVerification}
                  disabled={!idDocument}
                >
                  Continue
                </Button>
              </div>
            )}
            
            {/* Step 2: License Verification */}
            {verificationStep === 2 && (
              <div className="space-y-4">
                <div className="bg-secondary/50 p-4 rounded-lg mb-4">
                  <h3 className="font-medium mb-2">Upload Driving License</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Please upload a clear photo of your driving license.
                  </p>
                  
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    {licenseDocument ? (
                      <div className="flex items-center justify-center space-x-2">
                        <Check className="h-5 w-5 text-green-500" />
                        <span>{licenseDocument.name}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          SVG, PNG, JPG or PDF (max. 10MB)
                        </p>
                      </>
                    )}
                    <Input
                      id="license-upload"
                      type="file"
                      className="hidden"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload(e, setLicenseDocument)}
                    />
                    <Label
                      htmlFor="license-upload"
                      className="block w-full h-full absolute inset-0 cursor-pointer"
                    />
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-taxi-purple hover:bg-taxi-purple-dark"
                  onClick={submitVerification}
                  disabled={!licenseDocument}
                >
                  Continue
                </Button>
              </div>
            )}
            
            {/* Step 3: Vehicle Information */}
            {verificationStep === 3 && (
              <div className="space-y-4">
                <div className="bg-secondary/50 p-4 rounded-lg mb-4">
                  <h3 className="font-medium mb-2">Vehicle Information</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Please enter your vehicle details and upload vehicle registration document.
                  </p>
                  
                  <div className="space-y-4 mb-4">
                    <div>
                      <Label htmlFor="plate" className="text-sm font-medium">
                        License Plate Number
                      </Label>
                      <Input
                        id="plate"
                        placeholder="e.g. B 1234 CD"
                        value={plateNumber}
                        onChange={(e) => setPlateNumber(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="vehicleBrand" className="text-sm font-medium">
                        Vehicle Brand
                      </Label>
                      <Input
                        id="vehicleBrand"
                        placeholder="e.g. Toyota, Honda, Suzuki"
                        value={vehicleBrand}
                        onChange={(e) => setVehicleBrand(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="vehicleModel" className="text-sm font-medium">
                        Vehicle Model/Type
                      </Label>
                      <Input
                        id="vehicleModel"
                        placeholder="e.g. Avanza, Civic, Satria"
                        value={vehicleModel}
                        onChange={(e) => setVehicleModel(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="vehicleDocument" className="text-sm font-medium">
                        Vehicle Registration Document
                      </Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center mt-1">
                        {vehicleDocument ? (
                          <div className="flex items-center justify-center space-x-2">
                            <Check className="h-5 w-5 text-green-500" />
                            <span>{vehicleDocument.name}</span>
                          </div>
                        ) : (
                          <>
                            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground mb-2">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground">
                              SVG, PNG, JPG or PDF (max. 10MB)
                            </p>
                          </>
                        )}
                        <Input
                          id="vehicle-upload"
                          type="file"
                          className="hidden"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileUpload(e, setVehicleDocument)}
                        />
                        <Label
                          htmlFor="vehicle-upload"
                          className="block w-full h-full absolute inset-0 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-taxi-purple hover:bg-taxi-purple-dark"
                  onClick={submitVerification}
                  disabled={!vehicleDocument || !plateNumber || !vehicleBrand || !vehicleModel}
                >
                  Submit for Verification
                </Button>
              </div>
            )}
          </div>
        )}
        
        {/* Driver Status - Only show if verified */}
        {(driverRole === "car" || driverRole === "motorcycle") && isVerified && (
          <div className="mb-6 bg-white p-6 rounded-xl shadow-sm border border-border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Driver Status</h2>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium flex items-center">
                <Check className="h-4 w-4 mr-1" />
                Verified
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-secondary/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Vehicle</h3>
                <div className="font-semibold flex items-center">
                  {driverRole === "car" ? (
                    <Car className="h-5 w-5 mr-2 text-taxi-purple" />
                  ) : (
                    <Bike className="h-5 w-5 mr-2 text-taxi-purple" />
                  )}
                  <span>{vehicleBrand} {vehicleModel}</span>
                </div>
                <p className="text-xs font-medium mt-1">{plateNumber}</p>
              </div>
              
              <div className="bg-secondary/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Balance</h3>
                <p className="font-semibold flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-taxi-purple" />
                  Rp {balance.toLocaleString()}
                </p>
                <Button 
                  variant="link" 
                  className="text-xs p-0 h-auto mt-1 text-taxi-purple"
                  onClick={navigateToDeposit}
                >
                  Top up balance
                </Button>
              </div>
            </div>
            
            {balance === 0 && (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg mb-4 flex items-start">
                <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium">Balance Required</h3>
                  <p className="text-sm">
                    You need to add balance to your account before accepting trips. Platform fee of Rp 1,000 is deducted for each completed trip.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 border-yellow-300 bg-yellow-100 hover:bg-yellow-200 text-yellow-800"
                    onClick={navigateToDeposit}
                  >
                    Deposit Now
                  </Button>
                </div>
              </div>
            )}
            
            {hasActiveTrip ? (
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => navigate("/driver/trip/active")}
              >
                Continue Active Trip
              </Button>
            ) : (
              <Button 
                className="w-full bg-taxi-purple hover:bg-taxi-purple-dark"
                disabled={balance === 0}
                onClick={() => navigate("/driver/trips")}
              >
                Start Accepting Trips
              </Button>
            )}
          </div>
        )}
        
        {/* Passenger Mode */}
        {driverRole === "passenger" && (
          <div className="mb-6 bg-white p-6 rounded-xl shadow-sm border border-border">
            <h2 className="text-lg font-semibold mb-4">Passenger Mode</h2>
            <p className="text-muted-foreground mb-4">
              You are currently in passenger mode. You can book rides or send packages.
            </p>
            <Button 
              className="w-full bg-taxi-purple hover:bg-taxi-purple-dark"
              onClick={() => navigate("/passenger/dashboard")}
            >
              Go to Passenger Dashboard
            </Button>
          </div>
        )}
        
        {/* Recent Activity Section - Only show if verified */}
        {(driverRole === "car" || driverRole === "motorcycle") && isVerified && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            
            {trips.length > 0 ? (
              <div className="space-y-4">
                {/* Trip List would go here */}
                <p>No recent trips</p>
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-3" />
                <h3 className="font-medium mb-1">No Recent Activity</h3>
                <p className="text-sm text-muted-foreground">
                  Your recent trips will appear here once you complete them.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default DriverDashboard;
