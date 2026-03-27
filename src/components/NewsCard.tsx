import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface NewsCardProps {
  title: string;
  date: string;
  summary: string;
  details: string;
}

export default function NewsCard({ title, date, summary, details }: NewsCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      className="bg-zinc-900/40 border border-white/10 rounded-3xl p-6 cursor-pointer hover:border-orange-500/50 transition-colors overflow-hidden relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      <motion.div layout className="flex justify-between items-start gap-4 relative z-10">
        <div>
          <motion.div layout className="text-orange-500 text-sm font-bold tracking-widest mb-2">{date}</motion.div>
          <motion.h3 layout className="text-xl md:text-2xl font-bold uppercase tracking-wide mb-2 text-white">{title}</motion.h3>
          <motion.p layout className="text-white/60 text-sm max-w-2xl">{summary}</motion.p>
        </div>
        <motion.div 
          layout
          className="w-10 h-10 shrink-0 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-orange-500 group-hover:text-black transition-colors"
        >
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative z-10"
          >
            <div className="h-[1px] w-full bg-white/10 mb-6"></div>
            <p className="text-white/80 leading-relaxed">
              {details}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
