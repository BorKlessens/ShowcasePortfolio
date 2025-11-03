"use client";

import Image from "next/image";

export default function AboutContent() {
  return (
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
  );
}

