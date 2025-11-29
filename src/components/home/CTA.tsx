import React from 'react';
import { Button } from '../ui';

export const CTA: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students already learning on Edura. Get started today with our free trial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Start Free Trial
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white/10"
            >
              Contact Sales
            </Button>
          </div>
          <p className="mt-6 text-blue-100 text-sm">
            No credit card required • 7-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

