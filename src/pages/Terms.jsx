import { motion } from 'framer-motion';
import LandingHeader from '../components/ui/LandingHeader';
import PromoBanner from '../components/ui/PromoBanner';

function Terms() {
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
              Terms of Service
            </motion.h1>
            
            <div className="prose prose-blue max-w-none dark:prose-invert">
              <p>Last updated: December 15, 2023</p>
              
              <h2>1. Introduction</h2>
              <p>
                Welcome to HRPBloom ("Company", "we", "our", "us")! These Terms of Service ("Terms", "Terms of Service") govern your use of our website located at <a href="https://hrpbloom.com">hrpbloom.com</a> and our HR management application (together or individually "Service") operated by HRPBloom Sdn Bhd.
              </p>
              <p>
                Our Privacy Policy also governs your use of our Service and explains how we collect, safeguard and disclose information that results from your use of our web pages. Please read it here: <a href="/privacy">Privacy Policy</a>.
              </p>
              <p>
                By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
              </p>
              
              <h2>2. Subscriptions</h2>
              <p>
                Some parts of the Service are billed on a subscription basis ("Subscription(s)"). You will be billed in advance on a recurring and periodic basis ("Billing Cycle"). Billing cycles are set on a monthly or annual basis, depending on the type of subscription plan you select when purchasing a Subscription.
              </p>
              <p>
                At the end of each Billing Cycle, your Subscription will automatically renew under the exact same conditions unless you cancel it or HRPBloom cancels it. You may cancel your Subscription renewal either through your online account management page or by contacting HRPBloom customer support team.
              </p>
              
              <h2>3. Free Trial</h2>
              <p>
                HRPBloom may, at its sole discretion, offer a Subscription with a free trial for a limited period of time ("Free Trial").
              </p>
              <p>
                You may be required to enter your billing information in order to sign up for the Free Trial.
              </p>
              <p>
                If you do enter your billing information when signing up for the Free Trial, you will not be charged by HRPBloom until the Free Trial has expired. On the last day of the Free Trial period, unless you cancelled your Subscription, you will be automatically charged the applicable subscription fee for the type of Subscription you have selected.
              </p>
              
              <h2>4. Content</h2>
              <p>
                Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.
              </p>
              
              <h2>5. Prohibited Uses</h2>
              <p>
                You may use the Service only for lawful purposes and in accordance with these Terms. You agree not to use the Service:
              </p>
              <ul>
                <li>In any way that violates any applicable national or international law or regulation.</li>
                <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.</li>
                <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter," "spam," or any other similar solicitation.</li>
                <li>To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity.</li>
                <li>In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful, or in connection with any unlawful, illegal, fraudulent, or harmful purpose or activity.</li>
              </ul>
              
              <h2>6. Limitation of Liability</h2>
              <p>
                In no event shall HRPBloom, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.
              </p>
              
              <h2>7. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us:
              </p>
              <ul>
                <li>By email: legal@hrpbloom.com</li>
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

export default Terms;