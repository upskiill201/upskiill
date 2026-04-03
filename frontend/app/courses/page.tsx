'use client';

import React, { useState, useEffect } from 'react';
import { CourseCard } from '@/components/features/CourseCard';
import { Pagination } from '@/components/ui/Pagination';
import { SearchBar } from '@/components/ui/SearchBar';
import { Dropdown } from '@/components/ui/Dropdown';
import Input from '@/components/ui/Input';
import styles from './Courses.module.css';

// Mock Data for UI Visualization
const MOCK_COURSES = [
  {
    id: "c1",
    title: "Advanced UI/UX Masterclass: From Concept to Launch",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop",
    instructorName: "Alex Rivera",
    instructorAvatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
    rating: 4.9,
    reviewCount: 2400,
    studentsCount: 15400,
    totalHours: 12.5,
    totalLessons: 145,
    price: 89,
    originalPrice: 129,
    discountPercentage: 31,
    isBestseller: true,
    level: "Intermediate",
    category: "Design",
    shortDescription: "Master the complete design lifecycle, from user research and wireframing to high-fidelity prototyping and design handoffs in Figma."
  },
  {
    id: "c2",
    title: "Enterprise React Patterns & Performance",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop",
    instructorName: "Sarah Drasner",
    instructorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 4.8,
    reviewCount: 1100,
    studentsCount: 8200,
    totalHours: 8.75,
    totalLessons: 92,
    price: 149,
    level: "Advanced",
    category: "Engineering",
    shortDescription: "Learn how to architect massively scalable React applications. Covers SSR, Server Components, advanced caching, and performance profiling."
  },
  {
    id: "c3",
    title: "Product Strategy: Building What Matters",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop",
    instructorName: "Marcus Chen",
    instructorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    rating: 5.0,
    reviewCount: 42,
    studentsCount: 315,
    totalHours: 4.25,
    totalLessons: 48,
    price: 69,
    originalPrice: 99,
    discountPercentage: 30,
    isNew: true,
    level: "All Levels",
    category: "Business",
    shortDescription: "A comprehensive playbook for identifying market opportunities, validating ideas, and defining a product roadmap that drives growth."
  },
  {
    id: "c4",
    title: "Mastering Tailwind CSS & Framer Motion",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop",
    instructorName: "Lee Robinson",
    instructorAvatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&h=100&fit=crop",
    rating: 4.7,
    reviewCount: 890,
    studentsCount: 12000,
    totalHours: 6.5,
    totalLessons: 75,
    price: 49,
    isBestseller: true,
    level: "Beginner",
    category: "Design",
    shortDescription: "Build beautiful, highly animated user interfaces in record time using utility-first CSS and React animation libraries."
  },
  {
    id: "c5",
    title: "Fullstack Next.js: Server Components Deep Dive",
    thumbnail: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=600&auto=format&fit=crop",
    instructorName: "Guillermo Rauch",
    instructorAvatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
    rating: 4.9,
    reviewCount: 3200,
    studentsCount: 28500,
    totalHours: 22,
    totalLessons: 240,
    price: 199,
    originalPrice: 249,
    discountPercentage: 20,
    level: "Advanced",
    category: "Engineering",
    shortDescription: "The definitive guide to Next.js App Router. Learn Server Actions, advanced routing, parallel routes, and deploying to the edge."
  },
  {
    id: "c6",
    title: "Data Science for Non-Engineers",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
    instructorName: "Dr. Angela Yu",
    instructorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 4.8,
    reviewCount: 5600,
    studentsCount: 45000,
    totalHours: 15,
    totalLessons: 180,
    price: 89,
    level: "Beginner",
    category: "Data Science",
    shortDescription: "Learn to analyze data, build predictive models, and understand AI fundamentals without needing advanced math or coding experience."
  }
];

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("popular");
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [courses, setCourses] = useState<any[]>(MOCK_COURSES);
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
          }
        }
      } catch (error) {
        console.error('Failed to fetch live courses, falling back to mock data:', error);
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
              <div style={{ padding: '40px', color: '#64748B', textAlign: 'center', gridColumn: '1 / -1' }}>Loading courses...</div>
            ) : courses.map(course => (
              <CourseCard key={course.id} {...course} />
            ))}
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
