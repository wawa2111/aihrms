// This is a placeholder file for Next.js
// The actual application is built with Vite
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Redirect to the Vite app
    window.location.href = '/index.html';
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column'
    }}>
      <h1>Loading HRPBloom...</h1>
      <p>Please wait while we redirect you to the application.</p>
    </div>
  );
}