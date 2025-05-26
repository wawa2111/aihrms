import { Link } from 'react-router-dom';
import CTAButton from './CTAButton';

const ConsultantCard = ({ consultant }) => {
  const {
    _id,
    name,
    profilePicture,
    role,
    department,
    email
  } = consultant;

  // Get specialty and hourly rate from role
  const specialty = role?.consultantSpecialty || 'General';
  const hourlyRate = role?.hourlyRate || 0;
  
  // Format specialty for display
  const formatSpecialty = (specialty) => {
    return specialty.charAt(0).toUpperCase() + specialty.slice(1);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      {/* Consultant Image */}
      <div className="relative">
        <img 
          src={profilePicture || '/unknown.jpeg'} 
          alt={name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-sm font-medium">
          ${hourlyRate}/hr
        </div>
      </div>
      
      {/* Consultant Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{name}</h3>
        
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-3">
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs font-medium">
            {formatSpecialty(specialty)} Consultant
          </span>
          <span className="mx-2">•</span>
          <span>{department?.name || 'Consulting'}</span>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {role?.description || 'HR consultant specializing in providing expert advice and solutions.'}
        </p>
        
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <i className="fas fa-envelope mr-2"></i>
          <a href={`mailto:${email}`} className="hover:text-blue-600 dark:hover:text-blue-400">
            {email}
          </a>
        </div>
        
        <div className="flex space-x-2">
          <CTAButton 
            text="View Profile" 
            link={`/consultants/${_id}`}
            variant="outline"
            size="sm"
            icon="fas fa-user"
          />
          
          <CTAButton 
            text="Book Consultation" 
            link={`/consultants/${_id}/book`}
            variant="primary"
            size="sm"
            icon="fas fa-calendar-check"
            requiresUpgrade={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ConsultantCard;