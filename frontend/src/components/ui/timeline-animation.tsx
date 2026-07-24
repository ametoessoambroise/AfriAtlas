import { motion, useInView } from "motion/react";
import React, { ElementType } from "react";

interface TimelineContentProps {
  as?: ElementType;
  animationNum: number;
  timelineRef?: React.RefObject<Element>;
  customVariants?: any;
  children: React.ReactNode;
  className?: string;
}

export const TimelineContent = ({
  as: Component = "div",
  animationNum,
  timelineRef,
  customVariants,
  children,
  className,
}: TimelineContentProps) => {
  // If no ref is provided, we default to triggering once when in view of the element itself.
  // Actually, keeping the ref logic aligned with the component
  const defaultRef = React.useRef(null);
  const ref = timelineRef || defaultRef;
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  
  // Create a dynamic motion component
  const MotionComponent = motion(Component as any) as any;

  return (
    <MotionComponent
      ref={timelineRef ? undefined : defaultRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={customVariants}
      custom={animationNum}
      className={className}
    >
      {children}
    </MotionComponent>
  );
};
