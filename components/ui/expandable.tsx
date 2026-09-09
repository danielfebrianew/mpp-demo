'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import useMeasure from 'react-use-measure';
import { cn } from '@/lib/utils';

type ExpandableContextValue = {
  expanded: boolean;
  toggle: () => void;
};

const ExpandableContext = React.createContext<ExpandableContextValue | null>(null);

function useExpandable() {
  const context = React.useContext(ExpandableContext);
  if (!context) throw new Error('Expandable components must be used within Expandable');
  return context;
}

type ExpandableProps = React.ComponentProps<typeof motion.div> & {
  expanded?: boolean;
  onToggle?: () => void;
};

function Expandable({ expanded, onToggle, children, className, ...props }: ExpandableProps) {
  const [internalExpanded, setInternalExpanded] = React.useState(false);
  const isExpanded = typeof expanded === 'boolean' ? expanded : internalExpanded;
  const toggle = onToggle ?? (() => setInternalExpanded((value) => !value));

  return (
    <ExpandableContext.Provider value={{ expanded: isExpanded, toggle }}>
      <motion.div layout className={className} transition={{ type: 'spring', stiffness: 260, damping: 24 }} {...props}>
        {children}
      </motion.div>
    </ExpandableContext.Provider>
  );
}

function ExpandableCard({ className, children, ...props }: React.ComponentProps<typeof motion.div>) {
  return (
    <motion.div
      layout
      className={cn('overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#071d35] shadow-[0_24px_70px_rgba(2,12,24,0.30)]', className)}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

function ExpandableTrigger({ className, children, ...props }: React.ComponentProps<'button'>) {
  const { expanded, toggle } = useExpandable();
  return (
    <button
      type="button"
      aria-expanded={expanded}
      onClick={toggle}
      className={cn('w-full text-left', className)}
      {...props}
    >
      {children}
    </button>
  );
}

function ExpandableContent({ className, children }: React.ComponentProps<'div'>) {
  const { expanded } = useExpandable();
  const [measureRef, bounds] = useMeasure();

  return (
    <motion.div
      animate={{ height: expanded ? bounds.height : 0 }}
      initial={false}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      className="overflow-hidden"
    >
      <div ref={measureRef}>
        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18 }}
              className={className}
            >
              {children}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export { Expandable, ExpandableCard, ExpandableContent, ExpandableTrigger, useExpandable };
