
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { User, Menu, X, Clock, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Book Ride", path: "/book", icon: <img src="/lovable-uploads/cbde40b6-c338-40be-91a4-f2d767817049.png" alt="Taxi" className="w-5 h-4 object-contain" /> },
    { name: "Ride History", path: "/history", icon: <Clock size={18} /> },
    { name: "Payment", path: "/payment", icon: <CreditCard size={18} /> },
    { name: "Profile", path: "/profile", icon: <User size={18} /> },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
        scrolled ? "py-2 bg-white/90 backdrop-blur-md shadow-sm" : "py-4 bg-transparent"
      )}
    >
      <div className="container max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 text-taxi-purple">
          <div className="w-10 h-10 relative">
            <img 
              src="/lovable-uploads/cbde40b6-c338-40be-91a4-f2d767817049.png" 
              alt="TAXI PI Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-bold text-xl tracking-tight">TAXI PI</span>
        </Link>
        
        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center space-x-1.5 px-1 py-1.5 font-medium text-sm transition-colors",
                  location.pathname === link.path
                    ? "text-taxi-purple"
                    : "text-foreground/70 hover:text-taxi-purple"
                )}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        )}

        {/* Mobile Navigation */}
        {isMobile && isMenuOpen && (
          <div className="md:hidden fixed inset-0 top-[60px] z-40 bg-background animate-fade-in">
            <nav className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-base transition-colors",
                    location.pathname === link.path
                      ? "bg-secondary text-taxi-purple"
                      : "text-foreground/70 hover:bg-secondary/50 hover:text-taxi-purple"
                  )}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
