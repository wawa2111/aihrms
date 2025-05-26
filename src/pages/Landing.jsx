import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LandingHeader from '../components/ui/LandingHeader';
import PayrollFeature from '../components/ui/PayrollFeature';
import PromoBanner from '../components/ui/PromoBanner';
import NewsletterSection from '../components/ui/NewsletterSection';
import AnimatedFeatureCard from '../components/ui/AnimatedFeatureCard';

function Landing() {
  const currentYear = 2025;
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PromoBanner />
      <LandingHeader />
      
      <main>
        {/* Hero Section */}
        <motion.section 
          className="py-12 md:py-20 bg-white dark:bg-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center">
              <motion.div 
                className="md:w-1/2 md:pr-8 mb-8 md:mb-0"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <motion.span 
                  className="inline-block px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm font-medium mb-4"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  New for {currentYear}: AI Payroll Assistant
                </motion.span>
                <motion.h1 
                  className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  AI-Powered HR Management for Malaysian Businesses
                </motion.h1>
                <motion.p 
                  className="text-lg text-gray-600 dark:text-gray-300 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  Streamline your HR operations with HRPBloom, the comprehensive HR management system designed specifically for Malaysian businesses. Now with advanced AI capabilities for {currentYear}.
                </motion.p>
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/register"
                      className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 text-center block"
                    >
                      Start Free Trial
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/demo"
                      className="px-6 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 font-medium rounded-md hover:bg-blue-50 dark:hover:bg-blue-900 text-center block"
                    >
                      Schedule Demo
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
              <motion.div 
                className="md:w-1/2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <motion.img
                  src="/hrpbloom.png"
                  alt="HRPBloom Dashboard"
                  className="rounded-lg shadow-xl"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </motion.div>
            </div>
          </div>
        </motion.section>
        
        {/* Stats Section */}
        <section className="py-8 bg-blue-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4">
                <p className="text-3xl font-bold">10,000+</p>
                <p className="text-blue-200">Malaysian Businesses</p>
              </div>
              <div className="p-4">
                <p className="text-3xl font-bold">98%</p>
                <p className="text-blue-200">Compliance Rate</p>
              </div>
              <div className="p-4">
                <p className="text-3xl font-bold">500,000+</p>
                <p className="text-blue-200">Employees Managed</p>
              </div>
              <div className="p-4">
                <p className="text-3xl font-bold">30%</p>
                <p className="text-blue-200">HR Cost Reduction</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Payroll Feature Section */}
        <PayrollFeature />
        
        {/* Features Section */}
        <section className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm font-medium mb-4">
                {currentYear} Features
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Next-Generation HR Management
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Everything you need to manage your workforce efficiently and comply with Malaysian employment laws, powered by the latest AI advancements.
              </p>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.1 }}
            >
              {[
                {
                  id: 'employee-management',
                  title: 'Employee Management',
                  description: 'Complete employee lifecycle management with predictive analytics for retention and performance.',
                  icon: 'fas fa-users',
                  color: 'blue'
                },
                {
                  id: 'attendance',
                  title: 'Biometric Attendance',
                  description: 'Advanced biometric and QR attendance with geofencing and remote work tracking.',
                  icon: 'fas fa-clipboard-check',
                  color: 'green'
                },
                {
                  id: 'leave-management',
                  title: 'Smart Leave Management',
                  description: 'AI-powered leave planning with workload balancing and automatic compliance checks.',
                  icon: 'fas fa-calendar-alt',
                  color: 'yellow'
                },
                {
                  id: 'ai-assistant',
                  title: 'Generative AI HR Assistant',
                  description: 'Advanced AI assistant with natural language processing for Malaysian employment laws and HR policies.',
                  icon: 'fas fa-robot',
                  color: 'purple'
                },
                {
                  id: 'analytics',
                  title: 'Predictive Analytics',
                  description: 'Advanced HR analytics with predictive modeling for workforce planning and talent management.',
                  icon: 'fas fa-chart-bar',
                  color: 'red'
                },
                {
                  id: 'compliance',
                  title: 'Compliance Automation',
                  description: `Automated compliance with ${currentYear} Malaysian labor laws and real-time regulatory updates.`,
                  icon: 'fas fa-shield-alt',
                  color: 'indigo'
                }
              ].map((feature, index) => (
                <AnimatedFeatureCard key={feature.id} feature={feature} index={index} />
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-12 md:py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm font-medium mb-4">
                Success Stories
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Trusted by Leading Malaysian Companies
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                See how businesses across Malaysia are transforming their HR operations with HRPBloom.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Sarah Tan" className="h-12 w-12 rounded-full" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Sarah Tan</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">HR Director, TechMalaysia</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "HRPBloom's AI assistant has revolutionized how we handle HR queries. Our compliance rate improved by 35% and employee satisfaction increased dramatically."
                </p>
                <div className="mt-4 flex text-yellow-400">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>
              
              {/* Testimonial 2 */}
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <img src="https://randomuser.me/api/portraits/men/44.jpg" alt="Raj Kumar" className="h-12 w-12 rounded-full" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Raj Kumar</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">CEO, Global Solutions MY</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "The predictive analytics have helped us reduce turnover by 25%. We can now anticipate staffing needs and address employee concerns before they become issues."
                </p>
                <div className="mt-4 flex text-yellow-400">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>
              
              {/* Testimonial 3 */}
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Mei Ling" className="h-12 w-12 rounded-full" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Mei Ling</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">HR Manager, KL Innovations</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "The biometric attendance system with geofencing has been perfect for our hybrid work model. We've saved 20 hours per week on administrative tasks."
                </p>
                <div className="mt-4 flex text-yellow-400">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/case-studies" className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
                View All Case Studies
              </Link>
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900" id="pricing">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm font-medium mb-4">
                {currentYear} Pricing
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Choose the plan that works best for your business. All plans include core features.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Basic Plan */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Starter</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">For small businesses getting started</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">RM199</span>
                    <span className="text-gray-600 dark:text-gray-300">/month</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <i className="fas fa-check text-green-500 mr-2"></i>
                      <span className="text-gray-600 dark:text-gray-300">Up to 25 employees</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-green-500 mr-2"></i>
                      <span className="text-gray-600 dark:text-gray-300">Core HR management</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-green-500 mr-2"></i>
                      <span className="text-gray-600 dark:text-gray-300">Attendance tracking</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-green-500 mr-2"></i>
                      <span className="text-gray-600 dark:text-gray-300">Basic leave management</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-green-500 mr-2"></i>
                      <span className="text-gray-600 dark:text-gray-300">Email support</span>
                    </li>
                  </ul>
                </div>
                <div className="px-6 pb-6">
                  <Link to="/signup?plan=starter" className="block w-full py-3 px-4 text-center font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900">
                    Start Free Trial
                  </Link>
                </div>
              </div>
              
              {/* Pro Plan */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform scale-105 border-2 border-blue-500">
                <div className="bg-blue-500 text-white text-center py-2 text-sm font-medium">
                  MOST POPULAR
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Professional</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">For growing businesses</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">RM399</span>
                    <span className="text-gray-600 dark:text-gray-300">/month</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <i className="fas fa-check text-green-500 mr-2"></i>
                      <span className="text-gray-600 dark:text-gray-300">Up to 100 employees</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-green-500 mr-2"></i>
                      <span className="text-gray-600 dark:text-gray-300">All Starter features</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-green-500 mr-2"></i>
                      <span className="text-gray-600 dark:text-gray-300">Advanced analytics</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-green-500 mr-2"></i>
                      <span className="text-gray-600 dark:text-gray-300">AI HR Assistant</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-green-500 mr-2"></i>
                      <span className="text-gray-600 dark:text-gray-300">Priority support</span>
                    </li>
                  </ul>
                </div>
                <div className="px-6 pb-6">
                  <Link to="/signup?plan=professional" className="block w-full py-3 px-4 text-center font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                    Start Free Trial
                  </Link>
                </div>
              </div>
              
              {/* Enterprise Plan */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Enterprise</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">For large organizations</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">Custom</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <i className="fas fa-check text-green-500 mr-2"></i>
                      <span className="text-gray-600 dark:text-gray-300">Unlimited employees</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-green-500 mr-2"></i>
                      <span className="text-gray-600 dark:text-gray-300">All Professional features</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-green-500 mr-2"></i>
                      <span className="text-gray-600 dark:text-gray-300">Custom integrations</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-green-500 mr-2"></i>
                      <span className="text-gray-600 dark:text-gray-300">Dedicated account manager</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-green-500 mr-2"></i>
                      <span className="text-gray-600 dark:text-gray-300">24/7 premium support</span>
                    </li>
                  </ul>
                </div>
                <div className="px-6 pb-6">
                  <Link to="/contact-sales" className="block w-full py-3 px-4 text-center font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900">
                    Contact Sales
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <NewsletterSection />
        
        {/* CTA Section */}
        <motion.section 
          className="py-12 md:py-20 bg-blue-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Ready to transform your HR operations?
            </motion.h2>
            <motion.p 
              className="text-lg text-blue-100 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Join thousands of Malaysian businesses that trust HRPBloom for their HR management needs.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/register"
                  className="px-6 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50 text-center block"
                >
                  Start Free 14-Day Trial
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/demo"
                  className="px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-blue-700 text-center block"
                >
                  Schedule Live Demo
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">HRPBloom</h3>
              <p className="mb-4">
                AI-powered HR management system designed for Malaysian businesses.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link to="/features" className="hover:text-white">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link to="/demo" className="hover:text-white">Request Demo</Link></li>
                <li><Link to="/customers" className="hover:text-white">Customers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
                <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link to="/security" className="hover:text-white">Security</Link></li>
                <li><Link to="/compliance" className="hover:text-white">Compliance</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>&copy; {currentYear} HRPBloom. All rights reserved. Company Registration No: JM1014230-X</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;