import React from 'react';
import Link from 'next/link';
import Badge from '@/components/ui/Badge';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-secondary-900 via-primary-900/20 to-secondary-900 text-white">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent">SilverShift</span>
            </div>
            <p className="text-secondary-300 text-sm leading-relaxed">
              AI-powered business education platform connecting new entrepreneurs with experienced business owners for seamless succession planning.
            </p>
            <div className="flex items-center space-x-3">
              <Badge variant="primary" size="sm">
                250+ Businesses
              </Badge>
              <Badge variant="success" size="sm">
                AI Verified
              </Badge>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gradient-to-b from-primary-500 to-primary-600 rounded-full"></span>
              For Buyers
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/listings" className="text-secondary-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  Browse Businesses
                </Link>
              </li>
              <li>
                <Link href="/education" className="text-secondary-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  AI Learning Hub
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="text-secondary-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  ROI Calculator
                </Link>
              </li>
              <li>
                <Link href="/mentorship" className="text-secondary-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  Find a Mentor
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gradient-to-b from-success-500 to-success-600 rounded-full"></span>
              For Sellers
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/succession" className="text-secondary-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  Succession Planning
                </Link>
              </li>
              <li>
                <Link href="/valuation" className="text-secondary-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  Business Valuation
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-secondary-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  Seller Resources
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="text-secondary-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gradient-to-b from-warning-500 to-warning-600 rounded-full"></span>
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-secondary-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-secondary-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-secondary-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-secondary-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-secondary-400 text-sm">
              © 2025 SilverShift. Empowering the next generation of entrepreneurs.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-secondary-400 hover:text-white transition-colors duration-200 group">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-secondary-400 hover:text-white transition-colors duration-200 group">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-secondary-400 hover:text-white transition-colors duration-200 group">
                <span className="sr-only">GitHub</span>
                <svg className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;