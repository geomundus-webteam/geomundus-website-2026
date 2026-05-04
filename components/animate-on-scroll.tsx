"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { Children, isValidElement, cloneElement, type ReactNode } from "react";

const SMOOTH_EASE = [0.25, 0.1, 0.25, 1] as const;

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.99 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

interface AnimateOnScrollProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  delay?: number;
  className?: string;
  duration?: number;
  staggerChildren?: boolean;
}

export function AnimateOnScroll({
  children,
  delay = 0,
  className,
  duration = 1.8,
  staggerChildren = false,
  ...rest
}: AnimateOnScrollProps) {
  if (staggerChildren) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.18, delayChildren: delay } },
        }}
        className={className}
      >
        {Children.map(children, (child) =>
          isValidElement(child) ? (
            <motion.div
              variants={fadeUpVariant}
              transition={{ duration, ease: SMOOTH_EASE }}
            >
              {child}
            </motion.div>
          ) : (
            child
          )
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={fadeUpVariant}
      transition={{ duration, delay, ease: SMOOTH_EASE }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.99 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.4, ease: SMOOTH_EASE } },
};

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.2,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={itemVariant} className={className}>
      {children}
    </motion.div>
  );
}

// Word-by-word text reveal (for big hero/section headings)
export function RevealText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12, delayChildren: delay } },
      }}
      className={className}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 8 },
            visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: SMOOTH_EASE } },
          }}
          className="inline-block"
          style={{ marginRight: "0.25em" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Mouse-following glow card
export function GlowCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative group ${className || ""}`}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
        e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
      }}
      style={
        {
          background: `radial-gradient(circle 200px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(125, 186, 90, 0.12), transparent 60%)`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
