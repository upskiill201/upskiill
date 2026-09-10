'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Volume2,
  VolumeX,
  Play,
  Square,
  RotateCcw,
  Download,
  Upload,
  Music,
  Sliders,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Sparkles,
  Search,
  Check,
  Layers,
  Settings2,
  Headphones,
  Zap,
  Info,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '@/lib/audio/useAudio';
import { SoundId, SoundCategory, SoundConfig } from '@/lib/audio/soundRegistry';

// Category Configuration with icons & colors
const CATEGORIES: { id: 'all' | SoundCategory; label: string; icon: string; description: string; color: string; bg: string }[] = [
  { id: 'all', label: 'All Sounds', icon: '✨', description: 'Complete Teyro sound registry', color: '#0172FD', bg: '#F0F7FF' },
  { id: 'ui', label: 'UI Sounds', icon: '🕹️', description: 'Buttons, tabs, toggles, menus & drawers', color: '#0172FD', bg: '#F0F7FF' },
  { id: 'music', label: 'Music Tracks', icon: '🎵', description: 'Background ambience & loops', color: '#FF9600', bg: '#FFF7ED' },
  { id: 'learning', label: 'Learning', icon: '🧠', description: 'Lessons, concepts, practice & quizzes', color: '#8B5CF6', bg: '#F3E8FF' },
  { id: 'rewards', label: 'Rewards', icon: '🏆', description: 'XP grants, streak chests & achievements', color: '#58CC02', bg: '#F0FDF4' },
  { id: 'mascot', label: 'Mascot (Tey)', icon: '🐥', description: 'Tey reactions, voice clips & animations', color: '#EC4899', bg: '#FDF2F8' },
  { id: 'ai', label: 'AI Voice', icon: '🤖', description: 'Interactive AI coaching voice notes', color: '#06B6D4', bg: '#ECFEFF' },
  { id: 'notifications', label: 'Notifications', icon: '🔔', description: 'Push alerts & reminder chimes', color: '#6366F1', bg: '#EEF2FF' },
];

// Sound Icon Mapping
const SOUND_ICONS: Record<SoundId, { emoji: string; badgeColor: string; badgeBg: string }> = {
  BUTTON_PRIMARY: { emoji: '🚀', badgeColor: '#0172FD', badgeBg: '#F0F7FF' },
  BUTTON_SECONDARY: { emoji: '👌', badgeColor: '#64748B', badgeBg: '#F1F5F9' },
  SELECTION: { emoji: '✓', badgeColor: '#58CC02', badgeBg: '#F0FDF4' },
  SUCCESS_CONFIRM: { emoji: '✨', badgeColor: '#0172FD', badgeBg: '#F0F7FF' },
  ERROR_SOFT: { emoji: '🙈', badgeColor: '#FF4B4B', badgeBg: '#FFF0F0' },
  CORRECT: { emoji: '🎉', badgeColor: '#58CC02', badgeBg: '#F0FDF4' },
  TAB_SWITCH: { emoji: '➜', badgeColor: '#8B5CF6', badgeBg: '#F3E8FF' },
  MENU_OPEN_CLOSE: { emoji: '📂', badgeColor: '#06B6D4', badgeBg: '#ECFEFF' },
  TOGGLE: { emoji: '🔄', badgeColor: '#FF9600', badgeBg: '#FFF7ED' },
  BACKGROUND_MUSIC: { emoji: '🎵', badgeColor: '#FF9600', badgeBg: '#FFF7ED' },
};

