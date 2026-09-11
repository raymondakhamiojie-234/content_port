"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Content", href: "#content" },
    { name: "Music", href: "#music" },
    { name: "Film", href: "#film" },
    { name: "Journey", href: "#journey" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-bg-secondary/95 backdrop-blur-md py-3 shadow-md shadow-black/5"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-center md:justify-between relative">
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden absolute left-6 text-text-primary"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={28} />
          </button>

          {/* Left Nav */}
          <nav className="hidden md:flex flex-1 justify-end items-center space-x-8 pr-12">
            {navLinks.slice(0, 4).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium hover:text-accent-gold transition-colors tracking-widest uppercase ${isScrolled ? 'text-text-primary' : 'text-text-primary'}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <Link href="/" className="text-4xl md:text-5xl font-script tracking-wide text-accent-gold hover:scale-105 transition-transform">
            Queenfineshii
          </Link>

          {/* Right Nav */}
          <nav className="hidden md:flex flex-1 justify-start items-center space-x-8 pl-12">
            {navLinks.slice(4).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium hover:text-accent-gold transition-colors tracking-widest uppercase ${isScrolled ? 'text-text-primary' : 'text-text-primary'}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-bg-primary flex flex-col justify-center items-center"
          >
            <button
              className="absolute top-6 right-6 text-text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
            <nav className="flex flex-col space-y-8 text-center">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-4xl font-display font-bold text-text-primary hover:text-accent-gold transition-colors uppercase"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
