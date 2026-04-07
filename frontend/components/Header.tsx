"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, Search, ShoppingCart, Menu, User, LayoutGrid, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Avatar from './ui/Avatar';
import styles from './Header.module.css';

export default function Header() {
  const { totalItems } = useCart();
  const pathname = usePathname();
  
  const [user, setUser] = useState<{ fullName: string, email: string, avatarUrl: string | null } | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch authentication state
  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setUser({
            fullName: data.fullName,
            email: data.email,
            avatarUrl: data.avatarUrl || null
          });
        }
      } catch (err) {
        // Not logged in or error
      }
    };
    fetchAuth();
  }, [pathname]);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } catch {
      // ignore
    }
    window.location.href = '/login';
  };

  if (pathname === '/signup' || pathname === '/login' || pathname.startsWith('/dashboard') || pathname.startsWith('/instructor')) return null;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <button 
          type="button"
          className={styles.mobileMenuBtn}
          aria-label="Open navigation menu"
        >
          <Menu size={24} />
        </button>

        {/* Left Section: Logo & Explore */}
        <div className={styles.leftSection}>
          <Link href="/" className={styles.logo}>
            <Image 
              src="/logo.png" 
              alt="Upskiill Logo" 
              width={140} 
              height={40} 
              priority
              style={{ width: 'auto', height: '36px' }}
            />
          </Link>
          
          <button className={styles.exploreBtn}>
            Explore <ChevronDown size={16} />
          </button>
        </div>

        {/* Middle Section: Search */}
        <div className={styles.searchSection}>
          <div className={styles.searchContainer}>
            <Search size={18} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="What do you want to learn today?" 
              className={styles.searchInput}
            />
          </div>
        </div>

        {/* Right Section: Actions */}
        <div className={styles.rightSection}>
          {/* Mobile Only: Search Icon */}
          <button 
            type="button"
            className={styles.mobileSearchBtn}
            aria-label="Open search"
          >
            <Search size={22} />
          </button>

          <Link 
            href="/cart"
            className={styles.cartBtn}
            aria-label="View shopping cart"
          >
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className={styles.cartBadge}>{totalItems}</span>
            )}
          </Link>
          
          <Link href="/teach" className={styles.teachLink}>
            Teach on Upskiill
          </Link>
          
          <div className={styles.authButtons}>
            {user ? (
              <div className={styles.userProfileWrapper} ref={dropdownRef}>
                 <button 
                   className={styles.userProfileBtn}
                   onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                   aria-label="User menu"
                 >
                   <Avatar 
                     src={user.avatarUrl || undefined} 
                     name={user.fullName} 
                     size="sm" 
                   />
                 </button>

                 {isDropdownOpen && (
                   <div className={styles.authDropdown}>
                     <div className={styles.userInfo}>
                       <span className={styles.userName}>{user.fullName}</span>
                       <span className={styles.userEmail}>{user.email}</span>
                     </div>
                     <Link href="/dashboard" className={styles.dropdownItem} onClick={() => setIsDropdownOpen(false)}>
                       <LayoutGrid size={16} /> Dashboard
                     </Link>
                     <Link href="/profile" className={styles.dropdownItem} onClick={() => setIsDropdownOpen(false)}>
                       <User size={16} /> Edit Profile
                     </Link>
                     <button onClick={handleLogout} className={`${styles.dropdownItem} ${styles.logout}`}>
                       <LogOut size={16} /> Logout
                     </button>
                   </div>
                 )}
              </div>
            ) : (
              <>
                <Link href={pathname === '/teach' ? "/instructor/login" : "/login"} className={styles.loginBtn}>
                  Login
                </Link>
                <Link href={pathname === '/teach' ? "/instructor/signup" : "/signup"} className={styles.signupBtn}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