export default function AudioSettingsPage() {
  const {
    isMuted,
    isSfxEnabled,
    isMusicEnabled,
    volumes,
    registry,
    toggleMute,
    setSfxEnabled,
    setMusicEnabled,
    setVolume,
    updateSoundConfig,
    play,
    stopAll,
    resetToDefault,
    exportConfigJson,
    importConfigJson,
  } = useAudio();

  const [selectedCategory, setSelectedCategory] = useState<'all' | SoundCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [playingId, setPlayingId] = useState<SoundId | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handlePlaySound = async (id: SoundId) => {
    setPlayingId(id);
    await play(id);
    setTimeout(() => {
      setPlayingId(prev => (prev === id ? null : prev));
    }, 1400);
  };

  const handleExportJson = () => {
    const jsonStr = exportConfigJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `teyro-audio-config-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Audio configuration exported!');
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      if (content) {
        const success = importConfigJson(content);
        if (success) {
          showToast('Audio configuration imported!');
        } else {
          showToast('Invalid JSON file format.', 'error');
        }
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const registeredList = (Object.values(registry) as SoundConfig[]).filter(cfg => {
    const matchesCategory = selectedCategory === 'all' || cfg.category === selectedCategory;
    const matchesSearch =
      cfg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cfg.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cfg.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalSoundsCount = Object.keys(registry).length;
  const musicCount = Object.values(registry).filter(c => c.category === 'music').length;
  const uiCount = Object.values(registry).filter(c => c.category === 'ui').length;
  const enabledCount = Object.values(registry).filter(c => c.enabled).length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans select-none pb-24">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 border ${
              notification.type === 'success'
                ? 'bg-[#58CC02] border-[#46A302] text-white shadow-[#58CC02]/25'
                : 'bg-[#FF4B4B] border-[#E03131] text-white shadow-[#FF4B4B]/25'
            }`}
          >
            {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="font-extrabold text-sm" style={{ fontFamily: 'var(--font-jakarta)' }}>{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Teyro Top Bar */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              onClick={() => play('BUTTON_SECONDARY')}
              className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200/80 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <Headphones className="w-6 h-6 text-[#0172FD]" />
                <h1 className="text-2xl font-[900] text-slate-900 tracking-tight" style={{ fontFamily: 'var(--font-jakarta)' }}>
                  Audio Settings
                </h1>
              </div>
              <p className="text-xs font-semibold text-slate-500 mt-0.5" style={{ fontFamily: 'var(--font-jakarta)' }}>
                Manage music, sound effects, volume levels, and audio behavior.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportJson}
              className="h-11 px-4 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 active:translate-y-0.5 transition-all text-xs font-extrabold flex items-center gap-2 cursor-pointer shadow-sm"
              style={{ fontFamily: 'var(--font-jakarta)' }}
            >
              <Download className="w-4 h-4 text-[#0172FD]" />
              <span>Export JSON</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="h-11 px-4 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 active:translate-y-0.5 transition-all text-xs font-extrabold flex items-center gap-2 cursor-pointer shadow-sm"
              style={{ fontFamily: 'var(--font-jakarta)' }}
            >
              <Upload className="w-4 h-4 text-[#58CC02]" />
              <span>Import JSON</span>
            </button>
            <input ref={fileInputRef} type="file" accept=".json" onChange={handleImportJson} className="hidden" />

            <button
              onClick={resetToDefault}
              className="h-11 px-4 rounded-2xl bg-[#0172FD] border-b-4 border-[#0050B3] text-white hover:bg-[#0060D9] active:border-b-0 active:translate-y-1 transition-all text-xs font-[900] flex items-center gap-2 cursor-pointer shadow-md shadow-[#0172FD]/20"
              style={{ fontFamily: 'var(--font-jakarta)' }}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Defaults</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full px-6 pt-8 flex flex-col gap-8">
        
        {/* SUMMARY STATS CARDS */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          
          <div className="bg-white border-2 border-slate-200/80 rounded-[22px] p-5 flex items-center gap-4 shadow-sm hover:border-[#0172FD]/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#F0F7FF] flex items-center justify-center text-[#0172FD] text-xl font-black shrink-0">
              🎵
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-[900] text-slate-900 leading-none mb-1" style={{ fontFamily: 'var(--font-jakarta)' }}>
                {totalSoundsCount}
              </span>
              <span className="text-xs font-bold text-slate-500" style={{ fontFamily: 'var(--font-jakarta)' }}>Total Sounds</span>
            </div>
          </div>

          <div className="bg-white border-2 border-slate-200/80 rounded-[22px] p-5 flex items-center gap-4 shadow-sm hover:border-[#FF9600]/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF7ED] flex items-center justify-center text-[#FF9600] text-xl font-black shrink-0">
              🎶
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-[900] text-slate-900 leading-none mb-1" style={{ fontFamily: 'var(--font-jakarta)' }}>
                {musicCount}
              </span>
              <span className="text-xs font-bold text-slate-500" style={{ fontFamily: 'var(--font-jakarta)' }}>Music Tracks</span>
            </div>
          </div>

          <div className="bg-white border-2 border-slate-200/80 rounded-[22px] p-5 flex items-center gap-4 shadow-sm hover:border-[#8B5CF6]/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#F3E8FF] flex items-center justify-center text-[#8B5CF6] text-xl font-black shrink-0">
              🕹️
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-[900] text-slate-900 leading-none mb-1" style={{ fontFamily: 'var(--font-jakarta)' }}>
                {uiCount}
              </span>
              <span className="text-xs font-bold text-slate-500" style={{ fontFamily: 'var(--font-jakarta)' }}>UI Effects</span>
            </div>
          </div>

          <div className="bg-white border-2 border-slate-200/80 rounded-[22px] p-5 flex items-center gap-4 shadow-sm hover:border-[#58CC02]/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#F0FDF4] flex items-center justify-center text-[#58CC02] text-xl font-black shrink-0">
              ✅
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-[900] text-[#58CC02] leading-none mb-1" style={{ fontFamily: 'var(--font-jakarta)' }}>
                {enabledCount} / {totalSoundsCount}
              </span>
              <span className="text-xs font-bold text-slate-500" style={{ fontFamily: 'var(--font-jakarta)' }}>Enabled & Active</span>
            </div>
          </div>

        </section>

        {/* GLOBAL MASTER & CATEGORY CONTROLS CARD */}
        <section className="bg-white border-2 border-slate-200/80 rounded-[26px] p-6 md:p-8 flex flex-col gap-6 shadow-sm">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#F0F7FF] text-[#0172FD] flex items-center justify-center">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-[900] text-slate-900 leading-none" style={{ fontFamily: 'var(--font-jakarta)' }}>
                  Global Audio Controls
                </h2>
                <span className="text-xs font-semibold text-slate-500" style={{ fontFamily: 'var(--font-jakarta)' }}>
                  Master volume sliders and global sound switches
                </span>
              </div>
            </div>

            {/* Stop All Button */}
            <button
              onClick={stopAll}
              className="h-10 px-4 rounded-xl bg-[#FFF0F0] border border-[#FF4B4B]/30 text-[#FF4B4B] hover:bg-[#FF4B4B] hover:text-white transition-all text-xs font-extrabold flex items-center gap-2 cursor-pointer"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>Stop All Audio</span>
            </button>
          </div>

          {/* Master Sliders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Master Volume Slider */}
            <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider" style={{ fontFamily: 'var(--font-jakarta)' }}>
                  Master Volume
                </span>
                <span className="text-sm font-[900] text-[#0172FD]" style={{ fontFamily: 'var(--font-jakarta)' }}>
                  {isMuted ? '0%' : `${Math.round(volumes.master * 100)}%`}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volumes.master}
                onChange={(e) => setVolume('master', parseFloat(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0172FD]"
              />
            </div>

            {/* Effects (SFX) Volume Slider */}
            <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider" style={{ fontFamily: 'var(--font-jakarta)' }}>
                  Sound Effects (SFX)
                </span>
                <span className="text-sm font-[900] text-[#58CC02]" style={{ fontFamily: 'var(--font-jakarta)' }}>
                  {isSfxEnabled ? `${Math.round(volumes.sfx * 100)}%` : '0%'}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isSfxEnabled ? volumes.sfx : 0}
                onChange={(e) => setVolume('sfx', parseFloat(e.target.value))}
                disabled={!isSfxEnabled}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#58CC02] disabled:opacity-40"
              />
            </div>

            {/* Background Music Volume Slider */}
            <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider" style={{ fontFamily: 'var(--font-jakarta)' }}>
                  Background Music
                </span>
                <span className="text-sm font-[900] text-[#FF9600]" style={{ fontFamily: 'var(--font-jakarta)' }}>
                  {isMusicEnabled ? `${Math.round(volumes.music * 100)}%` : '0%'}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMusicEnabled ? volumes.music : 0}
                onChange={(e) => setVolume('music', parseFloat(e.target.value))}
                disabled={!isMusicEnabled}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#FF9600] disabled:opacity-40"
              />
            </div>

          </div>

          {/* iOS Style Master Switches */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
            
            {/* Mute All Switch */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200/70">
              <div className="flex items-center gap-2.5">
                {isMuted ? <VolumeX className="w-5 h-5 text-[#FF4B4B]" /> : <Volume2 className="w-5 h-5 text-[#0172FD]" />}
                <span className="text-xs font-extrabold text-slate-800" style={{ fontFamily: 'var(--font-jakarta)' }}>Mute All Audio</span>
              </div>
              <button
                onClick={toggleMute}
                className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 cursor-pointer ${
                  isMuted ? 'bg-[#FF4B4B]' : 'bg-slate-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                  isMuted ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Enable SFX Switch */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200/70">
              <div className="flex items-center gap-2.5">
                <Zap className="w-5 h-5 text-[#58CC02]" />
                <span className="text-xs font-extrabold text-slate-800" style={{ fontFamily: 'var(--font-jakarta)' }}>Enable Sound Effects</span>
              </div>
              <button
                onClick={() => setSfxEnabled(!isSfxEnabled)}
                className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 cursor-pointer ${
                  isSfxEnabled ? 'bg-[#58CC02]' : 'bg-slate-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                  isSfxEnabled ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Enable Music Switch */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200/70">
              <div className="flex items-center gap-2.5">
                <Music className="w-5 h-5 text-[#FF9600]" />
                <span className="text-xs font-extrabold text-slate-800" style={{ fontFamily: 'var(--font-jakarta)' }}>Enable Background Music</span>
              </div>
              <button
                onClick={() => setMusicEnabled(!isMusicEnabled)}
                className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 cursor-pointer ${
                  isMusicEnabled ? 'bg-[#0172FD]' : 'bg-slate-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                  isMusicEnabled ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

          </div>

        </section>

        {/* CATEGORY SELECTOR CARDS */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-[900] text-slate-900" style={{ fontFamily: 'var(--font-jakarta)' }}>
              Audio Categories
            </h3>
            <span className="text-xs font-bold text-slate-500" style={{ fontFamily: 'var(--font-jakarta)' }}>
              Select a category to filter sounds
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count = cat.id === 'all'
                ? totalSoundsCount
                : Object.values(registry).filter(c => c.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`p-3.5 rounded-2xl border-2 transition-all flex flex-col items-center text-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#0172FD] shadow-md shadow-[#0172FD]/15 scale-105'
                      : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <span className={`text-xs font-extrabold ${isSelected ? 'text-[#0172FD]' : 'text-slate-700'}`} style={{ fontFamily: 'var(--font-jakarta)' }}>
                    {cat.label}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* SEARCH & SOUND CARDS LIBRARY */}
        <section className="flex flex-col gap-6">
          
          {/* Search Bar & Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-[900] text-slate-900" style={{ fontFamily: 'var(--font-jakarta)' }}>
                Sound Registry Library ({registeredList.length})
              </h3>
              <p className="text-xs font-semibold text-slate-500" style={{ fontFamily: 'var(--font-jakarta)' }}>
                Individual sound settings, cooldowns, and playback controls
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search sound name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white border-2 border-slate-200/80 rounded-2xl text-xs font-bold text-slate-800 placeholder-slate-400 outline-none focus:border-[#0172FD] transition-colors shadow-sm"
              />
            </div>
          </div>

          {/* Sound Cards Grid */}
          {registeredList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {registeredList.map((cfg) => {
                const isPlaying = playingId === cfg.id;
                const iconInfo = SOUND_ICONS[cfg.id] || { emoji: '🔊', badgeColor: '#0172FD', badgeBg: '#F0F7FF' };

                return (
                  <motion.div
                    key={cfg.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border-2 border-slate-200/80 hover:border-[#0172FD]/40 rounded-[24px] p-6 flex flex-col justify-between gap-5 shadow-sm hover:shadow-lg transition-all"
                  >
                    
                    {/* Top Row: Icon + Title + Category Badge */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-sm"
                            style={{ backgroundColor: iconInfo.badgeBg }}
                          >
                            {iconInfo.emoji}
                          </div>
                          <div className="flex flex-col">
                            <h4 className="text-base font-[900] text-slate-900 leading-snug" style={{ fontFamily: 'var(--font-jakarta)' }}>
                              {cfg.name}
                            </h4>
                            <span className="text-[11px] font-mono font-bold text-[#0172FD]">
                              {cfg.id}
                            </span>
                          </div>
                        </div>

                        {/* Enable Checkbox Switch */}
                        <button
                          onClick={() => updateSoundConfig(cfg.id, { enabled: !cfg.enabled })}
                          className={`w-10 h-6 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${
                            cfg.enabled ? 'bg-[#58CC02]' : 'bg-slate-300'
                          }`}
                          title="Toggle enabled status"
                        >
                          <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                            cfg.enabled ? 'translate-x-4' : 'translate-x-0'
                          }`} />
                        </button>
                      </div>

                      <p className="text-xs font-medium text-slate-500 leading-relaxed" style={{ fontFamily: 'var(--font-jakarta)' }}>
                        {cfg.description}
                      </p>
                    </div>

                    {/* Controls Row: Volume Slider & Badges */}
                    <div className="flex flex-col gap-3 pt-3 border-t border-slate-100">
                      
                      {/* Volume Slider */}
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-bold text-slate-600" style={{ fontFamily: 'var(--font-jakarta)' }}>
                          Volume
                        </span>
                        <div className="flex items-center gap-2 flex-1 max-w-[150px]">
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.05"
                            value={cfg.volume}
                            onChange={(e) => updateSoundConfig(cfg.id, { volume: parseFloat(e.target.value) })}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0172FD]"
                          />
                          <span className="text-xs font-extrabold text-[#0172FD] w-8 text-right font-mono">
                            {Math.round(cfg.volume * 100)}%
                          </span>
                        </div>
                      </div>

                      {/* Badges: Cooldown, Speed, Loop */}
                      <div className="flex items-center justify-between gap-2 pt-1">
                        
                        {/* Cooldown */}
                        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-xl">
                          <span className="text-[10px] font-bold text-slate-400">Cooldown:</span>
                          <input
                            type="number"
                            min="0"
                            max="2000"
                            step="10"
                            value={cfg.cooldownMs}
                            onChange={(e) => updateSoundConfig(cfg.id, { cooldownMs: parseInt(e.target.value) || 0 })}
                            className="w-10 bg-transparent text-xs font-extrabold text-slate-800 text-center outline-none font-mono"
                          />
                          <span className="text-[10px] font-bold text-slate-400">ms</span>
                        </div>

                        {/* Speed */}
                        <select
                          value={cfg.speed}
                          onChange={(e) => updateSoundConfig(cfg.id, { speed: parseFloat(e.target.value) })}
                          className="bg-slate-50 border border-slate-200/80 px-2 py-1 rounded-xl text-xs font-extrabold text-slate-700 outline-none cursor-pointer font-mono"
                        >
                          <option value="0.75">0.75x</option>
                          <option value="1.0">1.0x</option>
                          <option value="1.25">1.25x</option>
                          <option value="1.5">1.5x</option>
                        </select>

                        {/* Loop */}
                        <button
                          onClick={() => updateSoundConfig(cfg.id, { loop: !cfg.loop })}
                          className={`px-2.5 py-1 rounded-xl text-[10px] font-extrabold border transition-colors cursor-pointer ${
                            cfg.loop
                              ? 'bg-[#FF9600]/10 border-[#FF9600]/40 text-[#FF9600]'
                              : 'bg-slate-50 border-slate-200 text-slate-400'
                          }`}
                        >
                          {cfg.loop ? 'Looping 🔄' : 'Loop Off'}
                        </button>

                      </div>

                    </div>

                    {/* Play Button Action */}
                    <button
                      type="button"
                      onClick={() => handlePlaySound(cfg.id)}
                      className={`w-full h-12 rounded-2xl font-[900] text-sm tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                        isPlaying
                          ? 'bg-[#58CC02] border-b-4 border-[#46A302] text-white scale-[1.02] shadow-[#58CC02]/30'
                          : 'bg-[#0172FD] border-b-4 border-[#0050B3] text-white hover:bg-[#0060D9] active:border-b-0 active:translate-y-1 shadow-[#0172FD]/20'
                      }`}
                      style={{ fontFamily: 'var(--font-jakarta)' }}
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>{isPlaying ? 'PLAYING...' : 'PLAY SOUND'}</span>
                    </button>

                  </motion.div>
                );
              })}
            </div>
          ) : (
            /* CUTE TEY MASCOT EMPTY STATE */
            <div className="bg-white border-2 border-slate-200/80 rounded-[26px] p-12 flex flex-col items-center text-center gap-4 shadow-sm">
              <div className="w-20 h-20 relative">
                <Image
                  src="/Tressure box.webp"
                  alt="Empty State"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <h4 className="text-xl font-[900] text-slate-800" style={{ fontFamily: 'var(--font-jakarta)' }}>
                No sounds found! 🙈
              </h4>
              <p className="text-sm font-semibold text-slate-500 max-w-md" style={{ fontFamily: 'var(--font-jakarta)' }}>
                Tey checked everywhere — no sound matches your search filter &quot;{searchQuery}&quot;. Try clearing the search or switching categories!
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="mt-2 px-5 py-2.5 rounded-2xl bg-[#0172FD] text-white font-extrabold text-xs hover:bg-[#0060D9] transition-all cursor-pointer shadow-md"
              >
                Clear Search & Filters
              </button>
            </div>
          )}

        </section>

      </main>

    </div>
  );
}
