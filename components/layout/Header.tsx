import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';

const Header = () => {
  const { user, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-secondary-200/50' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className={`text-xl font-bold transition-colors duration-300 ${
                  isScrolled ? 'text-secondary-900' : 'text-white'
                }`}>
                  SilverShift
                </span>
                <span className={`text-xs font-medium transition-colors duration-300 ${
                  isScrolled ? 'text-secondary-500' : 'text-secondary-300'
                }`}>
                  Business Education Platform
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/listings" 
              className={`font-medium transition-colors duration-300 hover:text-primary-600 ${
                isScrolled ? 'text-secondary-700' : 'text-white/90'
              }`}
            >
              Browse Businesses
            </Link>
            <Link 
              href="/education" 
              className={`font-medium transition-colors duration-300 hover:text-primary-600 ${
                isScrolled ? 'text-secondary-700' : 'text-white/90'
              }`}
            >
              AI Learning Hub
            </Link>
            <Link 
              href="/succession" 
              className={`font-medium transition-colors duration-300 hover:text-primary-600 ${
                isScrolled ? 'text-secondary-700' : 'text-white/90'
              }`}
            >
              Succession Planning
            </Link>
            <Link 
              href="/about" 
              className={`font-medium transition-colors duration-300 hover:text-primary-600 ${
                isScrolled ? 'text-secondary-700' : 'text-white/90'
              }`}
            >
              About
            </Link>
          </nav>

          {/* Right Side - Auth */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-6">
                <Link 
                  href={`/dashboard/${user?.userType?.toLowerCase()}`}
                  className={`font-medium transition-colors duration-300 hover:text-primary-600 ${
                    isScrolled ? 'text-secondary-700' : 'text-white/90'
                  }`}
                >
                  Dashboard
                </Link>
                
                {/* User Menu */}
                <div className="relative">
                  <button className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-300 ${
                    isScrolled 
                      ? 'bg-secondary-100 hover:bg-secondary-200 text-secondary-700' 
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}>
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center text-white text-sm font-semibold">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={isScrolled ? 'text-secondary-700 hover:text-primary-600' : 'text-white hover:text-primary-200'}
                  >
                    Sign in
                  </Button>
                </Link>
                <Link href="/register">
                  <Button 
                    variant="primary" 
                    size="sm"
                    className="shadow-md hover:shadow-lg"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
                isScrolled 
                  ? 'bg-secondary-100 hover:bg-secondary-200 text-secondary-700' 
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden border-t transition-all duration-300 ${
            isScrolled ? 'border-secondary-200 bg-white/95' : 'border-white/20 bg-black/20'
          }`}>
            <nav className="py-4 space-y-2">
              <Link 
                href="/listings" 
                className={`block px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-secondary-700 hover:bg-secondary-100 hover:text-primary-600' 
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Businesses
              </Link>
              <Link 
                href="/education" 
                className={`block px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-secondary-700 hover:bg-secondary-100 hover:text-primary-600' 
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                AI Learning Hub
              </Link>
              <Link 
                href="/succession" 
                className={`block px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-secondary-700 hover:bg-secondary-100 hover:text-primary-600' 
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Succession Planning
              </Link>
              <Link 
                href="/about" 
                className={`block px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-secondary-700 hover:bg-secondary-100 hover:text-primary-600' 
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              
              {!isAuthenticated && (
                <div className="pt-4 border-t border-secondary-200/20 space-y-2">
                  <Link href="/login" className="block px-4 py-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`w-full ${
                        isScrolled ? 'text-secondary-700 hover:text-primary-600' : 'text-white hover:text-primary-200'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign in
                    </Button>
                  </Link>
                  <Link href="/register" className="block px-4 py-2">
                    <Button 
                      variant="primary" 
                      size="sm" 
                      className="w-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;