import React from 'react';
import { Button } from '../ui';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 pb-32 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              🎓 Welcome to the Future of Learning
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Master New Skills
              <span className="text-blue-600"> Anytime,</span>
              <br />
              <span className="text-blue-600">Anywhere</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join thousands of learners worldwide. Access expert-led courses, earn certificates, and advance your career with our comprehensive learning platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="primary" size="lg" className="shadow-lg">
                Start Learning Free
              </Button>
              <Button variant="outline" size="lg">
                Explore Courses
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Active Students</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Expert Courses</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-gray-900">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image Placeholder */}
          <div className="relative">
            <div className="relative z-10">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                  <svg className="w-32 h-32 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Course Progress</span>
                    <span className="text-sm font-semibold text-blue-600">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full shadow-lg font-semibold text-sm">
                ⭐ 4.9/5 Rating
              </div>
              <div className="absolute -bottom-4 -left-4 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg font-semibold text-sm">
                ✓ Certified Courses
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

