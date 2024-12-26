import React from "react";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Welcome..... Sahil
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8">
          Hello
        </p>
        <button className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full hover:bg-purple-100 transition-colors duration-200 flex items-center mx-auto">
          Let'S Go
          <ArrowRight size={20} className="ml-2" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
