'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const textSmart = "Smart".split("");
  const textTalks = "Talks".split("");
  const [clickedLetter, setClickedLetter] = useState<string | null>(null);
  
  // Split into words first, then handle each word separately
  const explanationWords = "Specific: The conversations have focus on specific subject that the assistant is specialist in.".split(" ");

  // Function to get random starting position
  const getRandomPosition = (index: number) => {
    const positions = [
      { x: '-100vw', y: '-100vh' },  // top-left
      { x: '0', y: '-100vh' },       // top
      { x: '100vw', y: '-100vh' },   // top-right
      { x: '-100vw', y: '0' },       // left
      { x: '100vw', y: '0' },        // right
      { x: '-100vw', y: '100vh' },   // bottom-left
      { x: '0', y: '100vh' },        // bottom
      { x: '100vw', y: '100vh' },    // bottom-right
    ];
    return positions[index % positions.length];
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
      <div className="flex gap-4">
        <div className="flex">
          {textSmart.map((letter, index) => {
            const startPos = getRandomPosition(index);
            return (
              <AnimatePresence key={index}>
                {(clickedLetter !== letter.toLowerCase()) && (
                  <motion.span
                    initial={{
                      opacity: 0,
                      x: startPos.x,
                      y: startPos.y,
                      rotate: Math.random() * 360,
                      scale: 0
                    }}
                    animate={[
                      {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        rotate: 0,
                        scale: 1,
                        transition: {
                          duration: 1.2,
                          delay: index * 0.1,
                          type: "spring",
                          stiffness: 120,
                          damping: 15
                        }
                      },
                      {
                        scale: [1, 1.1, 1],
                        color: ['#9333ea', '#f0f0f0', '#9333ea'],
                        transition: {
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: 1.2 + (textSmart.length * 0.1) + (textTalks.length * 0.1)
                        }
                      }
                    ]}
                    whileHover={{
                      scale: 1.2,
                      color: '#a855f7',
                      transition: { duration: 0.2 }
                    }}
                    onClick={() => setClickedLetter(letter.toLowerCase())}
                    className="text-6xl font-bold text-purple-600 cursor-pointer"
                  >
                    {letter}
                  </motion.span>
                )}
              </AnimatePresence>
            );
          })}
        </div>
        
        <div className="flex">
          {textTalks.map((letter, index) => {
            const startPos = getRandomPosition(index + textSmart.length);
            return (
              <motion.span
                key={index}
                initial={{
                  opacity: 0,
                  x: startPos.x,
                  y: startPos.y,
                  rotate: Math.random() * 360,
                  scale: 0
                }}
                animate={[
                  {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    rotate: 0,
                    scale: 1,
                    transition: {
                      duration: 1.2,
                      delay: (textSmart.length * 0.1) + (index * 0.1),
                      type: "spring",
                      stiffness: 120,
                      damping: 15
                    }
                  },
                  {
                    scale: [1, 1.1, 1],
                    color: ['#9333ea', '#f0f0f0', '#9333ea'],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 1.2 + (textSmart.length * 0.1) + (textTalks.length * 0.1)
                    }
                  }
                ]}
                whileHover={{
                  scale: 1.2,
                  color: '#a855f7',
                  transition: { duration: 0.2 }
                }}
                className="text-6xl font-bold text-purple-600 cursor-default"
              >
                {letter}
              </motion.span>
            );
          })}
        </div>
      </div>

      {clickedLetter === 's' && (
        <div className="mt-16 max-w-2xl px-4 text-center">
          <div className="flex flex-wrap justify-center gap-x-2 gap-y-1">
            {explanationWords.map((word, wordIndex) => {
              // Calculate the total characters before this word
              const previousCharCount = explanationWords
                .slice(0, wordIndex)
                .reduce((sum, word) => sum + word.length, 0);

              return (
                <div key={wordIndex} className="flex gap-1">
                  {word.split("").map((letter, letterIndex) => (
                    <motion.span
                      key={`${wordIndex}-${letterIndex}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.2,
                        delay: (previousCharCount + letterIndex) * 0.05,
                      }}
                      className="text-white text-xl"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
} 