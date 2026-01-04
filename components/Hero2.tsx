import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, List, Edit3 } from 'lucide-react';
import Background from './Background';
import SportsGrid from './SportsGrid';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 sm:px-10 lg:px-16 py-20">
      {/* Background Elements */}
      <Background />

      <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Text Content */}
        <div className="flex flex-col items-start text-left space-y-8 max-w-2xl">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-block"
          >
            <span className="px-5 py-2 rounded-full border border-brand-green-200/20 bg-gradient-to-r from-brand-green-900 to-brand-green-700 text-brand-green-50 text-xs sm:text-sm font-medium tracking-widest uppercase shadow-lg shadow-brand-dark/50 backdrop-blur-sm">
              Exclusively for Junior Members
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-[1.05] text-white"
          >
            The <span className="relative inline-block text-brand-green-200">
              Country Club
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-1 sm:bottom-2 left-0 h-[6px] sm:h-[10px] bg-brand-green-200/15 -z-10"
              />
            </span> <br />
            Experience
            <span className="block text-2xl sm:text-3xl md:text-4xl mt-4 font-sans font-light text-brand-green-100 opacity-80">
              for the Next Generation
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg text-brand-green-50/80 font-light leading-relaxed max-w-lg border-l-2 border-brand-green-500/30 pl-6"
          >
            Premier youth sports leagues exclusively for Junior Members. Soccer, Tennis, Golf, Pickleball, and more—organized with the hospitality you expect.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto pt-4"
          >
            <button className="group relative px-8 py-4 bg-gradient-to-br from-brand-green-700 to-brand-green-900 text-white rounded-md shadow-2xl shadow-brand-green-900/40 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-brand-green-800/60">
              <span className="relative z-10 flex items-center justify-center gap-3 font-medium tracking-wide">
                <List className="w-5 h-5" />
                View Sports
              </span>
              <div className="absolute inset-0 bg-gradient-to-br from-brand-green-600 to-brand-green-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <button className="group px-8 py-4 bg-transparent border border-brand-green-500 text-brand-green-200 rounded-md transition-all duration-300 hover:bg-brand-green-500/10 hover:-translate-y-1 hover:border-brand-green-400 hover:shadow-lg hover:shadow-brand-green-500/10">
              <span className="flex items-center justify-center gap-3 font-medium tracking-wide">
                <Edit3 className="w-5 h-5" />
                Apply Now
              </span>
            </button>
          </motion.div>

          {/* Mobile Sports Grid (Visible only on small screens below lg) */}
          <div className="lg:hidden w-full pt-8">
             <SportsGrid />
          </div>
        </div>

        {/* Right Column: Visual Elements (Desktop Only for layout balance) */}
        <div className="hidden lg:flex flex-col items-end justify-center h-full relative">
           {/* Decorative visual composition */}
           <div className="relative w-full max-w-md">
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="mt-20 ml-auto w-full"
              >
                <SportsGrid />
              </motion.div>
           </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-brand-green-500/30 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-green-500/0 via-brand-green-500/50 to-brand-green-500/0" />
      </motion.div>
    </section>
  );
};

export default Hero;