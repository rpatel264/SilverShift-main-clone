import React from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';
import { mockListings } from '@/lib/mockData';

export default function Home() {
  const featuredListings = mockListings.slice(0, 3);
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Professional Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-900 via-primary-900 to-secondary-800" />
        
        {/* Subtle Animated Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary-400/10 to-primary-600/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tr from-secondary-400/8 to-primary-400/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Professional Grid Pattern */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230ea5e9' fill-opacity='0.05'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        
        <div className="relative max-w-screen-2xl mx-auto px-6 py-32 pt-44">
          <div className="text-center max-w-6xl mx-auto">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-500/20 to-primary-600/20 backdrop-blur-xl border border-primary-400/30 rounded-full px-6 py-3 mb-12 group hover:shadow-2xl hover:shadow-primary-500/20 transition-all duration-500">
              <div className="w-3 h-3 bg-gradient-to-r from-success-400 to-success-500 rounded-full animate-pulse"></div>
              <span className="text-primary-200 font-semibold tracking-wide">AI-Powered Business Platform</span>
              <div className="w-8 h-8 bg-gradient-to-r from-primary-400/20 to-primary-500/20 rounded-full flex items-center justify-center">
                <span className="text-primary-300 text-xs font-bold">AI</span>
              </div>
            </div>
            
            {/* Hero Title */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-none">
              <span className="block text-white mb-4">
                Learn. Analyze.
              </span>
              <span className="block bg-gradient-to-r from-primary-300 via-primary-400 to-primary-500 bg-clip-text text-transparent">
                Acquire Businesses
              </span>
              <span className="block text-primary-100">
                with AI Guidance
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-secondary-300 mb-16 max-w-4xl mx-auto leading-relaxed">
              Where new entrepreneurs learn through AI-powered business analysis, and experienced owners find the right successors. 
              <span className="text-primary-300 font-semibold">Educated. Verified. Seamless.</span>
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
              <Link href="/education">
                <Button 
                  variant="primary" 
                  size="xl"
                  className="shadow-2xl hover:shadow-3xl"
                  icon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  }
                >
                  Start AI Learning
                </Button>
              </Link>
              
              <Link href="/listings">
                <Button 
                  variant="outline" 
                  size="xl"
                  className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                >
                  Browse Businesses
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-500">
                <div className="w-4 h-4 bg-gradient-to-r from-primary-400 to-primary-500 rounded-full animate-pulse mb-4"></div>
                <div className="text-4xl font-black text-primary-300 mb-2">250+</div>
                <span className="text-secondary-300 font-medium">Businesses Available</span>
              </div>
              
              <div className="flex flex-col items-center p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-500">
                <div className="w-4 h-4 bg-gradient-to-r from-success-400 to-success-500 rounded-full animate-pulse mb-4" style={{ animationDelay: '0.5s' }}></div>
                <div className="text-4xl font-black text-success-300 mb-2">AI</div>
                <span className="text-secondary-300 font-medium">Document Analysis</span>
              </div>
              
              <div className="flex flex-col items-center p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-500">
                <div className="w-4 h-4 bg-gradient-to-r from-warning-400 to-warning-500 rounded-full animate-pulse mb-4" style={{ animationDelay: '1s' }}></div>
                <div className="text-4xl font-black text-warning-300 mb-2">95%</div>
                <span className="text-secondary-300 font-medium">Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Learning Hub */}
      <section className="py-24 bg-gradient-to-br from-secondary-50 to-primary-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-secondary-900 mb-6">
              AI-Powered <span className="text-primary-600">Learning Hub</span>
            </h2>
            <p className="text-xl text-secondary-600 max-w-4xl mx-auto leading-relaxed">
              Learn business acquisition through AI analysis of real documents, financial statements, and market data. 
              <span className="text-primary-600 font-semibold">Get smart. Get prepared.</span>
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: 'AI Document Analysis', 
                icon: '🤖', 
                description: 'Upload and analyze business documents with AI guidance',
                color: 'from-primary-500 to-primary-600'
              },
              { 
                name: 'Financial Model Training', 
                icon: '📊', 
                description: 'Learn to read financials with interactive AI tutoring',
                color: 'from-success-500 to-success-600'
              },
              { 
                name: 'Market Research Tools', 
                icon: '🔍', 
                description: 'AI-powered market analysis and competitor research',
                color: 'from-warning-500 to-warning-600'
              }
            ].map((feature) => (
              <Card 
                key={feature.name} 
                className="group cursor-pointer hover:shadow-xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm"
              >
                <div className="p-8 text-center">
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-500">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-xl text-secondary-900 mb-4 group-hover:text-primary-700 transition-colors">
                    {feature.name}
                  </h3>
                  <p className="text-secondary-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className={`h-1 bg-gradient-to-r ${feature.color} rounded-full mx-auto w-16 group-hover:w-24 transition-all duration-500`} />
                </div>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/education">
              <Button variant="primary" size="lg" className="shadow-lg hover:shadow-xl">
                Explore AI Learning Hub
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Business Succession */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-black text-secondary-900 mb-6">
                Seamless <span className="text-primary-600">Business Succession</span>
              </h2>
              <p className="text-xl text-secondary-600 mb-8 leading-relaxed">
                For experienced business owners whose families aren&apos;t interested in taking over. Find the right successor who understands your business and values your legacy.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex-shrink-0 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary-900 mb-2">AI-Matched Buyers</h4>
                    <p className="text-secondary-600">Connect with pre-qualified buyers who match your business type and values.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-success-500 to-success-600 rounded-lg flex-shrink-0 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary-900 mb-2">Legacy Protection</h4>
                    <p className="text-secondary-600">Ensure your business continues with someone who respects what you&apos;ve built.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-warning-500 to-warning-600 rounded-lg flex-shrink-0 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary-900 mb-2">Smooth Transition</h4>
                    <p className="text-secondary-600">Guided transition process with legal and financial support.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <Link href="/succession">
                  <Button variant="primary" size="lg" className="shadow-lg hover:shadow-xl">
                    Plan Your Succession
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary-50 to-success-50 rounded-3xl p-8 flex items-center justify-center">
                <div className="text-8xl opacity-80">🏢</div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-xl">
                <span className="text-white text-3xl">→</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-24 bg-gradient-to-br from-secondary-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-secondary-900 mb-6">
              Featured <span className="text-primary-600">Opportunities</span>
            </h2>
            <p className="text-xl text-secondary-600 max-w-4xl mx-auto leading-relaxed">
              Explore verified businesses ready for succession. Each listing includes AI-generated insights and learning opportunities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredListings.map((listing) => (
              <Link key={listing.id} href={`/listings/${listing.id}`}>
                <Card className="group cursor-pointer hover:shadow-xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm">
                  <div className="relative">
                    {/* Business Icon */}
                    <div className="aspect-video bg-gradient-to-br from-primary-50 via-white to-success-50 rounded-t-2xl overflow-hidden mb-6 relative">
                      <div className="w-full h-full flex items-center justify-center relative">
                        <div className="text-6xl opacity-90 group-hover:scale-110 transition-all duration-500">
                          {listing.industry === 'Healthcare' ? '🏥' : 
                           listing.industry === 'Pet Services' ? '🐕' : 
                           listing.industry === 'Home Services' ? '🔧' : 
                           listing.industry === 'Automotive' ? '🚗' : '💼'}
                        </div>
                        
                        {/* Verification Badge */}
                        <div className="absolute top-4 left-4">
                          {listing.verified && (
                            <Badge variant="success" size="sm">
                              ✓ Verified
                            </Badge>
                          )}
                        </div>
                        
                        {/* AI Badge */}
                        <div className="absolute top-4 right-4">
                          <Badge variant="primary" size="sm">
                            AI Ready
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-xl text-secondary-900 group-hover:text-primary-700 transition-colors mb-2">
                            {listing.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-secondary-600">
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {listing.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                              {listing.industry}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-secondary-100">
                        <div className="text-2xl font-bold text-secondary-900">
                          {formatCurrency(listing.askingPrice)}
                        </div>
                        <Button variant="primary" size="sm">
                          Analyze with AI
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link href="/listings">
              <Button variant="outline" size="lg" className="shadow-md hover:shadow-lg">
                View All Businesses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700" />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        
        <div className="relative max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-5xl font-bold mb-6 leading-tight">
            Ready to Start Your 
            <span className="block text-primary-200">Business Journey?</span>
          </h2>
          
          <p className="text-xl text-primary-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join the next generation of entrepreneurs learning through AI, or find the perfect successor for your business legacy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/register">
              <Button 
                variant="secondary" 
                size="xl"
                className="shadow-2xl hover:shadow-3xl"
              >
                Start Learning Today
              </Button>
            </Link>
            
            <Link href="/succession">
              <Button 
                variant="outline" 
                size="xl"
                className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                Plan Your Exit
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 text-primary-100">
              <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse"></div>
              <span className="font-medium">AI-Powered Learning</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-primary-100">
              <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <span className="font-medium">Verified Businesses</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-primary-100">
              <div className="w-2 h-2 bg-warning-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <span className="font-medium">Expert Guidance</span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}