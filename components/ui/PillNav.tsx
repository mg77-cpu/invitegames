"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface PillNavProps {
  items: { label: string; id: string }[];
  onItemClick: (id: string) => void;
}

export default function PillNav({ items, onItemClick }: PillNavProps) {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (activeTab !== null && itemRefs.current[activeTab]) {
      const activeElement = itemRefs.current[activeTab];
      if (activeElement) {
        setPillStyle({
          left: activeElement.offsetLeft,
          width: activeElement.offsetWidth,
          opacity: 1,
        });
      }
    } else {
      setPillStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeTab]);

  return (
    <div 
      ref={containerRef}
      className="relative flex items-center bg-white/5 rounded-full p-1 border border-white/10 backdrop-blur-md"
      onMouseLeave={() => setActiveTab(null)}
    >
      {/* Animated Pill */}
      <motion.div
        className="absolute h-[calc(100%-8px)] bg-club-gold rounded-full z-0"
        animate={{
          left: pillStyle.left,
          width: pillStyle.width,
          opacity: pillStyle.opacity,
        }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 30,
        }}
      />

      {/* Nav Items */}
      {items.map((item, index) => (
        <button
          key={item.id}
          ref={(el) => { itemRefs.current[index] = el; }}
          onClick={() => onItemClick(item.id)}
          onMouseEnter={() => setActiveTab(index)}
          className={`relative z-10 px-6 py-2 text-sm font-medium transition-colors duration-300 ${
            activeTab === index ? "text-club-dark" : "text-gray-100 hover:text-white"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
