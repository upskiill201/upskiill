"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Spinner from "@/components/ui/Spinner";
import Avatar from "@/components/ui/Avatar";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { StarRating } from "@/components/ui/StarRating";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Modal } from "@/components/ui/Modal";
import { Tabs } from "@/components/ui/Tabs";
import { Dropdown } from "@/components/ui/Dropdown";
import { SearchBar } from "@/components/ui/SearchBar";
import { Toast } from "@/components/ui/Toast";
import { Tooltip } from "@/components/ui/Tooltip";
import { Pagination } from "@/components/ui/Pagination";
import { EmptyState } from "@/components/ui/EmptyState";
import { Sidebar } from "@/components/layout/Sidebar";
import { CoursePlayerLayout } from "@/components/features/CoursePlayerLayout";
import { CourseCard } from "@/components/features/CourseCard";
// ✅ PROJECT ICON STANDARD: lucide-react for UI icons, react-icons/fa for feature/brand icons
import { Search, ArrowRight, ChevronRight, BookOpen, Plus, Star, Mail, Lock, Eye, User, Heart, Award, Settings } from 'lucide-react';
import { FaTrash, FaRocket, FaGraduationCap } from 'react-icons/fa';

export default function ComponentsPreviewPage() {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const simulateLoad = (id: string) => {
    setLoadingId(id);
    setTimeout(() => setLoadingId(null), 2500);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F5F7FB", padding: "48px 32px", fontFamily: "Inter, sans-serif" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>

        {/* Page Header */}
        <div style={{ marginBottom: "64px" }}>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "#3D5AFE", textTransform: "uppercase", letterSpacing: "1px" }}>
            Component Library
          </span>
          <h1 style={{ fontSize: "40px", fontWeight: 800, color: "#1F2A44", margin: "8px 0 12px" }}>
            Upskiill UI Preview
          </h1>
          <p style={{ color: "#64748B", fontSize: "16px", margin: 0 }}>
            View every built component here at{" "}
            <code style={{ background: "#E2E8F0", padding: "2px 8px", borderRadius: "6px", fontSize: "14px" }}>
              localhost:3000/components
            </code>
          </p>
        </div>

        {/* ─── BUTTON COMPONENT ─────────────────────────────────── */}
        <Section title="Button" file="components/ui/Button.tsx" status="done">

          {/* Variants */}
          <Group label="Variants (default md size)">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="ghost">Ghost</Button>
          </Group>

          {/* Sizes */}
          <Group label="Sizes — Primary">
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
          </Group>

          <Group label="Sizes — Secondary">
            <Button variant="secondary" size="sm">Small</Button>
            <Button variant="secondary" size="md">Medium</Button>
            <Button variant="secondary" size="lg">Large</Button>
          </Group>

          {/* With Icons */}
          <Group label="With Icons — using lucide-react + react-icons/fa">
            <Button variant="primary" leftIcon={<Search size={16} />}>Search Courses</Button>
            <Button variant="primary" rightIcon={<ArrowRight size={16} />}>Start Learning</Button>
            <Button variant="secondary" rightIcon={<ChevronRight size={16} />}>Browse All</Button>
            <Button variant="secondary" leftIcon={<BookOpen size={16} />}>My Courses</Button>
            <Button variant="danger" leftIcon={<FaTrash size={14} />}>Delete</Button>
            <Button variant="outline" leftIcon={<Plus size={16} />}>Add Course</Button>
            <Button variant="primary" leftIcon={<FaGraduationCap size={15} />}>Enroll Now</Button>
            <Button variant="ghost" leftIcon={<FaRocket size={14} />}>Quick Start</Button>
          </Group>

          {/* Loading States */}
          <Group label="Loading States (click to trigger)">
            <Button
              variant="primary"
              loading={loadingId === "p"}
              onClick={() => simulateLoad("p")}
            >
              {loadingId === "p" ? "Creating..." : "Create Account"}
            </Button>
            <Button
              variant="secondary"
              loading={loadingId === "s"}
              onClick={() => simulateLoad("s")}
            >
              {loadingId === "s" ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              variant="danger"
              loading={loadingId === "d"}
              onClick={() => simulateLoad("d")}
            >
              {loadingId === "d" ? "Deleting..." : "Delete Course"}
            </Button>
          </Group>

          {/* Disabled States */}
          <Group label="Disabled States">
            <Button variant="primary" disabled>Primary Disabled</Button>
            <Button variant="secondary" disabled>Secondary Disabled</Button>
            <Button variant="outline" disabled>Outline Disabled</Button>
            <Button variant="danger" disabled>Danger Disabled</Button>
            <Button variant="ghost" disabled>Ghost Disabled</Button>
          </Group>

          {/* Full Width */}
          <Group label="Full Width">
            <div style={{ width: "100%", maxWidth: "400px" }}>
              <Button variant="primary" size="lg" fullWidth>
                Enroll Now — Full Width
              </Button>
            </div>
          </Group>

          {/* On Dark Background */}
          <Group label="On Dark Background" dark>
            <Button variant="primary">Start Teaching</Button>
            <Button variant="secondary">Learn More</Button>
            <Button variant="ghost">Skip for now</Button>
          </Group>

          {/* Real Use Case Examples */}
          <Group label="Real Examples">
            <Button variant="primary" size="lg" rightIcon={<ArrowRight size={18} />}>
              Start Learning Today
            </Button>
            <Button variant="secondary" size="md">
              Browse All Courses
            </Button>
            <Button variant="ghost" size="sm">
              Skip for now
            </Button>
          </Group>

        </Section>

        {/* ─── BADGE COMPONENT ──────────────────────────────────── */}
        <Section title="Badge" file="components/ui/Badge.tsx" status="done">
          
          <Group label="Variants (default md size)">
            <Badge variant="blue">Blue</Badge>
            <Badge variant="yellow">Yellow</Badge>
            <Badge variant="green">Green</Badge>
            <Badge variant="red">Red</Badge>
            <Badge variant="purple">Purple</Badge>
            <Badge variant="grey">Grey</Badge>
          </Group>

          <Group label="Dark Variant" dark>
            <Badge variant="dark">Dark Variant</Badge>
          </Group>

          <Group label="Sizes">
            <Badge size="sm">Small (sm)</Badge>
            <Badge size="md">Medium (md)</Badge>
          </Group>

          <Group label="With Icons">
            <Badge variant="yellow" icon={<Star size={12} strokeWidth={3} />}>Bestseller</Badge>
            <Badge variant="green" icon={<FaRocket size={10} />}>New Version</Badge>
            <Badge variant="blue" icon={<BookOpen size={12} />}>Course Topic</Badge>
          </Group>

        </Section>

        {/* ─── SPINNER COMPONENT ────────────────────────────────── */}
        <Section title="Spinner" file="components/ui/Spinner.tsx" status="done">
          
          <Group label="Colors">
            <div style={{ padding: "0 10px" }}><Spinner color="blue" /></div>
            <div style={{ padding: "0 10px", background: "#3D5AFE", borderRadius: "8px" }}><Spinner color="white" /></div>
            <div style={{ padding: "0 10px" }}><Spinner color="grey" /></div>
          </Group>

          <Group label="Sizes (blue/grey)">
            <Spinner size="xs" color="grey" />
            <Spinner size="sm" color="blue" />
            <Spinner size="md" color="blue" />
            <Spinner size="lg" color="grey" />
          </Group>

          <Group label="Centered Prop (takes full width)">
            <div style={{ width: "100%", border: "1px dashed #CBD5E1", borderRadius: "8px" }}>
              <Spinner centered />
            </div>
          </Group>

        </Section>

        {/* ─── AVATAR COMPONENT ─────────────────────────────────── */}
        <Section title="Avatar" file="components/ui/Avatar.tsx" status="done">
          
          <Group label="Sizes (with Ring and Image)">
            <Avatar size="xs" ring src="https://i.pravatar.cc/150?u=1" />
            <Avatar size="sm" ring src="https://i.pravatar.cc/150?u=2" />
            <Avatar size="md" ring src="https://i.pravatar.cc/150?u=3" />
            <Avatar size="lg" ring src="https://i.pravatar.cc/150?u=4" />
            <Avatar size="xl" ring src="https://i.pravatar.cc/150?u=5" />
          </Group>

          <Group label="Initials Fallback (no src, but name provided)">
            <Avatar size="sm" name="Amara Diallo" />
            <Avatar size="md" name="John Doe" />
            <Avatar size="lg" name="Sarah Connor" />
          </Group>

          <Group label="Icon Fallback (no src, no name)">
            <Avatar size="md" />
            <Avatar size="lg" />
          </Group>

          <Group label="Online Indicators (Active Status)">
            <Avatar size="md" name="Online User" online />
            <Avatar size="xl" src="https://i.pravatar.cc/150?u=6" online ring />
          </Group>

        </Section>

        {/* ─── INPUT COMPONENT ──────────────────────────────────── */}
        <Section title="Input" file="components/ui/Input.tsx" status="done">
          
          <Group label="Default">
            <div style={{ width: "100%", maxWidth: "400px" }}>
              <Input id="basic" name="basic" placeholder="Enter text..." />
            </div>
          </Group>

          <Group label="With Labels and Hints">
            <div style={{ width: "100%", maxWidth: "400px" }}>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                label="Email Address" 
                placeholder="you@email.com" 
                hint="We will never share your email." 
              />
            </div>
          </Group>

          <Group label="With Icons">
            <div style={{ width: "100%", maxWidth: "400px", display: "flex", flexDirection: "column", gap: "16px" }}>
              <Input 
                id="search" 
                name="search" 
                placeholder="Search courses..." 
                leftIcon={<Search size={18} />} 
              />
              <Input 
                id="password" 
                name="password" 
                type="password" 
                placeholder="Password" 
                leftIcon={<Lock size={18} />} 
                rightIcon={<button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}><Eye size={18} /></button>}
              />
            </div>
          </Group>

          <Group label="Error State">
            <div style={{ width: "100%", maxWidth: "400px" }}>
              <Input 
                id="error" 
                name="error" 
                label="Confirm Password" 
                defaultValue="passwor" 
                error="Passwords do not match." 
              />
            </div>
          </Group>

          <Group label="Disabled">
            <div style={{ width: "100%", maxWidth: "400px" }}>
              <Input id="disabled" name="disabled" disabled value="Cannot edit me" />
            </div>
          </Group>

        </Section>

        {/* ─── TEXTAREA COMPONENT ───────────────────────────────── */}
        <Section title="Textarea" file="components/ui/Textarea.tsx" status="done">
          
          <Group label="Basic Usage">
            <div style={{ width: "100%", maxWidth: "600px" }}>
              <Textarea 
                id="bio" 
                name="bio" 
                label="Instructor Bio" 
                placeholder="Tell us about yourself..." 
              />
            </div>
          </Group>

          <Group label="With Character Counter">
            <div style={{ width: "100%", maxWidth: "600px" }}>
              <Textarea 
                id="review" 
                name="review" 
                label="Leave a Review" 
                placeholder="What did you think of this course?" 
                maxLength={250} 
                defaultValue="Excellent course! Very clear instructions." 
              />
            </div>
          </Group>

          <Group label="Error State">
            <div style={{ width: "100%", maxWidth: "600px" }}>
              <Textarea 
                id="error-msg" 
                name="error-msg" 
                label="Contact Message" 
                error="Message cannot be empty." 
              />
            </div>
          </Group>

        </Section>

        {/* ─── STARRATING COMPONENT ───────────────────────────── */}
        <Section title="StarRating" file="components/ui/StarRating.tsx" status="done">
          <Group label="Interactive Mode (Hover & Click)">
            <StarRating value={3} interactive />
            <StarRating value={0} interactive size="lg" />
          </Group>
          <Group label="Read-Only Mode (+ Half Stars & Review Count)">
            <StarRating value={4.5} reviewCount={2456} />
            <StarRating value={3.5} size="sm" reviewCount={12} />
            <StarRating value={5} size="lg" reviewCount={8420} />
          </Group>
        </Section>

        {/* ─── MODAL COMPONENT ──────────────────────────── */}
        <Section title="Modal" file="components/ui/Modal.tsx" status="done">
          <Group label="Basic Modal">
            <ModalDemo />
          </Group>
        </Section>

        {/* ─── TABS COMPONENT ───────────────────────────── */}
        <Section title="Tabs" file="components/ui/Tabs.tsx" status="done">
          <Group label="Underline Variant (used on Course Detail)">
            <div style={{ width: "100%" }}>
              <TabsDemo variant="underline" />
            </div>
          </Group>
          <Group label="Pill Variant (used on Top Courses filter)">
             <div style={{ width: "100%" }}>
              <TabsDemo variant="pill" />
            </div>
          </Group>
        </Section>

        {/* ─── PROGRESSBAR COMPONENT ──────────────────────────── */}
        <Section title="ProgressBar" file="components/ui/ProgressBar.tsx" status="done">
          <Group label="Colors & Percentages (Value: 65%)">
            <ProgressBar value={65} color="blue" showPercentage />
            <ProgressBar value={65} color="green" showPercentage />
            <ProgressBar value={65} color="purple" showPercentage />
          </Group>
          <Group label="With Labels">
            <ProgressBar value={33} label="12 of 36 lessons complete" color="blue" />
            <ProgressBar value={100} label="Course completed!" color="green" />
          </Group>
          <Group label="Sizes">
            <ProgressBar value={40} size="sm" label="Small size (sm)" />
            <ProgressBar value={40} size="md" label="Medium size (md)" />
          </Group>
        </Section>

        {/* ─── DROPDOWN COMPONENT ───────────────────────────── */}
        <Section title="Dropdown" file="components/ui/Dropdown.tsx" status="done">
          <Group label="Basic Select">
            <DropdownDemo />
          </Group>
        </Section>

        {/* ─── SEARCHBAR COMPONENT ──────────────────────────── */}
        <Section title="SearchBar" file="components/ui/SearchBar.tsx" status="done">
          <Group label="Large search with auto-suggest (Type to see suggestions)">
            <SearchBarDemo />
          </Group>
        </Section>

        {/* ─── TOAST COMPONENT ──────────────────────────────── */}
        <Section title="Toast" file="components/ui/Toast.tsx" status="done">
          <Group label="Notification Variants (Appears bottom-right)">
            <ToastDemo />
          </Group>
        </Section>

        {/* ─── TOOLTIP COMPONENT ────────────────────────────── */}
        <Section title="Tooltip" file="components/ui/Tooltip.tsx" status="done">
          <Group label="Hover Positions">
            <Tooltip content="Tooltip on top" position="top">
              <span style={{ padding: "8px 16px", background: "#E2E8F0", borderRadius: "8px", cursor: "default", color: "#1F2A44" }}>Top</span>
            </Tooltip>
            <Tooltip content="Tooltip on right" position="right">
              <span style={{ padding: "8px 16px", background: "#E2E8F0", borderRadius: "8px", cursor: "default", color: "#1F2A44" }}>Right</span>
            </Tooltip>
            <Tooltip content="Tooltip on bottom" position="bottom">
              <span style={{ padding: "8px 16px", background: "#E2E8F0", borderRadius: "8px", cursor: "default", color: "#1F2A44" }}>Bottom</span>
            </Tooltip>
            <Tooltip content="Tooltip on left" position="left">
              <span style={{ padding: "8px 16px", background: "#E2E8F0", borderRadius: "8px", cursor: "default", color: "#1F2A44" }}>Left</span>
            </Tooltip>
          </Group>
        </Section>

        {/* ─── PAGINATION COMPONENT ───────────────────────────── */}
        <Section title="Pagination" file="components/ui/Pagination.tsx" status="done">
          <Group label="Basic Usage (12 pages total)">
             <PaginationDemo />
          </Group>
        </Section>

        {/* ─── EMPTYSTATE COMPONENT ───────────────────────────── */}
        <Section title="EmptyState" file="components/ui/EmptyState.tsx" status="done">
          <Group label="Example: No Courses Found">
            <EmptyState 
              icon={<Search />} 
              title="No courses found" 
              description="We couldn't find any courses matching your search criteria. Try adjusting your filters." 
              action={<Button variant="primary">Clear Filters</Button>}
            />
          </Group>
        </Section>

        {/* ─── SIDEBAR COMPONENT ────────────────────────────── */}
        <Section title="Sidebar" file="components/layout/Sidebar.tsx" status="done">
          <Group label="Dashboard Mode">
            <div style={{ width: "100%" }}>
              <SidebarDashboardDemo />
            </div>
          </Group>
          <Group label="Course Player Mode">
            <div style={{ width: "100%" }}>
              <SidebarPlayerDemo />
            </div>
          </Group>
        </Section>

        {/* ─── COURSE PLAYER LAYOUT ────────────────────────────── */}
        <Section title="Course Player UI" file="components/features/CoursePlayerLayout.tsx" status="done">
          <Group label="Full Video/Lesson Interface (All 8 Items)">
            <div style={{ width: "100%" }}>
              <CoursePlayerLayout />
            </div>
          </Group>
        </Section>

        {/* ─── COURSE CARD ────────────────────────────── */}
        <Section title="CourseCard" file="components/features/CourseCard.tsx" status="done">
          <Group label="Standard Course Cards">
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <CourseCard 
                id="react-101"
                title="Complete React Developer in 2026 (w/ Redux, Hooks, GraphQL)"
                thumbnail="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop"
                instructorName="Andrei Neagoie"
                instructorAvatar="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop"
                rating={4.8}
                reviewCount={32450}
                studentsCount={124500}
                totalHours={38}
                totalLessons={420}
                price={49.99}
                originalPrice={129.99}
                discountPercentage={61}
                isBestseller
                level="All Levels"
                category="Web Development"
                shortDescription="Master the React ecosystem from scratch. Build massive, scalable applications using Redux Toolkit, Context API, Hooks, and Next.js 14 in this comprehensive bootcamp."
              />
              <CourseCard 
                id="design-basics"
                title="Figma UI/UX Design Essentials"
                thumbnail="https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop"
                instructorName="Daniel Scott"
                instructorAvatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                rating={4.7}
                reviewCount={11200}
                totalHours={12}
                totalLessons={115}
                price={19.99}
                isNew
                level="Beginner"
                category="Design"
              />
            </div>
          </Group>
          <Group label="Enrolled / Progress State">
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <CourseCard 
                id="python-bootcamp"
                title="100 Days of Code: The Complete Python Pro Bootcamp"
                thumbnail="https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=600&auto=format&fit=crop"
                instructorName="Dr. Angela Yu"
                instructorAvatar="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
                rating={4.9}
                reviewCount={95000}
                totalHours={60}
                totalLessons={630}
                price={89.99}
                isEnrolled
                progress={34}
              />
            </div>
          </Group>
        </Section>

      </div>
    </div>
  );
}

