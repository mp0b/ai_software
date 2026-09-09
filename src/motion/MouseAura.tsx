import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';
import { useMotion } from './MotionContext';

export const MouseAura: React.FC = () => {
  const { mouseAuraEnabled } = useMotion();
  const [visible, setVisible] = useState(false);

  const springX = useSpring(-500, { stiffness: 250, damping: 28 });
  const springY = useSpring(-500, { stiffness: 250, damping: 28 });

  useEffect(() => {
    if (!mouseAuraEnabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      springX.set(e.clientX - 160);
      springY.set(e.clientY - 160);
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseAuraEnabled, visible, springX, springY]);

  if (!mouseAuraEnabled || !visible) return null;

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
      }}
      className="fixed top-0 left-0 w-[320px] h-[320px] rounded-full pointer-events-none z-[1] opacity-40 blur-[75px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.35 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-full h-full rounded-full bg-radial from-[#0091ff]/30 via-[#0066cc]/10 to-transparent" />
    </motion.div>
  );
};
