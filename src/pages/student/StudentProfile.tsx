import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setCurrentPage } from '../../store/slices/uiSlice';
import { Card, Button } from '../../components/ui';

type TabType = 'overview' | 'courses' | 'exams' | 'progress' | 'settings';

export const StudentProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const handleBack = () => {
    dispatch(setCurrentPage('home'));
  };

  const tabs = [
    { id: 'overview' as TabType, name: 'Overview', icon: '📊' },
    { id: 'courses' as TabType, name: 'My Courses', icon: '📚' },
    { id: 'exams' as TabType, name: 'Exams', icon: '📝' },
    { id: 'progress' as TabType, name: 'Progress', icon: '📈' },
    { id: 'settings' as TabType, name: 'Settings', icon: '⚙️' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'courses':
        return <CoursesTab />;
      case 'exams':
        return <ExamsTab />;
      case 'progress':
        return <ProgressTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back to Home</span>
          </button>

          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
              {user?.first_name?.[0]}{user?.last_name?.[0]}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {user?.first_name} {user?.last_name}
              </h1>
              <p className="text-gray-600">Student Dashboard</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </div>
    </div>
  );
};

// Overview Tab Component
const OverviewTab: React.FC = () => {
  const stats = [
    { label: 'Enrolled Courses', value: '8', icon: '📚', color: 'bg-blue-500' },
    { label: 'Completed Courses', value: '5', icon: '✅', color: 'bg-green-500' },
    { label: 'Pending Exams', value: '3', icon: '📝', color: 'bg-orange-500' },
    { label: 'Average Score', value: '85%', icon: '⭐', color: 'bg-yellow-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center text-2xl`}>
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Exams</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-semibold">📝</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">React Fundamentals - Final Exam</p>
                    <p className="text-xs text-gray-500">Due: Dec 25, 2024</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost">View</Button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Achievements</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 font-semibold">🏆</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Completed TypeScript Basics</p>
                  <p className="text-xs text-gray-500">Score: 92% • 2 days ago</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

// Courses Tab Component
const CoursesTab: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'active' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((course) => (
          <Card key={course} className="p-6 hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-white text-4xl">📚</span>
            </div>
            <div className="mb-4">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                In Progress
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">React Fundamentals {course}</h3>
            <p className="text-sm text-gray-600 mb-4">Master the basics of React and build modern web applications.</p>
            
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span>👤 Prof. John Doe</span>
              <span>⏱️ 12 hours</span>
            </div>
            
            <Button variant="primary" size="sm" className="w-full">Continue Learning</Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Exams Tab Component
const ExamsTab: React.FC = () => {
  const [tab, setTab] = useState<'upcoming' | 'completed'>('upcoming');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Exams</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setTab('upcoming')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === 'upcoming' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setTab('completed')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {tab === 'upcoming' ? (
        <div className="grid grid-cols-1 gap-4">
          {[1, 2, 3].map((exam) => (
            <Card key={exam} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                      Upcoming
                    </span>
                    <h3 className="text-lg font-bold text-gray-900">React Fundamentals - Final Exam</h3>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>📚 React Fundamentals</span>
                    <span>⏱️ 60 minutes</span>
                    <span>📊 100 marks</span>
                    <span>📅 Dec 25, 2024 at 10:00 AM</span>
                  </div>
                </div>
                <Button size="sm" variant="primary">Start Exam</Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {[1, 2, 3, 4].map((exam) => (
            <Card key={exam} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      Completed
                    </span>
                    <h3 className="text-lg font-bold text-gray-900">TypeScript Basics - Mid Term</h3>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>📚 TypeScript Basics</span>
                    <span>📊 Score: 85/100</span>
                    <span>⭐ Grade: B+</span>
                    <span>📅 Completed: Dec 10, 2024</span>
                  </div>
                </div>
                <Button size="sm" variant="ghost">View Results</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

// Progress Tab Component
const ProgressTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Learning Progress</h2>

      {/* Overall Progress */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Overall Progress</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Course Completion</span>
              <span>62.5%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-blue-600 h-3 rounded-full" style={{ width: '62.5%' }}></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-3xl font-bold text-blue-600">5</p>
              <p className="text-sm text-gray-600">Courses Completed</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-3xl font-bold text-green-600">28</p>
              <p className="text-sm text-gray-600">Exams Passed</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-3xl font-bold text-yellow-600">156</p>
              <p className="text-sm text-gray-600">Hours Learned</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Course-wise Progress */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Course Progress</h3>
        <div className="space-y-4">
          {[
            { name: 'React Fundamentals', progress: 85, color: 'blue' },
            { name: 'TypeScript Advanced', progress: 65, color: 'purple' },
            { name: 'Node.js Basics', progress: 45, color: 'green' },
            { name: 'Database Design', progress: 30, color: 'orange' },
          ].map((course, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm text-gray-900 mb-2">
                <span className="font-medium">{course.name}</span>
                <span className="font-semibold">{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`bg-${course.color}-600 h-2 rounded-full`} 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Performance Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Exam Performance</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Excellent', 'Good', 'Average', 'Needs Improvement'].map((grade, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">{[12, 8, 5, 3][index]}</p>
              <p className="text-sm text-gray-600">{grade}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

// Settings Tab Component
const SettingsTab: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>

      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Personal Information</h3>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                defaultValue={user?.first_name}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                defaultValue={user?.last_name}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              defaultValue={user?.email}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
            <input
              type="tel"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <Button type="submit" variant="primary">Save Changes</Button>
        </form>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Change Password</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <Button type="submit" variant="primary">Update Password</Button>
        </form>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Notifications</h3>
        <div className="space-y-4">
          <label className="flex items-center">
            <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            <span className="ml-3 text-sm text-gray-700">Email notifications for new courses</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            <span className="ml-3 text-sm text-gray-700">Email notifications for exam reminders</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            <span className="ml-3 text-sm text-gray-700">SMS notifications</span>
          </label>
        </div>
      </Card>
    </div>
  );
};

