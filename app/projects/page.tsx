"use client";

import { useEffect, useState } from "react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import BackgroundParticles from "@/components/shared/BackgroundParticles";
import ProjectsHero from "@/components/projects/ProjectsHero";
import ProjectSlider from "@/components/projects/ProjectSlider";

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
      <BackgroundParticles particleCount={12} starCount={3} />
      <Header isHeaderVisible={isHeaderVisible} activePage="projects" language={language} setLanguage={setLanguage} />
      <ProjectsHero displayedText1={displayedText1} displayedText2={displayedText2} isTyping={isTyping} text1={text1} text2={text2} heroVisible={heroVisible} />
      <ProjectSlider 
        projects={projects}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        isTransitioning={isTransitioning}
        setIsTransitioning={setIsTransitioning}
        isHovered={isHovered}
        setIsHovered={setIsHovered}
        sliderVisible={sliderVisible}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        prev={prev}
        next={next}
      />
      <Footer />
    </div>
  );
}
