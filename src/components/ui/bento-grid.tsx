import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[200px]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  children,
  href,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  href?: string;
}) => {
  const content = (
    <motion.div
      className={cn(
        "bg-card border border-border rounded-xl p-6 flex flex-col hover:border-primary/10 transition-colors cursor-pointer overflow-hidden group/bento",
        className,
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.01,
        backgroundColor: "var(--background)/20",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="flex-1 flex flex-col">
        {header && <div className="flex-1 mb-4">{header}</div>}
        {children && <div className="flex-1">{children}</div>}

        <div className="mt-4 transition duration-200 group-hover/bento:translate-x-1">
          <div className="flex items-center gap-2 mb-1">
            {icon}
            <h3 className="font-serif text-lg md:text-xl text-foreground font-medium">
              {title}
            </h3>
          </div>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="block h-full">
        {content}
      </a>
    );
  }

  return content;
};
