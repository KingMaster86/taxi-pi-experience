
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RideBooking from "./pages/RideBooking";
import PaymentSelection from "./pages/PaymentSelection";
import PaymentMidtrans from "./pages/PaymentMidtrans";
import PaymentCrypto from "./pages/PaymentCrypto";
import PaymentPiNetwork from "./pages/PaymentPiNetwork";
import RideHistory from "./pages/RideHistory";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/book" element={<RideBooking />} />
          <Route path="/payment" element={<PaymentSelection />} />
          <Route path="/payment/midtrans" element={<PaymentMidtrans />} />
          <Route path="/payment/crypto" element={<PaymentCrypto />} />
          <Route path="/payment/pi" element={<PaymentPiNetwork />} />
          <Route path="/history" element={<RideHistory />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