/* ─── Helper Sub-components for the demo page ─── */

function ModalDemo() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Button variant="outline" onClick={() => setIsOpen(true)}>Open Action Modal</Button>
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        title="Complete Enrollment"
        footer={<><Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button><Button variant="primary" onClick={() => setIsOpen(false)}>Confirm</Button></>}
      >
        <p style={{ color: '#64748B', lineHeight: 1.6, margin: 0 }}>Are you sure you want to enroll in this course? This will immediately give you lifetime access to all core modules and any future updates.</p>
      </Modal>
    </div>
  );
}

function TabsDemo({ variant }: { variant: 'underline' | 'pill' }) {
  const [activeTab, setActiveTab] = useState("overview");
  const tabs = [
    { label: "Overview", value: "overview" },
    { label: "Curriculum", value: "curriculum", count: 24 },
    { label: "Reviews", value: "reviews", count: 128 },
  ];
  return <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant={variant} />;
}

function DropdownDemo() {
  const [val, setVal] = useState("");
  const opts = [
    { label: "Most Popular", value: "popular" },
    { label: "Newest Arrivals", value: "newest" },
    { label: "Highest Rated", value: "rating" },
  ];
  return <Dropdown options={opts} value={val} onChange={setVal} placeholder="Sort by..." width="200px" />;
}

