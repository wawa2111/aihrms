import { Link } from 'react-router-dom';

const CaseStudies = () => {
  const caseStudies = [
    {
      id: 1,
      company: 'Petronas',
      industry: 'Oil & Gas',
      challenge: 'Managing 45,000+ employees across multiple locations with inconsistent HR processes',
      solution: 'Implemented HRPBloom\'s centralized system with biometric attendance and AI-powered leave management',
      results: [
        '32% reduction in HR administrative workload',
        '28% improvement in employee satisfaction scores',
        'RM 2.4 million annual savings in operational costs'
      ],
      image: '/case-studies/petronas.jpg'
    },
    {
      id: 2,
      company: 'AirAsia',
      industry: 'Aviation',
      challenge: 'High turnover rates and complex scheduling for 20,000+ cabin crew and ground staff',
      solution: 'Deployed HRPBloom\'s AI scheduling and analytics dashboard to optimize workforce allocation',
      results: [
        '24% reduction in staff turnover',
        '18% improvement in schedule efficiency',
        'RM 1.8 million saved through optimized staffing'
      ],
      image: '/case-studies/airasia.jpg'
    },
    {
      id: 3,
      company: 'Maybank',
      industry: 'Banking',
      challenge: 'Compliance tracking and reporting across 43,000 employees in multiple countries',
      solution: 'Implemented HRPBloom\'s compliance module with Malaysian regulatory framework',
      results: [
        '100% compliance with Malaysian employment laws',
        '45% faster regulatory reporting',
        '67% reduction in compliance-related queries'
      ],
      image: '/case-studies/maybank.jpg'
    },
    {
      id: 4,
      company: 'Sunway Group',
      industry: 'Conglomerate',
      challenge: 'Disparate HR systems across 13 business divisions with 16,000+ employees',
      solution: 'Consolidated all HR operations into HRPBloom\'s unified platform',
      results: [
        '52% improvement in cross-division resource allocation',
        '35% reduction in HR technology costs',
        'Standardized HR policies across all divisions'
      ],
      image: '/case-studies/sunway.jpg'
    }
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Real-World Success Stories</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            See how leading Malaysian organizations have transformed their HR operations with HRPBloom's AI-powered solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {caseStudies.map((study) => (
            <div key={study.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-500 dark:text-gray-400">{study.company}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{study.company}</h3>
                  <span className="badge badge-primary">{study.industry}</span>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Challenge:</h4>
                  <p className="text-gray-600 dark:text-gray-400">{study.challenge}</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Solution:</h4>
                  <p className="text-gray-600 dark:text-gray-400">{study.solution}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Results:</h4>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                    {study.results.map((result, index) => (
                      <li key={index}>{result}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-6">
                  <Link 
                    to={`/case-studies/${study.id}`} 
                    className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
                  >
                    Read full case study <i className="fas fa-arrow-right ml-1"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">Try HRPBloom Today</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Experience the power of AI-driven HR management with our interactive demo. No credit card required.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link 
              to="/demo" 
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <i className="fas fa-play-circle mr-2"></i>
              Launch Interactive Demo
            </Link>
            
            <Link 
              to="/contact" 
              className="px-6 py-3 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 border border-primary-600 dark:border-primary-400 rounded-lg hover:bg-primary-50 dark:hover:bg-gray-700 transition-colors"
            >
              <i className="fas fa-calendar-alt mr-2"></i>
              Schedule a Personalized Demo
            </Link>
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Trusted by Leading Malaysian Organizations</h2>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-70">
            <div className="w-32 h-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">Petronas</div>
            <div className="w-32 h-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">AirAsia</div>
            <div className="w-32 h-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">Maybank</div>
            <div className="w-32 h-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">Sunway</div>
            <div className="w-32 h-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">CIMB</div>
            <div className="w-32 h-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">Maxis</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;