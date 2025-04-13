import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const thoughts = [
  'Light is the magical ingredient that makes or breaks a space.',
  'A room should never allow the eye to settle in one place.',
  'Good architecture is like a good therapy session.',
  "Minimalism is not about having less — it's about making room for more of what matters.",
  'Textures add soul to a space.',
  'The space between objects is just as important as the objects themselves.',
  'Design should speak to both the heart and the mind.',
  'Every material has a story waiting to be told.',
];

const getRandomThought = (currentThought) => {
  let newThought;
  do {
    newThought = thoughts[Math.floor(Math.random() * thoughts.length)];
  } while (newThought === currentThought && thoughts.length > 1);
  return newThought;
};

export default function DesignThought() {
  const [thought, setThought] = useState(getRandomThought());
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setThought(getRandomThought(thought));
        setIsVisible(true);
      }, 500); // Half second for fade out before changing thought
    }, 10000); // change every 10 seconds

    return () => clearInterval(interval);
  }, [thought]);

  return (
    <motion.div
      className="fixed bottom-6 right-6 bg-white/90 backdrop-blur-sm shadow-lg rounded-xl px-4 py-3 max-w-xs text-sm text-gray-800 border border-gray-200/80 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        scale: 1.02,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.p
            key={thought}
            className="italic"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            “{thought}”
          </motion.p>
        )}
      </AnimatePresence>
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-b-xl"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 10, ease: 'linear' }}
        key={thought}
      />
    </motion.div>
  );
}
