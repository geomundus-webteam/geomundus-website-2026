"use client"
import { useRef } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"

interface ScrollRevealGridProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  getKey: (item: T) => string
  gridClassName?: string
  containerHeight?: string
  stickyTop?: string
  stagger?: number
  startAt?: number
  fadeWindow?: number
  slideDistance?: number
}

function AnimatedItem({
  children,
  scrollProgress,
  showAt,
  fadeWindow,
  slideDistance,
}: {
  children: React.ReactNode
  scrollProgress: MotionValue<number>
  showAt: number
  fadeWindow: number
  slideDistance: number
}) {
  const opacity = useTransform(scrollProgress, [showAt - fadeWindow, showAt], [0, 1])
  const y = useTransform(scrollProgress, [showAt - fadeWindow, showAt], [slideDistance, 0])

  return <motion.div style={{ opacity, y }}>{children}</motion.div>
}

export default function ScrollRevealGrid<T>({
  items,
  renderItem,
  getKey,
  gridClassName = "grid grid-cols-1 md:grid-cols-3 gap-5",
  containerHeight = "250vh",
  stickyTop = "20vh",
  stagger = 0.25,
  startAt = 0.2,
  fadeWindow = 0.1,
  slideDistance = 60,
}: ScrollRevealGridProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  })

  return (
    <div ref={containerRef} style={{ height: containerHeight }}>
      <div style={{ position: "sticky", top: stickyTop }}>
        <div className={gridClassName}>
          {items.map((item, index) => (
            <AnimatedItem
              key={getKey(item)}
              scrollProgress={scrollYProgress}
              showAt={startAt + index * stagger}
              fadeWindow={fadeWindow}
              slideDistance={slideDistance}
            >
              {renderItem(item, index)}
            </AnimatedItem>
          ))}
        </div>
      </div>
    </div>
  )
}
