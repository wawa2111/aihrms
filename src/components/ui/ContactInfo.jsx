import { motion } from 'framer-motion';

function ContactInfo() {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h3>
      
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mt-1">
            <i className="fas fa-map-marker-alt text-blue-600 dark:text-blue-400"></i>
          </div>
          <div className="ml-3">
            <p className="font-medium text-gray-900 dark:text-white">Address</p>
            <p className="text-gray-600 dark:text-gray-300">
              A-5-15, Perdana View,<br />
              Jalan PJU 8/1,<br />
              Damansara Perdana,<br />
              47820 Petaling Jaya,<br />
              Selangor
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mt-1">
            <i className="fas fa-phone text-blue-600 dark:text-blue-400"></i>
          </div>
          <div className="ml-3">
            <p className="font-medium text-gray-900 dark:text-white">Phone</p>
            <p className="text-gray-600 dark:text-gray-300">+60-123143082</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mt-1">
            <i className="fas fa-envelope text-blue-600 dark:text-blue-400"></i>
          </div>
          <div className="ml-3">
            <p className="font-medium text-gray-900 dark:text-white">Email</p>
            <a href="mailto:info@hrpbloom.com" className="text-blue-600 dark:text-blue-400 hover:underline">info@hrpbloom.com</a>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Follow Us</h4>
        <div className="flex space-x-4">
          <a 
            href="https://facebook.com/hrpbloom" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a 
            href="https://x.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <i className="fab fa-x-twitter"></i>
          </a>
          <a 
            href="https://linkedin.com/company/hrpbloom" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a 
            href="https://instagram.com/hrpbloom" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default ContactInfo;