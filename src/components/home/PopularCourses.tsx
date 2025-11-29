import React from 'react';
import { Card, Button } from '../ui';

const courses = [
  {
    id: 1,
    title: 'Web Development Bootcamp',
    instructor: 'John Smith',
    category: 'Development',
    level: 'Beginner',
    students: 12450,
    rating: 4.8,
    price: 49.99,
    image: '🌐',
    duration: '40 hours',
  },
  {
    id: 2,
    title: 'Data Science & Machine Learning',
    instructor: 'Sarah Johnson',
    category: 'Data Science',
    level: 'Intermediate',
    students: 8920,
    rating: 4.9,
    price: 79.99,
    image: '📊',
    duration: '60 hours',
  },
  {
    id: 3,
    title: 'Digital Marketing Mastery',
    instructor: 'Mike Chen',
    category: 'Marketing',
    level: 'Beginner',
    students: 15230,
    rating: 4.7,
    price: 39.99,
    image: '📱',
    duration: '30 hours',
  },
  {
    id: 4,
    title: 'UI/UX Design Fundamentals',
    instructor: 'Emily Davis',
    category: 'Design',
    level: 'Beginner',
    students: 9850,
    rating: 4.8,
    price: 59.99,
    image: '🎨',
    duration: '35 hours',
  },
  {
    id: 5,
    title: 'Python Programming Complete',
    instructor: 'David Wilson',
    category: 'Programming',
    level: 'Beginner',
    students: 18900,
    rating: 4.9,
    price: 44.99,
    image: '🐍',
    duration: '50 hours',
  },
  {
    id: 6,
    title: 'Business Strategy & Growth',
    instructor: 'Lisa Anderson',
    category: 'Business',
    level: 'Advanced',
    students: 6740,
    rating: 4.7,
    price: 89.99,
    image: '💼',
    duration: '45 hours',
  },
];

export const PopularCourses: React.FC = () => {
  return (
    <section id="courses" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Popular Courses
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our most popular courses and start learning today
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card key={course.id} hover className="flex flex-col">
              {/* Course Image */}
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-6xl">
                {course.image}
              </div>

              {/* Course Content */}
              <div className="p-6 flex-1 flex flex-col">
                {/* Category & Level */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                    {course.category}
                  </span>
                  <span className="text-xs text-gray-600">{course.level}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {course.title}
                </h3>

                {/* Instructor */}
                <p className="text-sm text-gray-600 mb-4">By {course.instructor}</p>

                {/* Stats */}
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {course.rating}
                  </div>
                  <div>•</div>
                  <div>{course.students.toLocaleString()} students</div>
                </div>

                {/* Duration */}
                <div className="text-sm text-gray-600 mb-4">
                  <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {course.duration}
                </div>

                {/* Price & CTA */}
                <div className="mt-auto pt-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="text-2xl font-bold text-gray-900">
                    ${course.price}
                  </div>
                  <Button variant="primary" size="sm">
                    Enroll Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
};


