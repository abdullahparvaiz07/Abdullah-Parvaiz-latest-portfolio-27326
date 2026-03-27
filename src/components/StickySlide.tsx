import React from 'react';

interface StickySlideProps {
  children: React.ReactNode;
}

export default function StickySlide({ children }: StickySlideProps) {
  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden">
      <div className="w-full h-full overflow-y-auto overflow-x-hidden no-scrollbar">
        {children}
      </div>
    </div>
  );
}
