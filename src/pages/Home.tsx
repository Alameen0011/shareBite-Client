import { RootState } from "@/app/store";
import { ArrowRight, Clock, Heart, Users } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { isAuthenticated, role } = useSelector((state: RootState) => state.auth);

  return (
    <>
    {/* Hero Section */}
    <section className="relative h-[90vh] flex items-center rounded-lg bg-gray-700 mt-20 ">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10  "  />
        <img 
          src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=2070"
          alt="Food sharing" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="max-w-7xl w-full mx-auto px-6 relative z-20">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Share Food, <span className=" text-emerald-600">Share Hope</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Join our mission to reduce food waste and feed those in need. Every meal shared is a life touched.
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-4 bg-blue-7  00 text-white font-medium rounded-lg shadow-lg hover:bg-emerald-700 transform hover:-translate-y-0.5 transition-all duration-200">
              Start Donating
            </button>
            <button className="px-8 py-4 bg-white/10 text-white font-medium rounded-lg shadow-lg hover:bg-white/20 backdrop-blur-sm transform hover:-translate-y-0.5 transition-all duration-200">
              Learn More
            </button>
          
          </div>
          <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-950 overflow-hidden">
                    <img
                      src={`/placeholder.svg?height=40&width=40&text=${i}`}
                      alt="Community member"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-400">
                <span className="font-semibold text-white">1,200+</span> people already joined
              </p>
            </div>
        </div>
      </div>
    </section>

    {/* Impact Stats */}
    <section className="py-16 bg-emerald-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <p className="text-4xl font-bold   text-emerald-600 mb-2">10,000+</p>
            <p className="text-gray-600">Meals Shared</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold  text-emerald-600  mb-2">500+</p>
            <p className="text-gray-600">Active Volunteers</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold   text-emerald-600 mb-2">50+</p>
            <p className="text-gray-600">Partner Organizations</p>
          </div>
        </div>
      </div>
    </section>

    {/* How it Works */}
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">How ShareBite Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="relative p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="absolute -top-6 left-8 w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold">1</div>
            <h3 className="text-xl font-semibold mb-4 mt-4">List Surplus Food</h3>
            <p className="text-gray-600">Restaurants and individuals can easily list their surplus food through our platform.</p>
          </div>
          <div className="relative p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="absolute -top-6 left-8 w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold">2</div>
            <h3 className="text-xl font-semibold mb-4 mt-4">Volunteer Collection</h3>
            <p className="text-gray-600">Our network of volunteers quickly responds to collect and deliver food to distribution points.</p>
          </div>
          <div className="relative p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="absolute -top-6 left-8 w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold">3</div>
            <h3 className="text-xl font-semibold mb-4 mt-4">Safe Distribution</h3>
            <p className="text-gray-600">Food is safely distributed to those in need through our verified distribution network.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&q=80&w=2070"
              alt="Food sharing platform" 
              className="rounded-2xl shadow-2xl"
            />
          </div>
          <div className="space-y-8">
            <h2 className="text-4xl font-bold">Why Choose ShareBite?</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Clock className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
                  <p className="text-gray-600">Get instant notifications about food availability and pickup status.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Heart className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
                  <p className="text-gray-600">Join a network of passionate individuals making a difference.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Users className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Verified Partners</h3>
                  <p className="text-gray-600">Work with trusted organizations and volunteers.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">What People Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-white rounded-xl shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <img 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150"
                alt="Sarah" 
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-lg">Sarah Johnson</h3>
                <p className="text-gray-600">Restaurant Owner</p>
              </div>
            </div>
            <p className="text-gray-700 italic">"ShareBite has made it incredibly easy for us to donate our surplus food. It's heartwarming to know that our food is helping those who need it most."</p>
          </div>
          <div className="p-8 bg-white rounded-xl shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
                alt="David" 
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-lg">David Chen</h3>
                <p className="text-gray-600">Volunteer</p>
              </div>
            </div>
            <p className="text-gray-700 italic">"Being part of ShareBite's volunteer network has been incredibly rewarding. The platform makes it easy to coordinate pickups and deliveries."</p>
          </div>
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="py-20 ">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-emerald-900  mb-6">Ready to Make a Difference?</h2>
        <p className="text-xl text-emerald-900  mb-8 max-w-2xl mx-auto">
          Join our community of food heroes and help us create a world where no food goes to waste and no one goes hungry.
        </p>
        {
          !isAuthenticated && (
            <Link to="/auth/signup?role=volunteer"  className="px-8 py-4 bg-white text-emerald-900  font-medium rounded-lg shadow-lg hover:bg-emerald-50 transform hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center gap-2">
            Join as a Volunteer <ArrowRight className="w-5 h-5" />
          </Link >
          )
        }
       
      </div>
    </section>
  </>
   
  );
};

export default Home;
