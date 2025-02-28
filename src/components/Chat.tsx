
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Paperclip, Image, MapPin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  sender: "user" | "other";
  content: string;
  timestamp: Date;
  status: "sent" | "delivered" | "read";
  type: "text" | "image" | "location";
  imageUrl?: string;
  location?: {
    name: string;
    coords: {
      lat: number;
      lng: number;
    };
  };
}

interface ChatProps {
  otherUser: {
    id: string;
    name: string;
    avatar?: string;
    status?: "online" | "offline";
    lastSeen?: string;
    typing?: boolean;
  };
  initialMessages?: ChatMessage[];
  onBack: () => void;
  userType: "passenger" | "driver";
}

const Chat = ({
  otherUser,
  initialMessages = [],
  onBack,
  userType,
}: ChatProps) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isAttachmentMenuOpen, setIsAttachmentMenuOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      content: newMessage,
      timestamp: new Date(),
      status: "sent",
      type: "text",
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");

    // Simulate reply after a delay (for demo purposes)
    if (messages.length < 10) {
      setTimeout(() => {
        const replyMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: "other",
          content: getRandomReply(),
          timestamp: new Date(),
          status: "read",
          type: "text",
        };
        setMessages((prevMessages) => [...prevMessages, replyMsg]);
      }, 2000);
    }
  };

  // Get a random reply (for demo purposes)
  const getRandomReply = (): string => {
    const replies = [
      "I'm on my way!",
      "I'll be there in a few minutes.",
      "Can you provide more details about your location?",
      "Got it, thanks for the information.",
      "I'm nearby, will reach you shortly.",
      "Is there a preferred pickup spot?",
      "The traffic is a bit heavy, might be delayed by 5 minutes.",
      "Your ride is confirmed!",
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  // Format timestamp
  const formatTimestamp = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    const days = Math.floor(hours / 24);
    if (days === 1) return "Yesterday";
    
    return date.toLocaleDateString();
  };

  // Handle keyboard Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Toggle attachment menu
  const toggleAttachmentMenu = () => {
    setIsAttachmentMenuOpen(!isAttachmentMenuOpen);
  };

  return (
    <div className="flex flex-col h-full max-h-screen bg-white">
      {/* Chat header */}
      <div className="flex items-center p-4 border-b">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2"
          onClick={onBack}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Avatar className="h-10 w-10">
          <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
          <AvatarFallback className="bg-taxi-purple text-white">
            {otherUser.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div className="ml-3 flex-1">
          <h3 className="font-medium">{otherUser.name}</h3>
          <p className="text-xs text-muted-foreground">
            {otherUser.typing 
              ? "Typing..." 
              : otherUser.status === "online"
                ? "Online"
                : otherUser.lastSeen
                  ? `Last seen ${otherUser.lastSeen}`
                  : "Offline"}
          </p>
        </div>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-secondary/50">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-4">
            <div className="w-16 h-16 bg-taxi-purple/10 rounded-full flex items-center justify-center mb-4">
              <Send className="h-6 w-6 text-taxi-purple" />
            </div>
            <h3 className="font-medium mb-1">No messages yet</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              {userType === "driver" 
                ? "Start the conversation with your passenger about the ride"
                : "Start the conversation with your driver about the ride"}
            </p>
          </div>
        ) : (
          messages.map((message, index) => {
            const isUser = message.sender === "user";
            const showTimestamp = 
              index === 0 || 
              new Date(message.timestamp).getTime() - new Date(messages[index - 1].timestamp).getTime() > 5 * 60 * 1000;
            
            return (
              <div key={message.id} className={`mb-4 ${isUser ? 'ml-auto' : 'mr-auto'}`}>
                {showTimestamp && (
                  <div className="text-xs text-center text-muted-foreground my-2">
                    {formatTimestamp(message.timestamp)}
                  </div>
                )}
                <div className={`max-w-[80%] ${isUser ? 'ml-auto' : 'mr-auto'}`}>
                  <div 
                    className={cn(
                      "rounded-2xl p-3",
                      isUser 
                        ? "bg-taxi-purple text-white rounded-br-none" 
                        : "bg-white shadow-sm border rounded-bl-none"
                    )}
                  >
                    {message.type === "text" && (
                      <p className="text-sm">{message.content}</p>
                    )}
                    {message.type === "image" && message.imageUrl && (
                      <div className="mb-1">
                        <img 
                          src={message.imageUrl} 
                          alt="Shared" 
                          className="max-w-full rounded-lg" 
                        />
                      </div>
                    )}
                    {message.type === "location" && message.location && (
                      <div className="rounded-lg border bg-secondary/50 p-2 flex items-center space-x-2">
                        <MapPin className="h-5 w-5 text-taxi-purple" />
                        <div>
                          <p className="text-sm font-medium">{message.location.name}</p>
                          <p className="text-xs text-muted-foreground">
                            ({message.location.coords.lat.toFixed(6)}, {message.location.coords.lng.toFixed(6)})
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  {isUser && (
                    <div className="text-xs text-right mt-1 text-muted-foreground">
                      {message.status === "read" ? "Read" : message.status === "delivered" ? "Delivered" : "Sent"}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Attachment menu (conditionally rendered) */}
      {isAttachmentMenuOpen && (
        <div className="p-2 border-t grid grid-cols-2 gap-2 bg-secondary/20 animate-slide-in-up">
          <Button 
            variant="outline"
            className="flex flex-col items-center justify-center h-20 space-y-1"
          >
            <Image className="h-6 w-6 text-taxi-purple" />
            <span className="text-xs">Send Photo</span>
          </Button>
          <Button 
            variant="outline"
            className="flex flex-col items-center justify-center h-20 space-y-1"
          >
            <MapPin className="h-6 w-6 text-taxi-purple" />
            <span className="text-xs">Share Location</span>
          </Button>
        </div>
      )}
      
      {/* Message input */}
      <div className="p-4 border-t flex items-end space-x-2">
        <Button 
          variant="ghost" 
          size="icon"
          className="text-muted-foreground"
          onClick={toggleAttachmentMenu}
        >
          <Paperclip className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-10 py-2"
          />
        </div>
        <Button 
          size="icon" 
          className="bg-taxi-purple text-white hover:bg-taxi-purple-dark"
          onClick={handleSendMessage}
          disabled={newMessage.trim() === ""}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Chat;
