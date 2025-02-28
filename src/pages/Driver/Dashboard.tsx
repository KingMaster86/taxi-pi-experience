
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  MapPin,
  User,
  Phone,
  MessageSquare,
  Check,
  X,
  DollarSign,
  AlertCircle,
  Wallet,
  Plus,
  HelpCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type TripRequest = {
  id: string;
  passengerName: string;
  passengerRating: number;
  pickupLocation: string;
  destination: string;
  estimatedDistance: string;
  estimatedDuration: string;
  proposedFare: string;
  status: "pending" | "accepted" | "completed" | "cancelled";
  timestamp: string;
};

const mockTripRequests: TripRequest[] = [
  {
    id: "TR-1001",
    passengerName: "John Doe",
    passengerRating: 4.8,
    pickupLocation: "Jl. Sudirman No. 123, Jakarta",
    destination: "Mall Grand Indonesia, Jakarta",
    estimatedDistance: "5.2 km",
    estimatedDuration: "20 mins",
    proposedFare: "Rp 45,000",
    status: "pending",
    timestamp: "2 mins ago",
  },
  {
    id: "TR-1002",
    passengerName: "Sarah Smith",
    passengerRating: 4.5,
    pickupLocation: "Jl. Thamrin No. 456, Jakarta",
    destination: "Plaza Indonesia, Jakarta",
    estimatedDistance: "3.5 km",
    estimatedDuration: "15 mins",
    proposedFare: "Rp 35,000",
    status: "pending",
    timestamp: "5 mins ago",
  },
];

const DriverDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [balance, setBalance] = useState("Rp 150,000");
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [tripRequests, setTripRequests] = useState<TripRequest[]>(mockTripRequests);
  const [activeTripId, setActiveTripId] = useState<string | null>(null);
  const [showLowBalanceWarning, setShowLowBalanceWarning] = useState(true);

  // Toggle driver online status
  const toggleOnlineStatus = () => {
    setOnlineStatus(!onlineStatus);
    toast({
      title: onlineStatus ? "You are now offline" : "You are now online",
      description: onlineStatus
        ? "You won't receive new trip requests"
        : "You will now receive trip requests",
    });
  };

  // Accept a trip request
  const acceptTrip = (tripId: string) => {
    setTripRequests(
      tripRequests.map((trip) =>
        trip.id === tripId ? { ...trip, status: "accepted" } : trip
      )
    );
    setActiveTripId(tripId);
    toast({
      title: "Trip Accepted",
      description: "You have accepted the trip request",
    });
  };

  // Reject a trip request
  const rejectTrip = (tripId: string) => {
    setTripRequests(tripRequests.filter((trip) => trip.id !== tripId));
    toast({
      title: "Trip Rejected",
      description: "You have rejected the trip request",
    });
  };

  // Complete a trip
  const completeTrip = (tripId: string) => {
    setTripRequests(
      tripRequests.map((trip) =>
        trip.id === tripId ? { ...trip, status: "completed" } : trip
      )
    );
    setActiveTripId(null);
    
    // Navigate to rating screen
    navigate(`/driver/rate-passenger/${tripId}`);
  };

  // Open chat with passenger
  const openChat = (tripId: string) => {
    navigate(`/driver/chat/${tripId}`);
  };

  // Navigate to deposit screen
  const navigateToDeposit = () => {
    navigate("/driver/deposit");
  };

  // Navigate to customer support
  const navigateToSupport = () => {
    navigate("/driver/support");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-grow container max-w-4xl mx-auto px-4 py-20 md:py-24">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Driver Dashboard</h1>
          <div>
            <Button
              variant={onlineStatus ? "default" : "outline"}
              className={cn(
                "button-animation",
                onlineStatus
                  ? "bg-green-600 hover:bg-green-700"
                  : "border-muted-foreground text-muted-foreground"
              )}
              onClick={toggleOnlineStatus}
            >
              {onlineStatus ? "Online" : "Offline"}
            </Button>
          </div>
        </div>

        {/* Driver Stats and Balance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-border p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Wallet className="h-5 w-5 text-taxi-purple" />
              <h3 className="font-medium">Balance</h3>
            </div>
            <p className="text-2xl font-bold">{balance}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2 border-taxi-purple/50 text-taxi-purple hover:bg-taxi-purple/5 w-full"
              onClick={navigateToDeposit}
            >
              <Plus className="mr-1 h-4 w-4" /> Add Funds
            </Button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-border p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="h-5 w-5 text-taxi-purple" />
              <h3 className="font-medium">Today's Trips</h3>
            </div>
            <p className="text-2xl font-bold">3</p>
            <p className="text-sm text-muted-foreground">Total earnings: Rp 125,000</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-border p-4">
            <div className="flex items-center space-x-2 mb-2">
              <User className="h-5 w-5 text-taxi-purple" />
              <h3 className="font-medium">Your Rating</h3>
            </div>
            <div className="flex items-center">
              <p className="text-2xl font-bold mr-2">4.8</p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-4 h-4 ${
                      star <= 4.8 ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Based on 45 trips</p>
          </div>
        </div>

        {/* Low Balance Warning */}
        {showLowBalanceWarning && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-start">
            <AlertCircle className="h-5 w-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
            <div className="flex-grow">
              <p className="text-amber-800 font-medium">Low balance warning</p>
              <p className="text-sm text-amber-700 mt-1">
                Your current balance is below the recommended amount. Please deposit
                at least Rp 50,000 to ensure uninterrupted service.
              </p>
              <div className="mt-3 flex space-x-3">
                <Button
                  size="sm"
                  className="bg-amber-600 hover:bg-amber-700 text-white button-animation"
                  onClick={navigateToDeposit}
                >
                  Deposit Now
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-amber-700 border-amber-400 hover:bg-amber-100"
                  onClick={() => setShowLowBalanceWarning(false)}
                >
                  Dismiss
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Active Trip Section */}
        {activeTripId && (
          <div className="bg-white rounded-xl shadow-sm border border-border p-6 mb-6 animate-fade-in">
            <div className="flex justify-between items-start mb-4">
              <div>
                <Badge className="bg-green-600 text-white mb-2">Active Trip</Badge>
                <h2 className="text-xl font-bold">
                  {tripRequests.find((trip) => trip.id === activeTripId)?.id}
                </h2>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-taxi-purple/50 text-taxi-purple hover:bg-taxi-purple/5"
                onClick={() => openChat(activeTripId)}
              >
                <MessageSquare className="mr-1 h-4 w-4" />
                Chat
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Avatar className="h-10 w-10 mt-1">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${activeTripId}`} />
                  <AvatarFallback className="bg-taxi-purple text-white">
                    {tripRequests
                      .find((trip) => trip.id === activeTripId)
                      ?.passengerName.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {tripRequests.find((trip) => trip.id === activeTripId)?.passengerName}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <div className="flex mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-3 h-3 ${
                            star <= 4.8 ? "text-yellow-400" : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p>
                      {
                        tripRequests.find((trip) => trip.id === activeTripId)
                          ?.passengerRating
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-secondary space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-taxi-purple/10 flex items-center justify-center text-taxi-purple flex-shrink-0 mt-0.5">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Pickup Location</p>
                    <p className="font-medium">
                      {
                        tripRequests.find((trip) => trip.id === activeTripId)
                          ?.pickupLocation
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-taxi-purple/10 flex items-center justify-center text-taxi-purple flex-shrink-0 mt-0.5">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Destination</p>
                    <p className="font-medium">
                      {
                        tripRequests.find((trip) => trip.id === activeTripId)
                          ?.destination
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center border rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Distance</p>
                  <p className="font-medium">
                    {
                      tripRequests.find((trip) => trip.id === activeTripId)
                        ?.estimatedDistance
                    }
                  </p>
                </div>
                <div className="text-center border rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Duration</p>
                  <p className="font-medium">
                    {
                      tripRequests.find((trip) => trip.id === activeTripId)
                        ?.estimatedDuration
                    }
                  </p>
                </div>
                <div className="text-center border rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Fare</p>
                  <p className="font-medium">
                    {
                      tripRequests.find((trip) => trip.id === activeTripId)
                        ?.proposedFare
                    }
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 button-animation"
                  onClick={() => completeTrip(activeTripId)}
                >
                  Complete Trip
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Trip Requests Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Trip Requests</h2>
          {!onlineStatus && (
            <div className="text-center py-8 bg-white rounded-xl shadow-sm border border-border">
              <p className="text-muted-foreground">
                You are currently offline. Go online to receive trip requests.
              </p>
            </div>
          )}

          {onlineStatus && tripRequests.filter((trip) => trip.status === "pending").length === 0 && (
            <div className="text-center py-8 bg-white rounded-xl shadow-sm border border-border">
              <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">
                No new trip requests. Please wait for incoming requests.
              </p>
            </div>
          )}

          {onlineStatus &&
            tripRequests
              .filter((trip) => trip.status === "pending")
              .map((trip) => (
                <div
                  key={trip.id}
                  className="bg-white rounded-xl shadow-sm border border-border p-6 mb-4 animate-fade-in"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center mb-1">
                        <h3 className="font-bold mr-2">{trip.id}</h3>
                        <Badge className="bg-amber-600">New</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{trip.timestamp}</p>
                    </div>
                    <p className="font-bold text-lg">{trip.proposedFare}</p>
                  </div>

                  <div className="space-y-4 mb-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-10 w-10 mt-1">
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${trip.id}`} />
                        <AvatarFallback className="bg-taxi-purple text-white">
                          {trip.passengerName.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{trip.passengerName}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <div className="flex mr-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className={`w-3 h-3 ${
                                  star <= trip.passengerRating
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <p>{trip.passengerRating}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-secondary space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-taxi-purple/10 flex items-center justify-center text-taxi-purple flex-shrink-0 mt-0.5">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Pickup Location</p>
                          <p className="font-medium">{trip.pickupLocation}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-taxi-purple/10 flex items-center justify-center text-taxi-purple flex-shrink-0 mt-0.5">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Destination</p>
                          <p className="font-medium">{trip.destination}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center border rounded-lg p-3">
                        <p className="text-xs text-muted-foreground mb-1">Distance</p>
                        <p className="font-medium">{trip.estimatedDistance}</p>
                      </div>
                      <div className="text-center border rounded-lg p-3">
                        <p className="text-xs text-muted-foreground mb-1">Duration</p>
                        <p className="font-medium">{trip.estimatedDuration}</p>
                      </div>
                      <div className="text-center border rounded-lg p-3">
                        <p className="text-xs text-muted-foreground mb-1">Fare</p>
                        <p className="font-medium">{trip.proposedFare}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      className="flex-1 bg-green-600 hover:bg-green-700 button-animation"
                      onClick={() => acceptTrip(trip.id)}
                    >
                      <Check className="mr-1 h-4 w-4" />
                      Accept
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-red-300 text-red-500 hover:bg-red-50"
                      onClick={() => rejectTrip(trip.id)}
                    >
                      <X className="mr-1 h-4 w-4" />
                      Decline
                    </Button>
                  </div>
                </div>
              ))}
        </div>

        {/* Help Button */}
        <div className="fixed bottom-20 right-4 md:bottom-8 md:right-8">
          <Button
            className="rounded-full w-12 h-12 bg-taxi-purple hover:bg-taxi-purple-dark shadow-lg"
            onClick={navigateToSupport}
          >
            <HelpCircle className="h-6 w-6" />
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DriverDashboard;
