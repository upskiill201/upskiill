'use client';

import React from 'react';
import { DeepenConfig } from './DeepenTab';
import { ResourceItem } from './LearningResources';
import { FileText, Video, LayoutTemplate, Link as LinkIcon, CheckCircle2, ArrowRight } from 'lucide-react';
import styles from './DeepenSidebar.module.css';

interface Props {
  config: DeepenConfig;
  resources: ResourceItem[];
}

function getResourceIcon(type: string) {
  switch(type) {
    case 'pdf': return <FileText size={16}/>;
    case 'video': return <Video size={16}/>;
    case 'fig':
    case 'template': return <LayoutTemplate size={16}/>;
    default: return <LinkIcon size={16}/>;
  }
}

function getResourceBadge(type: string) {
  switch(type) {
    case 'pdf': return 'PDF';
    case 'video': return 'Video';
    case 'fig':
    case 'template': return 'Template';
    case 'demo': return 'Demo';
    default: return 'Link';
  }
}

export function DeepenSidebar({ config, resources }: Props) {
  
  const getNextStepLabel = () => {
    switch (config.recommendedNextStep.type) {
      case 'continue': return 'Continue to next lesson';
      case 'practice': return 'Take another practice';
      case 'project': return 'Work on a project';
      case 'explore': return 'Explore more resources';
      default: return 'Continue learning';
    }
  };

  return (
    <div className={styles.container}>
      
      {/* Student Preview */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>Student Preview (as student)</h3>
          <p className={styles.cardSub}>This is how learners will experience the deepen step.</p>
        </div>
        
        <div className={styles.previewBox}>
          
          <h2 className={styles.pTitle}>
            {config.collectionTitle || 'Master UI Design: Go Further'}
          </h2>
          
          <div 
            className={styles.pDesc} 
            dangerouslySetInnerHTML={{ __html: config.collectionDescription || 'These curated resources will help you go beyond the basics...' }}
          />
          
          <div className={styles.pResourceList}>
            {resources.length > 0 ? resources.map(res => (
              <div key={res.id} className={styles.pResourceItem}>
                <div className={styles.pResourceIcon}>{getResourceIcon(res.type)}</div>
                <div className={styles.pResourceContent}>
                  <div className={styles.pResourceName}>{res.title}</div>
                  <div className={styles.pResourceMeta}>
                    {getResourceBadge(res.type)} 
                    {res.size && ` · ${res.size}`} 
                    {res.time && ` · ${res.time}`}
                  </div>
                </div>
              </div>
            )) : (
              <div className={styles.pEmptyState}>Add resources to see them here</div>
            )}
            
            {resources.length > 0 && (
              <button className={styles.pViewAllBtn}>View All Resources</button>
            )}
          </div>

          <div className={styles.pDivider} />

          <div className={styles.pNextSteps}>
            <div className={styles.pNextTitle}>🚀 What's next?</div>
            <div className={styles.pNextLink}>
              → {getNextStepLabel()}
            </div>
            <button className={styles.pNextBtn}>
              {getNextStepLabel()} <ArrowRight size={14}/>
            </button>
          </div>

        </div>
      </div>

      {/* Activity Guidelines */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Activity Guidelines</h3>
        <ul className={styles.guidelinesList}>
          <li><CheckCircle2 size={14} className={styles.checkIcon}/> Curate high-quality and up-to-date resources.</li>
          <li><CheckCircle2 size={14} className={styles.checkIcon}/> Mix different formats (videos, articles, templates).</li>
          <li><CheckCircle2 size={14} className={styles.checkIcon}/> Ensure resources are relevant to the lesson topic.</li>
          <li><CheckCircle2 size={14} className={styles.checkIcon}/> Guide learners on how to use these resources.</li>
        </ul>
        <a href="#" className={styles.guideLink}>View Best Practices Guide <LinkIcon size={12}/></a>
      </div>

      {/* Lesson Progress (Mock) */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Lesson Progress</h3>
        <div className={styles.progressRow}>
          <div className={styles.ring}>100%</div>
          <div>
            <div className={styles.progTitle}>Great job!</div>
            <div className={styles.progSub}>You've completed all steps for this lesson.</div>
          </div>
        </div>
      </div>

    </div>
  );
}
