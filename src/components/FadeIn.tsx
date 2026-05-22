import { motion } from 'motion/react';
import React, { ElementType, useMemo } from 'react';

type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  as?: ElementType;
  key?: any;
};

// Motion component types are memoised PER `as` value outside the render cycle.
// Calling motion.create() inside the function body creates a new component type
// on every render, causing React to unmount/remount → animation replays.
const cache = new Map<ElementType, ReturnType<typeof motion.create>>();
function getMotionComponent(as: ElementType) {
  if (!cache.has(as)) cache.set(as, motion.create(as as any));
  return cache.get(as)!;
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = "",
  as = "div"
}: FadeInProps) {
  const Component = useMemo(() => getMotionComponent(as), [as]);

  return (
    <Component
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </Component>
  );
}
