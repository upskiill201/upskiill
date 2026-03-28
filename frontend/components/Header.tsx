import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Search, ShoppingCart } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
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
          <button className={styles.cartBtn}>
            <ShoppingCart size={20} />
            <span className={styles.cartBadge}>0</span>
          </button>
          
          <Link href="/instructor" className={styles.teachLink}>
            Teach on Upskiill
          </Link>
          
          <div className={styles.authButtons}>
            <Link href="/login" className={styles.loginBtn}>
              Login
            </Link>
            <Link href="/signup" className={styles.signupBtn}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
