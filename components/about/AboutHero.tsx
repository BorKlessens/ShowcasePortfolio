"use client";

import Image from "next/image";
import Link from "next/link";

interface AboutHeroProps {
  displayedText1: string;
  displayedText2: string;
  isTyping: boolean;
  text1: string;
  text2: string;
}

export default function AboutHero({ displayedText1, displayedText2, isTyping, text1, text2 }: AboutHeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-x-hidden w-full">
      {/* Hero Image Background */}
      <div className="absolute inset-0 z-0 w-full h-full hero-image-container">
        <Image
          src="/heroimg_quality.png"
          alt="Hero background"
          fill
          className="object-cover w-full h-full"
          priority
          quality={100}
          unoptimized
          sizes="100vw"
        />
      </div>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>
      
      {/* Torn edge effect at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-32 pointer-events-none overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <defs>
            <linearGradient id="torn-fade-about" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0a0a0a" stopOpacity="0"/>
              <stop offset="100%" stopColor="#0a0a0a" stopOpacity="1"/>
            </linearGradient>
            <linearGradient id="torn-purple-about" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#581c87" stopOpacity="0"/>
              <stop offset="100%" stopColor="#581c87" stopOpacity="1"/>
            </linearGradient>
          </defs>
          <path d="M0,0 L0,50 Q120,30 250,45 T500,35 T750,50 T1000,40 T1200,45 L1200,0 Z" fill="url(#torn-fade-about)"/>
          <path d="M0,0 L0,55 Q80,45 200,58 T450,42 T700,52 T950,48 T1150,50 L1200,48 L1200,0 Z" fill="url(#torn-purple-about)"/>
          <path d="M0,0 L0,60 Q100,50 220,58 Q400,45 600,52 Q800,48 1000,55 Q1100,50 1200,53 L1200,0 Z" fill="url(#torn-fade-about)" opacity="0.7"/>
        </svg>
      </div>
      
      {/* Hero Content - Title and Button over the image */}
      <div className="relative z-20 w-full min-h-screen flex items-center justify-center py-20 px-4 md:px-8 lg:px-32">
        <div className="w-full max-w-[95%] md:max-w-[90%] lg:max-w-[85%] xl:max-w-[80%]">
          <div className="space-y-8 md:space-y-10 text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight font-kanit" style={{ animation: 'float 6s ease-in-out infinite' }}>
              <span className="text-white font-black drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                {displayedText1}
                {isTyping && displayedText1.length < text1.length && (
                  <span className="inline-block w-1 h-[1em] bg-purple-400 ml-1 animate-pulse">|</span>
                )}
              </span>
              <br />
              <span className="font-semibold bg-gradient-to-r from-[#A8A6E5] to-[#5043A9] bg-clip-text text-transparent" style={{ animation: 'text-glow 3s ease-in-out infinite' }}>
                {displayedText2}
                {isTyping && displayedText1.length === text1.length && displayedText2.length < text2.length && (
                  <span className="inline-block w-1 h-[1em] bg-purple-400 ml-1 animate-pulse">|</span>
                )}
              </span>
            </h1>
            <div className="pt-6 md:pt-8">
              <button className="px-10 py-5 md:px-12 md:py-6 bg-purple-700 hover:bg-purple-800 rounded-full font-semibold text-lg md:text-xl transition-all duration-300 shadow-lg shadow-purple-500/30 font-jetbrains-mono hover:scale-110 hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] text-white">
                <Link href="/projects">MY PROJECTS</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