function SearchBarDemo() {
  const [query, setQuery] = useState("");
  const suggs = query.length > 0 ? ["React Course", "Python for Beginners", "UI/UX Design"] : [];
  return (
    <div style={{ width: "100%", maxWidth: "600px" }}>
      <SearchBar 
        value={query} 
        onChange={setQuery} 
        onSearch={(q) => console.log('Searching for:', q)} 
        placeholder="What do you want to learn?" 
        size="lg"
        suggestions={suggs}
      />
    </div>
  );
}

function ToastDemo() {
  const [toastConfig, setToastConfig] = useState<{ message: string, type: 'success' | 'error' | 'info' | 'warning', key: number } | null>(null);

  const showToast = (type: 'success' | 'error' | 'info' | 'warning') => {
    setToastConfig({
      message: `This is a ${type} notification message!`,
      type,
      key: Date.now() // ensures a re-mount for animation
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button variant="outline" onClick={() => showToast('success')}>Success</Button>
        <Button variant="outline" onClick={() => showToast('error')}>Error</Button>
        <Button variant="outline" onClick={() => showToast('info')}>Info</Button>
        <Button variant="outline" onClick={() => showToast('warning')}>Warning</Button>
      </div>
      {toastConfig && (
        <Toast 
          key={toastConfig.key}
          message={toastConfig.message} 
          type={toastConfig.type} 
          onClose={() => setToastConfig(null)} 
        />
      )}
    </div>
  );
}

function PaginationDemo() {
  const [page, setPage] = useState(1);
  return (
    <Pagination 
      currentPage={page} 
      totalPages={12} 
      onPageChange={setPage} 
      showPageCount 
    />
  );
}


function SidebarDashboardDemo() {
  const links = [
    { id: '1', label: 'My Courses', href: '#', icon: <BookOpen size={18} /> },
    { id: '2', label: 'Profile', href: '#', icon: <User size={18} /> },
    { id: '3', label: 'Wishlist', href: '#', icon: <Heart size={18} /> },
    { id: '4', label: 'Certificates', href: '#', icon: <Award size={18} /> },
    { id: '5', label: 'Settings', href: '#', icon: <Settings size={18} /> },
  ];
  return (
    <div style={{ height: '600px', display: 'flex', border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
      <Sidebar mode="dashboard" dashboardLinks={links} activeLinkId="1" />
      <div style={{ padding: '24px', flex: 1, backgroundColor: '#F8FAFC' }}>
        <h3>Dashboard Content Area</h3>
        <p>This is where the dashboard content goes.</p>
      </div>
    </div>
  );
}

function SidebarPlayerDemo() {
  const [activeLesson, setActiveLesson] = useState('l1');
  const courseSections = [
    {
      id: 's1',
      title: 'Section 1: Introduction',
      lessons: [
        { id: 'l1', title: 'Welcome to the Course', duration: '2:30', isCompleted: true, isLocked: false },
        { id: 'l2', title: 'What you will learn', duration: '5:15', isCompleted: false, isLocked: false },
      ]
    },
    {
      id: 's2',
      title: 'Section 2: Deep Dive',
      lessons: [
        { id: 'l3', title: 'Core Concepts', duration: '12:45', isCompleted: false, isLocked: true },
        { id: 'l4', title: 'Advanced Techniques', duration: '18:20', isCompleted: false, isLocked: true },
      ]
    }
  ];

  return (
    <div style={{ height: '600px', display: 'flex', border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
      <Sidebar 
        mode="coursePlayer" 
        courseTitle="Complete React Developer Bootcamp"
        courseProgress={35}
        courseSections={courseSections} 
        activeLessonId={activeLesson}
        onLessonClick={setActiveLesson}
      />
      <div style={{ padding: '24px', flex: 1, backgroundColor: '#111827', color: 'white' }}>
        <h3>Video Player Area</h3>
        <div style={{ width: '100%', height: '300px', backgroundColor: '#000', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Video Player Placeholder
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  file,
  status,
  children,
}: {
  title: string;
  file: string;
  status: "done" | "todo";
  children: React.ReactNode;
}) {
  return (
    <div style={{
      background: "#ffffff",
      borderRadius: "16px",
      border: "1px solid #E2E8F0",
      padding: "32px",
      marginBottom: "32px",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1F2A44", margin: 0 }}>{title}</h2>
            <span style={{
              padding: "3px 10px",
              borderRadius: "999px",
              fontSize: "11px",
              fontWeight: 700,
              backgroundColor: status === "done" ? "#D1FAE5" : "#F1F5F9",
              color: status === "done" ? "#065F46" : "#94A3B8",
            }}>
              {status === "done" ? "✅ BUILT" : "⏳ TODO"}
            </span>
          </div>
          <code style={{ fontSize: "12px", color: "#94A3B8" }}>{file}</code>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        {children}
      </div>
    </div>
  );
}

function Group({
  label,
  children,
  dark = false,
}: {
  label: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div>
      <p style={{
        fontSize: "12px",
        fontWeight: 600,
        color: "#94A3B8",
        textTransform: "uppercase",
        letterSpacing: "0.8px",
        marginBottom: "16px",
        marginTop: 0,
      }}>
        {label}
      </p>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "12px",
        padding: "24px",
        borderRadius: "12px",
        backgroundColor: dark ? "#1F2A44" : "#F5F7FB",
      }}>
        {children}
      </div>
    </div>
  );
}
