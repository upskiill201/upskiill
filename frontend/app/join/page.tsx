import React from 'react';

export default function JoinWaitlistPage() {
  return (
    <div style={{ margin: 0, height: '100vh', overflow: 'hidden', position: 'relative', width: '100%' }}>
      <iframe 
        data-tally-src="https://tally.so/r/MedXrE?transparentBackground=1" 
        width="100%" 
        height="100%" 
        frameBorder="0" 
        marginHeight={0} 
        marginWidth={0} 
        title="Join Teyro Early"
        style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, border: 0 }}
      ></iframe>
      <script async src="https://tally.so/widgets/embed.js"></script>
    </div>
  );
}
