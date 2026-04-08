"use client";

import React from 'react';
import Link from 'next/link';
import { Settings, Home } from 'lucide-react';

export default function CourseManageStudio({ params }: { params: { id: string } }) {
  // Unwrap parameters (Next.js 15+ async params standard)
  const resolvedParams = React.use(params as any) as { id: string };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f7f9fa' }}>
      {/* Temporary Navbar for the Builder */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', backgroundColor: '#1c1d1f', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/instructor" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <Home size={16} /> Back to courses
          </Link>
          <span style={{ color: '#d1d5db' }}>|</span>
          <span style={{ fontWeight: 700, fontSize: '14px' }}>Course Draft Studio</span>
          <span style={{ padding: '2px 8px', backgroundColor: '#4b5563', fontSize: '12px', borderRadius: '4px', fontWeight: 600 }}>DRAFT</span>
        </div>
        <div>
          <button style={{ backgroundColor: '#ffffff', color: '#1c1d1f', border: 'none', padding: '8px 16px', fontWeight: 700, cursor: 'pointer' }}>
            Save
          </button>
        </div>
      </header>

      {/* Main Studio Area */}
      <div style={{ display: 'flex', flex: 1 }}>
        
        {/* Placeholder Sidebar */}
        <aside style={{ width: '280px', borderRight: '1px solid #e5e7eb', padding: '32px 0', backgroundColor: '#ffffff' }}>
          <div style={{ padding: '0 24px', marginBottom: '16px', fontSize: '16px', fontWeight: 700 }}>Course Studio</div>
          <p style={{ padding: '0 24px', fontSize: '14px', color: '#6b7280', lineHeight: 1.5 }}>
             The full sidebar and builder layout will be mounted here once screenshots are provided!
          </p>
        </aside>

        {/* Editing Canvas */}
        <main style={{ flex: 1, padding: '48px', overflowY: 'auto' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#ffffff', padding: '40px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <Settings size={32} color="#3b82f6" />
              <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>Course Initialized!</h1>
            </div>
            
            <p style={{ fontSize: '16px', color: '#4b5563', marginBottom: '24px', lineHeight: 1.6 }}>
              Congratulations. The database has successfully recorded the creation of course ID:
            </p>

            <pre style={{ backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '8px', fontSize: '14px', fontFamily: 'monospace', overflowX: 'auto', marginBottom: '32px' }}>
              {resolvedParams.id}
            </pre>

            <div style={{ padding: '16px', backgroundColor: '#eff6ff', borderLeft: '4px solid #3b82f6' }}>
              <h3 style={{ margin: '0 0 8px 0', color: '#1e40af', fontSize: '16px' }}>What's Next?</h3>
              <p style={{ margin: 0, color: '#1e3a8a', fontSize: '14px' }}>
                We are currently paused as requested. Please provide the remaining screenshots of the Builder UI to continue constructing the curriculum mechanics.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
