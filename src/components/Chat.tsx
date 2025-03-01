
import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Send, Clock, Check, CheckCheck, Image, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from "date-fns";
import LocationSharingMap from "@/components/LocationSharingMap";

interface UserData {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline" | "away";
}

interface MessageStatus {
  status: "sent" | "delivered" | "read";
}

interface MessageType {
  id: string;
  sender: "user" | "other";
  content: string;
  timestamp: Date;
  status: MessageStatus["status"];
  type: "text" | "image" | "location";
  location?: {
    latitude: number;
    longitude: number;
  };
}

interface ChatProps {
  otherUser: UserData;
  initialMessages: MessageType[];
  onBack: () => void;
  userType: "driver" | "passenger";
}

const Chat: React.FC<ChatProps> = ({ otherUser, initialMessages, onBack, userType }) => {
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Autofocus on the input field when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Simulate typing response
  useEffect(() => {
    // Only respond to user messages, not to other's messages or system messages
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.sender === "user") {
      // Start typing after a short delay
      const typingTimeout = setTimeout(() => {
        setIsTyping(true);
      }, 1000);

      // Send a response after a delay
      const responseTimeout = setTimeout(() => {
        setIsTyping(false);
        
        // Generate an appropriate response based on message content
        let responseContent = "I'll be there soon!";
        let messageType: MessageType["type"] = "text";
        let location = undefined;
        
        if (lastMessage.content.toLowerCase().includes("where are you")) {
          responseContent = "I'm on my way. You can see my location on the map.";
          messageType = "location";
          location = {
            latitude: 40.7128,
            longitude: -74.0060
          };
        } else if (lastMessage.content.toLowerCase().includes("wait")) {
          responseContent = "No problem, take your time.";
        } else if (lastMessage.content.toLowerCase().includes("here")) {
          responseContent = "Great! I'll be looking for you.";
        }
        
        const newMessage: MessageType = {
          id: `msg-${Date.now()}`,
          sender: "other" as const,
          content: responseContent,
          timestamp: new Date(),
          status: "sent" as const,
          type: messageType,
          ...(location && { location })
        };
        
        setMessages(prev => [...prev, newMessage]);
      }, 3000);

      return () => {
        clearTimeout(typingTimeout);
        clearTimeout(responseTimeout);
      };
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const newMessage: MessageType = {
      id: `msg-${Date.now()}`,
      sender: "user" as const,
      content: inputMessage,
      timestamp: new Date(),
      status: "sent" as const,
      type: "text" as const
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");
  };

  const handleShareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newMessage: MessageType = {
            id: `msg-${Date.now()}`,
            sender: "user" as const,
            content: "Here's my current location",
            timestamp: new Date(),
            status: "sent" as const,
            type: "location" as const,
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          };
          
          setMessages(prev => [...prev, newMessage]);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="px-4 py-3 border-b flex items-center gap-3 bg-background">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full" 
          onClick={onBack}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <Avatar className="h-9 w-9">
          <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
          <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <h2 className="font-semibold">{otherUser.name}</h2>
          <div className="flex items-center gap-1.5">
            <div className={`h-2 w-2 rounded-full ${
              otherUser.status === "online" 
                ? "bg-green-500" 
                : otherUser.status === "away" 
                ? "bg-amber-500" 
                : "bg-gray-300"
            }`} />
            <span className="text-xs text-muted-foreground capitalize">{otherUser.status}</span>
          </div>
        </div>
      </div>

      {/* Real-time location sharing map */}
      <div className="p-4 border-b">
        <h3 className="text-sm font-medium mb-2">Real-time Location Tracking</h3>
        <LocationSharingMap 
          userId={userType === "driver" ? "driver-123" : "passenger-123"}
          targetUserId={userType === "driver" ? "passenger-123" : "driver-123"}
          isDriver={userType === "driver"}
        />
      </div>

      {/* Messages area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className="max-w-[80%]">
                {message.sender === "other" && (
                  <div className="flex items-center gap-2 mb-1">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
                      <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium">{otherUser.name}</span>
                  </div>
                )}
                
                <div 
                  className={`rounded-lg px-3 py-2 text-sm ${
                    message.sender === "user" 
                      ? "bg-taxi-purple text-white rounded-br-none" 
                      : "bg-secondary text-foreground rounded-bl-none"
                  }`}
                >
                  {message.content}
                  
                  {message.type === "location" && (
                    <div className="mt-2 bg-background/20 p-2 rounded text-xs">
                      <div className="flex items-center gap-1 mb-1">
                        <MapPin className="h-3 w-3" />
                        <span>Location shared</span>
                      </div>
                      {message.location && (
                        <p className="font-mono">
                          {message.location.latitude.toFixed(6)}, {message.location.longitude.toFixed(6)}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-1 mt-1 text-[10px] text-muted-foreground justify-end">
                  <span>{formatTime(message.timestamp)}</span>
                  
                  {message.sender === "user" && (
                    <span>
                      {message.status === "sent" && <Check className="h-3 w-3" />}
                      {message.status === "delivered" && <Check className="h-3 w-3" />}
                      {message.status === "read" && <CheckCheck className="h-3 w-3 text-taxi-purple" />}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%]">
                <div className="flex items-center gap-2 mb-1">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
                    <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs font-medium">{otherUser.name}</span>
                </div>
                
                <div className="rounded-lg px-3 py-2 text-sm bg-secondary text-foreground rounded-bl-none">
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-foreground animate-bounce"></div>
                    <div className="h-2 w-2 rounded-full bg-foreground animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="h-2 w-2 rounded-full bg-foreground animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <Separator />
      
      {/* Input area */}
      <div className="p-4 bg-background flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full shrink-0"
          onClick={handleShareLocation}
        >
          <MapPin className="h-5 w-5 text-taxi-purple" />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full shrink-0"
        >
          <Image className="h-5 w-5 text-taxi-purple" />
        </Button>
        
        <Input
          ref={inputRef}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        
        <Button 
          variant="default" 
          size="icon" 
          className="rounded-full shrink-0 bg-taxi-purple hover:bg-taxi-purple-dark"
          onClick={handleSendMessage}
          disabled={inputMessage.trim() === ""}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Chat;
