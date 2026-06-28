'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bell, User } from 'lucide-react';

export default function OnboardingHeader() {
  return (
    <header className="hidden md:flex w-full h-[80px] bg-transparent items-center justify-between px-8 lg:px-12 max-w-[1400px] mx-auto absolute top-0 left-0 right-0 z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <Image 
          src="/teyro-logo-blue.png" 
          alt="Teyro Logo" 
          width={140} 
          height={40} 
          style={{ width: 'auto', height: '32px', objectFit: 'contain' }}
        />
      </Link>

      {/* Navigation (Mockup based) */}
      <nav className="flex items-center gap-8">
        <Link href="#" className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1">Home</Link>
        <Link href="#" className="text-gray-500 font-medium hover:text-gray-900 transition-colors">Courses</Link>
        <Link href="#" className="text-gray-500 font-medium hover:text-gray-900 transition-colors">Progress</Link>
        <Link href="#" className="text-gray-500 font-medium hover:text-gray-900 transition-colors">Community</Link>
        <Link href="#" className="text-gray-500 font-medium hover:text-gray-900 transition-colors">Profile</Link>
      </nav>

      {/* Icons */}
      <div className="flex items-center gap-6">
        <button className="text-gray-500 hover:text-gray-900 transition-colors">
          <Bell className="w-6 h-6" />
        </button>
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-300">
          <User className="w-6 h-6" />
        </div>
      </div>
    </header>
  );
}
