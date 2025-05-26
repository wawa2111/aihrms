import { Link } from 'react-router-dom';

function PayrollFeature() {
  return (
    <section className="py-12 md:py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="md:w-1/2">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center mb-6">
              <i className="fas fa-money-bill-wave text-emerald-600 dark:text-emerald-400 text-2xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Automated Payroll System
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Streamline your payroll process with our comprehensive automated system designed specifically for Malaysian businesses.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mt-1">
                  <i className="fas fa-check text-emerald-600 dark:text-emerald-400 text-sm"></i>
                </div>
                <div className="ml-3">
                  <p className="text-gray-600 dark:text-gray-300">Automated salary calculations with variable components</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mt-1">
                  <i className="fas fa-check text-emerald-600 dark:text-emerald-400 text-sm"></i>
                </div>
                <div className="ml-3">
                  <p className="text-gray-600 dark:text-gray-300">Malaysian PCB, EPF, SOCSO, and EIS compliance</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mt-1">
                  <i className="fas fa-check text-emerald-600 dark:text-emerald-400 text-sm"></i>
                </div>
                <div className="ml-3">
                  <p className="text-gray-600 dark:text-gray-300">Digital payslips with secure delivery</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mt-1">
                  <i className="fas fa-check text-emerald-600 dark:text-emerald-400 text-sm"></i>
                </div>
                <div className="ml-3">
                  <p className="text-gray-600 dark:text-gray-300">Year-end tax reporting (EA Form, CP22A, etc.)</p>
                </div>
              </li>
            </ul>
            <Link to="/features/payroll" className="btn btn-primary">
              Learn More
            </Link>
          </div>
          <div className="md:w-1/2">
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900 rounded-full flex items-center justify-center">
                  <i className="fas fa-robot text-cyan-600 dark:text-cyan-400 text-xl"></i>
                </div>
                <h3 className="ml-4 text-xl font-semibold text-gray-900 dark:text-white">
                  AI Payroll Assistant
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our intelligent payroll assistant helps you optimize your payroll process with:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-cyan-500 mr-2"></i>
                  <span className="text-gray-600 dark:text-gray-300">Anomaly detection in payroll processing</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-cyan-500 mr-2"></i>
                  <span className="text-gray-600 dark:text-gray-300">Proactive compliance monitoring</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-cyan-500 mr-2"></i>
                  <span className="text-gray-600 dark:text-gray-300">Payroll optimization recommendations</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-cyan-500 mr-2"></i>
                  <span className="text-gray-600 dark:text-gray-300">Natural language queries for payroll data</span>
                </li>
              </ul>
              <div className="p-4 bg-cyan-50 dark:bg-cyan-900/30 rounded-lg">
                <p className="text-sm text-cyan-800 dark:text-cyan-300">
                  <i className="fas fa-lightbulb mr-2"></i>
                  "Our AI Payroll Assistant helped us identify RM15,000 in potential tax savings last quarter!"
                </p>
                <p className="text-xs text-right mt-2 text-cyan-700 dark:text-cyan-400">
                  - Financial Director, Tech Solutions Malaysia
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PayrollFeature;