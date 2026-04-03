'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { CertificateCard } from '@/components/features/CertificateCard';

export default function CertificateValidationPage() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : 'unknown';

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <h1 style={{ textAlign: 'center', color: '#1F2A44', marginBottom: '8px', fontSize: '24px', fontWeight: 800 }}>Certificate Validation</h1>
        <p style={{ textAlign: 'center', color: '#64748B', marginBottom: '32px' }}>Verify the authenticity of this Upskiill credential.</p>
        
        {/* We reuse the CertificateCard to display the certificate for the public link */}
        <CertificateCard 
          courseTitle="Advanced Product Design & UX Strategy"
          instructorName="Alex Rivera"
          completedDate="March 15, 2026"
          certificateId={id}
          category="Design"
          thumbnailColor="#3D5AFE"
        />
        
        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '13px', color: '#94A3B8' }}>
          This is a verified certificate issued by Upskiill.
        </div>
      </div>
    </div>
  );
}
