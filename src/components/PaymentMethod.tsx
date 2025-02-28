
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface PaymentMethodProps {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  path: string;
  isPopular?: boolean;
}

const PaymentMethod = ({
  id,
  title,
  description,
  icon,
  path,
  isPopular = false,
}: PaymentMethodProps) => {
  const navigate = useNavigate();

  return (
    <div
      id={id}
      onClick={() => navigate(path)}
      className={cn(
        "relative group flex flex-col p-6 rounded-xl border border-border bg-card card-shadow cursor-pointer transition-all duration-300",
        "hover:border-taxi-purple hover:shadow-md hover:shadow-taxi-purple/5 hover:scale-[1.02]"
      )}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-taxi-purple text-white text-xs px-3 py-1 rounded-full">
          Popular
        </div>
      )}
      
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-secondary text-taxi-purple">
          {icon}
        </div>
        <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default PaymentMethod;
