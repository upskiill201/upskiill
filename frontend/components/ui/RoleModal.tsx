'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GraduationCap, Users } from 'lucide-react';
import styles from './RoleModal.module.css';

interface RoleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Role = 'student' | 'instructor' | null;

const STUDENT_FORM_ID = 'STUDENT_FORM_ID';
const INSTRUCTOR_FORM_ID = 'INSTRUCTOR_FORM_ID';

export default function RoleModal({ isOpen, onClose }: RoleModalProps) {
  const [selectedRole, setSelectedRole] = useState<Role>(null);

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
  };

  const handleClose = () => {
    setSelectedRole(null);
    onClose();
  };

  const handleBack = () => {
    setSelectedRole(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.overlay} onClick={handleClose}>
          <motion.div 
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <button className={styles.closeBtn} onClick={handleClose}>
              <X size={24} />
            </button>

            {!selectedRole ? (
              <div className={styles.roleSelection}>
                <h2 className={styles.title}>Join the Waitlist</h2>
                <p className={styles.subtitle}>Choose your path to get early access</p>
                
                <div className={styles.roleCards}>
                  <button 
                    className={styles.roleCard}
                    onClick={() => handleRoleSelect('student')}
                  >
                    <div className={styles.roleIcon}>
                      <GraduationCap size={40} />
                    </div>
                    <h3>I&apos;m a Student</h3>
                    <p>I want to learn new skills and advance my career</p>
                  </button>

                  <button 
                    className={styles.roleCard}
                    onClick={() => handleRoleSelect('instructor')}
                  >
                    <div className={styles.roleIcon}>
                      <Users size={40} />
                    </div>
                    <h3>I&apos;m an Instructor</h3>
                    <p>I want to teach and earn money sharing my expertise</p>
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.formContainer}>
                <button className={styles.backBtn} onClick={handleBack}>
                  ← Back
                </button>
                
                <h2 className={styles.formTitle}>
                  {selectedRole === 'student' ? 'Student' : 'Instructor'} Waitlist
                </h2>
                <p className={styles.formSubtitle}>
                  {selectedRole === 'student' 
                    ? 'Tell us about your learning goals' 
                    : 'Tell us about your teaching expertise'}
                </p>

                <div className={styles.typeformPlaceholder}>
                  {selectedRole === 'student' ? (
                    <div className={styles.placeholderContent}>
                      <p>Student Typeform would load here</p>
                      <p className={styles.placeholderNote}>Form ID: {STUDENT_FORM_ID}</p>
                    </div>
                  ) : (
                    <div className={styles.placeholderContent}>
                      <p>Instructor Typeform would load here</p>
                      <p className={styles.placeholderNote}>Form ID: {INSTRUCTOR_FORM_ID}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}