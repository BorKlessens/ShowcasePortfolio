"use client";

import Image from "next/image";
import Link from "next/link";

interface ProjectsHeroProps {
  displayedText1: string;
  displayedText2: string;
  isTyping: boolean;
  text1: string;
  text2: string;
  heroVisible: boolean;
}

export default function ProjectsHero({ displayedText1, displayedText2, isTyping, text1, text2, heroVisible }: ProjectsHeroProps) {
  return (
    <>
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
        
        <div className="relative z-20 w-full py-20 pl-4 md:pl-8 lg:pl-32 pr-6">
          <div className="w-full max-w-7xl grid md:grid-cols-3 gap-12 items-center">
            <div className={`md:col-span-2 space-y-6 text-left transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-kanit font-normal md:font-light leading-tight" style={{ animation: heroVisible ? 'float 6s ease-in-out infinite' : 'none' }}>
                <span className="block text-white font-medium drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                  {displayedText1}
                  {isTyping && displayedText1.length < text1.length && (
                    <span className="inline-block w-1 h-[1em] bg-purple-400 ml-1 animate-pulse">|</span>
                  )}
                </span>
                <span className="block font-extrabold text-purple-400 tracking-tight bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent" style={{letterSpacing: '-2px', animation: heroVisible && displayedText1.length === text1.length ? 'text-glow 3s ease-in-out infinite' : 'none'}}>
                  {displayedText2}
                  {isTyping && displayedText1.length === text1.length && displayedText2.length < text2.length && (
                    <span className="inline-block w-1 h-[1em] bg-purple-400 ml-1 animate-pulse">|</span>
                  )}
                </span>
              </h1>
              <p className={`text-xs md:text-base font-jetbrains-mono text-gray-100 max-w-3xl whitespace-pre-line leading-relaxed transition-all duration-1000 delay-500 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                In the radiant cradle of Elysium, where silken winds 
                whisper through crystalline groves, the architects of
                light weave dreams into marble. Each dawn unfurls like
                a tapestry of gold
              </p>
              <div className={`pt-6 transition-all duration-1000 delay-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <Link
                  href="#projecten"
                  className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-purple-500/30 font-jetbrains-mono hover:scale-110 hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] w-max inline-block"
                >
                  READ MORE
                </Link>
              </div>
            </div>
            <div className="hidden md:block md:col-span-1"></div>
          </div>
        </div>
        
        {/* Torn edge effect at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-30 h-32 pointer-events-none overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="torn-fade-projects" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0a0a0a" stopOpacity="0"/>
                <stop offset="100%" stopColor="#0a0a0a" stopOpacity="1"/>
              </linearGradient>
              <linearGradient id="torn-purple-projects" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#581c87" stopOpacity="0"/>
                <stop offset="100%" stopColor="#581c87" stopOpacity="1"/>
              </linearGradient>
            </defs>
            <path d="M0,0 L0,50 Q120,30 250,45 T500,35 T750,50 T1000,40 T1200,45 L1200,0 Z" fill="url(#torn-fade-projects)"/>
            <path d="M0,0 L0,55 Q80,45 200,58 T450,42 T700,52 T950,48 T1150,50 L1200,48 L1200,0 Z" fill="url(#torn-purple-projects)"/>
            <path d="M0,0 L0,60 Q100,50 220,58 Q400,45 600,52 Q800,48 1000,55 Q1100,50 1200,53 L1200,0 Z" fill="url(#torn-fade-projects)" opacity="0.7"/>
          </svg>
        </div>
      </section>

      {/* Divider line between hero and content */}
      <div className="relative z-40 -mt-12 pointer-events-none">
        <svg className="w-full h-20" viewBox="0 0 1200 80" preserveAspectRatio="none">
          <defs>
            <linearGradient id="projects-wavy-divider" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6b21a8" stopOpacity="0"/>
              <stop offset="25%" stopColor="#6b21a8" stopOpacity="0.35"/>
              <stop offset="50%" stopColor="#6b21a8" stopOpacity="0.8"/>
              <stop offset="75%" stopColor="#6b21a8" stopOpacity="0.35"/>
              <stop offset="100%" stopColor="#6b21a8" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d="M0,40 C100,0 200,80 300,40 S500,80 600,40 S800,0 900,40 S1100,80 1200,40 L1200,80 L0,80 Z" fill="url(#projects-wavy-divider)"/>
        </svg>
      </div>
    </>
  );
}

