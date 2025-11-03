"use client";

import Link from "next/link";

export default function Footer() {
  return (
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
  );
}


