
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Shield, CreditCard, CarTaxiFront, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const features = [
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Easy Booking",
    description: "Book your ride with just a few taps and get picked up in minutes."
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "24/7 Service",
    description: "Our drivers are available round the clock to serve you anytime."
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Safe Rides",
    description: "All our drivers are verified and trained to ensure your safety."
  },
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: "Multiple Payment Options",
    description: "Pay with cards, cryptocurrency, or Pi Network for maximum flexibility."
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Regular Customer",
    content: "TAXI PI has changed how I commute. The service is always reliable and the drivers are professional. The app is so easy to use!",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Business Traveler",
    content: "As someone who travels frequently for work, having a reliable taxi service is essential. TAXI PI never disappoints with their prompt service.",
    rating: 5
  },
  {
    name: "Emma Thompson",
    role: "Student",
    content: "The Pi Network payment option is amazing! As a student, I appreciate the innovative payment methods and affordable rates.",
    rating: 4
  }
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-white to-secondary">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-block px-3 py-1 rounded-full bg-taxi-purple/10 text-taxi-purple text-xs font-medium">
                Modern & Reliable Transportation
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Your Ride, <span className="text-taxi-purple">Your Way</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Book a ride in seconds and enjoy a safe, comfortable journey with our professional drivers.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <Button 
                  size="lg" 
                  className="bg-taxi-purple hover:bg-taxi-purple-dark button-animation"
                  onClick={() => navigate("/book")}
                >
                  Book a Ride
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-taxi-purple/50 text-taxi-purple hover:bg-taxi-purple/5"
                >
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="relative animate-fade-in">
              <div className="absolute inset-0 rounded-3xl bg-taxi-purple/10 transform rotate-3"></div>
              <div className="relative w-full overflow-hidden rounded-3xl bg-white shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1606054718239-283d0bc55db0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Taxi on street" 
                  className="w-full h-auto object-cover aspect-[4/3]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Why Choose TAXI PI</h2>
            <p className="mt-3 text-muted-foreground">The smart way to move around the city</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="p-6 rounded-xl border border-border hover:border-taxi-purple/40 bg-card transition-all duration-300 hover:shadow-md hover-scale"
              >
                <div className="w-12 h-12 rounded-lg bg-taxi-purple/10 flex items-center justify-center text-taxi-purple mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="mt-3 text-muted-foreground">Simple steps to get your ride</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative p-6 rounded-xl bg-white shadow-sm hover-scale">
              <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-taxi-purple flex items-center justify-center text-white font-bold text-lg">
                1
              </div>
              <div className="mb-4">
                <MapPin className="h-10 w-10 text-taxi-purple" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Set Your Location</h3>
              <p className="text-muted-foreground">Enter your pickup and destination addresses in the app.</p>
            </div>
            
            <div className="relative p-6 rounded-xl bg-white shadow-sm hover-scale">
              <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-taxi-purple flex items-center justify-center text-white font-bold text-lg">
                2
              </div>
              <div className="mb-4">
                <CarTaxiFront className="h-10 w-10 text-taxi-purple" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Match with Driver</h3>
              <p className="text-muted-foreground">We'll match you with the closest available driver.</p>
            </div>
            
            <div className="relative p-6 rounded-xl bg-white shadow-sm hover-scale">
              <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-taxi-purple flex items-center justify-center text-white font-bold text-lg">
                3
              </div>
              <div className="mb-4">
                <CreditCard className="h-10 w-10 text-taxi-purple" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Pay & Go</h3>
              <p className="text-muted-foreground">Pay with your preferred method and enjoy your ride.</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button 
              className="bg-taxi-purple hover:bg-taxi-purple-dark button-animation"
              onClick={() => navigate("/book")}
            >
              Try It Now
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">What Our Customers Say</h2>
            <p className="mt-3 text-muted-foreground">Trusted by thousands of riders</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="p-6 rounded-xl border border-border bg-card hover:border-taxi-purple/40 transition-all duration-300 hover:shadow-md"
              >
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-taxi-purple/20 flex items-center justify-center text-taxi-purple font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-taxi-purple text-white">
        <div className="container max-w-6xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            Join thousands of satisfied customers who rely on TAXI PI for their daily commute.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-taxi-purple hover:bg-white/90 button-animation"
            onClick={() => navigate("/book")}
          >
            Book Your Ride Now
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
