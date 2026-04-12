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
            className={styles.trigger}
            onClick={() => toggle(index)}
            aria-expanded={openIndex === index}
          >
            <span className={styles.question}>{item.question}</span>
            <ChevronDown 
              className={styles.chevron} 
              size={20}
            />
          </button>
          
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
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