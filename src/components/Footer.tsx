
import { Link } from "react-router-dom";
import { CarTaxiFront, Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-taxi-gray-light border-t border-border">
      <div className="container max-w-6xl mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-taxi-purple">
              <CarTaxiFront className="w-6 h-6" />
              <span className="font-bold text-lg tracking-tight">TAXI PI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Modern, reliable transportation at your fingertips. Book your rides with ease and travel in comfort.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-taxi-purple transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-taxi-purple transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-taxi-purple transition-colors" aria-label="Twitter">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-medium text-sm tracking-wider uppercase mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/book" className="text-sm text-muted-foreground hover:text-taxi-purple transition-colors">
                  Book a Ride
                </Link>
              </li>
              <li>
                <Link to="/book" className="text-sm text-muted-foreground hover:text-taxi-purple transition-colors">
                  Airport Transfer
                </Link>
              </li>
              <li>
                <Link to="/book" className="text-sm text-muted-foreground hover:text-taxi-purple transition-colors">
                  City Tour
                </Link>
              </li>
              <li>
                <Link to="/book" className="text-sm text-muted-foreground hover:text-taxi-purple transition-colors">
                  Business Travel
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-medium text-sm tracking-wider uppercase mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-taxi-purple transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-taxi-purple transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-taxi-purple transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-taxi-purple transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-medium text-sm tracking-wider uppercase mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail size={18} className="text-taxi-purple mt-0.5" />
                <span className="text-sm text-muted-foreground">support@taxipi.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={18} className="text-taxi-purple mt-0.5" />
                <span className="text-sm text-muted-foreground">+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-xs text-center text-muted-foreground">
            © {currentYear} TAXI PI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
