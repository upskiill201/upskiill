'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, Lock, Camera, Globe, Link2, BookOpen, Clock, AlertCircle, Trash2, 
  Settings2, Bell, CreditCard, Briefcase, Mail, CheckCircle2
} from 'lucide-react';
import { FaTiktok, FaLinkedin, FaTwitter, FaYoutube, FaInstagram, FaFacebook } from 'react-icons/fa';
import styles from './CreatorSettings.module.css';

// TABS
const TABS = [
  { id: 'profile', label: 'Public Profile', icon: <User size={16} /> },
  { id: 'account', label: 'Account Security', icon: <Lock size={16} /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell size={16} /> },
  { id: 'payouts', label: 'Payouts', icon: <CreditCard size={16} /> },
];

export default function CreatorSettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Data
  const [profile, setProfile] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State - Profile
  const [formData, setFormData] = useState({
    fullName: '',
    headline: '',
    bio: '',
    avatarUrl: '',
    niche: '',
    website: '',
    linkedin: '',
    twitter: '',
    youtube: '',
    instagram: '',
    tiktok: '',
    facebook: '',
  });

  // Modal State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/profile');
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
        setFormData({
          fullName: data.fullName || '',
          headline: data.profile?.headline || '',
          bio: data.profile?.bio || '',
          avatarUrl: data.profile?.avatarUrl || '',
          niche: data.profile?.niche || '',
          website: data.profile?.website || '',
          linkedin: data.profile?.linkedin || '',
          twitter: data.profile?.twitter || '',
          youtube: data.profile?.youtube || '',
          instagram: data.profile?.instagram || '',
          tiktok: data.profile?.tiktok || '',
          facebook: data.profile?.facebook || '',
        });
      } else if (res.status === 401) {
        router.push('/creator/login');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setSaveSuccess(false);
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    setSaveSuccess(false);
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSaving(true);
    const form = new FormData();
    form.append('file', file);

    try {
      const res = await fetch('/api/upload/avatar', {
        method: 'POST',
        body: form,
      });

      if (res.ok) {
        const data = await res.json();
        setFormData(prev => ({ ...prev, avatarUrl: data.url }));
        
        // Auto-save the new URL to profile
        await fetch('/api/profile', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ avatarUrl: data.url }),
        });
      } else {
        alert('Upload failed. Maximum size is 5MB.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading avatar');
    } finally {
      setSaving(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const res = await fetch('/api/profile', { method: 'DELETE' });
      if (res.ok) {
        // Also logout
        await fetch('/api/auth/logout', { method: 'POST' });
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  if (loading) {
    return (
      <div className={styles.settingsRoot} style={{ alignItems: 'center', justifyContent: 'center' }}>
        <p className="text-gray-500 font-medium">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className={styles.settingsRoot}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerTop}>
          <div className={styles.headerInfo}>
            <h1>Creator Settings</h1>
            <p>Manage your public presence, account security, and preferences.</p>
          </div>
        </div>
        
        {/* Tabs */}
        <div className={styles.tabs}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.content}>
        
        {/* ─── TAB: PROFILE ─── */}
        {activeTab === 'profile' && (
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Public Profile</h2>
            
            <div className={styles.avatarSection}>
              <div className={styles.avatarWrapper} onClick={() => fileInputRef.current?.click()}>
                {formData.avatarUrl ? (
                  <img src={formData.avatarUrl} alt="Avatar" className={styles.avatarImg} />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    {formData.fullName?.charAt(0).toUpperCase() || 'C'}
                  </div>
                )}
                <div className={styles.avatarOverlay}>
                  <Camera color="white" size={24} />
                </div>
              </div>
              <div className={styles.avatarInfo}>
                <p>Recommended: Square image, at least 400x400px (Max 5MB)</p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  accept="image/jpeg, image/png, image/webp" 
                  onChange={handleAvatarUpload}
                  style={{ display: 'none' }}
                />
                <button className={styles.avatarBtn} onClick={() => fileInputRef.current?.click()} disabled={saving}>
                  <Camera size={14} /> {saving ? 'Uploading...' : 'Upload Photo'}
                </button>
              </div>
            </div>

            <div className={styles.fieldGrid}>
              <div className={styles.field}>
                <label className={styles.label}>Full Name</label>
                <div className={styles.inputWrap}>
                  <User size={16} className={styles.inputIcon} />
                  <input 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`${styles.input} ${styles.inputWithIcon}`} 
                    placeholder="Jane Doe"
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Headline</label>
                <div className={styles.inputWrap}>
                  <Briefcase size={16} className={styles.inputIcon} />
                  <input 
                    name="headline"
                    value={formData.headline}
                    onChange={handleChange}
                    className={`${styles.input} ${styles.inputWithIcon}`} 
                    placeholder="e.g. Senior UX Designer & Instructor"
                  />
                </div>
              </div>

              <div className={`${styles.field} ${styles.fieldFull}`}>
                <label className={styles.label}>Instructor Bio</label>
                <textarea 
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className={styles.textarea} 
                  placeholder="Tell students about your experience, background, and teaching style..."
                  maxLength={500}
                />
                <div className={styles.charCount}>
                  {formData.bio.length} / 500 characters
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Primary Teaching Niche</label>
                <div className={styles.inputWrap}>
                  <BookOpen size={16} className={styles.inputIcon} />
                  <input 
                    name="niche"
                    value={formData.niche}
                    onChange={handleChange}
                    className={`${styles.input} ${styles.inputWithIcon}`} 
                    placeholder="e.g. Design, Development, Business"
                  />
                </div>
              </div>

              <div className={`${styles.fieldFull}`} style={{ marginTop: '16px', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Social Links</h3>
                <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0' }}>Add links to your public profiles to build trust with students.</p>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Personal Website</label>
                <div className={styles.inputWrap}>
                  <Globe size={16} className={styles.inputIcon} />
                  <input 
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className={`${styles.input} ${styles.inputWithIcon}`} 
                    placeholder="https://"
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>LinkedIn Profile</label>
                <div className={styles.inputWrap}>
                  <FaLinkedin size={16} className={styles.inputIcon} />
                  <input 
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className={`${styles.input} ${styles.inputWithIcon}`} 
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Twitter / X</label>
                <div className={styles.inputWrap}>
                  <FaTwitter size={16} className={styles.inputIcon} />
                  <input 
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    className={`${styles.input} ${styles.inputWithIcon}`} 
                    placeholder="https://twitter.com/..."
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>YouTube Channel</label>
                <div className={styles.inputWrap}>
                  <FaYoutube size={16} className={styles.inputIcon} />
                  <input 
                    name="youtube"
                    value={formData.youtube}
                    onChange={handleChange}
                    className={`${styles.input} ${styles.inputWithIcon}`} 
                    placeholder="https://youtube.com/@..."
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Instagram</label>
                <div className={styles.inputWrap}>
                  <FaInstagram size={16} className={styles.inputIcon} />
                  <input 
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    className={`${styles.input} ${styles.inputWithIcon}`} 
                    placeholder="https://instagram.com/..."
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>TikTok</label>
                <div className={styles.inputWrap}>
                  <FaTiktok size={16} className={styles.inputIcon} />
                  <input 
                    name="tiktok"
                    value={formData.tiktok}
                    onChange={handleChange}
                    className={`${styles.input} ${styles.inputWithIcon}`} 
                    placeholder="https://tiktok.com/@..."
                  />
                </div>
              </div>
            </div>

            <div className={styles.actions}>
              <button 
                className={styles.saveBtn} 
                onClick={handleSaveProfile}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Profile'}
              </button>
              {saveSuccess && (
                <span className={styles.successMsg}>
                  <CheckCircle2 size={16} /> Changes saved
                </span>
              )}
            </div>
          </div>
        )}

        {/* ─── TAB: ACCOUNT ─── */}
        {activeTab === 'account' && (
          <div className="flex flex-col gap-5">
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Account Security</h2>
              
              <div className={styles.fieldGrid}>
                <div className={styles.field}>
                  <label className={styles.label}>Email Address</label>
                  <div className={styles.inputWrap}>
                    <Mail size={16} className={styles.inputIcon} />
                    <input 
                      value={profile?.email || ''}
                      disabled
                      className={`${styles.input} ${styles.inputWithIcon}`} 
                    />
                  </div>
                  <div className={styles.readonlyNote}>
                    Contact support to change your email address.
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles.card} ${styles.dangerCard}`}>
              <h2 className={`${styles.cardTitle} ${styles.dangerTitle}`}>Danger Zone</h2>
              <p className={styles.dangerText}>
                Permanently delete your account and all associated data, courses, and students. This action cannot be undone.
              </p>
              <button className={styles.dangerBtn} onClick={() => setShowDeleteModal(true)}>
                <Trash2 size={16} /> Delete My Account
              </button>
            </div>
          </div>
        )}

        {/* ─── TAB: NOTIFICATIONS ─── */}
        {activeTab === 'notifications' && (
          <div className={styles.card} style={{ padding: 0 }}>
            <div className={styles.comingSoonPane}>
              <div className={styles.comingSoonIcon}>
                <Bell size={28} />
              </div>
              <h3>Notification Settings Coming Soon</h3>
              <p>We are building granular controls for your email and push notifications. Check back soon!</p>
            </div>
          </div>
        )}

        {/* ─── TAB: PAYOUTS ─── */}
        {activeTab === 'payouts' && (
          <div className={styles.card} style={{ padding: 0 }}>
            <div className={styles.comingSoonPane}>
              <div className={styles.comingSoonIcon}>
                <CreditCard size={28} />
              </div>
              <h3>Payout Settings Coming Soon</h3>
              <p>Connect your Stripe or PayPal account to receive your course earnings directly. This feature is rolling out soon.</p>
            </div>
          </div>
        )}

      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Delete Account</h2>
            <p>
              This will permanently delete your Teyro creator account, profile, and all your data. 
              <strong> This cannot be undone.</strong>
            </p>
            <p style={{ fontWeight: 600, color: '#374151', margin: '0 0 8px' }}>
              Type &quot;delete my account&quot; to confirm:
            </p>
            <input 
              className={styles.modalConfirmInput}
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder="delete my account"
            />
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={() => {
                setShowDeleteModal(false);
                setDeleteConfirmText('');
              }}>
                Cancel
              </button>
              <button 
                className={styles.deleteConfirmBtn} 
                disabled={deleteConfirmText !== 'delete my account'}
                onClick={handleDeleteAccount}
              >
                Permanently Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
