
import { useEffect, useRef, useState } from "react";
import { useTrackLocation, useWatchPosition } from "@/services/locationService";
import { MapPin, Navigation } from "lucide-react";

interface LocationSharingMapProps {
  userId: string;
  targetUserId: string;
  isDriver: boolean;
}

const LocationSharingMap = ({ userId, targetUserId, isDriver }: LocationSharingMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Track current user's location and share it
  const { location: myLocation, error: myLocationError } = useWatchPosition(userId);
  
  // Track target user's location (driver or passenger)
  const targetLocation = useTrackLocation(targetUserId);
  
  useEffect(() => {
    // In a real implementation, this would be replaced with an actual map library
    // like Google Maps, Mapbox, or Leaflet
    if (mapRef.current) {
      setTimeout(() => setMapLoaded(true), 1000);
    }
  }, []);

  if (myLocationError) {
    return (
      <div className="p-4 border border-destructive/50 bg-destructive/10 rounded-md">
        <p className="text-sm text-destructive">Error: {myLocationError}</p>
        <p className="text-xs mt-1">Please enable location services to use real-time tracking.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden border border-border relative" style={{ height: "300px" }}>
      <div ref={mapRef} className="w-full h-full bg-secondary">
        {!mapLoaded ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin h-8 w-8 border-4 border-taxi-purple border-t-transparent rounded-full" />
          </div>
        ) : (
          <div className="relative w-full h-full p-4">
            {/* Simulated map - in production, this would be a real map */}
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 text-sm">Map View</span>
            </div>
            
            {/* My location marker */}
            {myLocation && (
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="p-2 bg-taxi-purple rounded-full animate-pulse">
                  <Navigation className="h-4 w-4 text-white" />
                </div>
                <div className="text-xs font-medium mt-1 text-center bg-white/80 px-2 py-0.5 rounded">
                  {isDriver ? "You (Driver)" : "You (Passenger)"}
                </div>
              </div>
            )}
            
            {/* Target location marker */}
            {targetLocation && (
              <div className="absolute left-1/3 top-1/3 transform -translate-x-1/2 -translate-y-1/2">
                <div className="p-2 bg-green-500 rounded-full">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div className="text-xs font-medium mt-1 text-center bg-white/80 px-2 py-0.5 rounded">
                  {isDriver ? "Passenger" : "Driver"}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-2 text-xs">
        {myLocation && (
          <div>
            <p className="font-semibold">Your location:</p>
            <p>Lat: {myLocation.latitude.toFixed(6)}, Lng: {myLocation.longitude.toFixed(6)}</p>
          </div>
        )}
        {targetLocation && (
          <div className="mt-1">
            <p className="font-semibold">{isDriver ? "Passenger" : "Driver"} location:</p>
            <p>Lat: {targetLocation.latitude.toFixed(6)}, Lng: {targetLocation.longitude.toFixed(6)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSharingMap;
