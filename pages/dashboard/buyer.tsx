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
import { useListing } from '@/context/ListingContext';
import { mockCourses } from '@/lib/mockData';

export default function BuyerDashboard() {
  const { user, isAuthenticated } = useAuth();
  const { getFavoriteListings } = useListing();
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/dashboard/buyer');
      return;
    }
    if (user?.userType !== 'BUYER') {
      router.push('/');
      return;
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.userType !== 'BUYER') {
    return null;
  }

  const favoriteListings = getFavoriteListings();
  const recommendedCourses = mockCourses.slice(0, 3);

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
              Here&apos;s your business acquisition dashboard
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-blue-600">{favoriteListings.length}</div>
                <div className="text-sm text-gray-600">Saved Businesses</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-green-600">5</div>
                <div className="text-sm text-gray-600">Inquiries Sent</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-purple-600">2</div>
                <div className="text-sm text-gray-600">Courses Completed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-orange-600">85%</div>
                <div className="text-sm text-gray-600">Profile Complete</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Saved Businesses */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Saved Businesses</h2>
                    <Link href="/listings">
                      <Button variant="ghost" size="sm">View All</Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  {favoriteListings.length > 0 ? (
                    <div className="space-y-4">
                      {favoriteListings.slice(0, 3).map((listing) => (
                        <div key={listing.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h3 className="font-semibold text-gray-900">{listing.title}</h3>
                            <p className="text-sm text-gray-600">{listing.location} • {listing.industry}</p>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="text-sm text-gray-500">
                                {formatCurrency(listing.askingPrice)}
                              </span>
                              <Badge variant={listing.verified ? 'success' : 'secondary'} size="sm">
                                {listing.verified ? 'Verified' : 'Pending'}
                              </Badge>
                            </div>
                          </div>
                          <Link href={`/listings/${listing.id}`}>
                            <Button size="sm">View</Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600 mb-4">No saved businesses yet</p>
                      <Link href="/listings">
                        <Button>Browse Businesses</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Recent Activity</h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <div>
                        <p className="text-sm text-gray-900">You saved &quot;Modern Dental Practice&quot;</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <div>
                        <p className="text-sm text-gray-900">Inquiry sent to HVAC business seller</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <div>
                        <p className="text-sm text-gray-900">Completed &quot;Business Acquisition Fundamentals&quot;</p>
                        <p className="text-xs text-gray-500">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Profile Completion */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Complete Your Profile</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Basic Info</span>
                      <Badge variant="success" size="sm">✓</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Budget Range</span>
                      <Badge variant="success" size="sm">✓</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Industry Preferences</span>
                      <Badge variant="warning" size="sm">Pending</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Experience Level</span>
                      <Badge variant="warning" size="sm">Pending</Badge>
                    </div>
                    <Button variant="ghost" size="sm" className="w-full mt-3">
                      Complete Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recommended Courses */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Recommended Learning</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recommendedCourses.map((course) => (
                      <div key={course.id} className="border border-gray-200 rounded-lg p-3">
                        <h4 className="font-medium text-sm text-gray-900">{course.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{course.duration}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-semibold text-green-600">
                            {formatCurrency(course.price)}
                          </span>
                          <Button size="sm" variant="ghost">
                            Start
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Link href="/education">
                      <Button variant="ghost" size="sm" className="w-full">
                        View All Courses
                      </Button>
                    </Link>
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
                    <Link href="/listings">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        Browse New Listings
                      </Button>
                    </Link>
                    <Link href="/calculator">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        ROI Calculator
                      </Button>
                    </Link>
                    <Link href="/mentorship">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        Find a Mentor
                      </Button>
                    </Link>
                    <Link href="/community">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        Join Community
                      </Button>
                    </Link>
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