"use client";

import { useEffect, useState } from "react";

interface BackgroundParticlesProps {
  particleCount?: number;
  starCount?: number;
}

export default function BackgroundParticles({ particleCount = 15, starCount = 3 }: BackgroundParticlesProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {[...Array(particleCount)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `twinkle ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
      {[...Array(starCount)].map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full opacity-50"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `particle-float ${20 + Math.random() * 15}s linear infinite`,
            animationDelay: `${Math.random() * 8}s`,
          }}
        />
      ))}
    </div>
  );
}



