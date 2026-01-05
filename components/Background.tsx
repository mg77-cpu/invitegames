"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, CircleDot, Flag, Activity, Droplets, Crosshair } from 'lucide-react';

const Background: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {/* Main Gradient */}
      <div className="absolute inset-0 bg-hero-gradient opacity-90 z-0" />
      
      {/* Pattern Overlay */}
      <div 
        className="absolute inset-0 z-[1] opacity-20"
        style={{
            backgroundImage: `
                radial-gradient(circle at 20% 30%, rgba(26, 110, 110, 0.4) 0%, transparent 25%),
                radial-gradient(circle at 80% 70%, rgba(15, 77, 77, 0.4) 0%, transparent 25%),
                radial-gradient(circle at 50% 50%, rgba(139, 217, 217, 0.05) 0%, transparent 40%)
            `
        }}
      />

      {/* Floating Blobs */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear" // Changed to linear for more consistent performance
        }}
        className="absolute top-[10%] right-[10%] w-96 h-96 rounded-full bg-brand-green-700/10 blur-[80px] z-[1] will-change-transform"
      />
      
      <motion.div
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 30, -20, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
          delay: 2
        }}
        className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-brand-green-900/20 blur-[100px] z-[1] will-change-transform"
      />

      {/* Floating Icons */}
      <div className="absolute inset-0 z-[2] opacity-30 text-brand-green-200">
        <FloatingIcon icon={Trophy} top="15%" left="10%" delay={0} size={40} rotate={15} />
        <FloatingIcon icon={Activity} top="25%" right="15%" delay={2} size={32} rotate={-10} />
        <FloatingIcon icon={CircleDot} bottom="20%" left="15%" delay={1} size={48} rotate={25} />
        <FloatingIcon icon={Flag} bottom="30%" right="10%" delay={3} size={36} rotate={-20} />
        
        {/* Additional Icons for Premium Feel */}
        <FloatingIcon icon={Droplets} top="40%" left="25%" delay={4} size={28} rotate={-5} />
        <FloatingIcon icon={Crosshair} top="10%" right="35%" delay={1.5} size={36} rotate={20} />
        <FloatingIcon icon={CircleDot} bottom="45%" right="20%" delay={2.5} size={32} rotate={-15} />
        <FloatingIcon icon={Flag} top="60%" left="15%" delay={0.5} size={44} rotate={10} />
        
        {/* Extra Sport Icons */}
        <FloatingIcon icon={Droplets} bottom="15%" right="30%" delay={5} size={32} rotate={15} />
        <FloatingIcon icon={Crosshair} top="50%" right="40%" delay={3.5} size={24} rotate={-10} />
      </div>
    </div>
  );
};

interface FloatingIconProps {
  icon: React.ElementType;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay: number;
  size: number;
  rotate: number;
}

const FloatingIcon: React.FC<FloatingIconProps> = ({ icon: Icon, top, left, right, bottom, delay, size, rotate }) => {
  return (
    <motion.div
      className="absolute will-change-transform"
      style={{ top, left, right, bottom }}
      initial={{ opacity: 0, rotate: rotate }}
      animate={{ 
        opacity: [0.3, 0.6, 0.3],
        y: [0, -10, 0], // Reduced movement range
        rotate: [rotate, rotate + 5, rotate] // Reduced rotation range
      }}
      transition={{
        duration: 10, // Increased duration for slower, smoother motion
        delay: delay,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <Icon size={size} strokeWidth={1.5} />
    </motion.div>
  );
};

export default Background;