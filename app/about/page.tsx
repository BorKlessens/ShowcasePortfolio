"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import BackgroundParticles from "@/components/shared/BackgroundParticles";

export default function AboutPage() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [displayedText1, setDisplayedText1] = useState("");
  const [displayedText2, setDisplayedText2] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [language, setLanguage] = useState<"NL" | "EN">("NL");

  const text1 = "ABOUT ME";
  const text2 = "FRONT END DEVELOPER";

  // Typewriter animation effect
  useEffect(() => {
    let index1 = 0;
    let index2 = 0;
    let timeout1: NodeJS.Timeout;
    let timeout2: NodeJS.Timeout;

    const typeText1 = () => {
      if (index1 < text1.length) {
        setDisplayedText1(text1.substring(0, index1 + 1));
        index1++;
        timeout1 = setTimeout(typeText1, 60); // Faster typing speed
      } else {
        // Start typing second text after a short delay
        setTimeout(() => {
          typeText2();
        }, 300);
      }
    };

    const typeText2 = () => {
      if (index2 < text2.length) {
        setDisplayedText2(text2.substring(0, index2 + 1));
        index2++;
        timeout2 = setTimeout(typeText2, 50); // Faster for second line
      } else {
        setIsTyping(false);
      }
    };

    // Start typing after a brief delay
    const startDelay = setTimeout(() => {
      typeText1();
    }, 300);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(startDelay);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight;

      if (currentScrollY > heroHeight * 0.7) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black text-white overflow-x-hidden relative">
      <BackgroundParticles particleCount={15} starCount={3} />
      <Header isHeaderVisible={isHeaderVisible} activePage="about" language={language} setLanguage={setLanguage} />

      {/* Hero Section */}
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
            {/* Main torn edge with irregular pattern */}
            <path d="M0,0 L0,50 Q120,30 250,45 T500,35 T750,50 T1000,40 T1200,45 L1200,0 Z" fill="url(#torn-fade-about)"/>
            <path d="M0,0 L0,55 Q80,45 200,58 T450,42 T700,52 T950,48 T1150,50 L1200,48 L1200,0 Z" fill="url(#torn-purple-about)"/>
            {/* Additional torn layers for more realistic effect */}
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

      {/* About Me Content Section */}
      <section className="relative -mt-32 md:-mt-40 lg:-mt-48 z-30 py-20">
        <div className="w-full max-w-[95%] md:max-w-[90%] lg:max-w-[85%] xl:max-w-[80%] mx-auto px-4 md:px-8 lg:px-12">
          <div className="bg-gray-900/50 rounded-3xl p-8 md:p-12 lg:p-16 backdrop-blur-sm border border-purple-900/30 shadow-[0_0_40px_rgba(168,85,247,0.2)]">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              {/* Left: Profile Image */}
              <div className="flex justify-center md:justify-center">
                <div className="relative w-full max-w-lg md:max-w-xl aspect-square rounded-2xl overflow-hidden border-4 border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:shadow-[0_0_50px_rgba(168,85,247,0.8)] transition-all duration-300 hover:scale-105">
                  <Image
                    src="/profile.png"
                    alt="Bor Klessens"
                    fill
                    className="object-cover"
                    quality={100}
                  />
                </div>
              </div>

              {/* Right: About Me Content */}
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-kanit bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                  About me
                </h2>
                
                <div className="flex items-center gap-3 text-lg md:text-xl text-purple-300 font-jetbrains-mono">
                  <span className="font-semibold">19 years</span>
                  <span className="text-gray-500">/</span>
                  <span className="font-semibold">Dutch</span>
                  <span className="text-gray-500">/</span>
                  <span className="font-semibold">Fontys ICT</span>
                </div>

                <p className="text-base md:text-lg leading-relaxed text-gray-200 font-jetbrains-mono">
                  In the radiant cradle of Elysium, where silken winds whisper through crystalline groves, the architects of light weave dreams into marble. Each dawn unfurls like a tapestry of gold.
                </p>

                <p className="text-base md:text-lg leading-relaxed text-gray-200 font-jetbrains-mono">
                  As a passionate frontend developer, I combine creativity with technical expertise to build engaging and user-friendly web experiences. Currently studying at Fontys ICT, I'm constantly learning and improving my skills in modern web technologies.
                </p>

                {/* Download Portfolio Button */}
                <button className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold transition-all duration-300 shadow-lg hover:scale-110 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] font-jetbrains-mono flex items-center gap-3 group">
                  <svg 
                    className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  DOWNLOAD PORTFOLIO
                </button>

                {/* Contact Information */}
                <div className="pt-8 space-y-4 border-t border-purple-800/50">
                  <h3 className="text-xl font-bold font-kanit text-purple-300 mb-4">Contact Information</h3>
                  
                  <div className="space-y-3 font-jetbrains-mono">
                    <div className="flex items-start gap-3 text-gray-300 hover:text-purple-300 transition-colors">
                      <svg className="w-5 h-5 mt-1 flex-shrink-0 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href="mailto:b.klessens@student.fontys.nl" className="break-all hover:underline">
                        b.klessens@student.fontys.nl
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-3 text-gray-300 hover:text-purple-300 transition-colors">
                      <svg className="w-5 h-5 flex-shrink-0 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a href="tel:0622554478" className="hover:underline">
                        0622554478
                      </a>
                    </div>
                    
                    <div className="flex items-start gap-3 text-gray-300 hover:text-purple-300 transition-colors">
                      <svg className="w-5 h-5 mt-1 flex-shrink-0 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>Professor Goossenslaan 1, 5612 EM Tilburg</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Services Section */}
      <section className="relative py-12 md:py-16 z-30 -mt-8 md:-mt-12">
        <div className="w-full max-w-[95%] md:max-w-[90%] lg:max-w-[85%] xl:max-w-[80%] mx-auto px-4 md:px-8 lg:px-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 md:mb-16 font-kanit drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">
            My services
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {/* Card 1: Web Development */}
            <div className="bg-gray-900/50 rounded-3xl p-8 md:p-10 backdrop-blur-sm border border-purple-900/30 shadow-[0_0_40px_rgba(168,85,247,0.2)] hover:shadow-[0_0_50px_rgba(168,85,247,0.4)] transition-all duration-300 hover:scale-105 hover:border-purple-500/50 group cursor-pointer">
              <div className="mb-6">
                <svg className="w-12 h-12 md:w-14 md:h-14 text-white group-hover:text-purple-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 font-kanit text-white group-hover:text-purple-300 transition-colors">
                Web development
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed font-jetbrains-mono">
                In the radiant cradle of Elysium, where silken winds whisper through crystalline groves
              </p>
            </div>

            {/* Card 2: Design */}
            <div className="bg-gray-900/50 rounded-3xl p-8 md:p-10 backdrop-blur-sm border border-purple-900/30 shadow-[0_0_40px_rgba(168,85,247,0.2)] hover:shadow-[0_0_50px_rgba(168,85,247,0.4)] transition-all duration-300 hover:scale-105 hover:border-purple-500/50 group cursor-pointer">
              <div className="mb-6 relative">
                <svg className="w-12 h-12 md:w-14 md:h-14 text-white group-hover:text-purple-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <svg className="absolute top-0 right-0 w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 font-kanit text-white group-hover:text-purple-300 transition-colors">
                Design
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed font-jetbrains-mono">
                In the radiant cradle of Elysium, where silken winds whisper through crystalline groves
              </p>
            </div>

            {/* Card 3: UI & UX Design */}
            <div className="bg-gray-900/50 rounded-3xl p-8 md:p-10 backdrop-blur-sm border border-purple-900/30 shadow-[0_0_40px_rgba(168,85,247,0.2)] hover:shadow-[0_0_50px_rgba(168,85,247,0.4)] transition-all duration-300 hover:scale-105 hover:border-purple-500/50 group cursor-pointer">
              <div className="mb-6">
                <svg className="w-12 h-12 md:w-14 md:h-14 text-white group-hover:text-purple-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 font-kanit text-white group-hover:text-purple-300 transition-colors">
                UI & UX Design
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed font-jetbrains-mono">
                In the radiant cradle of Elysium, where silken winds whisper through crystalline groves
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-950 border-t border-purple-900/50 relative z-10">
        <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-4 font-kanit">Bor Klessens</h3>
            <p className="text-gray-400 mb-4 text-sm md:text-base font-jetbrains-mono">
              In the radiant cradle of Elysium, where silken
            </p>
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 hover:scale-110 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] transition-all duration-300 cursor-pointer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
          </div>
          <div>
            <h4 className="text-lg md:text-xl font-bold mb-4 font-kanit">Navigation</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-all duration-300 text-sm md:text-base font-jetbrains-mono hover:scale-110 inline-block hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">About</Link></li>
              <li><Link href="/projects" className="text-gray-400 hover:text-white transition-all duration-300 text-sm md:text-base font-jetbrains-mono hover:scale-110 inline-block hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">Projects</Link></li>
              <li><Link href="/#contact" className="text-gray-400 hover:text-white transition-all duration-300 text-sm md:text-base font-jetbrains-mono hover:scale-110 inline-block hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg md:text-xl font-bold mb-4 font-kanit">Get In Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400 text-sm md:text-base font-jetbrains-mono">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="break-all">B.klessens@student.fontys.nl</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm md:text-base font-jetbrains-mono">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                0622554478
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm md:text-base font-jetbrains-mono">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Professor Goossenslaan 1, 5612 EM Tilburg</span>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

