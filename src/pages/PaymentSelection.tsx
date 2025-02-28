
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Wallet, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaymentMethod from "@/components/PaymentMethod";

const PaymentSelection = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/book");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-20 md:py-24">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="flex items-center space-x-2 mb-6">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full" 
              onClick={handleGoBack}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold">Choose Payment Method</h1>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-border p-6 mb-8">
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold">Select how you'd like to pay</h2>
              <p className="text-muted-foreground mt-1">
                We support multiple payment methods for your convenience
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
              <PaymentMethod
                id="payment-card"
                title="Credit Card"
                description="Pay with Visa, Mastercard or any major credit card"
                icon={<CreditCard className="h-5 w-5" />}
                path="/payment/midtrans"
                isPopular={true}
              />
              
              <PaymentMethod
                id="payment-crypto"
                title="Cryptocurrency"
                description="Pay with Bitcoin, Ethereum or other cryptocurrencies"
                icon={<Wallet className="h-5 w-5" />}
                path="/payment/crypto"
              />
              
              <PaymentMethod
                id="payment-pi"
                title="Pi Network"
                description="Pay with Pi cryptocurrency - fast and efficient"
                icon={<Coins className="h-5 w-5" />}
                path="/payment/pi"
              />
            </div>
          </div>
          
          <div className="bg-secondary rounded-xl p-6">
            <h3 className="font-medium mb-2">Why your payment is secure</h3>
            <p className="text-sm text-muted-foreground mb-4">
              All payment transactions on TAXI PI are encrypted and processed through secure payment gateways.
              We do not store your payment information on our servers.
            </p>
            <div className="flex items-center space-x-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-8" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-8" />
              <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png" alt="Ethereum" className="h-8" />
              <div className="p-1 rounded bg-white">
                <img src="https://minepi.com/wp-content/uploads/2020/06/pi_network_logo_dark.png" alt="Pi Network" className="h-6" />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PaymentSelection;
