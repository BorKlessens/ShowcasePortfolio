"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProjectsPage() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [language, setLanguage] = useState<"NL" | "EN">("NL");

  // Slider data
  const projects = [
    {
      title: "FIX THE UX",
      description:
        "In the radiant cradle of Elysium, where silken winds whisper through",
      tags: ["Figma", "JavaScript"],
      image: "/fixtheux.png",
      liveUrl: "#",
      repoUrl: "#",
    },
    {
      title: "Web Development",
      description:
        "Modern web development project showcasing responsive design and interactive user interfaces with cutting-edge technologies.",
      tags: ["React", "Next.js", "TypeScript"],
      image: "/webdevelopment.png",
      liveUrl: "#",
      repoUrl: "#",
    },
    {
      title: "3D Web Development",
      description: "Innovative frontend development project featuring 3D graphics and interactive user experiences with modern web technologies.",
      tags: ["React", "Three.js", "WebGL"],
      image: "/webdevelopment3d.png",
      liveUrl: "#",
      repoUrl: "#",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [displayedText1, setDisplayedText1] = useState("");
  const [displayedText2, setDisplayedText2] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [heroVisible, setHeroVisible] = useState(false);
  const [sliderVisible, setSliderVisible] = useState(false);

  // Slider section visibility on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSliderVisible(true);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px 100px 0px',
      }
    );

    const sliderElement = document.getElementById('projecten');
    if (sliderElement) {
      observer.observe(sliderElement);
    }

    return () => {
      if (sliderElement) {
        observer.unobserve(sliderElement);
      }
    };
  }, []);

  const text1 = "FRONT END";
  const text2 = "DEVELOPER";

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
        timeout1 = setTimeout(typeText1, 60);
      } else {
        setTimeout(() => {
          typeText2();
        }, 300);
      }
    };

    const typeText2 = () => {
      if (index2 < text2.length) {
        setDisplayedText2(text2.substring(0, index2 + 1));
        index2++;
        timeout2 = setTimeout(typeText2, 50);
      } else {
        setIsTyping(false);
      }
    };

    const startDelay = setTimeout(() => {
      setHeroVisible(true);
      typeText1();
    }, 300);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(startDelay);
    };
  }, []);

  // Swipe threshold
  const minSwipeDistance = 50;

  const prev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((i) => (i === 0 ? projects.length - 1 : i - 1));
    setTimeout(() => setIsTransitioning(false), 200);
  };

  const next = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((i) => (i === projects.length - 1 ? 0 : i + 1));
    setTimeout(() => setIsTransitioning(false), 200);
  };

  // Touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      next();
    } else if (isRightSwipe) {
      prev();
    }
  };

  // Mouse drag handlers for desktop
  const [mouseStart, setMouseStart] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setMouseStart(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setTouchEnd(e.clientX);
  };

  const onMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (!mouseStart || !touchEnd) return;
    const distance = mouseStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      next();
    } else if (isRightSwipe) {
      prev();
    }
    setTouchEnd(0);
    setMouseStart(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;
      if (e.key === "ArrowLeft") {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setActiveIndex((i) => (i === 0 ? projects.length - 1 : i - 1));
        setTimeout(() => setIsTransitioning(false), 200);
      } else if (e.key === "ArrowRight") {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setActiveIndex((i) => (i === projects.length - 1 ? 0 : i + 1));
        setTimeout(() => setIsTransitioning(false), 200);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isTransitioning]);

  useEffect(() => {
    setIsMounted(true);
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
      {/* Background particles - client-side only to avoid hydration mismatch */}
      {isMounted && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-30"
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
              className="absolute w-1 h-1 bg-white rounded-full opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `particle-float ${20 + Math.random() * 15}s linear infinite`,
                animationDelay: `${Math.random() * 8}s`,
              }}
            />
          ))}
        </div>
      )}
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="w-full py-4 pl-4 md:pl-8 lg:pl-32 pr-4 md:pr-8 lg:pr-32 flex items-center justify-between">
          <Link href="/" className="text-2xl md:text-3xl font-bold font-kanit hover:text-purple-400 transition-colors">BOR KLESSENS</Link>
          <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex gap-8 font-kanit text-lg">
            <Link href="/" className="hover:text-purple-400 transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">Home</Link>
            <Link href="/about" className="hover:text-purple-400 transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">About me</Link>
            <Link href="/projects" className="relative px-3 py-1 rounded-full border-2 border-purple-500 text-purple-400 hover:scale-110 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.8)]">Projects</Link>
            <Link href="/#contact" className="hover:text-purple-400 transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">Contact</Link>
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
      {/* Hero Content - match home width/height */}
      <section className="relative min-h-screen flex items-center justify-center overflow-x-hidden w-full">
        {/* Hero Image Background (same as home) */}
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
            {/* Left: Text (same grid span as home) */}
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
            {/* Right: Empty column to balance like home */}
            <div className="hidden md:block md:col-span-1"></div>
          </div>
        </div>
        {/* Torn edge effect at bottom (same as home) */}
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
        {/* Torn edge effect at bottom (same as home) */}
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

      {/* Divider line between hero and content (wavier + overlaps hero slightly) */}
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
          {/* Solid/fade band with multi-crest wave */}
          <path d="M0,40 C100,0 200,80 300,40 S500,80 600,40 S800,0 900,40 S1100,80 1200,40 L1200,80 L0,80 Z" fill="url(#projects-wavy-divider)"/>
        </svg>
      </div>

      {/* Projects Slider */}
      <section 
        id="projecten" 
        className="relative min-h-screen flex items-center pt-4 pb-16 md:pb-20"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div className="w-full pl-4 md:pl-8 lg:pl-32 pr-4 md:pr-8 lg:pr-32">
          <div 
            className="w-full max-w-[90rem] mx-auto grid md:grid-cols-2 gap-12 lg:gap-16 items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Left: Textual info */}
            <div 
              key={`text-${activeIndex}`}
              className={`transition-all duration-200 ease-out ${
                isTransitioning 
                  ? 'opacity-0 translate-x-[-20px]' 
                  : sliderVisible
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-[-30px]'
              }`}
              style={{
                transition: sliderVisible && !isTransitioning ? 'all 0.6s ease-out' : 'all 0.2s ease-out'
              }}
            >
              <div 
                className="text-7xl md:text-8xl lg:text-9xl font-jetbrains-mono font-bold mb-6 transition-all duration-200 ease-out transform"
                style={{ 
                  WebkitTextStroke: '2px rgba(255, 255, 255, 0.9)',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                  transform: isTransitioning ? 'scale(0.9)' : 'scale(1)',
                } as React.CSSProperties}
              >
                {String(activeIndex + 1).padStart(2, '0')}
              </div>
              <h2 
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold font-kanit mb-6 transition-all duration-200 ease-out"
                style={{
                  transform: isTransitioning ? 'translateY(10px)' : 'translateY(0)',
                }}
              >
                {projects[activeIndex].title}
              </h2>
              <p 
                className="text-gray-300 font-jetbrains-mono text-base md:text-lg lg:text-xl mb-8 max-w-2xl leading-relaxed transition-all duration-200 ease-out"
                style={{
                  transform: isTransitioning ? 'translateY(10px)' : 'translateY(0)',
                }}
              >
                {projects[activeIndex].description}
              </p>
              <div 
                className="text-base md:text-lg lg:text-xl text-purple-300 font-jetbrains-mono mb-8 transition-all duration-200 ease-out"
                style={{
                  transform: isTransitioning ? 'translateY(10px)' : 'translateY(0)',
                }}
              >
                {projects[activeIndex].tags.join(", ")}
              </div>
              <div 
                className="h-px w-72 bg-purple-700/50 mb-8 transition-all duration-200 ease-out"
                style={{
                  transform: isTransitioning ? 'scaleX(0)' : 'scaleX(1)',
                  transformOrigin: 'left',
                }}
              ></div>
              <div 
                className="flex items-center gap-4 transition-all duration-200 ease-out"
                style={{
                  transform: isTransitioning ? 'translateY(10px)' : 'translateY(0)',
                }}
              >
                <Link 
                  href={projects[activeIndex].liveUrl} 
                  className="w-14 h-14 rounded-full bg-purple-700/30 hover:bg-purple-700/50 flex items-center justify-center transition-all hover:scale-110 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] hover:rotate-12"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 3l7 7m0 0l-7 7m7-7H3"/></svg>
                </Link>
                <Link 
                  href={projects[activeIndex].repoUrl} 
                  className="w-14 h-14 rounded-full bg-purple-700/30 hover:bg-purple-700/50 flex items-center justify-center transition-all hover:scale-110 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] hover:rotate-12"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white"><path d="M12 2C6.477 2 2 6.484 2 12.012c0 4.425 2.865 8.18 6.839 9.504.5.092.683-.217.683-.483 0-.237-.009-.866-.013-1.7-2.782.605-3.369-1.343-3.369-1.343-.454-1.155-1.11-1.463-1.11-1.463-.908-.621.069-.608.069-.608 1.003.07 1.53 1.03 1.53 1.03.892 1.53 2.341 1.088 2.91.833.092-.647.35-1.088.636-1.339-2.221-.253-4.556-1.113-4.556-4.951 0-1.093.39-1.987 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.706.115 2.505.337 1.909-1.295 2.748-1.026 2.748-1.026.546 1.378.203 2.397.1 2.65.64.701 1.028 1.595 1.028 2.688 0 3.847-2.339 4.695-4.566 4.944.359.309.678.918.678 1.852 0 1.336-.012 2.413-.012 2.741 0 .268.18.58.688.481C19.138 20.188 22 16.436 22 12.012 22 6.484 17.523 2 12 2Z"/></svg>
                </Link>
              </div>
            </div>

            {/* Right: Image card */}
            <div className={`md:col-span-1 transition-all duration-700 ease-out delay-300 ${
              sliderVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[30px]'
            }`}>
              <div 
                className="relative transition-all duration-200 ease-out"
                style={{
                  transform: isTransitioning 
                    ? 'translateX(20px) scale(0.95)' 
                    : isHovered 
                      ? 'translateY(-5px) scale(1.02)' 
                      : 'translateX(0) scale(1)',
                }}
              >
                <div 
                  className="rounded-3xl overflow-hidden border-2 border-purple-700/40 bg-purple-900/30 shadow-[0_0_50px_rgba(168,85,247,0.3)] transition-all duration-200 ease-out"
                  style={{
                    boxShadow: isHovered 
                      ? '0 0 80px rgba(168,85,247,0.5), 0 0 120px rgba(168,85,247,0.3)' 
                      : '0 0 50px rgba(168,85,247,0.3)',
                  }}
                >
                  <div className={`relative w-full ${activeIndex === 2 ? 'aspect-[16/10]' : 'aspect-[16/10] min-h-[400px] md:min-h-[500px]'}`}>
                    <Image
                      key={activeIndex}
                      src={projects[activeIndex].image}
                      alt={projects[activeIndex].title}
                      fill
                      className={`object-cover transition-all duration-200 ease-out ${
                        isTransitioning ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
                      }`}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Navigation arrows - below image card, outside transform container */}
              <div className="flex gap-4 justify-center mt-6">
                <button 
                  onClick={prev} 
                  aria-label="Previous" 
                  disabled={isTransitioning}
                  className={`w-14 h-14 rounded-md bg-purple-800/60 hover:bg-purple-700 text-white flex items-center justify-center transition-all hover:scale-110 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] hover:rotate-[-5deg] ${
                    isTransitioning ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                  }`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
                </button>
                <button 
                  onClick={next} 
                  aria-label="Next" 
                  disabled={isTransitioning}
                  className={`w-14 h-14 rounded-md bg-purple-800/60 hover:bg-purple-700 text-white flex items-center justify-center transition-all hover:scale-110 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] hover:rotate-[5deg] ${
                    isTransitioning ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                  }`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                </button>
              </div>

              {/* Slide indicators - below image card, outside transform container */}
              <div className="flex gap-2 justify-center mt-4">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!isTransitioning) {
                        setIsTransitioning(true);
                        setActiveIndex(index);
                        setTimeout(() => setIsTransitioning(false), 200);
                      }
                    }}
                    className={`transition-all duration-200 rounded-full ${
                      index === activeIndex
                        ? 'w-8 h-2 bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.8)]'
                        : 'w-2 h-2 bg-purple-700/50 hover:bg-purple-600/70'
                    }`}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>
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
