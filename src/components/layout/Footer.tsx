import React, { useState } from 'react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
    alert('Thank you for subscribing!');
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Stay Updated!</h3>
              <p className="text-blue-100">
                Subscribe to our newsletter and get the latest courses, updates, and exclusive offers.
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="text-2xl font-bold text-white">Edura</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Empowering learners worldwide with quality education. Join thousands of students and teachers in our growing learning community.
            </p>
            
            {/* Social Media Links */}
            <div>
              <h4 className="text-white font-semibold mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-400 hover:text-white transition-all duration-300"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-700 hover:text-white transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-all duration-300"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all duration-300"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  About Us
                </a>
              </li>
              <li>
                <a href="#careers" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Careers
                </a>
              </li>
              <li>
                <a href="#blog" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Blog
                </a>
              </li>
              <li>
                <a href="#press" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Press Kit
                </a>
              </li>
              <li>
                <a href="#partners" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Partners
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#courses" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  All Courses
                </a>
              </li>
              <li>
                <a href="#instructors" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Become Instructor
                </a>
              </li>
              <li>
                <a href="#help" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Help Center
                </a>
              </li>
              <li>
                <a href="#tutorials" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Tutorials
                </a>
              </li>
              <li>
                <a href="#api" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  API Docs
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  FAQs
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#sitemap" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Sitemap
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Email Us</h4>
                <a href="mailto:support@edura.com" className="text-gray-400 hover:text-blue-500 transition-colors">
                  support@edura.com
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Call Us</h4>
                <a href="tel:+1234567890" className="text-gray-400 hover:text-green-500 transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Visit Us</h4>
                <p className="text-gray-400">
                  123 Education St, Learning City, ED 12345
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} <span className="text-white font-semibold">Edura</span>. All rights reserved.
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="#privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy
              </a>
              <span className="text-gray-700">•</span>
              <a href="#terms" className="text-gray-400 hover:text-white transition-colors">
                Terms
              </a>
              <span className="text-gray-700">•</span>
              <a href="#cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookies
              </a>
              <span className="text-gray-700">•</span>
              <a href="#accessibility" className="text-gray-400 hover:text-white transition-colors">
                Accessibility
              </a>
            </div>

            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>Made with</span>
              <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span>for learners</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};


