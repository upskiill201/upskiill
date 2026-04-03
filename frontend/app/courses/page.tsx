'use client';

import React, { useState, useEffect } from 'react';
import { CourseCard } from '@/components/features/CourseCard';
import { Pagination } from '@/components/ui/Pagination';
import { SearchBar } from '@/components/ui/SearchBar';
import { Dropdown } from '@/components/ui/Dropdown';
import Input from '@/components/ui/Input';
import styles from './Courses.module.css';



export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("popular");
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const res = await fetch(`${apiUrl}/courses`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
             // eslint-disable-next-line @typescript-eslint/no-explicit-any
             const mappedCourses = data.map((c: any) => ({
               id: c.id,
               slug: c.slug,
               title: c.title,
               thumbnail: c.thumbnailUrl || "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop",
               instructorName: c.instructor?.fullName || "Instructor",
               instructorAvatar: c.instructor?.avatarUrl || "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
               rating: c.rating || 4.5,
               reviewCount: c.reviewsCount || 0,
               studentsCount: c.studentsCount || 0,
               totalHours: parseFloat(c.duration) || 10,
               totalLessons: 50, // Mock fallback for MVP
               price: c.price,
               originalPrice: c.originalPrice,
               category: c.category,
               level: c.level,
               shortDescription: c.shortDescription || c.description?.substring(0, 100),
             }));
             setCourses(mappedCourses);
          } else {
             console.warn('API returned 0 courses. Showing empty state.');
          }
        } else {
             console.error('API call failed with status:', res.status);
        }
      } catch (error) {
        console.error('Failed to fetch live courses:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCourses();
  }, []);

  const sortOptions = [
    { label: "Most Popular", value: "popular" },
    { label: "Highest Rated", value: "rating" },
    { label: "Newest Arrivals", value: "new" },
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
  ];

  const pillTags = ["UI/UX Design", "Frontend Dev", "Product Management", "Data Science"];
  
  // Provide auto-suggestions just for demo when user types
  const suggestions = searchQuery.length > 0 
    ? ["Complete React Developer", "Figma UI/UX Design", "Product Strategy for Beginners"]
    : [];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        
        {/* ─── SIDEBAR FILTERS ─── */}
        <aside className={styles.sidebar}>
          <div className={styles.filterHeader}>
            <h2 className={styles.filterTitle}>Filters</h2>
            <button className={styles.clearAllBtn}>Clear all</button>
          </div>

          <div className={styles.filterSection}>
            <h3 className={styles.filterSectionTitle}>Category</h3>
            <label className={styles.checkboxItem}>
              <div className={styles.checkboxLabel}>
                <input type="checkbox" className={styles.checkboxInput} defaultChecked />
                Design & UX
              </div>
              <span className={styles.checkboxCount}>124</span>
            </label>
            <label className={styles.checkboxItem}>
              <div className={styles.checkboxLabel}>
                <input type="checkbox" className={styles.checkboxInput} />
                Engineering
              </div>
              <span className={styles.checkboxCount}>86</span>
            </label>
            <label className={styles.checkboxItem}>
              <div className={styles.checkboxLabel}>
                <input type="checkbox" className={styles.checkboxInput} />
                Business & Strategy
              </div>
              <span className={styles.checkboxCount}>42</span>
            </label>
          </div>

          <div className={styles.filterSection}>
            <h3 className={styles.filterSectionTitle}>Level</h3>
            <label className={styles.checkboxItem}>
              <div className={styles.checkboxLabel}>
                <input type="checkbox" className={styles.checkboxInput} />
                Beginner
              </div>
            </label>
            <label className={styles.checkboxItem}>
              <div className={styles.checkboxLabel}>
                <input type="checkbox" className={styles.checkboxInput} defaultChecked />
                Intermediate
              </div>
            </label>
            <label className={styles.checkboxItem}>
              <div className={styles.checkboxLabel}>
                <input type="checkbox" className={styles.checkboxInput} />
                Advanced
              </div>
            </label>
          </div>

          <div className={styles.filterSection}>
            <h3 className={styles.filterSectionTitle}>Price Range</h3>
            <div className={styles.priceInputs}>
              <Input id="minPrice" name="minPrice" placeholder="$ Min" />
              <span className={styles.priceDash}>-</span>
              <Input id="maxPrice" name="maxPrice" placeholder="$ Max" />
            </div>
          </div>
        </aside>

        {/* ─── MAIN CONTENT ─── */}
        <main className={styles.mainContent}>
          
          {/* Top Banner (Search & Tags) */}
          <div className={styles.topBanner}>
            <h1 className={styles.bannerTitle}>Explore Premium Courses</h1>
            <p className={styles.bannerSubtitle}>Master new skills with industry leaders and elite instructors.</p>
            
            <div className={styles.searchWrapper}>
              <SearchBar 
                value={searchQuery}
                onChange={setSearchQuery}
                onSearch={(q) => console.log('Searching for', q)}
                placeholder="What do you want to learn today?"
                size="lg"
                suggestions={suggestions}
              />
            </div>

            <div className={styles.pillTags}>
              {pillTags.map((tag, i) => (
                <button key={i} className={`${styles.pillTag} ${i === 0 ? styles.active : ''}`}>
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Results Header */}
          <div className={styles.resultsHeader}>
            <span className={styles.resultsCount}>
              Showing <span className={styles.resultsHighlight}>24</span> results for &quot;Design&quot;
            </span>
            <div className={styles.sortWrapper}>
              <span className={styles.sortLabel}>Sort by:</span>
              <Dropdown 
                options={sortOptions} 
                value={sortOption} 
                onChange={setSortOption} 
              />
            </div>
          </div>

          {/* Course Grid */}
          <div className={styles.courseGrid}>
            {isLoading ? (
              <div style={{ padding: '80px 0', textAlign: 'center', gridColumn: '1 / -1' }}>
                <div style={{ fontSize: '18px', color: '#64748B', marginBottom: '8px' }}>Loading the marketplace...</div>
                <div style={{ fontSize: '14px', color: '#94A3B8' }}>Fetching elite courses from the cloud.</div>
              </div>
            ) : courses.length > 0 ? (
              courses.map(course => (
                <CourseCard key={course.id} {...course} />
              ))
            ) : (
              <div style={{ padding: '80px 0', textAlign: 'center', gridColumn: '1 / -1' }}>
                <div style={{ fontSize: '18px', color: '#64748B', marginBottom: '8px' }}>No courses found in the database.</div>
                <div style={{ fontSize: '14px', color: '#94A3B8' }}>Try running the prisma seeder to populate the marketplace.</div>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className={styles.paginationWrapper}>
            <Pagination 
              currentPage={currentPage}
              totalPages={8}
              onPageChange={setCurrentPage}
            />
          </div>

        </main>
      </div>
    </div>
  );
}
