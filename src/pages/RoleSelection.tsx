
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CarTaxiFront, Package, ChevronRight, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const RoleSelection = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<"passenger" | "driver" | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelection = () => {
    if (!selectedRole) {
      toast({
        title: "Error",
        description: "Please select a role",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      
      if (selectedRole === "passenger") {
        navigate("/passenger/dashboard");
      } else {
        navigate("/driver/dashboard");
      }
      
      toast({
        title: "Welcome",
        description: `You are now logged in as a ${selectedRole}`,
      });
    }, 1000);
  };

  const handleLogout = () => {
    navigate("/auth/login");
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Choose Your Role</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Select how you want to use TAXI PI
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className={cn(
              "p-6 border rounded-xl cursor-pointer transition-all",
              selectedRole === "passenger"
                ? "border-taxi-purple bg-taxi-purple/5"
                : "border-border hover:border-taxi-purple/50"
            )}
            onClick={() => setSelectedRole("passenger")}
          >
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-taxi-purple mb-4">
              <Package className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-1">Passenger</h3>
            <p className="text-sm text-muted-foreground">
              Book rides and send packages
            </p>
          </div>
          
          <div
            className={cn(
              "p-6 border rounded-xl cursor-pointer transition-all",
              selectedRole === "driver"
                ? "border-taxi-purple bg-taxi-purple/5"
                : "border-border hover:border-taxi-purple/50"
            )}
            onClick={() => setSelectedRole("driver")}
          >
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-taxi-purple mb-4">
              <CarTaxiFront className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-1">Driver</h3>
            <p className="text-sm text-muted-foreground">
              Accept ride requests and deliver packages
            </p>
          </div>
        </div>
        
        <div className="pt-4 space-y-3">
          <Button 
            onClick={handleRoleSelection}
            className="w-full bg-taxi-purple hover:bg-taxi-purple-dark button-animation"
            disabled={!selectedRole || isLoading}
          >
            {isLoading ? "Loading..." : "Continue"}
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline"
            className="w-full text-muted-foreground"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
