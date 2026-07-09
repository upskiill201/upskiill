'use client';

import { useRef, useCallback } from 'react';

export type MessageType = 'onCorrectMatch' | 'onStreakOfThree' | 'onIncorrect' | 'onExerciseComplete';

const MESSAGE_POOLS: Record<MessageType, string[]> = {
  onCorrectMatch: [
    "Bloop! Perfect fit! 🤖✨",
    "Woohoo! You got it! 🎉",
    "Boing! That's correct! 🌟",
    "Zot! Exactly right! ⚡",
    "Double tap! You're a shape wizard! 🧙‍♂️"
  ],
  onStreakOfThree: [
    "OMG! Super combo! 🚀🔥",
    "Unstoppable energy! ⚡🌀",
    "Tey is dizzy from your speed! 🤖🚀",
    "Shape master mode activated! 🏆🔥"
  ],
  onIncorrect: [
    "Bloop? Let's try another angle! 🤖",
    "Close! Give it another spin! 🌀",
    "No worries, Tey is cheering for you! 📣🤖",
    "Let's try that puzzle block again! 🧩"
  ],
  onExerciseComplete: [
    "Bleep bloop! You absolute champion! 🎉🏆",
    "Aaaaand... Victory pose! 🤖🌟",
    "You totally crushed this challenge! 🚀💥",
    "Booyah! Tey is doing a happy dance! 💃✨"
  ],
};

export function useMessagePool() {
  const lastMessages = useRef<Record<string, string>>({});

  const getRandomMessage = useCallback((type: MessageType): string => {
    const pool = MESSAGE_POOLS[type];
    const lastUsed = lastMessages.current[type];
    
    // Filter out the last used message to avoid duplicates
    const available = pool.filter(msg => msg !== lastUsed);
    
    // If pool has only one item or all filtered, fallback to full pool
    const candidates = available.length > 0 ? available : pool;
    const selected = candidates[Math.floor(Math.random() * candidates.length)];
    
    // Keep track of last used
    lastMessages.current[type] = selected;
    
    return selected;
  }, []);

  return { getRandomMessage };
}
