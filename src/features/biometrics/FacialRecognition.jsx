import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const FacialRecognition = ({ onVerified }) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // Start video capture
  const startCapture = async () => {
    try {
      setIsCapturing(true);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640, 
          height: 480,
          facingMode: 'user'
        } 
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Unable to access camera. Please check permissions.');
      setIsCapturing(false);
    }
  };

  // Stop video capture
  const stopCapture = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsCapturing(false);
  };

  // Capture frame and verify
  const captureAndVerify = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setIsProcessing(true);
    
    const context = canvasRef.current.getContext('2d');
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    
    // Draw video frame to canvas
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    
    // Get image data
    const imageData = canvasRef.current.toDataURL('image/jpeg');
    
    // Simulate facial recognition verification
    setTimeout(() => {
      // In a real implementation, you would send the image to a facial recognition API
      const mockSuccess = Math.random() > 0.2; // 80% success rate for demo
      
      if (mockSuccess) {
        setIsVerified(true);
        toast.success('Identity verified successfully!');
        if (onVerified) onVerified(true);
      } else {
        toast.error('Verification failed. Please try again.');
        if (onVerified) onVerified(false);
      }
      
      setIsProcessing(false);
      stopCapture();
    }, 2000);
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopCapture();
    };
  }, []);

  return (
    <div className="card p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Facial Recognition</h2>
      
      <div className="relative mb-4">
        {isCapturing ? (
          <div className="relative">
            <video 
              ref={videoRef} 
              className="w-full rounded-lg border-2 border-primary-500"
              muted
              playsInline
            />
            
            {/* Face detection overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-64 border-2 border-dashed border-primary-500 rounded-full opacity-70"></div>
            </div>
            
            {/* Processing indicator */}
            {isProcessing && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                <div className="text-white text-center">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-r-transparent"></div>
                  <p className="mt-2">Verifying...</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg h-64 flex items-center justify-center">
            {isVerified ? (
              <div className="text-center text-green-600 dark:text-green-400">
                <i className="fas fa-check-circle text-5xl mb-2"></i>
                <p className="font-medium">Verification Successful</p>
              </div>
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400">
                <i className="fas fa-camera text-5xl mb-2"></i>
                <p>Camera feed will appear here</p>
              </div>
            )}
          </div>
        )}
        
        {/* Hidden canvas for image processing */}
        <canvas ref={canvasRef} className="hidden"></canvas>
      </div>
      
      <div className="flex justify-center space-x-4">
        {!isCapturing && !isVerified && (
          <button 
            onClick={startCapture}
            className="btn-primary"
          >
            <i className="fas fa-camera mr-2"></i>
            Start Camera
          </button>
        )}
        
        {isCapturing && !isProcessing && (
          <>
            <button 
              onClick={captureAndVerify}
              className="btn-success"
            >
              <i className="fas fa-id-card mr-2"></i>
              Verify Identity
            </button>
            
            <button 
              onClick={stopCapture}
              className="btn-secondary"
            >
              <i className="fas fa-times mr-2"></i>
              Cancel
            </button>
          </>
        )}
        
        {isVerified && (
          <button 
            onClick={() => {
              setIsVerified(false);
              startCapture();
            }}
            className="btn-secondary"
          >
            <i className="fas fa-redo mr-2"></i>
            Try Again
          </button>
        )}
      </div>
      
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        <p>Your privacy is important to us. Facial data is processed securely and not stored.</p>
      </div>
    </div>
  );
};

export default FacialRecognition;