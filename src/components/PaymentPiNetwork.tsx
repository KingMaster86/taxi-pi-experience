
import { useState } from "react";
import { ArrowLeft, QrCode, Loader2, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const PaymentPiNetwork = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [paymentState, setPaymentState] = useState<'init' | 'scanning' | 'verifying' | 'success' | 'error'>('init');

  const handleGoBack = () => {
    navigate("/payment");
  };

  const handleInitiatePayment = () => {
    setPaymentState('scanning');
    
    // Simulate user scanning QR code
    setTimeout(() => {
      setPaymentState('verifying');
      
      // Simulate verification process
      setTimeout(() => {
        const success = Math.random() > 0.3; // 70% success rate for demo
        
        if (success) {
          setPaymentState('success');
          toast({
            title: "Payment Successful",
            description: "Your Pi Network payment has been processed!",
          });
          
          // Redirect after success
          setTimeout(() => {
            navigate("/book", { state: { paymentSuccess: true } });
          }, 2000);
        } else {
          setPaymentState('error');
          toast({
            title: "Payment Failed",
            description: "There was an issue processing your payment. Please try again.",
            variant: "destructive",
          });
        }
      }, 3000);
    }, 4000);
  };

  const renderPaymentStep = () => {
    switch (paymentState) {
      case 'init':
        return (
          <div className="text-center space-y-4 py-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-taxi-purple/10 flex items-center justify-center">
              <img 
                src="https://minepi.com/wp-content/uploads/2020/06/pi_network_logo_dark.png" 
                alt="Pi Network" 
                className="w-10 h-10" 
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Pi Network Payment</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Pay with your Pi wallet for a seamless experience
              </p>
            </div>
            <div className="p-3 rounded-lg bg-secondary flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-mono font-semibold">50 π</span>
                <span className="text-xs text-muted-foreground">(~$45.00)</span>
              </div>
            </div>
            <Button 
              onClick={handleInitiatePayment}
              className="w-full bg-taxi-purple hover:bg-taxi-purple-dark button-animation"
            >
              Scan to Pay with Pi
            </Button>
          </div>
        );
        
      case 'scanning':
        return (
          <div className="text-center space-y-6 py-6">
            <div className="w-56 h-56 mx-auto bg-secondary rounded-md flex items-center justify-center relative">
              <QrCode className="w-32 h-32 text-taxi-purple" strokeWidth={1} />
              <div className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-sm">
                <div className="p-4 bg-background rounded-lg shadow-lg">
                  <Loader2 className="h-8 w-8 text-taxi-purple animate-spin mx-auto mb-2" />
                  <p className="text-sm font-medium">Open Pi Browser to scan</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Waiting for you to scan with your Pi Browser...
            </p>
          </div>
        );
        
      case 'verifying':
        return (
          <div className="text-center space-y-6 py-6">
            <Loader2 className="h-12 w-12 text-taxi-purple animate-spin mx-auto" />
            <div>
              <h3 className="font-semibold">Verifying Payment</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Please wait while we verify your payment
              </p>
            </div>
            <div className="space-y-1">
              <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-taxi-purple animate-pulse rounded-full" style={{ width: '60%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground">This may take a few moments</p>
            </div>
          </div>
        );
        
      case 'success':
        return (
          <div className="text-center space-y-6 py-6">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Payment Successful!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Your Pi payment has been processed successfully
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-50 border border-green-100">
              <p className="text-sm text-green-800">
                Transaction ID: <span className="font-mono">pi-tx-28d9e71f</span>
              </p>
            </div>
          </div>
        );
        
      case 'error':
        return (
          <div className="text-center space-y-6 py-6">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Payment Failed</h3>
              <p className="text-sm text-muted-foreground mt-1">
                We couldn't process your Pi payment
              </p>
            </div>
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-destructive">
                There may be an issue with your Pi wallet or insufficient funds.
              </p>
            </div>
            <Button 
              onClick={handleInitiatePayment}
              className="w-full bg-taxi-purple hover:bg-taxi-purple-dark button-animation"
            >
              Try Again
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center space-x-2 mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full" 
          onClick={handleGoBack}
          disabled={paymentState === 'verifying'}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-xl font-semibold">Pi Network Payment</h2>
      </div>

      <div className={cn(
        "p-6 rounded-xl border border-border bg-card shadow-sm",
        paymentState === 'success' && "border-green-200",
        paymentState === 'error' && "border-destructive/50"
      )}>
        {renderPaymentStep()}
      </div>

      <div className="mt-4 text-center text-xs text-muted-foreground">
        <p>Pi payments are secure, fast, and have minimal transaction fees.</p>
      </div>
    </div>
  );
};

export default PaymentPiNetwork;
