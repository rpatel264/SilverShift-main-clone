import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import CardHeader from '@/components/ui/CardHeader';
import CardContent from '@/components/ui/CardContent';
import Badge from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { mockListings } from '@/lib/mockData';

export default function SellerDashboard() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/dashboard/seller');
      return;
    }
    if (user?.userType !== 'SELLER') {
      router.push('/');
      return;
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.userType !== 'SELLER') {
    return null;
  }

  const myListings = mockListings.filter(listing => listing.sellerId === user.id);
  const totalViews = myListings.reduce((sum, listing) => sum + listing.viewCount, 0);
  const totalInquiries = myListings.reduce((sum, listing) => sum + listing.inquiryCount, 0);

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user.name}!
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your business listings and connect with buyers
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-blue-600">{myListings.length}</div>
                <div className="text-sm text-gray-600">Active Listings</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-green-600">{totalViews}</div>
                <div className="text-sm text-gray-600">Total Views</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-purple-600">{totalInquiries}</div>
                <div className="text-sm text-gray-600">Total Inquiries</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {myListings.filter(l => l.verified).length}
                </div>
                <div className="text-sm text-gray-600">Verified Listings</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* My Listings */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">My Listings</h2>
                    <Button>
                      Create New Listing
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {myListings.length > 0 ? (
                    <div className="space-y-4">
                      {myListings.map((listing) => (
                        <div key={listing.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900">{listing.title}</h3>
                              <p className="text-sm text-gray-600 mt-1">{listing.location} • {listing.industry}</p>
                              <div className="flex items-center space-x-4 mt-2">
                                <span className="text-lg font-semibold text-green-600">
                                  {formatCurrency(listing.askingPrice)}
                                </span>
                                <Badge 
                                  variant={listing.status === 'PUBLISHED' ? 'success' : 'warning'} 
                                  size="sm"
                                >
                                  {listing.status}
                                </Badge>
                                <Badge variant={listing.verified ? 'success' : 'secondary'} size="sm">
                                  {listing.verified ? 'Verified' : 'Pending'}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Link href={`/listings/${listing.id}`}>
                                <Button size="sm" variant="ghost">View</Button>
                              </Link>
                              <Button size="sm" variant="ghost">Edit</Button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
                            <div className="text-center">
                              <div className="text-lg font-semibold text-blue-600">{listing.viewCount}</div>
                              <div className="text-xs text-gray-500">Views</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-semibold text-purple-600">{listing.favoriteCount}</div>
                              <div className="text-xs text-gray-500">Favorites</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-semibold text-green-600">{listing.inquiryCount}</div>
                              <div className="text-xs text-gray-500">Inquiries</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-gray-400 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No listings yet</h3>
                      <p className="text-gray-600 mb-4">
                        Create your first business listing to start connecting with buyers
                      </p>
                      <Button>
                        Create Your First Listing
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Inquiries */}
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Recent Inquiries</h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">John Smith</h4>
                        <p className="text-sm text-gray-600">Interested in &quot;HVAC Service Company&quot;</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                      <Button size="sm">Reply</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Emily Johnson</h4>
                        <p className="text-sm text-gray-600">Asked about &quot;Dental Practice&quot;</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                      <Button size="sm">Reply</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Michael Brown</h4>
                        <p className="text-sm text-gray-600">Inquiry about &quot;Pet Grooming Salon&quot;</p>
                        <p className="text-xs text-gray-500">3 days ago</p>
                      </div>
                      <Button size="sm" variant="ghost">View</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Performance Summary */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">This Month</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">New Views</span>
                      <span className="font-semibold text-green-600">+127</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">New Favorites</span>
                      <span className="font-semibold text-blue-600">+23</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">New Inquiries</span>
                      <span className="font-semibold text-purple-600">+8</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Response Rate</span>
                      <span className="font-semibold">95%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Listing Tips */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Improve Your Listings</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">Add More Photos</p>
                        <p className="text-xs text-gray-600">Listings with 5+ photos get 3x more views</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">Complete Financial Data</p>
                        <p className="text-xs text-gray-600">Verified financials increase trust scores</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">Respond Quickly</p>
                        <p className="text-xs text-gray-600">Fast responses lead to more offers</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Quick Actions</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      Create New Listing
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      Business Valuation
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      Marketing Tips
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      Legal Resources
                    </Button>
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