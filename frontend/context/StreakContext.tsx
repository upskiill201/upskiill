'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

export interface StreakStats {
  currentStreak: number;
  longestStreak: number;
  lastStreakDate: string | null;
  freezesAvailable: number;
  hasCompletedToday: boolean;
  isNewPersonalBest: boolean;
  streakSocietyUnlocked: boolean;
}

export interface CalendarDay {
  date: string; // YYYY-MM-DD
  dayNumber: number;
  lessonsCompleted: number;
  xpEarned: number;
  isCompleted: boolean;
  isToday: boolean;
  isFuture: boolean;
  isFreezeUsed?: boolean;
}

export interface CalendarData {
  month: string; // YYYY-MM
  year: number;
  monthNumber: number;
  days: CalendarDay[];
}

interface StreakContextValue {
  streakData: StreakStats | null;
  calendarData: CalendarData | null;
  loading: boolean;
  isModalOpen: boolean;
  activeTab: 'PERSONAL' | 'FRIENDS';
  setActiveTab: (tab: 'PERSONAL' | 'FRIENDS') => void;
  openStreakModal: (tab?: 'PERSONAL' | 'FRIENDS') => void;
  closeStreakModal: () => void;
  fetchStreakData: () => Promise<void>;
  fetchCalendar: (monthStr?: string) => Promise<void>;
}

const StreakContext = createContext<StreakContextValue | null>(null);

export function StreakProvider({ children }: { children: React.ReactNode }) {
  const [streakData, setStreakData] = useState<StreakStats | null>(null);
  const [calendarData, setCalendarData] = useState<CalendarData | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'PERSONAL' | 'FRIENDS'>('PERSONAL');

  const fetchStreakData = useCallback(async () => {
    try {
      const tzOffset = new Date().getTimezoneOffset();
      const res = await fetch('/api/streak/me', {
        credentials: 'include',
        headers: { 'x-timezone-offset': tzOffset.toString() },
      });
      if (res.ok) {
        const data = await res.json();
        setStreakData(data);
      }
    } catch (e) {
      console.error('Failed to fetch streak stats:', e);
    }
  }, []);

  const fetchCalendar = useCallback(async (monthStr?: string) => {
    try {
      const tzOffset = new Date().getTimezoneOffset();
      const url = monthStr
        ? `/api/streak/calendar?month=${monthStr}`
        : '/api/streak/calendar';
      const res = await fetch(url, {
        credentials: 'include',
        headers: { 'x-timezone-offset': tzOffset.toString() },
      });
      if (res.ok) {
        const data = await res.json();
        setCalendarData(data);
      }
    } catch (e) {
      console.error('Failed to fetch streak calendar:', e);
    }
  }, []);

  useEffect(() => {
    // Fetch once on mount only. `streakDays` used to be a dependency here,
    // but it comes from GamificationContext and flips from its seeded
    // default to the real server value shortly after mount — which made
    // this effect (and its /api/streak/me call) fire twice per page load.
    fetchStreakData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchStreakData]);

  const openStreakModal = useCallback((tab?: 'PERSONAL' | 'FRIENDS') => {
    if (tab) setActiveTab(tab);
    setIsModalOpen(true);
    fetchStreakData();
    fetchCalendar();
  }, [fetchStreakData, fetchCalendar]);

  const closeStreakModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <StreakContext.Provider
      value={{
        streakData,
        calendarData,
        loading,
        isModalOpen,
        activeTab,
        setActiveTab,
        openStreakModal,
        closeStreakModal,
        fetchStreakData,
        fetchCalendar,
      }}
    >
      {children}
    </StreakContext.Provider>
  );
}

export function useStreakModal() {
  const ctx = useContext(StreakContext);
  if (!ctx) {
    throw new Error('useStreakModal must be used inside <StreakProvider>');
  }
  return ctx;
}
