'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import styles from './Accordion.module.css';

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.accordion}>
      {items.map((item, index) => (
        <div 
          key={index} 
          className={`${styles.item} ${openIndex === index ? styles.open : ''}`}
        >
          <button 
            id={`accordion-trigger-${index}`}
            className={styles.trigger}
            onClick={() => toggle(index)}
            aria-expanded={openIndex === index}
            aria-controls={`accordion-content-${index}`}
          >
            <span className={styles.question}>{item.question}</span>
            <ChevronDown 
              className={styles.chevron} 
              size={20}
              aria-hidden="true"
            />
          </button>
          
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                id={`accordion-content-${index}`}
                role="region"
                aria-labelledby={`accordion-trigger-${index}`}
                className={styles.content}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <div className={styles.answer}>
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}