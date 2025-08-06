import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

const Layout = ({ children, showFooter = true }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Gradient Mesh Background */}
      <div className="gradient-mesh" />
      
      <Header />
      <main className="flex-1 relative z-10">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;