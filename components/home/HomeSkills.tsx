"use client";

import Image from "next/image";
import { RefObject } from "react";

interface HomeSkillsProps {
  skillsRef: RefObject<HTMLElement | null>;
  isSkillsVisible: boolean;
}

export default function HomeSkills({ skillsRef, isSkillsVisible }: HomeSkillsProps) {
  return (
    <section 
      id="skills" 
      ref={skillsRef}
      className="py-20 -mt-32 md:-mt-40 lg:-mt-48 relative z-50"
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
                <div className="relative w-28 h-28 rounded-full bg-gray-800/50 border-2 border-purple-700/40 hover:border-purple-500/60 hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.8)] transition-all duration-300 flex items-center justify-center p-4">
                  <Image
                    src="/iconwebdevelopment.png"
                    alt="Web development icon"
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                    unoptimized
                  />
                </div>
                <span className="text-white font-jetbrains-mono group-hover:text-purple-300 transition-colors">Web development</span>
              </div>
              <div className="flex flex-col items-center gap-4 group hover:scale-110 transition-transform duration-300 cursor-pointer">
                <div className="relative w-28 h-28 rounded-full bg-gray-800/50 border-2 border-purple-700/40 hover:border-purple-500/60 hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.8)] transition-all duration-300 flex items-center justify-center p-4">
                  <Image
                    src="/icondesign.png"
                    alt="Design icon"
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                    unoptimized
                  />
                </div>
                <span className="text-white font-jetbrains-mono group-hover:text-purple-300 transition-colors">Design</span>
              </div>
              <div className="flex flex-col items-center gap-4 group hover:scale-110 transition-transform duration-300 cursor-pointer">
                <div className="relative w-28 h-28 rounded-full bg-gray-800/50 border-2 border-purple-700/40 hover:border-purple-500/60 hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.8)] transition-all duration-300 flex items-center justify-center p-4">
                  <Image
                    src="/iconuxui.png"
                    alt="UX & UI Design icon"
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                    unoptimized
                  />
                </div>
                <span className="text-white font-jetbrains-mono group-hover:text-purple-300 transition-colors">UX & UI Design</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



