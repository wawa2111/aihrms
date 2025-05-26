import { toast } from 'react-hot-toast';

const VoiceRecognition = ({ onVerified, phrase = "My voice is my passport, verify me" }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [volume, setVolume] = useState(0);
  
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);

  // Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      // Set up audio analyzer for volume visualization
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      microphone.connect(analyser);
      analyser.fftSize = 256;
      
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;
      
      // Set up volume meter
      const volumeInterval = setInterval(() => {
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
        setVolume(average);
      }, 100);
      
      // Set up media recorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioBlob(audioBlob);
        setAudioUrl(audioUrl);
        clearInterval(volumeInterval);
      };
      
      // Start recording
      audioChunksRef.current = [];
      mediaRecorder.start();
      setIsRecording(true);
      
      // Set up timer
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      // Auto-stop after 5 seconds
      setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          stopRecording();
        }
      }, 5000);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast.error('Unable to access microphone. Please check permissions.');
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      clearInterval(timerRef.current);
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      setIsRecording(false);
    }
  };

  // Verify voice
  const verifyVoice = () => {
    if (!audioBlob) return;
    
    setIsProcessing(true);
    
    // In a real implementation, you would send the audio to a voice recognition API
    setTimeout(() => {
      // Simulate 80% success rate
      const success = Math.random() > 0.2;
      
      if (success) {
        setIsVerified(true);
        toast.success('Voice verified successfully!');
        if (onVerified) onVerified(true);
      } else {
        toast.error('Voice verification failed. Please try again.');
        if (onVerified) onVerified(false);
      }
      
      setIsProcessing(false);
    }, 2000);
  };

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      clearInterval(timerRef.current);
      
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  return (
    <div className="card p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Voice Recognition</h2>
      
      <div className="mb-6">
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
          <p className="text-center font-medium">Please say the following phrase:</p>
          <p className="text-center text-primary-600 dark:text-primary-400 mt-2 text-lg italic">"{phrase}"</p>
        </div>
        
        <div className="relative h-24 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
          {isRecording ? (
            <div className="w-full h-full flex flex-col items-center justify-center">
              {/* Voice visualization */}
              <div className="flex items-center justify-center space-x-1 h-12">
                {[...Array(20)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-1 bg-primary-500 rounded-full"
                    style={{ 
                      height: `${Math.min(100, Math.max(10, volume * Math.random() * 0.8))}%`,
                      transition: 'height 0.1s ease'
                    }}
                  ></div>
                ))}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Recording... {formatTime(recordingTime)}
              </div>
            </div>
          ) : audioUrl ? (
            <div className="w-full">
              <audio 
                src={audioUrl} 
                controls 
                className="w-full" 
                controlsList="nodownload"
              />
            </div>
          ) : isVerified ? (
            <div className="text-center text-green-600 dark:text-green-400">
              <i className="fas fa-check-circle text-3xl mb-2"></i>
              <p className="font-medium">Voice Verified</p>
            </div>
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400">
              <i className="fas fa-microphone text-3xl mb-2"></i>
              <p>Click Record to start</p>
            </div>
          )}
          
          {isProcessing && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
              <div className="text-white text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-r-transparent"></div>
                <p className="mt-2">Analyzing voice...</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-center space-x-4">
        {!isRecording && !audioUrl && !isVerified && (
          <button 
            onClick={startRecording}
            className="btn-primary"
          >
            <i className="fas fa-microphone mr-2"></i>
            Record Voice
          </button>
        )}
        
        {isRecording && (
          <button 
            onClick={stopRecording}
            className="btn-danger"
          >
            <i className="fas fa-stop-circle mr-2"></i>
            Stop Recording
          </button>
        )}
        
        {audioUrl && !isVerified && !isProcessing && (
          <>
            <button 
              onClick={verifyVoice}
              className="btn-success"
            >
              <i className="fas fa-check mr-2"></i>
              Verify Voice
            </button>
            
            <button 
              onClick={() => {
                setAudioBlob(null);
                setAudioUrl(null);
                startRecording();
              }}
              className="btn-secondary"
            >
              <i className="fas fa-redo mr-2"></i>
              Record Again
            </button>
          </>
        )}
        
        {isVerified && (
          <button 
            onClick={() => {
              setIsVerified(false);
              setAudioBlob(null);
              setAudioUrl(null);
            }}
            className="btn-secondary"
          >
            <i className="fas fa-redo mr-2"></i>
            Try Again
          </button>
        )}
      </div>
      
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        <p>Your voice data is processed securely and not stored permanently.</p>
      </div>
    </div>
  );
};

export default VoiceRecognition;