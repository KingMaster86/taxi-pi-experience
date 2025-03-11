
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
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register"; 
import ForgotPassword from "./pages/Auth/ForgotPassword";
import RoleSelection from "./pages/RoleSelection";
import DriverDashboard from "./pages/Driver/Dashboard";
import DriverDeposit from "./pages/Driver/Deposit";
import DriverChat from "./pages/Driver/Chat";
import RatePassenger from "./pages/Driver/RatePassenger";
import PassengerDashboard from "./pages/Passenger/Dashboard";
import PassengerChat from "./pages/Passenger/Chat";
import AdminDashboard from "./pages/Admin/Dashboard";
import TodoList from "./pages/TodoList";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/driver/dashboard" element={<DriverDashboard />} />
          <Route path="/driver/deposit" element={<DriverDeposit />} />
          <Route path="/driver/rate-passenger/:tripId" element={<RatePassenger />} />
          <Route path="/driver/chat/:passengerId" element={<DriverChat />} />
          <Route path="/passenger/dashboard" element={<PassengerDashboard />} />
          <Route path="/passenger/chat/:driverId" element={<PassengerChat />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/book" element={<RideBooking />} />
          <Route path="/payment" element={<PaymentSelection />} />
          <Route path="/payment/midtrans" element={<PaymentMidtrans />} />
          <Route path="/payment/crypto" element={<PaymentCrypto />} />
          <Route path="/payment/pi" element={<PaymentPiNetwork />} />
          <Route path="/history" element={<RideHistory />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/todos" element={<TodoList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
