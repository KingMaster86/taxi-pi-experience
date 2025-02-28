
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import { CarTaxiFront } from "lucide-react";

const ForgotPassword = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate password reset process
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast({
        title: "Email Sent",
        description: "Password reset instructions have been sent to your email",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-taxi-purple/10 flex items-center justify-center">
              <CarTaxiFront className="w-6 h-6 text-taxi-purple" />
            </div>
          </div>
          <h2 className="text-2xl font-bold">Forgot Password</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {isSubmitted 
              ? "Check your email for reset instructions" 
              : "Enter your email to reset your password"}
          </p>
        </div>
        
        {isSubmitted ? (
          <div className="text-center space-y-6 py-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-muted-foreground">
              We've sent a password reset link to <span className="font-medium">{email}</span>. 
              Please check your email and follow the instructions to reset your password.
            </p>
            <div className="pt-4">
              <p className="text-sm text-muted-foreground mb-4">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              <Button 
                type="button" 
                variant="outline"
                className="w-full border-taxi-purple/50 text-taxi-purple hover:bg-taxi-purple/5"
                onClick={() => setIsSubmitted(false)}
              >
                Try again
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Mail className="h-5 w-5" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 input-focus"
                  required
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-taxi-purple hover:bg-taxi-purple-dark button-animation"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Reset Password"}
            </Button>
          </form>
        )}
        
        <div className="text-center">
          <Link 
            to="/auth/login" 
            className="inline-flex items-center text-sm text-taxi-purple hover:underline"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
