"use client";

import Image from "next/image";
import Link from "next/link";

interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl: string;
  repoUrl: string;
}

interface ProjectSliderProps {
  projects: Project[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  isTransitioning: boolean;
  setIsTransitioning: (isTransitioning: boolean) => void;
  isHovered: boolean;
  setIsHovered: (isHovered: boolean) => void;
  sliderVisible: boolean;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseUp: (e: React.MouseEvent) => void;
  prev: () => void;
  next: () => void;
}

export default function ProjectSlider({
  projects,
  activeIndex,
  setActiveIndex,
  isTransitioning,
  setIsTransitioning,
  isHovered,
  setIsHovered,
  sliderVisible,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  prev,
  next,
}: ProjectSliderProps) {
  return (
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
  );
}

