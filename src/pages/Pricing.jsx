import { useState } from 'react';
import { Link } from 'react-router-dom';
import LandingHeader from '../components/ui/LandingHeader';

function Pricing() {
  const currentYear = 2025;
  const [billingCycle, setBillingCycle] = useState('annual'); // 'annual' or 'monthly'
  
  const plans = [
    {
      name: 'Starter',
      description: 'For small businesses getting started',
      monthlyPrice: 'RM199',
      annualPrice: 'RM159',
      features: [
        'Up to 25 employees',
        'Core HR management',
        'Attendance tracking',
        'Basic leave management',
        'Email support',
        'Malaysian holiday calendar',
        'Standard reports',
        'Mobile app access'
      ],
      popular: false,
      cta: 'Start Free Trial',
      ctaLink: '/signup?plan=starter'
    },
    {
      name: 'Professional',
      description: 'For growing businesses',
      monthlyPrice: 'RM399',
      annualPrice: 'RM319',
      features: [
        'Up to 100 employees',
        'All Starter features',
        'Advanced analytics',
        'AI HR Assistant',
        'Priority support',
        'Custom workflows',
        'API access',
        'Advanced security features'
      ],
      popular: true,
      cta: 'Start Free Trial',
      ctaLink: '/signup?plan=professional'
    },
    {
      name: 'Enterprise',
      description: 'For large organizations',
      monthlyPrice: 'Custom',
      annualPrice: 'Custom',
      features: [
        'Unlimited employees',
        'All Professional features',
        'Custom integrations',
        'Dedicated account manager',
        '24/7 premium support',
        'On-premise deployment option',
        'Custom AI training',
        'SLA guarantees'
      ],
      popular: false,
      cta: 'Contact Sales',
      ctaLink: '/contact-sales'
    }
  ];
  
  const faqs = [
    {
      question: 'Do you offer a free trial?',
      answer: 'Yes, we offer a 14-day free trial for all our plans. No credit card required to start your trial.'
    },
    {
      question: 'Can I change plans later?',
      answer: 'Absolutely! You can upgrade or downgrade your plan at any time. When upgrading, you\'ll be prorated for the remainder of your billing cycle. When downgrading, the new rate will apply at the start of your next billing cycle.'
    },
    {
      question: 'Is there a setup fee?',
      answer: 'No, there are no setup fees for our Starter and Professional plans. Enterprise plans may include a one-time implementation fee depending on your specific requirements.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept major credit cards (Visa, Mastercard, American Express), bank transfers, and FPX payments for Malaysian customers.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, we take security very seriously. We use industry-standard encryption, regular security audits, and comply with global data protection regulations. Your data is stored in secure data centers with redundancy.'
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. You\'ll continue to have access until the end of your current billing period.'
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <LandingHeader />
      
      <main>
        {/* Hero Section */}
        <section className="py-12 md:py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm font-medium mb-4">
                {currentYear} Pricing
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Simple, Transparent Pricing
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Choose the plan that works best for your business. All plans include core features and updates.
              </p>
              
              {/* Billing Toggle */}
              <div className="flex items-center justify-center mb-12">
                <span className={`text-sm ${billingCycle === 'monthly' ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                  Monthly
                </span>
                <button 
                  className="relative mx-4 w-14 h-8 flex items-center bg-gray-200 dark:bg-gray-700 rounded-full p-1 cursor-pointer"
                  onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                >
                  <div 
                    className={`bg-blue-600 w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                      billingCycle === 'annual' ? 'translate-x-6' : ''
                    }`}
                  ></div>
                </button>
                <div className="flex items-center">
                  <span className={`text-sm ${billingCycle === 'annual' ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                    Annual
                  </span>
                  <span className="ml-2 px-2 py-1 text-xs font-medium text-green-800 bg-green-100 dark:text-green-200 dark:bg-green-900 rounded-full">
                    Save 20%
                  </span>
                </div>
              </div>
            </div>
            
            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <div 
                  key={plan.name}
                  className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${
                    plan.popular ? 'transform scale-105 border-2 border-blue-500' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="bg-blue-500 text-white text-center py-2 text-sm font-medium">
                      MOST POPULAR
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{plan.description}</p>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        {billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                      </span>
                      {plan.monthlyPrice !== 'Custom' && (
                        <span className="text-gray-600 dark:text-gray-300">/month</span>
                      )}
                      {billingCycle === 'annual' && plan.annualPrice !== 'Custom' && (
                        <span className="block text-sm text-gray-500 dark:text-gray-400">billed annually</span>
                      )}
                    </div>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <i className="fas fa-check text-green-500 mr-2"></i>
                          <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="px-6 pb-6">
                    <Link 
                      to={plan.ctaLink}
                      className={`block w-full py-3 px-4 text-center font-medium rounded-md ${
                        plan.popular
                          ? 'text-white bg-blue-600 hover:bg-blue-700'
                          : 'text-blue-600 border border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900'
                      }`}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Feature Comparison */}
        <section className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Compare Features
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Find the plan that's right for your business
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="py-4 px-6 text-left text-gray-500 dark:text-gray-300 font-medium">Features</th>
                    <th className="py-4 px-6 text-center text-gray-500 dark:text-gray-300 font-medium">Starter</th>
                    <th className="py-4 px-6 text-center text-gray-500 dark:text-gray-300 font-medium">Professional</th>
                    <th className="py-4 px-6 text-center text-gray-500 dark:text-gray-300 font-medium">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="py-4 px-6 text-gray-800 dark:text-gray-200 font-medium">Employees</td>
                    <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300">Up to 25</td>
                    <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300">Up to 100</td>
                    <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-800 dark:text-gray-200 font-medium">Employee Management</td>
                    <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300"><i className="fas fa-check text-green-500"></i></td>
                    <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300"><i className="fas fa-check text-green-500"></i></td>
                    <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300"><i className="fas fa-check text-green-500"></i></td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-800 dark:text-gray-200 font-medium">Attendance Tracking</td>
                    <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300"><i className="fas fa-check text-green-500"></i></td>
                    <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300"><i className="fas fa-check text-green-500"></i></td>
                    <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300"><i className="fas fa-check text-green-500"></i></td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-800 dark:text-gray-200 font-medium">Leave Management</td>
                    <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300">Basic</td>
                    <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300">Advanced</td>
                    <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300">Advanced</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-800 dark:text-gray-200 font-medium">AI HR Assistant</td>
                    <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300"><i className="fas fa-times text-red-500"></i></td>
                    <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300"><i className="fas fa-check text-green-500"></i></td>
                    <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300"><i className="fas fa-check text-green-500"></i></td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-800 dark:text-gray-200 font-medium">Analytics</td>
                    <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300">Basic</td>
                    <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300">Advanced</td>
                    <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300">Custom</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-800 dark:text-gray-200 font-medium">API Access</td>
                    <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300"><i className="fas fa-times text-red-500"></i></td>
                    <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300"><i className="fas fa-check text-green-500"></i></td>
                    <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300"><i className="fas fa-check text-green-500"></i></td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-800 dark:text-gray-200 font-medium">Custom Integrations</td>
                    <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300"><i className="fas fa-times text-red-500"></i></td>
                    <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300">Limited</td>
                    <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300"><i className="fas fa-check text-green-500"></i></td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-800 dark:text-gray-200 font-medium">Support</td>
                    <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300">Email</td>
                    <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300">Priority</td>
                    <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300">24/7 Premium</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        
        {/* FAQs */}
        <section className="py-12 md:py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Have questions? We've got answers.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Still have questions?
                </p>
                <Link
                  to="/contact"
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 md:py-20 bg-blue-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to transform your HR operations?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-3xl mx-auto">
              Join thousands of Malaysian businesses that trust HRPBloom for their HR management needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="px-6 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50 text-center"
              >
                Start Free 14-Day Trial
              </Link>
              <Link
                to="/demo"
                className="px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-blue-700 text-center"
              >
                Schedule Live Demo
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {currentYear} HRPBloom. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Pricing;