import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ConsultantCard from '../../components/shared/ConsultantCard';
import ComponentLoader from '../../components/shared/loaders/ComponentLoader';
import AIAssistantChat from '../../components/shared/AIAssistantChat';

const Consultants = () => {
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    const fetchConsultants = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/consultants`,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        
        setConsultants(response.data.data || []);
      } catch (error) {
        console.error('Error fetching consultants:', error);
        toast.error('Failed to load consultants');
      } finally {
        setLoading(false);
      }
    };
    
    fetchConsultants();
  }, []);
  
  // Filter consultants by specialty
  const filteredConsultants = filter === 'all' 
    ? consultants 
    : consultants.filter(c => c.role?.consultantSpecialty === filter);
  
  if (loading) {
    return <ComponentLoader />;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            HR Consultants
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Connect with our expert consultants for personalized HR guidance
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="all">All Specialties</option>
            <option value="hr">HR Management</option>
            <option value="recruitment">Recruitment</option>
            <option value="payroll">Payroll</option>
            <option value="performance">Performance</option>
            <option value="general">General</option>
          </select>
        </div>
      </div>
      
      {filteredConsultants.length === 0 ? (
        <div className="text-center py-12">
          <i className="fas fa-user-tie text-5xl text-gray-400 dark:text-gray-600 mb-4"></i>
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
            No consultants found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {filter === 'all' 
              ? 'There are no consultants available at the moment.' 
              : `There are no consultants with ${filter} specialty available.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConsultants.map(consultant => (
            <ConsultantCard key={consultant._id} consultant={consultant} />
          ))}
        </div>
      )}
      
      {/* AI Assistant Chat */}
      <AIAssistantChat title="HR Consultant AI" />
    </div>
  );
};

export default Consultants;