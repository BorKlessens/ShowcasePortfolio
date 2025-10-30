"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSkillsVisible, setIsSkillsVisible] = useState(false);
  const skillsRef = useRef<HTMLElement>(null);
  const workExperienceRef = useRef<HTMLElement>(null);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [hoveredBox, setHoveredBox] = useState<number | null>(null);
  const [displayedText1, setDisplayedText1] = useState("");
  const [displayedText2, setDisplayedText2] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [language, setLanguage] = useState<"NL" | "EN">("NL");

  const text1 = "BOR KLESSENS";
  const text2 = "FRONTEND DEVELOPER";

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

      // Hide header when scrolled past hero section (earlier - 70% of viewport)
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

  // Skills section visibility observer - only trigger on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Only trigger animation if section is coming into view from below
          // (meaning user scrolled down to see it)
          if (entry.isIntersecting) {
            // Check if user has scrolled down (not at top of page)
            if (window.scrollY > window.innerHeight * 0.3) {
              setIsSkillsVisible(true);
            }
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: '0px 0px 100px 0px', // Trigger earlier - 100px before it enters viewport
      }
    );

    // Also set visible if user scrolls past initial view
    const handleScroll = () => {
      if (skillsRef.current && window.scrollY > window.innerHeight * 0.3) {
        const rect = skillsRef.current.getBoundingClientRect();
        // If section is in viewport and we've scrolled past hero
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setIsSkillsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, []);

  // Timeline scroll animation
  useEffect(() => {
    const handleScroll = () => {
      if (workExperienceRef.current) {
        const rect = workExperienceRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementTop = rect.top;
        const elementHeight = rect.height;
        
        // Start animation when section enters viewport (with offset)
        const startOffset = windowHeight * 0.5; // Start when section is at 50% of screen from top
        const endOffset = -elementHeight * 0.3; // End when scrolled past 30% of section
        
        if (elementTop < startOffset && elementTop > endOffset) {
          // Calculate progress based on scroll position
          const scrolled = startOffset - elementTop;
          const totalScroll = startOffset - endOffset;
          const progress = Math.min(100, Math.max(0, (scrolled / totalScroll) * 100));
          setTimelineProgress(progress);
        } else if (elementTop <= endOffset) {
          // Section is fully scrolled past - show 100%
          setTimelineProgress(100);
        } else if (elementTop >= startOffset) {
          // Section hasn't reached trigger point yet
          setTimelineProgress(0);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black text-white overflow-x-hidden relative">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
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
        {[...Array(3)].map((_, i) => (
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

      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="w-full py-4 pl-4 md:pl-8 lg:pl-32 pr-4 md:pr-8 lg:pr-32 flex items-center justify-between">
          <Link href="/" className="text-2xl md:text-3xl font-bold font-kanit hover:text-purple-400 transition-colors">BOR KLESSENS</Link>
          <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex gap-8 font-kanit text-lg">
            <Link href="/about" className="hover:text-purple-400 transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">About</Link>
            <a href="#work" className="hover:text-purple-400 transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">Work</a>
            <a href="#skills" className="relative px-3 py-1 rounded-full border-2 border-blue-500 text-blue-400 hover:scale-110 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.8)]">Skills</a>
            <a href="#contact" className="hover:text-purple-400 transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">Contact</a>
          </nav>
          <div className="flex items-center gap-2 text-2xl md:text-3xl font-bold font-kanit">
            <button
              onClick={() => setLanguage("NL")}
              className={`transition-all duration-300 hover:scale-110 ${
                language === "NL"
                  ? "text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)] underline decoration-purple-400 decoration-2 underline-offset-4"
                  : "text-white hover:text-purple-300"
              }`}
            >
              NL
            </button>
            <span className="text-gray-400">/</span>
            <button
              onClick={() => setLanguage("EN")}
              className={`transition-all duration-300 hover:scale-110 ${
                language === "EN"
                  ? "text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)] underline decoration-purple-400 decoration-2 underline-offset-4"
                  : "text-white hover:text-purple-300"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </header>

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
              <linearGradient id="torn-fade" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0a0a0a" stopOpacity="0"/>
                <stop offset="100%" stopColor="#0a0a0a" stopOpacity="1"/>
              </linearGradient>
              <linearGradient id="torn-purple" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#581c87" stopOpacity="0"/>
                <stop offset="100%" stopColor="#581c87" stopOpacity="1"/>
              </linearGradient>
            </defs>
            {/* Main torn edge with irregular pattern */}
            <path d="M0,0 L0,50 Q120,30 250,45 T500,35 T750,50 T1000,40 T1200,45 L1200,0 Z" fill="url(#torn-fade)"/>
            <path d="M0,0 L0,55 Q80,45 200,58 T450,42 T700,52 T950,48 T1150,50 L1200,48 L1200,0 Z" fill="url(#torn-purple)"/>
            {/* Additional torn layers for more realistic effect */}
            <path d="M0,0 L0,60 Q100,50 220,58 Q400,45 600,52 Q800,48 1000,55 Q1100,50 1200,53 L1200,0 Z" fill="url(#torn-fade)" opacity="0.7"/>
          </svg>
        </div>
        
        {/* Content */}
        <div className="relative z-20 w-full py-20 pl-4 md:pl-8 lg:pl-32 pr-6">
          <div className="w-full max-w-7xl grid md:grid-cols-3 gap-12 items-center">
            {/* Left: Text Content - takes 2 columns on desktop */}
            <div className="md:col-span-2 space-y-6 text-left">
              <h1 className="text-5xl md:text-6xl lg:text-7xl leading-tight font-kanit" style={{ animation: 'float 6s ease-in-out infinite' }}>
                <span className="text-white font-light drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                  {displayedText1}
                  {isTyping && displayedText1.length < text1.length && (
                    <span className="inline-block w-1 h-[1em] bg-purple-400 ml-1 animate-pulse">|</span>
                  )}
                </span>
                <br />
                <span className="font-extrabold bg-gradient-to-r from-[#A8A6E5] to-[#5043A9] bg-clip-text text-transparent" style={{ animation: 'text-glow 3s ease-in-out infinite' }}>
                  {displayedText2}
                  {isTyping && displayedText1.length === text1.length && displayedText2.length < text2.length && (
                    <span className="inline-block w-1 h-[1em] bg-purple-400 ml-1 animate-pulse">|</span>
                  )}
                </span>
          </h1>
              <p className={`text-lg leading-relaxed text-gray-200 max-w-3xl font-jetbrains-mono transition-opacity duration-500 ${isTyping ? 'opacity-0' : 'opacity-100'}`}>
                In the radiant cradle of Elysium, where silken winds whisper through crystalline groves, the architects of light weave dreams into marble. Each dawn unfurls like a tapestry of gold.
              </p>
              <div className={`flex flex-col sm:flex-row gap-4 pt-4 transition-opacity duration-500 ${isTyping ? 'opacity-0' : 'opacity-100'}`}>
                <button className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-purple-500/30 font-jetbrains-mono hover:scale-110 hover:shadow-[0_0_30px_rgba(168,85,247,0.8)]">
                  See more
                </button>
                <button className="px-8 py-4 border-2 border-purple-400 hover:bg-purple-400/10 rounded-full font-semibold transition-all duration-300 font-jetbrains-mono hover:scale-110 hover:border-purple-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]">
                  Projects
                </button>
              </div>
            </div>
            
            {/* Right: Astronaut Illustration (already in heroimg.png, so this is just for spacing) */}
            <div className="hidden md:block md:col-span-1"></div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section 
        id="skills" 
        ref={skillsRef}
        className="py-20 -mt-32 md:-mt-40 lg:-mt-48 relative z-30"
      >
        <div className="w-full flex justify-center px-4 md:px-8 lg:px-32">
          <div className="w-full max-w-5xl">
            <div className="bg-gray-900/50 rounded-3xl p-10 md:p-12 backdrop-blur-sm border border-purple-900/30">
            <h2 
              className={`text-5xl font-bold text-center mb-6 font-kanit transition-all duration-1000 drop-shadow-[0_0_20px_rgba(168,85,247,0.5)] ${
                isSkillsVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              Skills
            </h2>
            <p 
              className={`text-center text-gray-300 mb-12 max-w-2xl mx-auto transition-all duration-1000 delay-200 font-jetbrains-mono ${
                isSkillsVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              In the radiant cradle of Elysium, where silken winds whisper through crystalline groves
            </p>
            <div 
              className={`flex flex-wrap justify-center gap-10 transition-all duration-1000 delay-300 ${
                isSkillsVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
            <div className="flex flex-col items-center gap-4 group hover:scale-110 transition-transform duration-300 cursor-pointer">
              <div className="relative w-28 h-28 hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.8)] transition-all duration-300">
                <svg className="transform -rotate-90 w-28 h-28">
                  <circle
                    cx="56"
                    cy="56"
                    r="48"
                    stroke="currentColor"
                    strokeWidth="11"
                    fill="none"
                    className="text-purple-900/50"
                  />
                  <circle
                    cx="56"
                    cy="56"
                    r="48"
                    stroke="currentColor"
                    strokeWidth="11"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 48}`}
                    strokeDashoffset={`${2 * Math.PI * 48 * (1 - 0.8)}`}
                    className="text-purple-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white font-jetbrains-mono">80%</span>
                </div>
              </div>
              <span className="text-white font-jetbrains-mono group-hover:text-purple-300 transition-colors">Web development</span>
            </div>
            <div className="flex flex-col items-center gap-4 group hover:scale-110 transition-transform duration-300 cursor-pointer">
              <div className="relative w-28 h-28 hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.8)] transition-all duration-300">
                <svg className="transform -rotate-90 w-28 h-28">
                  <circle
                    cx="56"
                    cy="56"
                    r="48"
                    stroke="currentColor"
                    strokeWidth="11"
                    fill="none"
                    className="text-purple-900/50"
                  />
                  <circle
                    cx="56"
                    cy="56"
                    r="48"
                    stroke="currentColor"
                    strokeWidth="11"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 48}`}
                    strokeDashoffset={`${2 * Math.PI * 48 * (1 - 0.95)}`}
                    className="text-purple-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white font-jetbrains-mono">95%</span>
                </div>
              </div>
              <span className="text-white font-jetbrains-mono group-hover:text-purple-300 transition-colors">Design</span>
            </div>
            <div className="flex flex-col items-center gap-4 group hover:scale-110 transition-transform duration-300 cursor-pointer">
              <div className="relative w-28 h-28 hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.8)] transition-all duration-300">
                <svg className="transform -rotate-90 w-28 h-28">
                  <circle
                    cx="56"
                    cy="56"
                    r="48"
                    stroke="currentColor"
                    strokeWidth="11"
                    fill="none"
                    className="text-purple-900/50"
                  />
                  <circle
                    cx="56"
                    cy="56"
                    r="48"
                    stroke="currentColor"
                    strokeWidth="11"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 48}`}
                    strokeDashoffset={`${2 * Math.PI * 48 * (1 - 0.75)}`}
                    className="text-purple-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white font-jetbrains-mono">75%</span>
                </div>
              </div>
              <span className="text-white font-jetbrains-mono group-hover:text-purple-300 transition-colors">UX & UI Design</span>
            </div>
          </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="work" className="py-20 w-full">
        <div className="w-full pl-4 md:pl-8 lg:pl-32 pr-4 md:pr-8 lg:pr-32">
          <div className="grid md:grid-cols-3 gap-12 items-center max-w-7xl mx-auto">
            <div className="p-10 hover:scale-105 transition-transform duration-300">
              <h3 className="text-4xl md:text-5xl font-bold mb-3 font-kanit bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]">DESIGNER</h3>
              <p className="text-gray-400 text-base mb-6 font-jetbrains-mono">Design & Creative</p>
              <p className="text-gray-300 mb-8 leading-relaxed text-base md:text-lg font-jetbrains-mono">
                In the radiant cradle of Elysium, where silken winds whisper through crystalline groves, the architects of light weave dreams into marble. Each dawn unfurls like a tapestry of gold.
              </p>
              <button className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-full font-semibold transition-all duration-300 text-base font-jetbrains-mono hover:scale-110 hover:shadow-[0_0_30px_rgba(168,85,247,0.8)]">
                View projects
              </button>
            </div>
            <div className="flex justify-center order-first md:order-none">
              <Image
                src="/poppetje.png"
                alt="Designer/Developer illustration"
                width={800}
                height={800}
                quality={100}
                priority
                unoptimized
                className="object-contain max-w-full h-auto drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]"
              />
            </div>
            <div className="p-10 text-right md:text-right hover:scale-105 transition-transform duration-300">
              <h3 className="text-4xl md:text-5xl font-bold mb-3 font-kanit bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]">DEVELOPER</h3>
              <p className="text-gray-400 text-base mb-6 font-jetbrains-mono">Development & Code</p>
              <p className="text-gray-300 mb-8 leading-relaxed text-base md:text-lg font-jetbrains-mono">
                In the radiant cradle of Elysium, where silken winds whisper through crystalline groves, the architects of light weave dreams into marble. Each dawn unfurls like a tapestry of gold.
              </p>
              <button className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-full font-semibold transition-all duration-300 text-base font-jetbrains-mono hover:scale-110 hover:shadow-[0_0_30px_rgba(168,85,247,0.8)]">
                View projects
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Torn edge transition to Work Experience */}
      <div className="relative -mt-1 h-64 md:h-80 pointer-events-none overflow-hidden z-20">
        <svg className="w-full h-full" viewBox="0 0 1200 240" preserveAspectRatio="none">
          <defs>
            <linearGradient id="torn-fade-we" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0a0a0a" stopOpacity="0"/>
              <stop offset="100%" stopColor="#0a0a0a" stopOpacity="1"/>
            </linearGradient>
            <linearGradient id="torn-purple-we" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#581c87" stopOpacity="0"/>
              <stop offset="100%" stopColor="#581c87" stopOpacity="1"/>
            </linearGradient>
          </defs>
          {/* Main torn edge with irregular pattern */}
          <path d="M0,0 L0,80 Q120,60 250,70 T500,65 T750,75 T1000,70 T1200,72 L1200,0 Z" fill="url(#torn-fade-we)"/>
          <path d="M0,0 L0,85 Q80,75 200,80 T450,72 T700,78 T950,75 T1150,76 L1200,77 L1200,0 Z" fill="url(#torn-purple-we)"/>
          {/* Additional torn layers for more realistic effect */}
          <path d="M0,0 L0,88 Q100,82 220,85 Q400,78 600,80 Q800,76 1000,82 Q1100,79 1200,80 L1200,0 Z" fill="url(#torn-fade-we)" opacity="0.7"/>
        </svg>
      </div>

      {/* Work Experience Section */}
      <section ref={workExperienceRef} className="relative py-32 overflow-hidden -mt-48 md:-mt-64">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/background-stars.png"
            alt="Stars background"
            fill
            className="object-cover"
            quality={100}
            unoptimized
            sizes="100vw"
          />
        </div>
        
        {/* Gradient Fade Overlay - Top and Bottom for seamless transition */}
        <div className="absolute top-0 left-0 right-0 h-96 z-[1] bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-96 z-[1] bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 left-0 right-0 h-96 z-[1] bg-gradient-to-b from-purple-950 via-purple-950/60 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-96 z-[1] bg-gradient-to-t from-purple-950 via-purple-950/60 to-transparent pointer-events-none"></div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-2 font-kanit drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">Work experience</h2>
          <p className="text-center text-gray-400 mb-16 text-sm md:text-base font-jetbrains-mono">WHAT I HAVE DONE SO FAR</p>
          <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-white/20 overflow-hidden">
            {/* Animated timeline fill */}
            <div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-purple-500 via-purple-400 to-purple-500 transition-all duration-500 ease-out"
              style={{ 
                height: `${timelineProgress}%`,
                boxShadow: hoveredBox !== null ? '0 0 20px rgba(168, 85, 247, 0.8)' : '0 0 10px rgba(168, 85, 247, 0.4)',
                transition: hoveredBox !== null ? 'all 0.3s ease' : 'height 0.5s ease-out, box-shadow 0.5s ease'
              }}
            ></div>
          </div>
          
          {/* Timeline items */}
          <div className="space-y-24">
            <div className="relative flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 md:pr-8 order-2 md:order-1">
                <div 
                  className="bg-purple-900/70 rounded-2xl p-8 backdrop-blur-sm border border-purple-700/30 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredBox(1)}
                  onMouseLeave={() => setHoveredBox(null)}
                >
                  <h3 className="text-xl md:text-2xl font-bold mb-2 font-kanit text-white">Web developer</h3>
                  <p className="text-gray-300 text-sm mb-4 font-jetbrains-mono">Frontend Development</p>
                  <ul className="text-white text-sm md:text-base space-y-1 list-disc list-inside text-left font-jetbrains-mono">
                    <li>In the radiant cradle of</li>
                    <li>Elysium, where</li>
                    <li>silken winds whisper</li>
                    <li>through crystalline groves</li>
                  </ul>
                </div>
              </div>
              <div 
                className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-purple-600 rounded-full border-4 border-white hidden md:block z-10 transition-all duration-300 ${
                  hoveredBox === 1 ? 'scale-125 shadow-[0_0_20px_rgba(168,85,247,0.8)]' : ''
                }`}
              ></div>
              <div className="w-full md:w-1/2 md:pl-8 md:pt-12 order-1 md:order-2 text-center md:text-left mb-4 md:mb-0">
                <div className="text-white text-sm md:text-base font-jetbrains-mono">Aug 2024 - Jun 2024</div>
              </div>
            </div>
            
            <div className="relative flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 md:pr-8 md:pt-12 md:text-right order-1 mb-4 md:mb-0 text-center md:text-left">
                <div className="text-white text-sm md:text-base font-jetbrains-mono">Aug 2025 - Feb 2025</div>
              </div>
              <div 
                className={`absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-purple-600 rounded-full border-4 border-white hidden md:block z-10 transition-all duration-300 ${
                  hoveredBox === 2 ? 'scale-125 shadow-[0_0_20px_rgba(168,85,247,0.8)]' : ''
                }`}
              ></div>
              <div className="w-full md:w-1/2 md:pl-8 order-2">
                <div 
                  className="bg-purple-900/70 rounded-2xl p-8 backdrop-blur-sm border border-purple-700/30 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredBox(2)}
                  onMouseLeave={() => setHoveredBox(null)}
                >
                  <h3 className="text-xl md:text-2xl font-bold mb-2 font-kanit text-white">React.js Developer</h3>
                  <p className="text-gray-300 text-sm mb-4 font-jetbrains-mono">UI/UX Development</p>
                  <ul className="text-white text-sm md:text-base space-y-1 list-disc list-inside text-left font-jetbrains-mono">
                    <li>Light weave dreams</li>
                    <li>into marble. Each dawn</li>
                    <li>unfurls like a tapestry</li>
                    <li>of gold and silver</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="relative flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 md:pr-8 order-2 md:order-1">
                <div 
                  className="bg-purple-900/70 rounded-2xl p-8 backdrop-blur-sm border border-purple-700/30 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredBox(3)}
                  onMouseLeave={() => setHoveredBox(null)}
                >
                  <h3 className="text-xl md:text-2xl font-bold mb-2 font-kanit text-white">App developer</h3>
                  <p className="text-gray-300 text-sm mb-4 font-jetbrains-mono">Mobile Development</p>
                  <ul className="text-white text-sm md:text-base space-y-1 list-disc list-inside text-left font-jetbrains-mono">
                    <li>The architects of light</li>
                    <li>weave dreams into marble</li>
                    <li>Each dawn unfurls</li>
                    <li>like a tapestry of gold</li>
                  </ul>
                </div>
              </div>
              <div 
                className={`absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-purple-600 rounded-full border-4 border-white hidden md:block z-10 transition-all duration-300 ${
                  hoveredBox === 3 ? 'scale-125 shadow-[0_0_20px_rgba(168,85,247,0.8)]' : ''
                }`}
              ></div>
              <div className="w-full md:w-1/2 md:pl-8 md:pt-12 order-1 md:order-2 text-center md:text-left mb-4 md:mb-0">
                <div className="text-white text-sm md:text-base font-jetbrains-mono">Okt 2025 - now</div>
              </div>
            </div>
          </div>
          </div>
          </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900"></div>
        <div className="relative z-10 w-full pl-4 md:pl-8 lg:pl-32 pr-4 md:pr-8 lg:pr-32">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <div className="flex justify-center order-2 md:order-1">
            <Image
              src="/contact.png"
              alt="Contact illustration"
              width={800}
              height={800}
              quality={100}
              priority
              unoptimized
              className="object-contain max-w-full h-auto drop-shadow-[0_0_40px_rgba(168,85,247,0.4)]"
            />
          </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl md:text-5xl font-bold mb-3 font-kanit text-center md:text-right drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">Get In Touch</h2>
              <p className="text-gray-300 mb-8 text-center md:text-right font-jetbrains-mono text-sm md:text-base">
                Have a project in mind? Let's work together.
              </p>
              <form className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-6 py-4 bg-purple-800/40 backdrop-blur-sm rounded-xl border border-purple-500/30 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 text-white font-jetbrains-mono transition-all hover:border-purple-400/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-6 py-4 bg-purple-800/40 backdrop-blur-sm rounded-xl border border-purple-500/30 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 text-white font-jetbrains-mono transition-all hover:border-purple-400/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-6 py-4 bg-purple-800/40 backdrop-blur-sm rounded-xl border border-purple-500/30 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 text-white font-jetbrains-mono transition-all hover:border-purple-400/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-6 py-4 bg-purple-800/40 backdrop-blur-sm rounded-xl border border-purple-500/30 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 text-white font-jetbrains-mono transition-all hover:border-purple-400/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                />
                <textarea
                  placeholder="Message"
                  rows={6}
                  className="w-full px-6 py-4 bg-purple-800/40 backdrop-blur-sm rounded-xl border border-purple-500/30 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 resize-none text-white font-jetbrains-mono transition-all hover:border-purple-400/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                ></textarea>
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-200 hover:shadow-lg hover:shadow-white/20 hover:scale-105 transition-all font-jetbrains-mono"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-950 border-t border-purple-900/50">
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
              <li><a href="#work" className="text-gray-400 hover:text-white transition-all duration-300 text-sm md:text-base font-jetbrains-mono hover:scale-110 inline-block hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">Work</a></li>
              <li><a href="#skills" className="text-gray-400 hover:text-white transition-all duration-300 text-sm md:text-base font-jetbrains-mono hover:scale-110 inline-block hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">Skills</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-all duration-300 text-sm md:text-base font-jetbrains-mono hover:scale-110 inline-block hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">Contact</a></li>
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

