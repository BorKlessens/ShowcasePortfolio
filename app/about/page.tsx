"use client";

import { useEffect, useState } from "react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import BackgroundParticles from "@/components/shared/BackgroundParticles";
import AboutHero from "@/components/about/AboutHero";
import AboutContent from "@/components/about/AboutContent";
import AboutServices from "@/components/about/AboutServices";

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
      <AboutHero displayedText1={displayedText1} displayedText2={displayedText2} isTyping={isTyping} text1={text1} text2={text2} />
      <AboutContent />
      <AboutServices />
      <Footer />
    </div>
  );
}

