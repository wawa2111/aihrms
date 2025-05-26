import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LandingHeader from '../components/ui/LandingHeader';
import PromoBanner from '../components/ui/PromoBanner';
import NewsletterSection from '../components/ui/NewsletterSection';

function About() {
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
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                About HRPBloom
              </motion.h1>
              <motion.p 
                className="text-lg text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Transforming HR management for Malaysian businesses with AI-powered solutions.
              </motion.p>
            </div>
          </div>
        </motion.section>
        
        {/* Our Story */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <motion.div 
                className="md:w-1/2"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Story</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Founded in 2022, HRPBloom was born from a simple observation: Malaysian businesses needed an HR solution that truly understood local employment laws and practices.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Our founders, with over 20 years of combined experience in HR and technology, set out to create a platform that would not only streamline HR operations but also ensure compliance with Malaysia's unique regulatory environment.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Today, HRPBloom serves thousands of businesses across Malaysia, from small startups to large enterprises, all benefiting from our AI-powered HR management solutions.
                </p>
              </motion.div>
              <motion.div 
                className="md:w-1/2"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img 
                  src="/hrpbloom.png" 
                  alt="HRPBloom Team" 
                  className="rounded-lg shadow-xl"
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Our Mission */}
        <section className="py-12 md:py-20 bg-blue-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2 
                className="text-3xl font-bold text-gray-900 dark:text-white mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Our Mission
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                To empower Malaysian businesses with intelligent HR solutions that simplify compliance, enhance employee experience, and drive organizational growth.
              </motion.p>
            </div>
          </div>
        </section>
        
        {/* Our Team */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <motion.h2 
                className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Our Leadership Team
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Meet the experts behind HRPBloom's innovative HR solutions.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Sarah Tan',
                  role: 'Chief Executive Officer',
                  bio: 'With 15+ years in HR technology, Sarah leads our vision to transform HR management in Malaysia.',
                  image: 'https://randomuser.me/api/portraits/women/32.jpg'
                },
                {
                  name: 'Raj Kumar',
                  role: 'Chief Technology Officer',
                  bio: 'Raj brings extensive experience in AI and machine learning to drive our product innovation.',
                  image: 'https://randomuser.me/api/portraits/men/44.jpg'
                },
                {
                  name: 'Mei Ling',
                  role: 'Chief Operating Officer',
                  bio: 'Mei ensures our operations run smoothly while maintaining the highest standards of service.',
                  image: 'https://randomuser.me/api/portraits/women/68.jpg'
                }
              ].map((member, index) => (
                <motion.div 
                  key={member.name}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-64 object-cover object-center"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                    <p className="text-blue-600 dark:text-blue-400 mb-2">{member.role}</p>
                    <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Contact CTA */}
        <section className="py-12 md:py-20 bg-blue-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2 
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Want to learn more about us?
            </motion.h2>
            <motion.p 
              className="text-lg text-blue-100 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Our team is ready to answer your questions and show you how HRPBloom can transform your HR operations.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                className="px-6 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50 inline-block"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <NewsletterSection />
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} HRPBloom. All rights reserved. Company Registration No: JM1014230-X</p>
        </div>
      </footer>
    </div>
  );
}

export default About;