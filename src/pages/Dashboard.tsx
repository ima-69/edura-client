import React from 'react';
import { useAppSelector } from '../store/hooks';
import { DashboardNavbar } from '../components/layout/DashboardNavbar';
import { Card } from '../components/ui';

export const Dashboard: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const studentStats = [
    { label: 'Enrolled Courses', value: '5', icon: '📚', color: 'blue' },
    { label: 'Completed', value: '2', icon: '✅', color: 'green' },
    { label: 'In Progress', value: '3', icon: '⏳', color: 'yellow' },
    { label: 'Certificates', value: '2', icon: '🏆', color: 'purple' },
  ];

  const teacherStats = [
    { label: 'Active Classes', value: '8', icon: '🎓', color: 'purple' },
    { label: 'Students', value: '124', icon: '👥', color: 'blue' },
    { label: 'Assignments', value: '15', icon: '📝', color: 'orange' },
    { label: 'Pending Reviews', value: '7', icon: '⏰', color: 'red' },
  ];

  const adminStats = [
    { label: 'Total Users', value: '1,234', icon: '👤', color: 'blue' },
    { label: 'Active Courses', value: '56', icon: '📚', color: 'green' },
    { label: 'Teachers', value: '42', icon: '👨‍🏫', color: 'purple' },
    { label: 'Revenue', value: '$45K', icon: '💰', color: 'yellow' },
  ];

  const getStatsForRole = () => {
    switch (user?.role) {
      case 'student':
        return studentStats;
      case 'teacher':
        return teacherStats;
      case 'admin':
        return adminStats;
      default:
        return studentStats;
    }
  };

  const recentActivities = [
    { title: 'Completed React Basics Module', time: '2 hours ago', icon: '✅' },
    { title: 'New assignment posted', time: '5 hours ago', icon: '📝' },
    { title: 'Certificate earned: JavaScript Fundamentals', time: '1 day ago', icon: '🏆' },
    { title: 'Joined Advanced TypeScript course', time: '2 days ago', icon: '📚' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {getGreeting()}, {user?.first_name}! 👋
          </h1>
          <p className="text-gray-600">
            Welcome back to your {user?.role} dashboard. Here's what's happening today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {getStatsForRole().map((stat, index) => (
            <Card key={index} className="p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="text-4xl">{stat.icon}</div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Activity */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0">
                    <span className="text-2xl">{activity.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions based on role */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                {user?.role === 'student' && (
                  <>
                    <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors">
                      <div className="text-2xl mb-2">📖</div>
                      <div className="font-semibold text-gray-900">Browse Courses</div>
                      <div className="text-xs text-gray-600">Find new courses</div>
                    </button>
                    <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors">
                      <div className="text-2xl mb-2">📝</div>
                      <div className="font-semibold text-gray-900">View Assignments</div>
                      <div className="text-xs text-gray-600">Check pending work</div>
                    </button>
                  </>
                )}
                {user?.role === 'teacher' && (
                  <>
                    <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors">
                      <div className="text-2xl mb-2">➕</div>
                      <div className="font-semibold text-gray-900">Create Class</div>
                      <div className="text-xs text-gray-600">Start a new class</div>
                    </button>
                    <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors">
                      <div className="text-2xl mb-2">👥</div>
                      <div className="font-semibold text-gray-900">View Students</div>
                      <div className="text-xs text-gray-600">Manage students</div>
                    </button>
                  </>
                )}
                {user?.role === 'admin' && (
                  <>
                    <button className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors">
                      <div className="text-2xl mb-2">👤</div>
                      <div className="font-semibold text-gray-900">Manage Users</div>
                      <div className="text-xs text-gray-600">User management</div>
                    </button>
                    <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors">
                      <div className="text-2xl mb-2">⚙️</div>
                      <div className="font-semibold text-gray-900">System Settings</div>
                      <div className="text-xs text-gray-600">Configure system</div>
                    </button>
                  </>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="p-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                  {user?.first_name?.[0]}{user?.last_name?.[0]}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">
                  {user?.first_name} {user?.last_name}
                </h3>
                <p className="text-sm text-gray-600 mb-1">{user?.email}</p>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold uppercase">
                  {user?.role}
                </span>
              </div>
            </Card>

            {/* Upcoming Events */}
            <Card className="p-6">
              <h3 className="font-bold text-gray-900 mb-4">Upcoming Events</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-blue-600">15</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">React Workshop</p>
                    <p className="text-xs text-gray-500">Dec 15, 2:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-purple-600">20</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Assignment Due</p>
                    <p className="text-xs text-gray-500">Dec 20, 11:59 PM</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

