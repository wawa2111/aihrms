import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { getSubscriptionStatus, subscribeToPlan } from '../../reducers/subscription.reducer';
import ComponentLoader from '../../components/shared/loaders/ComponentLoader';
import ButtonLoader from '../../components/shared/loaders/ButtonLoader';

const Subscription = () => {
  const dispatch = useDispatch();
  const { loading, subscription, plans } = useSelector(state => state.subscription);
  
  useEffect(() => {
    dispatch(getSubscriptionStatus());
  }, [dispatch]);
  
  const handleSubscribe = async (planId) => {
    try {
      await dispatch(subscribeToPlan({ planId })).unwrap();
      toast.success(`Successfully subscribed to ${planId} plan`);
    } catch (error) {
      toast.error(error || 'Failed to subscribe');
    }
  };
  
  if (loading && !subscription) {
    return <ComponentLoader />;
  }
  
  const currentPlanId = subscription?.plan || 'free';
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Subscription Plans
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Choose the right plan to unlock the full potential of HRPBloom HRMS with advanced features, 
          AI capabilities, and consultant access.
        </p>
      </div>
      
      {/* Current Subscription */}
      {subscription && (
        <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-6 mb-10 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-2">
            Your Current Subscription
          </h2>
          <div className="flex flex-wrap items-center justify-between">
            <div>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Plan:</span> {subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)}
              </p>
              {subscription.expiresAt && (
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Expires:</span> {new Date(subscription.expiresAt).toLocaleDateString()}
                </p>
              )}
            </div>
            <div className="mt-4 sm:mt-0">
              {subscription.plan !== 'free' && (
                <button
                  onClick={() => dispatch(cancelSubscription())}
                  className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-600 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  disabled={loading}
                >
                  {loading ? <ButtonLoader /> : 'Cancel Subscription'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div 
            key={plan.id} 
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all ${
              plan.recommended ? 'ring-2 ring-blue-500 transform scale-105' : ''
            }`}
          >
            {plan.recommended && (
              <div className="bg-blue-500 text-white text-center py-2 font-medium">
                Recommended
              </div>
            )}
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                {plan.name}
              </h3>
              
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-800 dark:text-white">${plan.price}</span>
                <span className="text-gray-500 dark:text-gray-400">/month</span>
              </div>
              
              <ul className="mb-8 space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => handleSubscribe(plan.id)}
                disabled={loading || currentPlanId === plan.id}
                className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
                  currentPlanId === plan.id
                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {loading ? (
                  <ButtonLoader />
                ) : currentPlanId === plan.id ? (
                  'Current Plan'
                ) : (
                  'Subscribe'
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* FAQ Section */}
      <div className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
              Can I change my plan later?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the start of your next billing cycle.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
              How does the AI assistant work?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our AI assistant uses advanced natural language processing to answer HR-related questions, provide insights, and help with common HR tasks. Free users get 3 messages per session, while paid plans get unlimited usage.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
              What are consultant bookings?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Premium subscribers can book one-on-one sessions with our HR consultants for personalized advice and solutions to complex HR challenges.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;