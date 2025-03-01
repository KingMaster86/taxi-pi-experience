
import { useState, useEffect } from "react";
import { ArrowLeft, CreditCard, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

// Midtrans configuration
const MIDTRANS_CONFIG = {
  clientKey: "Mid-client-Ojn8XJX4bPGxYGp8",
  merchantId: "G210229255",
  // Note: Server key should be used only on the backend
  // We're including it here for reference but it should not be used client-side
  serverKey: "Mid-server-4WKvjRzQ0SpKiMgdL0kpNB4r"
};

declare global {
  interface Window {
    snap?: {
      pay: (token: string, options: any) => void;
    };
  }
}

const PaymentMidtrans = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({
    cardNumber: false,
    expiry: false,
    cvv: false,
    name: false,
  });

  useEffect(() => {
    // Load Midtrans Snap JS when component mounts
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", MIDTRANS_CONFIG.clientKey);
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up on unmount
      document.body.removeChild(script);
    };
  }, []);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const formatted = value
      .replace(/(\d{4})/g, "$1 ")
      .trim()
      .slice(0, 19);
    setCardNumber(formatted);
    setErrors((prev) => ({ ...prev, cardNumber: false }));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      const formatted = value.length > 2 ? `${value.slice(0, 2)}/${value.slice(2)}` : value;
      setExpiry(formatted);
      setErrors((prev) => ({ ...prev, expiry: false }));
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 3) {
      setCvv(value);
      setErrors((prev) => ({ ...prev, cvv: false }));
    }
  };

  const handleGoBack = () => {
    navigate("/payment");
  };

  const validateForm = () => {
    const newErrors = {
      cardNumber: cardNumber.replace(/\s/g, "").length !== 16,
      expiry: expiry.length !== 5,
      cvv: cvv.length !== 3,
      name: name.trim() === "",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const processPaymentWithMidtrans = () => {
    // In a real implementation, you would make an API call to your backend
    // to create a transaction and get a snap token
    // For this demo, we'll simulate the process
    console.log("Processing payment with Midtrans");
    console.log("Midtrans Config:", {
      clientKey: MIDTRANS_CONFIG.clientKey,
      merchantId: MIDTRANS_CONFIG.merchantId
    });
    
    // Simulate getting a token from backend
    setTimeout(() => {
      const mockSnapToken = "mock-snap-token-" + Math.random().toString(36).substring(2, 15);
      console.log("Received snap token:", mockSnapToken);
      
      // In a real implementation, you would use the actual snap token
      // and the window.snap.pay method to open the Midtrans payment popup
      // window.snap?.pay(mockSnapToken, {
      //   onSuccess: function() {
      //     handlePaymentSuccess();
      //   },
      //   onPending: function() {
      //     // Handle pending payment
      //   },
      //   onError: function() {
      //     // Handle payment error
      //   },
      //   onClose: function() {
      //     setIsProcessing(false);
      //   }
      // });
      
      // For this demo, we'll just simulate a successful payment
      handlePaymentSuccess();
    }, 2000);
  };

  const handlePaymentSuccess = () => {
    setIsProcessing(false);
    toast({
      title: "Payment Successful",
      description: "Your ride has been booked successfully!",
    });
    navigate("/book", { state: { paymentSuccess: true } });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please check the form for errors.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Process payment with Midtrans
    processPaymentWithMidtrans();
  };

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
        <h2 className="text-xl font-semibold">Card Payment via Midtrans</h2>
      </div>

      <div className="p-6 rounded-xl border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5 text-taxi-purple" />
            <span className="font-medium">Enter your card details</span>
          </div>
          <div className="flex items-center space-x-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="card-number">Card Number</Label>
            <div className="relative">
              <Input
                id="card-number"
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className={cn("input-focus", errors.cardNumber && "border-destructive")}
              />
              {errors.cardNumber && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive">
                  <AlertCircle className="h-4 w-4" />
                </div>
              )}
            </div>
            {errors.cardNumber && (
              <p className="text-xs text-destructive">Please enter a valid card number</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <div className="relative">
                <Input
                  id="expiry"
                  value={expiry}
                  onChange={handleExpiryChange}
                  placeholder="MM/YY"
                  className={cn("input-focus", errors.expiry && "border-destructive")}
                />
                {errors.expiry && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive">
                    <AlertCircle className="h-4 w-4" />
                  </div>
                )}
              </div>
              {errors.expiry && (
                <p className="text-xs text-destructive">Please enter a valid expiry date</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <div className="relative">
                <Input
                  id="cvv"
                  value={cvv}
                  onChange={handleCvvChange}
                  placeholder="123"
                  type="password"
                  className={cn("input-focus", errors.cvv && "border-destructive")}
                />
                {errors.cvv && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive">
                    <AlertCircle className="h-4 w-4" />
                  </div>
                )}
              </div>
              {errors.cvv && (
                <p className="text-xs text-destructive">Please enter a valid CVV</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Cardholder Name</Label>
            <div className="relative">
              <Input
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors((prev) => ({ ...prev, name: false }));
                }}
                placeholder="John Doe"
                className={cn("input-focus", errors.name && "border-destructive")}
              />
              {errors.name && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive">
                  <AlertCircle className="h-4 w-4" />
                </div>
              )}
            </div>
            {errors.name && (
              <p className="text-xs text-destructive">Please enter the cardholder name</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-taxi-purple hover:bg-taxi-purple-dark button-animation"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Pay Now"}
          </Button>
        </form>
      </div>

      <div className="mt-4 text-center text-xs text-muted-foreground">
        <p>Your payment is secure and processed by Midtrans (Merchant ID: {MIDTRANS_CONFIG.merchantId})</p>
      </div>
    </div>
  );
};

export default PaymentMidtrans;
