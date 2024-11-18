"use client"

import React, { useEffect, useState } from 'react';

interface TypewriterTextProps {
  phrases: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  cursorStyle?: 'bar' | 'underscore' | '❤️' ;
}

export function TypewriterText({ 
  phrases, 
  className = '',
  typingSpeed = 100,
  deletingSpeed = 50, 
  pauseDuration = 2000,
  cursorStyle = 'bar'
}: TypewriterTextProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isBlinking, setIsBlinking] = useState(true);

  useEffect(() => {
    const type = () => {
      const currentPhrase = phrases[currentPhraseIndex];
      
      if (isDeleting) {
        setCurrentText(prev => prev.slice(0, -1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
          setIsBlinking(true);
        }
      } else {
        setCurrentText(currentPhrase.slice(0, currentText.length + 1));
        if (currentText === currentPhrase) {
          setIsBlinking(true);
          setTimeout(() => {
            setIsBlinking(false);
            setIsDeleting(true);
          }, pauseDuration);
          return;
        }
        setIsBlinking(false);
      }
    };

    const timer = setTimeout(
      type,
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPhraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  const cursor = cursorStyle === 'bar' ? '|' : cursorStyle === '❤️' ? '❤️' : '_';

  return (
    <div className={`inline-flex items-center ${className}`}>
      <span className="mr-1">{currentText}</span>
      <span 
        className={`${isBlinking ? 'animate-pulse' : ''} text-[#ffe400] font-bold`}
        style={{ opacity: isBlinking ? 1 : 0.7 }}
      >
        {cursor}
      </span>
    </div>
  );
}