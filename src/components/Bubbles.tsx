import { motion, useAnimation, type Variants } from 'framer-motion';
import { useEffect, useMemo } from 'react';

interface BubblesProps {
  hasEntered: boolean;
}

interface Bubble {
  id: number;
  cx: number;
  cy: number;
  r: number;
  opacity: number;
  floatDuration: number;
  floatDelay: number;
  floatRangeX: number;
  floatRangeY: number;
}

function generateBubbles(count: number): Bubble[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    cx: Math.random() * 90 + 5,   // keep 5-95 so they stay visible
    cy: Math.random() * 90 + 5,
    r: Math.random() * 8 + 4,      // bigger: 4-12px
    opacity: Math.random() * 0.3 + 0.25, // brighter: 0.25-0.55
    floatDuration: Math.random() * 6 + 5,
    floatDelay: Math.random() * 3,
    floatRangeX: Math.random() * 8 + 3,
    floatRangeY: Math.random() * 8 + 3,
  }));
}

function idleVariant(b: Bubble): Variants {
  return {
    idle: {
      cx: [
        `${b.cx}%`,
        `${b.cx + b.floatRangeX}%`,
        `${b.cx - b.floatRangeX * 0.5}%`,
        `${b.cx}%`,
      ],
      cy: [
        `${b.cy}%`,
        `${b.cy - b.floatRangeY}%`,
        `${b.cy + b.floatRangeY * 0.5}%`,
        `${b.cy}%`,
      ],
      opacity: [b.opacity, b.opacity + 0.15, b.opacity - 0.05, b.opacity],
      r: [b.r, b.r * 1.2, b.r * 0.9, b.r],
      transition: {
        duration: b.floatDuration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: b.floatDelay,
      },
    },
  };
}

function burstVariant(b: Bubble): Variants {
  // All bubbles rush toward center then explode outward
  const angle = Math.random() * Math.PI * 2;
  const burstDist = 60 + Math.random() * 50;
  const targetX = 50 + Math.cos(angle) * burstDist;
  const targetY = 50 + Math.sin(angle) * burstDist;

  return {
    burst: {
      cx: [`${b.cx}%`, '50%', `${targetX}%`],
      cy: [`${b.cy}%`, '50%', `${targetY}%`],
      r: [b.r, b.r * 3, 0],
      opacity: [b.opacity, 1, 0],
      transition: {
        duration: 1.6,
        ease: [0.22, 1, 0.36, 1],
        times: [0, 0.35, 1],
      },
    },
  };
}

function driftVariant(b: Bubble): Variants {
  const startY = 105 + Math.random() * 10;
  const endY = -(5 + Math.random() * 10);
  const driftX1 = Math.random() * 90 + 5;
  const driftX2 = Math.random() * 90 + 5;

  return {
    drift: {
      cx: [`${driftX1}%`, `${driftX2}%`, `${driftX1}%`],
      cy: [`${startY}%`, `${endY}%`],
      r: [b.r * 0.7, b.r * 1, b.r * 0.6],
      opacity: [0, 0.5, 0.4, 0],
      transition: {
        duration: 16 + Math.random() * 14,
        repeat: Infinity,
        ease: 'linear',
        delay: Math.random() * 8,
      },
    },
  };
}

export default function Bubbles({ hasEntered }: BubblesProps) {
  const controls = useAnimation();
  const bubbles = useMemo(() => generateBubbles(30), []);

  useEffect(() => {
    if (!hasEntered) {
      controls.start('idle');
    } else {
      controls.start('burst').then(() => {
        controls.start('drift');
      });
    }
  }, [hasEntered, controls]);

  return (
    <svg
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 55 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="bubble-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="bubble-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="#d4af37" stopOpacity="1" />
          <stop offset="50%" stopColor="#d4af37" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
        </radialGradient>
      </defs>

      {bubbles.map((b) => {
        const variants: Variants = {
          ...idleVariant(b),
          ...burstVariant(b),
          ...driftVariant(b),
        };

        return (
          <motion.circle
            key={b.id}
            variants={variants}
            animate={controls}
            initial={{
              cx: `${b.cx}%`,
              cy: `${b.cy}%`,
              r: b.r,
              opacity: b.opacity,
            }}
            fill="url(#bubble-grad)"
            filter="url(#bubble-glow)"
          />
        );
      })}
    </svg>
  );
}
