'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
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
  Filter,
} from 'lucide-react';
import { useAudio } from '@/lib/audio/useAudio';
import { SoundId, SoundCategory, SoundConfig } from '@/lib/audio/soundRegistry';

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

  const [activeTab, setActiveTab] = useState<'all' | SoundCategory>('all');
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
    }, 1200);
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
    showToast('Audio configuration exported to JSON!');
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
          showToast('Audio configuration imported successfully!');
        } else {
          showToast('Invalid JSON audio configuration file.', 'error');
        }
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const registeredList = (Object.values(registry) as SoundConfig[]).filter(cfg => {
    const matchesCategory = activeTab === 'all' || cfg.category === activeTab;
    const matchesSearch =
      cfg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cfg.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cfg.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col font-sans select-none pb-20">
      
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border transition-all ${
          notification.type === 'success'
            ? 'bg-[#10B981] border-[#059669] text-white'
            : 'bg-[#EF4444] border-[#DC2626] text-white'
        }`}>
          {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span className="font-bold text-sm">{notification.message}</span>
        </div>
      )}

      {/* Header Bar */}
      <header className="border-b border-slate-800 bg-[#1E293B]/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-[#38BDF8]" />
                <h1 className="text-xl font-extrabold tracking-tight text-white">Teyro Audio Settings & Tuning Dashboard</h1>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Centralized Web Audio API Sound Engine • Sub-20ms Latency • Real-time Tuning
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportJson}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-all text-xs font-bold cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#38BDF8]" />
              <span>Export JSON</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-all text-xs font-bold cursor-pointer"
            >
              <Upload className="w-4 h-4 text-[#10B981]" />
              <span>Import JSON</span>
            </button>
            <input ref={fileInputRef} type="file" accept=".json" onChange={handleImportJson} className="hidden" />

            <button
              onClick={resetToDefault}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-rose-400 hover:bg-slate-700 transition-all text-xs font-bold cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset All</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto w-full px-6 pt-8 flex flex-col gap-8">
        
        {/* GLOBAL MASTER & CATEGORY CONTROLS */}
        <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          
          {/* Master Volume */}
          <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-5 flex flex-col gap-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Master Volume</span>
              <button
                onClick={toggleMute}
                className={`p-1.5 rounded-lg border transition-colors ${
                  isMuted
                    ? 'bg-rose-500/20 border-rose-500/50 text-rose-400'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volumes.master}
                onChange={(e) => setVolume('master', parseFloat(e.target.value))}
                className="w-full accent-[#38BDF8] cursor-pointer"
              />
              <span className="text-sm font-extrabold text-[#38BDF8] w-10 text-right">
                {isMuted ? '0%' : `${Math.round(volumes.master * 100)}%`}
              </span>
            </div>
          </div>

          {/* Sound Effects (SFX) Volume */}
          <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-5 flex flex-col gap-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Sound Effects (SFX)</span>
              <button
                onClick={() => setSfxEnabled(!isSfxEnabled)}
                className={`px-2.5 py-1 rounded-lg text-xs font-extrabold border transition-colors ${
                  isSfxEnabled
                    ? 'bg-[#10B981]/20 border-[#10B981]/50 text-[#10B981]'
                    : 'bg-slate-800 border-slate-700 text-slate-500'
                }`}
              >
                {isSfxEnabled ? 'ON' : 'OFF'}
              </button>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isSfxEnabled ? volumes.sfx : 0}
                onChange={(e) => setVolume('sfx', parseFloat(e.target.value))}
                disabled={!isSfxEnabled}
                className="w-full accent-[#10B981] cursor-pointer disabled:opacity-30"
              />
              <span className="text-sm font-extrabold text-[#10B981] w-10 text-right">
                {isSfxEnabled ? `${Math.round(volumes.sfx * 100)}%` : '0%'}
              </span>
            </div>
          </div>

          {/* Background Music Volume */}
          <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-5 flex flex-col gap-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Background Music</span>
              <button
                onClick={() => setMusicEnabled(!isMusicEnabled)}
                className={`px-2.5 py-1 rounded-lg text-xs font-extrabold border transition-colors ${
                  isMusicEnabled
                    ? 'bg-[#F59E0B]/20 border-[#F59E0B]/50 text-[#F59E0B]'
                    : 'bg-slate-800 border-slate-700 text-slate-500'
                }`}
              >
                {isMusicEnabled ? 'ON' : 'OFF'}
              </button>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMusicEnabled ? volumes.music : 0}
                onChange={(e) => setVolume('music', parseFloat(e.target.value))}
                disabled={!isMusicEnabled}
                className="w-full accent-[#F59E0B] cursor-pointer disabled:opacity-30"
              />
              <span className="text-sm font-extrabold text-[#F59E0B] w-10 text-right">
                {isMusicEnabled ? `${Math.round(volumes.music * 100)}%` : '0%'}
              </span>
            </div>
          </div>

          {/* Mascot Voice Volume */}
          <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-5 flex flex-col gap-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Mascot Voice</span>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-800 px-2 py-0.5 rounded">Tey</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volumes.mascot}
                onChange={(e) => setVolume('mascot', parseFloat(e.target.value))}
                className="w-full accent-[#EC4899] cursor-pointer"
              />
              <span className="text-sm font-extrabold text-[#EC4899] w-10 text-right">
                {Math.round(volumes.mascot * 100)}%
              </span>
            </div>
          </div>

          {/* AI Voice Volume */}
          <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-5 flex flex-col gap-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">AI Voice</span>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-800 px-2 py-0.5 rounded">Future</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volumes.aiVoice}
                onChange={(e) => setVolume('aiVoice', parseFloat(e.target.value))}
                className="w-full accent-[#8B5CF6] cursor-pointer"
              />
              <span className="text-sm font-extrabold text-[#8B5CF6] w-10 text-right">
                {Math.round(volumes.aiVoice * 100)}%
              </span>
            </div>
          </div>

        </section>

        {/* SOUND LIBRARY REGISTRY TABLE */}
        <section className="bg-[#1E293B] border border-slate-800 rounded-3xl p-6 flex flex-col gap-6 shadow-xl">
          
          {/* Controls & Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#F59E0B]" />
              <h2 className="text-lg font-extrabold text-white">Registered Sound Library ({registeredList.length})</h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Search Bar */}
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search sound name or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-[#38BDF8] transition-colors"
                />
              </div>

              {/* Category Filter Tabs */}
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 overflow-x-auto">
                {(['all', 'ui', 'music', 'learning', 'rewards', 'mascot', 'ai'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${
                      activeTab === cat
                        ? 'bg-[#38BDF8] text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <button
                onClick={stopAll}
                className="px-3.5 py-2 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 hover:bg-rose-500 hover:text-white transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer ml-auto md:ml-0"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Stop All</span>
              </button>
            </div>
          </div>

          {/* Sound Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="text-slate-400 border-b border-slate-800 text-[11px] font-extrabold uppercase tracking-wider">
                  <th className="pb-3 pl-2">Sound Details</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3 text-center">Enabled</th>
                  <th className="pb-3 text-center">Volume</th>
                  <th className="pb-3 text-center">Cooldown</th>
                  <th className="pb-3 text-center">Speed</th>
                  <th className="pb-3 text-center">Loop</th>
                  <th className="pb-3 pr-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {registeredList.map((cfg) => {
                  const isPlaying = playingId === cfg.id;

                  return (
                    <tr key={cfg.id} className="hover:bg-slate-800/40 transition-colors">
                      
                      {/* Name & ID */}
                      <td className="py-4 pl-2">
                        <div className="flex flex-col">
                          <span className="font-extrabold text-sm text-white">{cfg.name}</span>
                          <span className="text-[10px] font-mono text-[#38BDF8] font-semibold">{cfg.id}</span>
                          <span className="text-[11px] text-slate-400 mt-1 max-w-sm">{cfg.description}</span>
                        </div>
                      </td>

                      {/* Category Badge */}
                      <td className="py-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-800 border border-slate-700 text-slate-300">
                          {cfg.category}
                        </span>
                      </td>

                      {/* Enabled Toggle */}
                      <td className="py-4 text-center">
                        <input
                          type="checkbox"
                          checked={cfg.enabled}
                          onChange={(e) => updateSoundConfig(cfg.id, { enabled: e.target.checked })}
                          className="w-4 h-4 accent-[#10B981] rounded cursor-pointer"
                        />
                      </td>

                      {/* Volume Slider */}
                      <td className="py-4 text-center">
                        <div className="flex items-center justify-center gap-2 max-w-[120px] mx-auto">
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.05"
                            value={cfg.volume}
                            onChange={(e) => updateSoundConfig(cfg.id, { volume: parseFloat(e.target.value) })}
                            className="w-full accent-[#38BDF8] cursor-pointer"
                          />
                          <span className="font-mono text-[11px] font-bold w-8 text-right text-slate-300">
                            {Math.round(cfg.volume * 100)}%
                          </span>
                        </div>
                      </td>

                      {/* Cooldown (ms) */}
                      <td className="py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <input
                            type="number"
                            min="0"
                            max="2000"
                            step="10"
                            value={cfg.cooldownMs}
                            onChange={(e) => updateSoundConfig(cfg.id, { cooldownMs: parseInt(e.target.value) || 0 })}
                            className="w-16 py-1 px-2 text-center bg-slate-900 border border-slate-700 rounded-lg text-white font-mono outline-none focus:border-[#38BDF8]"
                          />
                          <span className="text-[10px] text-slate-500 font-bold">ms</span>
                        </div>
                      </td>

                      {/* Speed */}
                      <td className="py-4 text-center">
                        <select
                          value={cfg.speed}
                          onChange={(e) => updateSoundConfig(cfg.id, { speed: parseFloat(e.target.value) })}
                          className="py-1 px-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono outline-none focus:border-[#38BDF8] cursor-pointer"
                        >
                          <option value="0.75">0.75x</option>
                          <option value="1.0">1.0x</option>
                          <option value="1.25">1.25x</option>
                          <option value="1.5">1.5x</option>
                        </select>
                      </td>

                      {/* Loop Toggle */}
                      <td className="py-4 text-center">
                        <input
                          type="checkbox"
                          checked={cfg.loop}
                          onChange={(e) => updateSoundConfig(cfg.id, { loop: e.target.checked })}
                          className="w-4 h-4 accent-[#F59E0B] rounded cursor-pointer"
                        />
                      </td>

                      {/* Action Buttons */}
                      <td className="py-4 pr-2 text-right">
                        <button
                          onClick={() => handlePlaySound(cfg.id)}
                          className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ml-auto cursor-pointer ${
                            isPlaying
                              ? 'bg-[#10B981] text-slate-950 scale-105 shadow-lg shadow-[#10B981]/30'
                              : 'bg-[#0172FD] text-white hover:bg-[#0060D9] shadow-md shadow-[#0172FD]/20 active:scale-95'
                          }`}
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>{isPlaying ? 'Playing...' : 'Play'}</span>
                        </button>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </section>

      </main>

    </div>
  );
}
