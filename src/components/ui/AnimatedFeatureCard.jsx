import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function AnimatedFeatureCard({ feature, index }) {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
    >
      <motion.div 
        className={`w-12 h-12 bg-${feature.color}-100 dark:bg-${feature.color}-900 rounded-lg flex items-center justify-center mb-4`}
        whileHover={{ rotate: 5 }}
      >
        <i className={`${feature.icon} text-${feature.color}-600 dark:text-${feature.color}-400 text-xl`}></i>
      </motion.div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {feature.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {feature.description}
      </p>
      <Link to={`/features/${feature.id}`} className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline">
        Learn more <i className="fas fa-arrow-right ml-2"></i>
      </Link>
    </motion.div>
  );
}

export default AnimatedFeatureCard;