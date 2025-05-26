
const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-t-primary-500 border-b-primary-500 border-l-gray-200 border-r-gray-200 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 rounded-full bg-white dark:bg-gray-800"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;