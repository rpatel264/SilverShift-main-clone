import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import CardHeader from '@/components/ui/CardHeader';
import CardContent from '@/components/ui/CardContent';
import Badge from '@/components/ui/Badge';
import { formatCurrency, formatDate } from '@/lib/utils';
import { useListing } from '@/context/ListingContext';
import { useAuth } from '@/context/AuthContext';

export default function ListingDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { getListingById, favorites, toggleFavorite } = useListing();
  const { user, isAuthenticated } = useAuth();
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [showInquiryForm, setShowInquiryForm] = useState(false);

  const listing = getListingById(id as string);

  if (!listing) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Business Not Found</h1>
          <p className="mt-2 text-gray-600">The business listing you&apos;re looking for doesn&apos;t exist.</p>
          <Button className="mt-4" onClick={() => router.push('/listings')}>
            Browse All Businesses
          </Button>
        </div>
      </Layout>
    );
  }

  const handleInquiry = () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (user?.userType !== 'BUYER') {
      alert('Only buyers can send inquiries');
      return;
    }

    console.log('Sending inquiry:', inquiryMessage);
    setInquiryMessage('');
    setShowInquiryForm(false);
    alert('Inquiry sent successfully!');
  };

  const isFavorited = favorites.includes(listing.id);

  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <Badge variant={listing.verified ? 'success' : 'secondary'}>
                    {listing.verified ? 'Verified' : 'Pending'}
                  </Badge>
                  {listing.confidenceScore && (
                    <Badge variant="info">
                      Trust Score: {listing.confidenceScore}/100
                    </Badge>
                  )}
                  <span className="text-sm text-gray-500">
                    Listed {formatDate(listing.createdAt)}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">{listing.title}</h1>
                <p className="text-lg text-gray-600 mt-1">{listing.location}</p>
              </div>
              
              <div className="flex items-center space-x-3">
                {isAuthenticated && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(listing.id)}
                    className={isFavorited ? 'text-red-500' : 'text-gray-400'}
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    {isFavorited ? 'Favorited' : 'Add to Favorites'}
                  </Button>
                )}
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(listing.askingPrice)}
                  </div>
                  <div className="text-sm text-gray-500">Asking Price</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Business Overview</h2>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{listing.description}</p>
                </CardContent>
              </Card>

              {/* Key Metrics */}
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Key Business Metrics</h2>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm text-gray-500">Annual Revenue</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {formatCurrency(listing.annualRevenue)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Asking Price</div>
                      <div className="text-2xl font-bold text-green-600">
                        {formatCurrency(listing.askingPrice)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Year Established</div>
                      <div className="text-lg font-semibold">{listing.yearEstablished}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Employees</div>
                      <div className="text-lg font-semibold">
                        {listing.employeeCount || 'Not specified'}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Industry</div>
                      <div className="text-lg font-semibold">{listing.industry}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Location</div>
                      <div className="text-lg font-semibold">{listing.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Financial Information */}
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Financial Performance</h2>
                  <p className="text-sm text-gray-600">Last 3 years performance data</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Revenue Trend */}
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-2">Revenue Trend</div>
                      <div className="grid grid-cols-3 gap-4">
                        {listing.financials.revenues.map((revenue, index) => (
                          <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="text-sm text-gray-500">
                              Year {new Date().getFullYear() - 2 + index}
                            </div>
                            <div className="text-lg font-semibold">
                              {formatCurrency(revenue)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Profit Trend */}
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-2">Profit Trend</div>
                      <div className="grid grid-cols-3 gap-4">
                        {listing.financials.profits.map((profit, index) => (
                          <div key={index} className="text-center p-3 bg-green-50 rounded-lg">
                            <div className="text-sm text-gray-500">
                              Year {new Date().getFullYear() - 2 + index}
                            </div>
                            <div className="text-lg font-semibold text-green-600">
                              {formatCurrency(profit)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Additional Metrics */}
                    {(listing.financials.ebitda || listing.financials.cashFlow || listing.financials.grossMargin) && (
                      <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                        {listing.financials.ebitda && (
                          <div className="text-center">
                            <div className="text-sm text-gray-500">EBITDA</div>
                            <div className="text-lg font-semibold">
                              {formatCurrency(listing.financials.ebitda)}
                            </div>
                          </div>
                        )}
                        {listing.financials.cashFlow && (
                          <div className="text-center">
                            <div className="text-sm text-gray-500">Cash Flow</div>
                            <div className="text-lg font-semibold">
                              {formatCurrency(listing.financials.cashFlow)}
                            </div>
                          </div>
                        )}
                        {listing.financials.grossMargin && (
                          <div className="text-center">
                            <div className="text-sm text-gray-500">Gross Margin</div>
                            <div className="text-lg font-semibold">
                              {(listing.financials.grossMargin * 100).toFixed(1)}%
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Contact Seller */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Interested in this business?</h3>
                </CardHeader>
                <CardContent>
                  {!showInquiryForm ? (
                    <div className="space-y-3">
                      <Button 
                        className="w-full" 
                        onClick={() => setShowInquiryForm(true)}
                        disabled={!isAuthenticated || user?.userType !== 'BUYER'}
                      >
                        Send Inquiry
                      </Button>
                      {!isAuthenticated && (
                        <p className="text-xs text-gray-500 text-center">
                          <Button variant="ghost" size="sm" onClick={() => router.push('/login')}>
                            Sign in
                          </Button> to contact seller
                        </p>
                      )}
                      {isAuthenticated && user?.userType !== 'BUYER' && (
                        <p className="text-xs text-gray-500 text-center">
                          Only buyers can send inquiries
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Message
                        </label>
                        <textarea
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={4}
                          placeholder="I'm interested in learning more about this business..."
                          value={inquiryMessage}
                          onChange={(e) => setInquiryMessage(e.target.value)}
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          onClick={handleInquiry}
                          disabled={!inquiryMessage.trim()}
                        >
                          Send
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setShowInquiryForm(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Business Stats */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Listing Activity</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Views:</span>
                      <span className="font-semibold">{listing.viewCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Favorites:</span>
                      <span className="font-semibold">{listing.favoriteCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Inquiries:</span>
                      <span className="font-semibold">{listing.inquiryCount}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Facts */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Quick Facts</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Business Age:</span>
                      <span className="font-semibold">
                        {new Date().getFullYear() - listing.yearEstablished} years
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Revenue Multiple:</span>
                      <span className="font-semibold">
                        {(listing.askingPrice / listing.annualRevenue).toFixed(1)}x
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <Badge variant="success" size="sm">
                        {listing.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}