
import { useEffect } from "react";
import PaymentPiNetworkComponent from "@/components/PaymentPiNetwork";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PaymentPiNetwork = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-20 md:py-24">
        <div className="container max-w-lg mx-auto px-4">
          <PaymentPiNetworkComponent />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PaymentPiNetwork;
