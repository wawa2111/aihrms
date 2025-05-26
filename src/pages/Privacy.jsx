import { motion } from 'framer-motion';
import LandingHeader from '../components/ui/LandingHeader';
import PromoBanner from '../components/ui/PromoBanner';

function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PromoBanner />
      <LandingHeader />
      
      <main className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="text-3xl font-bold text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Privacy Policy
            </motion.h1>
            
            <div className="prose prose-blue max-w-none dark:prose-invert">
              <p>Last updated: December 15, 2023</p>
              
              <h2>1. Introduction</h2>
              <p>
                HRPBloom Sdn Bhd ("us", "we", or "our") operates the HRPBloom website and HR management application (the "Service").
              </p>
              <p>
                This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
              </p>
              <p>
                We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy.
              </p>
              
              <h2>2. Information Collection and Use</h2>
              <p>
                We collect several different types of information for various purposes to provide and improve our Service to you.
              </p>
              
              <h3>Types of Data Collected</h3>
              
              <h4>Personal Data</h4>
              <p>
                While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:
              </p>
              <ul>
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Phone number</li>
                <li>Address, State, Province, ZIP/Postal code, City</li>
                <li>Cookies and Usage Data</li>
              </ul>
              
              <h4>Employee Data</h4>
              <p>
                If you use our HR management services, we may collect additional information about your employees, including but not limited to:
              </p>
              <ul>
                <li>Name and contact information</li>
                <li>Employment details</li>
                <li>Salary and compensation information</li>
                <li>Attendance records</li>
                <li>Performance evaluations</li>
                <li>Other HR-related information</li>
              </ul>
              
              <h2>3. Use of Data</h2>
              <p>
                HRPBloom uses the collected data for various purposes:
              </p>
              <ul>
                <li>To provide and maintain our Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information so that we can improve our Service</li>
                <li>To monitor the usage of our Service</li>
                <li>To detect, prevent and address technical issues</li>
                <li>To provide you with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless you have opted not to receive such information</li>
              </ul>
              
              <h2>4. Data Security</h2>
              <p>
                The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
              </p>
              
              <h2>5. Your Data Protection Rights</h2>
              <p>
                If you are a resident of the European Economic Area (EEA), you have certain data protection rights. HRPBloom aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.
              </p>
              <p>
                If you wish to be informed what Personal Data we hold about you and if you want it to be removed from our systems, please contact us.
              </p>
              
              <h2>6. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul>
                <li>By email: privacy@hrpbloom.com</li>
                <li>By phone: +60-123143082</li>
                <li>By mail: A-5-15, Perdana View, Jalan PJU 8/1, Damansara Perdana, 47820 Petaling Jaya, Selangor</li>
              </ul>
            </div>
          </motion.div>
        </div>
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

export default Privacy;