'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  FaUser,
  FaAward,
  FaWandMagicSparkles,
  FaFileLines,
  FaBriefcase,
  FaGlobe,
  FaEye,
  FaFloppyDisk,
  FaPlus,
  FaTrashCan,
  FaCheck,
  FaCamera,
  FaLock,
  FaCircleInfo,
  FaCircleCheck
} from 'react-icons/fa6';
import { FaLinkedin, FaGithub, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';
import styles from './CreatorSettings.module.css';

// Predefined Teyro Skill Taxonomy
const TAXONOMY_SKILLS = [
  'Web Development', 'UI/UX Design', 'React & Next.js', 'TypeScript', 'Node.js',
  'Python', 'Machine Learning', 'Artificial Intelligence', 'Prompt Engineering',
  'Product Design', 'Growth Marketing', 'Mobile App Development', 'Graphic Design',
  'Data Science', 'Cloud & DevOps', 'Cybersecurity', 'Blockchain & Web3', 'Content Strategy'
];

const PRIMARY_CATEGORIES = [
  'Programming', 'Design', 'AI & Machine Learning', 'Marketing',
  'Business', 'Product & Management', 'Data & Analytics', 'Content Creation'
];

const TABS = [
  { id: 'identity', label: 'Identity', icon: <FaUser size={15} /> },
  { id: 'badge', label: 'Creator Badge', icon: <FaAward size={15} /> },
  { id: 'expertise', label: 'Expertise & Skills', icon: <FaWandMagicSparkles size={15} /> },
  { id: 'about', label: 'About Me', icon: <FaFileLines size={15} /> },
  { id: 'experience', label: 'Experience & Education', icon: <FaBriefcase size={15} /> },
  { id: 'links', label: 'Social Links', icon: <FaGlobe size={15} /> },
  { id: 'appearance', label: 'Appearance & Privacy', icon: <FaEye size={15} /> },
];

export default function CreatorProfileSettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('identity');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Avatar Upload Ref
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    // Identity
    fullName: '',
    username: '',
    headline: '',
    bio: '',
    location: '',
    languages: [] as string[],
    avatarUrl: '',
    
    // Badge & Status (System-controlled)
    creatorStatus: 'founding_creator',

    // Expertise
    primaryExpertise: '',
    skills: [] as Array<{ id: string; name: string; level: string }>,
    teachingLevels: [] as string[],
    contentFormats: [] as string[],

    // About Me
    about: '',

    // Experience & Credentials
    experiences: [] as Array<{ id: string; company: string; position: string; startDate: string; endDate: string; current: boolean; description: string }>,
    education: [] as Array<{ id: string; institution: string; degree: string; fieldOfStudy: string; startYear: string; endYear: string; description: string }>,
    certifications: [] as Array<{ id: string; name: string; organization: string; issueDate: string; expiryDate: string; credentialId: string; credentialUrl: string }>,

    // Social Links
    website: '',
    linkedin: '',
    github: '',
    twitter: '',
    youtube: '',
    instagram: '',
    portfolio: '',

    // Appearance & Privacy
    coverImageUrl: '',
    introVideoUrl: '',
    tagline: '',
    contactMethod: 'email',
    businessEmail: '',
    allowCollaboration: true,
    profileVisibility: 'PUBLIC',
    privacySettings: {
      showLocation: true,
      showExperience: true,
      showEducation: true,
      showCertifications: true,
      showSocials: true,
    },
  });

  // New Skill Input State
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('Intermediate');

  // Username validation state
  const [usernameCheck, setUsernameCheck] = useState<{ status: 'idle' | 'checking' | 'available' | 'taken'; message?: string }>({ status: 'idle' });
  const [initialUsername, setInitialUsername] = useState('');

  // Experience entry modal / inline draft state
  const [expDraft, setExpDraft] = useState({ company: '', position: '', startDate: '', endDate: '', current: false, description: '' });
  const [eduDraft, setEduDraft] = useState({ institution: '', degree: '', fieldOfStudy: '', startYear: '', endYear: '', description: '' });
  const [certDraft, setCertDraft] = useState({ name: '', organization: '', issueDate: '', expiryDate: '', credentialId: '', credentialUrl: '' });
  const [showExpForm, setShowExpForm] = useState(false);
  const [showEduForm, setShowEduForm] = useState(false);
  const [showCertForm, setShowCertForm] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/profile');
      if (res.ok) {
        const data = await res.json();
        const prof = data.profile || {};
        
        // Auto-fill existing answers from profile/onboarding
        setFormData({
          fullName: data.fullName || '',
          username: prof.username || '',
          headline: prof.headline || '',
          bio: prof.bio || '',
          location: prof.location || '',
          languages: Array.isArray(prof.languages) ? prof.languages : ['English'],
          avatarUrl: prof.avatarUrl || data.avatarUrl || '',
          
          creatorStatus: prof.creatorStatus || 'founding_creator',

          primaryExpertise: prof.primaryExpertise || prof.niche || 'Programming',
          skills: Array.isArray(prof.skills) ? prof.skills : (Array.isArray(prof.subCategories) ? prof.subCategories.map((cat: string, i: number) => ({ id: String(i), name: cat, level: 'Intermediate' })) : []),
          teachingLevels: Array.isArray(prof.teachingLevels) ? prof.teachingLevels : ['Beginner', 'Intermediate'],
          contentFormats: Array.isArray(prof.contentFormats) ? prof.contentFormats : ['Micro-Lessons', 'Practice Cards'],

          about: prof.about || '',

          experiences: Array.isArray(prof.experiences) ? prof.experiences : [],
          education: Array.isArray(prof.education) ? prof.education : [],
          certifications: Array.isArray(prof.certifications) ? prof.certifications : [],

          website: prof.website || '',
          linkedin: prof.linkedin || '',
          github: prof.github || '',
          twitter: prof.twitter || '',
          youtube: prof.youtube || '',
          instagram: prof.instagram || '',
          portfolio: prof.portfolio || '',

          coverImageUrl: prof.coverImageUrl || '',
          introVideoUrl: prof.introVideoUrl || '',
          tagline: prof.tagline || '',
          contactMethod: prof.contactMethod || 'email',
          businessEmail: prof.businessEmail || data.email || '',
          allowCollaboration: prof.allowCollaboration !== false,
          profileVisibility: prof.profileVisibility || 'PUBLIC',
          privacySettings: prof.privacySettings || {
            showLocation: true,
            showExperience: true,
            showEducation: true,
            showCertifications: true,
            showSocials: true,
          },
        });

        if (prof.username) {
          setInitialUsername(prof.username);
        }
      } else if (res.status === 401) {
        router.push('/creator/login');
      }
    } catch (error) {
      console.error('Error loading creator profile:', error);
    } finally {
      setLoading(false);
    }
  };

  // Profile Completion Percentage Calculation (Duolingo Style)
  const completionMilestones = useMemo(() => {
    const milestones = [
      { id: 'avatar', label: 'Profile Photo', completed: !!formData.avatarUrl },
      { id: 'name', label: 'Display Name', completed: !!formData.fullName },
      { id: 'username', label: '@handle Username', completed: !!formData.username },
      { id: 'headline', label: 'Professional Title', completed: !!formData.headline },
      { id: 'bio', label: 'Short Bio', completed: !!formData.bio },
      { id: 'skills', label: '3+ Skills', completed: formData.skills.length >= 3 },
      { id: 'about', label: 'About Me Story', completed: !!formData.about && formData.about.length > 30 },
      { id: 'social', label: 'Social Link', completed: !!formData.linkedin || !!formData.github || !!formData.twitter || !!formData.website },
    ];
    const completedCount = milestones.filter(m => m.completed).length;
    const percentage = Math.round((completedCount / milestones.length) * 100);
    return { milestones, completedCount, percentage };
  }, [formData]);

  // Username change handler with debounce availability check
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '');
    setFormData(prev => ({ ...prev, username: val }));
    setSaveSuccess(false);

    if (!val || val === initialUsername) {
      setUsernameCheck({ status: 'idle' });
      return;
    }

    if (val.length < 3) {
      setUsernameCheck({ status: 'taken', message: 'Must be at least 3 characters' });
      return;
    }

    setUsernameCheck({ status: 'checking' });
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/profile/check-username/${val}`);
        const data = await res.json();
        if (data.available) {
          setUsernameCheck({ status: 'available', message: 'Handle is available!' });
        } else {
          setUsernameCheck({ status: 'taken', message: data.message || 'Handle is already taken' });
        }
      } catch (err) {
        setUsernameCheck({ status: 'idle' });
      }
    }, 400);

    return () => clearTimeout(timer);
  };

  // Avatar Upload
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const form = new FormData();
    form.append('file', file);

    setSaving(true);
    try {
      const res = await fetch('/api/upload/avatar', { method: 'POST', body: form });
      if (res.ok) {
        const data = await res.json();
        setFormData(prev => ({ ...prev, avatarUrl: data.url }));
      }
    } catch (err) {
      console.error('Error uploading avatar:', err);
    } finally {
      setSaving(false);
      if (avatarInputRef.current) avatarInputRef.current.value = '';
    }
  };

  // Add Skill Tag
  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    const exists = formData.skills.some(s => s.name.toLowerCase() === newSkillName.trim().toLowerCase());
    if (!exists) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, { id: String(Date.now()), name: newSkillName.trim(), level: newSkillLevel }]
      }));
    }
    setNewSkillName('');
  };

  const handleRemoveSkill = (id: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id)
    }));
  };

  // Teaching Level Toggle
  const toggleTeachingLevel = (level: string) => {
    setFormData(prev => {
      const exists = prev.teachingLevels.includes(level);
      return {
        ...prev,
        teachingLevels: exists ? prev.teachingLevels.filter(l => l !== level) : [...prev.teachingLevels, level]
      };
    });
  };

  // Add Experience Entry
  const handleAddExperience = () => {
    if (!expDraft.company || !expDraft.position) return;
    setFormData(prev => ({
      ...prev,
      experiences: [...prev.experiences, { ...expDraft, id: String(Date.now()) }]
    }));
    setExpDraft({ company: '', position: '', startDate: '', endDate: '', current: false, description: '' });
    setShowExpForm(false);
  };

  // Add Education Entry
  const handleAddEducation = () => {
    if (!eduDraft.institution || !eduDraft.degree) return;
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { ...eduDraft, id: String(Date.now()) }]
    }));
    setEduDraft({ institution: '', degree: '', fieldOfStudy: '', startYear: '', endYear: '', description: '' });
    setShowEduForm(false);
  };

  // Add Certification Entry
  const handleAddCertification = () => {
    if (!certDraft.name || !certDraft.organization) return;
    setFormData(prev => ({
      ...prev,
      certifications: [...prev.certifications, { ...certDraft, id: String(Date.now()) }]
    }));
    setCertDraft({ name: '', organization: '', issueDate: '', expiryDate: '', credentialId: '', credentialUrl: '' });
    setShowCertForm(false);
  };

  // Save Full Profile
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
        setTimeout(() => setSaveSuccess(false), 3500);
      } else {
        const errorData = await res.json();
        alert(errorData.message || 'Failed to save profile.');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Network error while saving profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.settingsRoot} style={{ alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
        <p style={{ color: '#64748B', fontWeight: 700 }}>Loading Creator Profile...</p>
      </div>
    );
  }

  return (
    <div className={styles.settingsRoot}>
      {/* ─── PAGE HEADER ─── */}
      <div className={styles.pageHeader}>
        <div className={styles.headerTop}>
          <div className={styles.headerInfo}>
            <h1>Creator Profile Settings</h1>
            <p>Customize your public identity, teaching credentials, and creator status.</p>
          </div>
          <button
            className={styles.button3dPrimary}
            onClick={handleSaveProfile}
            disabled={saving}
          >
            <FaFloppyDisk size={14} />
            <span>{saving ? 'Saving...' : 'Save Profile'}</span>
          </button>
        </div>

        {/* ─── DUOLINGO-STYLE 3D PROFILE COMPLETION MILESTONE TRACKER ─── */}
        <div className={styles.milestoneCard}>
          <div className={styles.milestoneHeader}>
            <div className={styles.milestoneTitleBox}>
              <div className={styles.milestoneSparkleIcon}>
                <FaWandMagicSparkles size={18} />
              </div>
              <div>
                <h2 className={styles.milestoneTitle}>Complete Your Creator Profile</h2>
                <p className={styles.milestoneSubtitle}>
                  {completionMilestones.percentage === 100
                    ? '🎉 Your creator profile is 100% complete and fully optimized!'
                    : `You have completed ${completionMilestones.completedCount} of ${completionMilestones.milestones.length} profile steps.`}
                </p>
              </div>
            </div>
            <div className={styles.milestonePercent}>
              {completionMilestones.percentage}% Complete
            </div>
          </div>

          <div className={styles.progressTrack3D}>
            <div
              className={styles.progressFill3D}
              style={{ width: `${Math.max(completionMilestones.percentage, 8)}%` }}
            />
          </div>

          <div className={styles.milestonesGrid}>
            {completionMilestones.milestones.map((m) => (
              <div
                key={m.id}
                className={`${styles.milestoneItem} ${m.completed ? styles.completed : ''}`}
              >
                <div className={styles.checkCircle}>
                  {m.completed ? <FaCheck size={10} /> : <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#CBD5E1' }} />}
                </div>
                <span>{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── TABS BAR ─── */}
        <div className={styles.tabsContainer}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tabBtn} ${activeTab === tab.id ? styles.active : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ─── TAB CONTENT ─── */}
      <div className={styles.content}>
        
        {/* ─── 1. PROFILE IDENTITY ─── */}
        {activeTab === 'identity' && (
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <h3 className={styles.cardTitle}>Profile Identity</h3>
                <p className={styles.cardSubtitle}>Your public face and handle seen by students across Teyro.</p>
              </div>
            </div>

            {/* Avatar Row */}
            <div className={styles.mediaRow}>
              <div className={styles.avatarWrapper}>
                {formData.avatarUrl ? (
                  <Image src={formData.avatarUrl} alt="Avatar" fill className={styles.avatarImage} />
                ) : (
                  <div className={styles.avatarFallback}>
                    {formData.fullName?.charAt(0) || 'C'}
                  </div>
                )}
              </div>
              <div className={styles.mediaInfo}>
                <h4 className={styles.mediaTitle}>Profile Photo</h4>
                <p className={styles.mediaHint}>Recommended 400x400px. JPG, PNG or WEBP up to 5MB.</p>
                <input
                  type="file"
                  ref={avatarInputRef}
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={handleAvatarUpload}
                />
                <button
                  type="button"
                  className={styles.button3dSecondary}
                  style={{ alignSelf: 'flex-start', marginTop: 4 }}
                  onClick={() => avatarInputRef.current?.click()}
                >
                  <FaCamera size={14} /> Upload Photo
                </button>
              </div>
            </div>

            <div className={styles.formGrid}>
              {/* Full Name */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Display Name</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Sarah Connor"
                />
              </div>

              {/* Username / Handle */}
              <div className={styles.formGroup}>
                <div className={styles.label}>
                  <span>Username / Handle</span>
                  {usernameCheck.status === 'available' && (
                    <span className={`${styles.availabilityBadge} ${styles.available}`}>
                      <FaCircleCheck size={12} /> Available
                    </span>
                  )}
                  {usernameCheck.status === 'taken' && (
                    <span className={`${styles.availabilityBadge} ${styles.taken}`}>
                      {usernameCheck.message}
                    </span>
                  )}
                </div>
                <div className={styles.inputPrefixWrap}>
                  <span className={styles.inputPrefix}>teyro.app/@</span>
                  <input
                    type="text"
                    className={`${styles.input} ${styles.inputInPrefix}`}
                    value={formData.username}
                    onChange={handleUsernameChange}
                    placeholder="username"
                  />
                </div>
              </div>

              {/* Professional Title */}
              <div className={styles.formGroupFull}>
                <label className={styles.label}>Professional Title / Headline</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  placeholder="e.g. Senior Full-Stack Engineer & AI Educator"
                />
              </div>

              {/* Short Bio */}
              <div className={styles.formGroupFull}>
                <div className={styles.label}>
                  <span>Short Bio</span>
                  <span className={styles.charCount}>{formData.bio.length} / 160</span>
                </div>
                <textarea
                  className={styles.textarea}
                  rows={2}
                  maxLength={160}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="A concise, 1-line elevator pitch about who you are and what you teach."
                />
              </div>

              {/* Location */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Location</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. London, United Kingdom"
                />
              </div>

              {/* Primary Language */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Teaching Languages</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.languages.join(', ')}
                  onChange={(e) => setFormData({ ...formData, languages: e.target.value.split(',').map(s => s.trim()) })}
                  placeholder="e.g. English, Spanish"
                />
              </div>
            </div>
          </div>
        )}

        {/* ─── 2. CREATOR BADGE & STATUS ─── */}
        {activeTab === 'badge' && (
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <h3 className={styles.cardTitle}>Creator Status & Recognition</h3>
                <p className={styles.cardSubtitle}>Your official accreditation within the Teyro ecosystem.</p>
              </div>
            </div>

            {/* Official Founding Creator Badge Card */}
            <div className={styles.foundingBadgeCard}>
              <div className={styles.foundingBadgeIconBox}>
                <FaAward size={28} />
              </div>
              <div className={styles.foundingBadgeContent}>
                <div className={styles.badgePillRow}>
                  <span className={styles.foundingPill}>🏅 Founding Creator</span>
                  <span className={styles.systemControlledTag}>
                    <FaLock size={10} style={{ display: 'inline', marginRight: 3 }} /> System Verified
                  </span>
                </div>
                <h4 className={styles.foundingBadgeTitle}>Founding Creator Program Member</h4>
                <p className={styles.foundingBadgeDesc}>
                  You joined Teyro through the official Founding Creator cohort. This verified badge is permanently
                  anchored to your public profile, course cards, and community discussions, recognizing you as one of the
                  early pioneers shaping our platform.
                </p>
              </div>
            </div>

            <div style={{ background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: 16, padding: 18, display: 'flex', gap: 12, alignItems: 'center' }}>
              <FaCircleInfo size={18} color="#0172FD" />
              <p style={{ margin: 0, fontSize: 13.5, color: '#475569', fontWeight: 600 }}>
                Creator status badges are strictly system-governed. As Teyro expands, top milestone achievements (such as <em>Verified Creator</em> and <em>Expert Creator</em>) will be automatically unlocked.
              </p>
            </div>
          </div>
        )}

        {/* ─── 3. EXPERTISE & TEACHING ─── */}
        {activeTab === 'expertise' && (
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <h3 className={styles.cardTitle}>Expertise & Skills</h3>
                <p className={styles.cardSubtitle}>Define what domains you teach and your primary skill taxonomy.</p>
              </div>
            </div>

            <div className={styles.formSection}>
              {/* Primary Expertise */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Primary Expertise Domain</label>
                <select
                  className={styles.select}
                  value={formData.primaryExpertise}
                  onChange={(e) => setFormData({ ...formData, primaryExpertise: e.target.value })}
                >
                  {PRIMARY_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Skills Tag Manager */}
              <div className={styles.skillsContainer}>
                <label className={styles.label}>Skills & Topics ({formData.skills.length})</label>
                <div className={styles.skillTagsList}>
                  {formData.skills.map((skill) => (
                    <div key={skill.id} className={styles.skillTag}>
                      <span>{skill.name}</span>
                      <span className={styles.skillLevelPill}>{skill.level}</span>
                      <button
                        type="button"
                        className={styles.removeSkillBtn}
                        onClick={() => handleRemoveSkill(skill.id)}
                        aria-label="Remove skill"
                      >
                        <FaTrashCan size={12} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Skill Row */}
                <div className={styles.addSkillRow}>
                  <select
                    className={styles.select}
                    style={{ flex: 1, minWidth: 200 }}
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                  >
                    <option value="">Select a skill from taxonomy...</option>
                    {TAXONOMY_SKILLS.map((sk) => (
                      <option key={sk} value={sk}>{sk}</option>
                    ))}
                  </select>
                  <select
                    className={styles.select}
                    style={{ width: 150 }}
                    value={newSkillLevel}
                    onChange={(e) => setNewSkillLevel(e.target.value)}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert</option>
                  </select>
                  <button
                    type="button"
                    className={styles.button3dSecondary}
                    onClick={handleAddSkill}
                  >
                    <FaPlus size={13} /> Add Skill
                  </button>
                </div>
              </div>

              {/* Teaching Levels */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Target Learner Levels</label>
                <div className={styles.checkboxGroup}>
                  {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => {
                    const isSelected = formData.teachingLevels.includes(lvl);
                    return (
                      <div
                        key={lvl}
                        className={`${styles.checkboxTile} ${isSelected ? styles.selected : ''}`}
                        onClick={() => toggleTeachingLevel(lvl)}
                      >
                        <div className={styles.checkCircle} style={isSelected ? { background: '#0172FD', color: 'white' } : undefined}>
                          {isSelected && <FaCheck size={10} />}
                        </div>
                        <span>{lvl}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── 4. ABOUT ME ─── */}
        {activeTab === 'about' && (
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <h3 className={styles.cardTitle}>About Me (Extended Bio)</h3>
                <p className={styles.cardSubtitle}>Tell your complete creator journey, credentials, and teaching philosophy.</p>
              </div>
            </div>

            <div className={styles.formGroupFull}>
              <div className={styles.label}>
                <span>Your Creator Story</span>
                <span className={styles.charCount}>{formData.about.length} / 2,000</span>
              </div>
              <textarea
                className={styles.textarea}
                rows={10}
                maxLength={2000}
                value={formData.about}
                onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                placeholder="Write a detailed introduction for prospective students. Share your background, industry experience, what drives your passion for teaching, and what students can expect from your lessons."
              />
            </div>
          </div>
        )}

        {/* ─── 5. EXPERIENCE & CREDENTIALS ─── */}
        {activeTab === 'experience' && (
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <h3 className={styles.cardTitle}>Professional Experience & Education</h3>
                <p className={styles.cardSubtitle}>Boost learner trust with your career history, degrees, and verified certifications.</p>
              </div>
            </div>

            {/* Work Experience Section */}
            <div className={styles.formSection}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#0F172A' }}>Work Experience</h4>
                <button
                  type="button"
                  className={styles.button3dSecondary}
                  onClick={() => setShowExpForm(!showExpForm)}
                >
                  <FaPlus size={13} /> Add Position
                </button>
              </div>

              {/* Inline Form */}
              {showExpForm && (
                <div style={{ background: '#F8FAFC', border: '2px solid #E2E8F0', borderRadius: 16, padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div className={styles.formGrid}>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="Company / Organization"
                      value={expDraft.company}
                      onChange={(e) => setExpDraft({ ...expDraft, company: e.target.value })}
                    />
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="Position / Title"
                      value={expDraft.position}
                      onChange={(e) => setExpDraft({ ...expDraft, position: e.target.value })}
                    />
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="Start Date (e.g. 2021)"
                      value={expDraft.startDate}
                      onChange={(e) => setExpDraft({ ...expDraft, startDate: e.target.value })}
                    />
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="End Date (or Present)"
                      value={expDraft.endDate}
                      onChange={(e) => setExpDraft({ ...expDraft, endDate: e.target.value })}
                    />
                  </div>
                  <textarea
                    className={styles.textarea}
                    rows={2}
                    placeholder="Brief description of your role and achievements..."
                    value={expDraft.description}
                    onChange={(e) => setExpDraft({ ...expDraft, description: e.target.value })}
                  />
                  <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                    <button type="button" className={styles.button3dSecondary} onClick={() => setShowExpForm(false)}>Cancel</button>
                    <button type="button" className={styles.button3dPrimary} onClick={handleAddExperience}>Save Experience</button>
                  </div>
                </div>
              )}

              {/* List */}
              <div className={styles.entriesList}>
                {formData.experiences.length === 0 && !showExpForm && (
                  <p style={{ color: '#94A3B8', fontSize: 13.5, fontStyle: 'italic', margin: '4px 0' }}>No experience entries added yet.</p>
                )}
                {formData.experiences.map((exp) => (
                  <div key={exp.id} className={styles.entryCard}>
                    <div className={styles.entryCardInfo}>
                      <h5 className={styles.entryTitle}>{exp.position}</h5>
                      <span className={styles.entrySubtitle}>{exp.company}</span>
                      <span className={styles.entryDate}>{exp.startDate} – {exp.endDate || 'Present'}</span>
                      {exp.description && <p className={styles.entryDescription}>{exp.description}</p>}
                    </div>
                    <button
                      type="button"
                      className={styles.removeEntryBtn}
                      onClick={() => setFormData({ ...formData, experiences: formData.experiences.filter(e => e.id !== exp.id) })}
                    >
                      <FaTrashCan size={12} /> Remove
                    </button>
                  </div>
                ))}
              </div>

              {/* Education Section */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
                <h4 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#0F172A' }}>Education</h4>
                <button
                  type="button"
                  className={styles.button3dSecondary}
                  onClick={() => setShowEduForm(!showEduForm)}
                >
                  <FaPlus size={13} /> Add Education
                </button>
              </div>

              {showEduForm && (
                <div style={{ background: '#F8FAFC', border: '2px solid #E2E8F0', borderRadius: 16, padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div className={styles.formGrid}>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="Institution / University"
                      value={eduDraft.institution}
                      onChange={(e) => setEduDraft({ ...eduDraft, institution: e.target.value })}
                    />
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="Degree / Certificate"
                      value={eduDraft.degree}
                      onChange={(e) => setEduDraft({ ...eduDraft, degree: e.target.value })}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                    <button type="button" className={styles.button3dSecondary} onClick={() => setShowEduForm(false)}>Cancel</button>
                    <button type="button" className={styles.button3dPrimary} onClick={handleAddEducation}>Save Education</button>
                  </div>
                </div>
              )}

              <div className={styles.entriesList}>
                {formData.education.length === 0 && !showEduForm && (
                  <p style={{ color: '#94A3B8', fontSize: 13.5, fontStyle: 'italic', margin: '4px 0' }}>No education entries added yet.</p>
                )}
                {formData.education.map((edu) => (
                  <div key={edu.id} className={styles.entryCard}>
                    <div className={styles.entryCardInfo}>
                      <h5 className={styles.entryTitle}>{edu.degree}</h5>
                      <span className={styles.entrySubtitle}>{edu.institution}</span>
                    </div>
                    <button
                      type="button"
                      className={styles.removeEntryBtn}
                      onClick={() => setFormData({ ...formData, education: formData.education.filter(e => e.id !== edu.id) })}
                    >
                      <FaTrashCan size={12} /> Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── 6. SOCIAL & PROFESSIONAL LINKS ─── */}
        {activeTab === 'links' && (
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <h3 className={styles.cardTitle}>Social & Web Presence</h3>
                <p className={styles.cardSubtitle}>Connect your external portfolios and profiles.</p>
              </div>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Personal Website</label>
                <input
                  type="url"
                  className={styles.input}
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>LinkedIn Profile</label>
                <input
                  type="url"
                  className={styles.input}
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>GitHub Profile</label>
                <input
                  type="url"
                  className={styles.input}
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  placeholder="https://github.com/username"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>YouTube Channel</label>
                <input
                  type="url"
                  className={styles.input}
                  value={formData.youtube}
                  onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                  placeholder="https://youtube.com/@channel"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>X / Twitter</label>
                <input
                  type="url"
                  className={styles.input}
                  value={formData.twitter}
                  onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  placeholder="https://x.com/username"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Instagram</label>
                <input
                  type="url"
                  className={styles.input}
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  placeholder="https://instagram.com/username"
                />
              </div>
            </div>
          </div>
        )}

        {/* ─── 7. APPEARANCE & PRIVACY ─── */}
        {activeTab === 'appearance' && (
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <h3 className={styles.cardTitle}>Appearance & Privacy Controls</h3>
                <p className={styles.cardSubtitle}>Control who can view your profile and what credentials are visible.</p>
              </div>
            </div>

            <div className={styles.formSection}>
              {/* Profile Intro Video */}
              <div className={styles.formGroupFull}>
                <label className={styles.label}>Intro Video URL (YouTube / Vimeo / Loom)</label>
                <input
                  type="url"
                  className={styles.input}
                  value={formData.introVideoUrl}
                  onChange={(e) => setFormData({ ...formData, introVideoUrl: e.target.value })}
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>

              {/* Creator Tagline */}
              <div className={styles.formGroupFull}>
                <label className={styles.label}>Creator Tagline</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="e.g. Helping 10,000+ builders master full-stack software development."
                />
              </div>

              {/* Profile Visibility */}
              <div className={styles.formGroupFull}>
                <label className={styles.label}>Profile Visibility</label>
                <div className={styles.checkboxGroup}>
                  {[
                    { id: 'PUBLIC', label: 'Public (Everyone on Web & Teyro)' },
                    { id: 'TEYRO_ONLY', label: 'Teyro Students Only' },
                    { id: 'HIDDEN', label: 'Hidden (Private)' },
                  ].map((vis) => (
                    <div
                      key={vis.id}
                      className={`${styles.checkboxTile} ${formData.profileVisibility === vis.id ? styles.selected : ''}`}
                      onClick={() => setFormData({ ...formData, profileVisibility: vis.id })}
                    >
                      <div className={styles.checkCircle} style={formData.profileVisibility === vis.id ? { background: '#0172FD', color: 'white' } : undefined}>
                        {formData.profileVisibility === vis.id && <FaCheck size={10} />}
                      </div>
                      <span>{vis.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ─── STICKY BOTTOM SAVE ACTION BAR ─── */}
      <div className={styles.stickyBottomBar}>
        <div>
          {saveSuccess && (
            <div className={styles.saveSuccessPill}>
              <FaCircleCheck size={16} />
              <span>Creator Profile updated successfully!</span>
            </div>
          )}
        </div>
        <button
          className={styles.button3dPrimary}
          onClick={handleSaveProfile}
          disabled={saving}
        >
          <FaFloppyDisk size={14} />
          <span>{saving ? 'Saving...' : 'Save Profile'}</span>
        </button>
      </div>
    </div>
  );
}
