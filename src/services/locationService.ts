
import { useEffect, useState } from "react";

export interface Location {
  latitude: number;
  longitude: number;
  timestamp: number;
}

// Simulated database for location storage
const locationDatabase: Record<string, Location> = {};

// Real-time location update simulation (would be replaced with Firebase/Socket.io in production)
const listeners: Record<string, ((location: Location) => void)[]> = {};

export const updateLocation = (userId: string, location: Location): void => {
  locationDatabase[userId] = location;
  
  // Notify all listeners for this user's location
  if (listeners[userId]) {
    listeners[userId].forEach(callback => callback(location));
  }
  
  console.log(`Updated location for ${userId}:`, location);
};

export const subscribeToLocation = (
  userId: string, 
  callback: (location: Location) => void
): () => void => {
  if (!listeners[userId]) {
    listeners[userId] = [];
  }
  
  listeners[userId].push(callback);
  console.log(`Subscribed to location updates for ${userId}`);
  
  // Return unsubscribe function
  return () => {
    listeners[userId] = listeners[userId].filter(cb => cb !== callback);
    console.log(`Unsubscribed from location updates for ${userId}`);
  };
};

export const useWatchPosition = (userId: string) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: position.timestamp
        };
        
        setLocation(newLocation);
        updateLocation(userId, newLocation);
      },
      (err) => {
        setError(err.message);
        console.error("Error getting location:", err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 5000
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [userId]);

  return { location, error };
};

export const useTrackLocation = (targetUserId: string) => {
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    // Get initial location if available
    if (locationDatabase[targetUserId]) {
      setLocation(locationDatabase[targetUserId]);
    }

    // Subscribe to location updates
    const unsubscribe = subscribeToLocation(targetUserId, (newLocation) => {
      setLocation(newLocation);
    });

    return unsubscribe;
  }, [targetUserId]);

  return location;
};
