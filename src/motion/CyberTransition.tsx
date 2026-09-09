import React from 'react';
import { motion } from 'motion/react';
import { useMotion } from './MotionContext';

export const CyberTransition: React.FC<{
  children: React.ReactNode;
  className?: string;
  viewKey?: string;
}> = ({ children, className = '', viewKey }) => {
  const { getSpringConfig } = useMotion();
  const spring = getSpringConfig();

  return (
    <motion.div
      key={viewKey}
      initial={{ opacity: 0, y: 6, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.995 }}
      transition={{
        type: 'spring',
        stiffness: spring.stiffness,
        damping: spring.damping,
        mass: spring.mass,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.04,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 5 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 350, damping: 26 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
