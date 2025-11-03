"use client";

export default function AboutServices() {
  return (
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
  );
}

