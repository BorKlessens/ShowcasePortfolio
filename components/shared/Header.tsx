"use client";

import Link from "next/link";
import { useState } from "react";

interface HeaderProps {
  isHeaderVisible: boolean;
  activePage?: "home" | "about" | "projects";
  language: "NL" | "EN";
  setLanguage: (lang: "NL" | "EN") => void;
}

export default function Header({ isHeaderVisible, activePage, language, setLanguage }: HeaderProps) {
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="w-full py-4 pl-4 md:pl-8 lg:pl-32 pr-4 md:pr-8 lg:pr-32 flex items-center justify-between">
        <Link href="/" className="text-2xl md:text-3xl font-bold font-kanit hover:text-purple-400 transition-colors">
          BOR KLESSENS
        </Link>
        <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex gap-8 font-kanit text-lg">
          <Link 
            href="/" 
            className={`transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.8)] ${
              activePage === "home"
                ? "relative px-3 py-1 rounded-full border-2 border-blue-500 text-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.8)]"
                : "hover:text-purple-400"
            }`}
          >
            Home
          </Link>
          <Link 
            href="/about" 
            className={`transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.8)] ${
              activePage === "about"
                ? "relative px-3 py-1 rounded-full border-2 border-purple-500 text-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.8)]"
                : "hover:text-purple-400"
            }`}
          >
            About me
          </Link>
          <Link 
            href="/projects" 
            className={`transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.8)] ${
              activePage === "projects"
                ? "relative px-3 py-1 rounded-full border-2 border-purple-500 text-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.8)]"
                : "hover:text-purple-400"
            }`}
          >
            Projects
          </Link>
          {activePage === "home" ? (
            <a href="#contact" className="hover:text-purple-400 transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">
              Contact
            </a>
          ) : (
            <Link href="/#contact" className="hover:text-purple-400 transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">
              Contact
            </Link>
          )}
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
  );
}



