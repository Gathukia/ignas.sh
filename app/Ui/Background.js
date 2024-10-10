import { twMerge } from 'tailwind-merge';

export const backgroundStyles = {
  written: 'bg-foreground dark:bg-primary/10',
  media: 'bg-background',
};

export const getBackgroundClass = (contentType) => {
  const baseClasses = 'relative';
  const contentTypeClass = backgroundStyles[contentType] || backgroundStyles.other;
  return twMerge(baseClasses, contentTypeClass);
};

export const GrainOverlay = () => (
  <div 
    className="absolute inset-0 pointer-events-none opacity-5 bg-repeat bg-fixed"
    style={{ backgroundImage: "url('/textures/grain.png')" }}
  />
);

export const BackgroundContainer = ({ contentType, children }) => {
  return (
    <div className={getBackgroundClass(contentType)}>
      {children}
      {contentType === 'written' && <GrainOverlay />}
    </div>
  );
};