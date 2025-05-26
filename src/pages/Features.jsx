import { Link } from 'react-router-dom';
import LandingHeader from '../components/ui/LandingHeader';

function Features() {
  const currentYear = 2025;
  
  const features = [
    {
      id: 'employee-management',
      title: 'Employee Management',
      description: 'Complete employee lifecycle management with AI-powered insights and predictive analytics.',
      icon: 'fas fa-users',
      color: 'blue',
      details: [
        'Digital employee profiles with secure document storage',
        'Automated onboarding and offboarding workflows',
        'Custom fields and dynamic forms',
        'Organization chart with real-time updates',
        'Employee self-service portal',
        'Performance management with 360° feedback',
        'Talent retention prediction with AI analysis',
        'Skills gap analysis and development tracking'
      ],
      image: '/hrpbloom.png'
    },
    {
      id: 'attendance',
      title: 'Biometric Attendance',
      description: 'Advanced attendance tracking with multiple verification methods and location awareness.',
      icon: 'fas fa-clipboard-check',
      color: 'green',
      details: [
        'QR code check-in/check-out',
        'Facial recognition with liveness detection',
        'Fingerprint verification (compatible with most devices)',
        'Geofencing for location verification',
        'Remote work time tracking',
        'Overtime calculation and approval',
        'Real-time attendance dashboard',
        'Automated attendance reports and analytics'
      ],
      image: '/hrpbloom.png'
    },
    {
      id: 'leave-management',
      title: 'Smart Leave Management',
      description: 'AI-powered leave planning and management with Malaysian holiday calendar integration.',
      icon: 'fas fa-calendar-alt',
      color: 'yellow',
      details: [
        'Multiple leave types with custom configurations',
        'Automated leave balance calculation',
        'Smart leave approval workflows',
        'Malaysian public holiday calendar integration',
        'Team calendar with absence visualization',
        'Leave forecasting and planning tools',
        'AI-powered workload balancing during leaves',
        'Leave policy compliance automation'
      ],
      image: '/hrpbloom.png'
    },
    {
      id: 'ai-assistant',
      title: 'Generative AI HR Assistant',
      description: 'Advanced AI assistant specialized in Malaysian employment laws and HR policies.',
      icon: 'fas fa-robot',
      color: 'purple',
      details: [
        'Natural language processing for HR queries',
        'Malaysian employment law knowledge base',
        'Policy interpretation and guidance',
        'Employee FAQ automation',
        'Document generation (offer letters, contracts, etc.)',
        'Multilingual support (English, Malay, Mandarin, Tamil)',
        'Continuous learning from organizational data',
        'Integration with knowledge management systems'
      ],
      image: '/hrpbloom.png'
    },
    {
      id: 'analytics',
      title: 'Predictive Analytics',
      description: 'Advanced HR analytics with predictive modeling for workforce planning and talent management.',
      icon: 'fas fa-chart-bar',
      color: 'red',
      details: [
        'Real-time HR dashboards and KPIs',
        'Workforce demographics and diversity metrics',
        'Turnover prediction and retention analysis',
        'Recruitment analytics and source effectiveness',
        'Performance trend analysis',
        'Compensation benchmarking',
        'Custom report builder with export options',
        'Data visualization with interactive charts'
      ],
      image: '/hrpbloom.png'
    },
    {
      id: 'compliance',
      title: 'Compliance Automation',
      description: 'Automated compliance with Malaysian labor laws and real-time regulatory updates.',
      icon: 'fas fa-shield-alt',
      color: 'indigo',
      details: [
        'Malaysian Employment Act compliance monitoring',
        'EPF, SOCSO, and EIS contribution calculations',
        'PCB (tax) deduction automation',
        'Statutory reporting and submissions',
        'Regulatory update notifications',
        'Compliance risk assessment',
        'Audit trail and compliance documentation',
        'Industry-specific compliance modules'
      ],
      image: '/hrpbloom.png'
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
                {currentYear} Features
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Next-Generation HR Management
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Discover how HRPBloom's innovative features can transform your HR operations and help you build a more engaged, productive workforce.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/demo"
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 text-center"
                >
                  Schedule Demo
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 font-medium rounded-md hover:bg-blue-50 dark:hover:bg-blue-900 text-center"
                >
                  Start Free Trial
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features List */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-24">
              {features.map((feature, index) => (
                <div 
                  key={feature.id} 
                  id={feature.id}
                  className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-12`}
                >
                  <div className="md:w-1/2">
                    <div className={`w-16 h-16 bg-${feature.color}-100 dark:bg-${feature.color}-900 rounded-lg flex items-center justify-center mb-6`}>
                      <i className={`${feature.icon} text-${feature.color}-600 dark:text-${feature.color}-400 text-2xl`}></i>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      {feature.title}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                      {feature.description}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {feature.details.map((detail, i) => (
                        <li key={i} className="flex items-start">
                          <div className={`flex-shrink-0 h-6 w-6 rounded-full bg-${feature.color}-100 dark:bg-${feature.color}-900 flex items-center justify-center mt-1`}>
                            <i className={`fas fa-check text-${feature.color}-600 dark:text-${feature.color}-400 text-sm`}></i>
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-600 dark:text-gray-300">{detail}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="md:w-1/2">
                    <img 
                      src={feature.image} 
                      alt={feature.title} 
                      className="rounded-lg shadow-xl w-full"
                    />
                  </div>
                </div>
              ))}
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

export default Features;