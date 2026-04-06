"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, Search, ShoppingCart, Menu } from 'lucide-react';
import { useCart } from '../context/CartContext';
import styles from './Header.module.css';

export default function Header() {
  const { totalItems } = useCart();
  const pathname = usePathname();
  if (pathname === '/signup' || pathname === '/login' || pathname.startsWith('/dashboard') || pathname.startsWith('/instructor')) return null;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* ... (previous mobile menu button code) ... */}
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
            <Link href={pathname === '/teach' ? "/instructor/login" : "/login"} className={styles.loginBtn}>
              Login
            </Link>
            <Link href={pathname === '/teach' ? "/instructor/signup" : "/signup"} className={styles.signupBtn}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
