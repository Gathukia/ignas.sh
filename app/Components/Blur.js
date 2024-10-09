import React from 'react';

const animationStyles = `
  @keyframes fadeInTranslate {
    from {
      opacity: 0;
      filter: blur(8px);
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      filter: blur(0px);
      transform: translateY(0);
    }
  }

  .fade-in-translate {
    animation: fadeInTranslate 0.5s ease forwards;
    opacity: 0;
  }

  .stagger-1 { animation-delay: 0.12s; }
  .stagger-2 { animation-delay: 0.24s; }
  .stagger-3 { animation-delay: 0.36s; }
  .stagger-4 { animation-delay: 0.48s; }
  .stagger-5 { animation-delay: 0.6s; }
  .stagger-6 { animation-delay: 0.72s; }
  .stagger-7 { animation-delay: 0.84s; }
  .stagger-8 { animation-delay: 0.96s; }
  .stagger-9 { animation-delay: 1.08s; }
  .stagger-10 { animation-delay: 1.2s; }
`;

const ProgressiveBlur = ({ children, index, className = '' }) => {
  const staggerClass = `stagger-${Math.min(index + 1, 10)}`;

  return (
    <>
      <style>{animationStyles}</style>
      <div className={`fade-in-translate ${staggerClass} ${className}`}>
        {children}
      </div>
    </>
  );
};

export default ProgressiveBlur;