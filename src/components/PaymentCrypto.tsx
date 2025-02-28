
import { useState } from "react";
import { ArrowLeft, Copy, Check, QrCode, AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const PaymentCrypto = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [isExpired, setIsExpired] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const walletAddress = "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7";
  const formattedTimeLeft = `${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`;

  const handleGoBack = () => {
    navigate("/payment");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Wallet address copied",
        description: "The wallet address has been copied to your clipboard.",
      });
    });
  };

  const handleVerify = () => {
    setIsVerifying(true);
    
    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);
      toast({
        title: "Payment Verified",
        description: "Your crypto payment has been confirmed!",
      });
      navigate("/book", { state: { paymentSuccess: true } });
    }, 2000);
  };

  const resetTimer = () => {
    setTimeLeft(900);
    setIsExpired(false);
    toast({
      title: "Timer Reset",
      description: "You have 15 more minutes to complete the payment.",
    });
  };

  // Countdown timer effect would go here in a real implementation

  return (
    <div className="animate-fade-in">
      <div className="flex items-center space-x-2 mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full" 
          onClick={handleGoBack}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-xl font-semibold">Crypto Payment</h2>
      </div>

      <div className="p-6 rounded-xl border border-border bg-card shadow-sm">
        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-56 h-56 bg-secondary rounded-md flex items-center justify-center mb-4">
              <QrCode className="w-32 h-32 text-taxi-purple" strokeWidth={1} />
              {isExpired && (
                <div className="absolute inset-0 rounded-md bg-background/90 flex flex-col items-center justify-center">
                  <AlertCircle className="h-8 w-8 text-destructive mb-2" />
                  <p className="text-sm font-medium text-destructive">QR Code expired</p>
                  <Button onClick={resetTimer} variant="outline" size="sm" className="mt-2">
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Generate new code
                  </Button>
                </div>
              )}
            </div>
            
            <div className={cn(
              "p-2 px-4 rounded-full text-sm font-medium",
              isExpired ? "bg-destructive/10 text-destructive" : "bg-taxi-purple/10 text-taxi-purple"
            )}>
              {isExpired ? "Expired" : `Time remaining: ${formattedTimeLeft}`}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Send exactly</p>
            <div className="p-3 rounded-lg bg-secondary flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-mono font-semibold">0.025 ETH</span>
                <span className="text-xs text-muted-foreground">(~$45.00)</span>
              </div>
              <div className="flex items-center space-x-1 text-xs bg-background/40 px-2 py-1 rounded">
                <span className="font-medium">Ethereum</span>
                <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png" alt="ETH" className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">To this wallet address</p>
            <div className="p-3 rounded-lg bg-secondary flex items-center justify-between">
              <p className="font-mono text-sm truncate max-w-[200px] sm:max-w-[300px]">{walletAddress}</p>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={copyToClipboard}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleVerify}
              className="w-full bg-taxi-purple hover:bg-taxi-purple-dark button-animation"
              disabled={isExpired || isVerifying}
            >
              {isVerifying ? "Verifying..." : "I've completed the payment"}
            </Button>
            
            <p className="text-xs text-center text-muted-foreground px-6">
              After sending the payment, click the button above to verify your transaction
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-amber-800">
            <strong>Important:</strong> Send only ETH to this address. Sending any other cryptocurrency may result in permanent loss.
          </p>
        </div>
        
        <p className="text-xs text-center text-muted-foreground">
          Need help? Contact our support team for assistance.
        </p>
      </div>
    </div>
  );
};

export default PaymentCrypto;
