import React from 'react';

const FeaturesList = ({ compact = false }) => {
  const features = [
    {
      title: "Robust Authentication",
      description: "Secure login with role-based access control and two-factor authentication",
      icon: "fas fa-lock"
    },
    {
      title: "Employee Management",
      description: "Comprehensive employee profiles, records, and document management",
      icon: "fas fa-user-tie"
    },
    {
      title: "Attendance & Time Tracking",
      description: "QR Code-based check-in/check-out system with geolocation verification",
      icon: "fas fa-qrcode"
    },
    {
      title: "Leave Management",
      description: "AI-powered substitute assignments and leave balance tracking",
      icon: "fas fa-calendar-alt"
    },
    {
      title: "Payroll Management",
      description: "Automated salary calculations, tax deductions, and payslip generation",
      icon: "fas fa-money-bill-wave"
    },
    {
      title: "Recruitment Management",
      description: "Applicant tracking, interview scheduling, and hiring workflow",
      icon: "fas fa-user-plus"
    },
    {
      title: "Performance Management",
      description: "Goal setting, performance reviews, and skill evaluations",
      icon: "fas fa-chart-line"
    },
    {
      title: "Complaint Management",
      description: "Track and resolve employee grievances with escalation workflows",
      icon: "fas fa-exclamation-circle"
    },
    {
      title: "Communication Management",
      description: "Internal messaging, announcements, and notification system",
      icon: "fas fa-comments"
    },
    {
      title: "Feedback Management",
      description: "AI Sentiment Analysis for employee feedback and satisfaction tracking",
      icon: "fas fa-comment-dots"
    },
    {
      title: "Reports & Analytics",
      description: "Comprehensive dashboards for attendance, leave, and complaints",
      icon: "fas fa-chart-bar"
    },
    {
      title: "AI HR Assistant",
      description: "24/7 virtual HR assistant for common queries and guidance",
      icon: "fas fa-robot",
      premium: true
    }
  ];

  if (compact) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2">
            <i className={`${feature.icon} ${feature.premium ? 'text-purple-500' : 'text-blue-500'}`}></i>
            <span className="text-sm font-medium">{feature.title}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <div 
          key={index} 
          className={`p-5 rounded-lg shadow-md ${
            feature.premium 
              ? 'bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900 dark:to-indigo-900 border border-purple-200 dark:border-purple-800' 
              : 'bg-white dark:bg-gray-800'
          }`}
        >
          <div className="flex items-center mb-3">
            <div className={`p-2 rounded-full ${
              feature.premium 
                ? 'bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-purple-300' 
                : 'bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300'
            }`}>
              <i className={`${feature.icon} text-lg`}></i>
            </div>
            <h3 className="ml-3 text-lg font-semibold text-gray-800 dark:text-white">
              {feature.title}
              {feature.premium && (
                <span className="ml-2 text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900 px-2 py-0.5 rounded">
                  Premium
                </span>
              )}
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FeaturesList;