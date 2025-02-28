
import { useParams, useNavigate } from "react-router-dom";
import Chat from "@/components/Chat";

const PassengerChat = () => {
  const { driverId } = useParams<{ driverId: string }>();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/passenger/dashboard");
  };

  // This would normally come from an API or state management
  const driverData = {
    id: driverId || "unknown",
    name: "Alex Driver",
    avatar: `https://i.pravatar.cc/150?u=${driverId}`,
    status: "online" as const
  };

  // Initial messages would typically come from an API
  const initialMessages = [
    {
      id: "1",
      sender: "user",
      content: "Hi driver, I'm waiting at the pickup location",
      timestamp: new Date(Date.now() - 15 * 60000), // 15 minutes ago
      status: "read" as const,
      type: "text" as const
    },
    {
      id: "2",
      sender: "other",
      content: "I'll be there in about 5 minutes",
      timestamp: new Date(Date.now() - 14 * 60000), // 14 minutes ago
      status: "read" as const,
      type: "text" as const
    },
    {
      id: "3",
      sender: "user",
      content: "Great, I'm wearing a blue shirt and standing near the entrance",
      timestamp: new Date(Date.now() - 10 * 60000), // 10 minutes ago
      status: "read" as const,
      type: "text" as const
    }
  ];

  return (
    <div className="h-screen flex flex-col">
      <Chat 
        otherUser={driverData}
        initialMessages={initialMessages}
        onBack={handleBack}
        userType="passenger"
      />
    </div>
  );
};

export default PassengerChat;
