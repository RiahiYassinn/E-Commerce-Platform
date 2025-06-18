import React from 'react';
import { ArrowRight, Sparkles, Star } from 'lucide-react';

interface HeroProps {
  onShopNow: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopNow }) => {
  return (
    <section className="relative bg-gradient-to-br from-purple-100 via-pink-50 to-rose-100 overflow-hidden min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-8 animate-fadeInUp">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full text-sm font-medium text-pink-700 mb-4 animate-bounce">
              <Sparkles className="h-4 w-4 mr-2" />
              New Collection Available
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Discover Your
              <span className="block bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 bg-clip-text text-transparent animate-gradient">
                Perfect Style
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-xl leading-relaxed">
              Explore our curated collection of women's fashion that combines comfort, 
              elegance, and contemporary style. From casual everyday wear to special 
              occasion pieces.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={onShopNow}
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-2xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button className="inline-flex items-center px-8 py-4 border-2 border-pink-200 text-gray-700 font-medium rounded-2xl hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 hover:border-pink-300 transition-all duration-300 transform hover:scale-105">
                View Lookbook
              </button>
            </div>

            <div className="flex items-center justify-center lg:justify-start space-x-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">10K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="text-sm text-gray-600">5.0 Rating</div>
              </div>
            </div>
          </div>
          
          <div className="relative animate-fadeInRight">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="group relative overflow-hidden rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500">
                  <img
                    src="https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg"
                    alt="Fashion Model 1"
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="group relative overflow-hidden rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 delay-100">
                  <img
                    src="https://images.pexels.com/photos/7679470/pexels-photo-7679470.jpeg"
                    alt="Fashion Model 2"
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
              <div className="space-y-6 mt-12">
                <div className="group relative overflow-hidden rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 delay-200">
                  <img
                    src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg"
                    alt="Fashion Model 3"
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="group relative overflow-hidden rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 delay-300">
                  <img
                    src="https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg"
                    alt="Fashion Accessories"
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-6 shadow-2xl animate-float">
              <div className="text-center text-white">
                <div className="text-3xl font-bold">50%</div>
                <div className="text-sm">OFF</div>
              </div>
            </div>

            <div className="absolute bottom-8 -left-4 bg-white rounded-2xl p-4 shadow-2xl animate-float-delayed">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Free Shipping</div>
                  <div className="text-sm text-gray-600">On orders $75+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-rose-300 to-pink-300 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-purple-300 to-rose-300 rounded-full opacity-10 blur-3xl animate-pulse delay-2000"></div>
      </div>
    </section>
  );
};

export default Hero;