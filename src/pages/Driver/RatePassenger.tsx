
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const RatePassenger = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { tripId } = useParams<{ tripId: string }>();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock passenger data based on the tripId
  const passenger = {
    name: "John Doe",
    image: `https://i.pravatar.cc/150?u=${tripId}`,
  };

  const handleSubmit = () => {
    if (rating === 0) {
      toast({
        title: "Error",
        description: "Please select a rating",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call to submit rating
    setTimeout(() => {
      setIsSubmitting(false);

      // Simulate platform fee deduction
      toast({
        title: "Platform Fee",
        description: "Rp 1,000 has been deducted as platform fee",
      });

      setTimeout(() => {
        toast({
          title: "Rating Submitted",
          description: "Thank you for your feedback!",
        });
        navigate("/driver/dashboard");
      }, 1000);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Rate Your Passenger</h2>
          <p className="text-sm text-muted-foreground mt-1">
            How was your experience with this passenger?
          </p>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={passenger.image} alt={passenger.name} />
            <AvatarFallback className="bg-taxi-purple text-white text-xl">
              {passenger.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-semibold">{passenger.name}</h3>

          <div className="flex space-x-2 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <Star
                  className={cn(
                    "w-10 h-10 cursor-pointer transition-colors",
                    star <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  )}
                />
              </button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {rating === 5
              ? "Excellent"
              : rating === 4
              ? "Good"
              : rating === 3
              ? "Average"
              : rating === 2
              ? "Poor"
              : "Very Poor"}
          </p>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-foreground"
          >
            Additional Comments (Optional)
          </label>
          <Textarea
            id="comment"
            placeholder="Share your experience with this passenger..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[100px] input-focus"
          />
        </div>

        <div className="space-y-2">
          <Button
            className="w-full bg-taxi-purple hover:bg-taxi-purple-dark button-animation"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Rating"}
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate("/driver/dashboard")}
            disabled={isSubmitting}
          >
            Skip
          </Button>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          <p>
            Note: A platform fee of Rp 1,000 will be deducted from your balance
            for this completed trip.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RatePassenger;
