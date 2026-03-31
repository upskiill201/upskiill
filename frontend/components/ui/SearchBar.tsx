'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import styles from './SearchBar.module.css';

export type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  placeholder?: string;
  size?: 'md' | 'lg';
  suggestions?: string[];
};

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Search...',
  size = 'md',
  suggestions = [],
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const hasSuggestions = suggestions.length > 0 && showSuggestions;

  return (
    <div className={`${styles.container} ${styles[size]}`} ref={containerRef}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <div className={styles.inputWrapper}>
          <Search className={styles.icon} size={size === 'lg' ? 20 : 18} />
          <input
            type="text"
            className={styles.input}
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
          />
        </div>
        <button type="submit" className={styles.submitBtn}>
          Search
        </button>
      </form>
      
      {hasSuggestions && (
        <div className={styles.suggestionsContainer}>
           <ul className={styles.suggestionsList}>
             {suggestions.map((suggestion, index) => (
               <li
                 key={index}
                 className={styles.suggestionItem}
                 onClick={() => handleSuggestionClick(suggestion)}
               >
                 <Search size={14} className={styles.suggestionIcon} />
                 {suggestion}
               </li>
             ))}
           </ul>
        </div>
      )}
    </div>
  );
};
