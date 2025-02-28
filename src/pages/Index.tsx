
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CarTaxiFront, Package, LogIn, UserPlus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-taxi-purple/5 to-taxi-purple/20">
          <div className="container max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Your ride, on your terms with <span className="text-taxi-purple">TAXI PI</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  The first ride-hailing service that accepts Pi cryptocurrency.
                  Quick, secure, and affordable transportation anywhere you go.
                </p>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                  <Button 
                    className="bg-taxi-purple hover:bg-taxi-purple-dark button-animation text-lg py-6"
                    size="lg"
                    onClick={() => navigate("/auth/register")}
                  >
                    <UserPlus className="mr-2 h-5 w-5" />
                    Sign Up
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-taxi-purple/50 text-taxi-purple hover:bg-taxi-purple/5 text-lg py-6"
                    size="lg"
                    onClick={() => navigate("/auth/login")}
                  >
                    <LogIn className="mr-2 h-5 w-5" />
                    Log In
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-64 h-64 md:w-80 md:h-80 bg-taxi-purple/30 rounded-full flex items-center justify-center">
                    <div className="w-48 h-48 md:w-64 md:h-64 bg-taxi-purple/50 rounded-full flex items-center justify-center">
                      <div className="w-32 h-32 md:w-48 md:h-48 bg-taxi-purple rounded-full flex items-center justify-center text-white">
                        <CarTaxiFront className="w-16 h-16 md:w-24 md:h-24" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <img src="https://minepi.com/wp-content/uploads/2020/06/pi_network_logo_dark.png" alt="Pi Network" className="w-12 h-12" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Why Choose TAXI PI?</h2>
              <p className="text-muted-foreground mt-2">Experience a revolutionary ride-hailing service</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-secondary rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-taxi-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CarTaxiFront className="w-8 h-8 text-taxi-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Ride Anywhere</h3>
                <p className="text-muted-foreground">
                  Book rides to any destination with our large network of drivers
                </p>
              </div>
              
              <div className="bg-secondary rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-taxi-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-taxi-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Package Delivery</h3>
                <p className="text-muted-foreground">
                  Send packages and documents quickly through our courier service
                </p>
              </div>
              
              <div className="bg-secondary rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-taxi-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <img src="https://minepi.com/wp-content/uploads/2020/06/pi_network_logo_dark.png" alt="Pi Network" className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Pi Payment</h3>
                <p className="text-muted-foreground">
                  Pay for rides using Pi cryptocurrency, cash, or credit cards
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-taxi-purple to-taxi-purple-dark text-white">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of happy riders and drivers on TAXI PI today!
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-3">
              <Button 
                className="bg-white text-taxi-purple hover:bg-white/90 button-animation text-lg"
                size="lg"
                onClick={() => navigate("/auth/register")}
              >
                Create an Account
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 text-lg"
                size="lg"
                onClick={() => navigate("/auth/login")}
              >
                Sign In
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
