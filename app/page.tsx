"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import BackgroundParticles from "@/components/shared/BackgroundParticles";
import HomeHero from "@/components/home/HomeHero";
import HomeSkills from "@/components/home/HomeSkills";

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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
      <BackgroundParticles particleCount={15} starCount={3} />
      <Header isHeaderVisible={isHeaderVisible} activePage="home" language={language} setLanguage={setLanguage} />
      <HomeHero displayedText1={displayedText1} displayedText2={displayedText2} isTyping={isTyping} text1={text1} text2={text2} />
      <HomeSkills skillsRef={skillsRef} isSkillsVisible={isSkillsVisible} />

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
                <Link href="/projects">View projects</Link>
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
                <Link href="/projects">View projects</Link>
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

      <Footer />
    </div>
  );
}

