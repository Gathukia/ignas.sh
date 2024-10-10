import React from 'react';

const EmphasizedText = ({ children }) => (
  <span className="relative font-medium text-primary group-hover:text-primary-dark transition-colors duration-300">
    {children}
    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-muted-foreground dark:bg-primary opacity-50 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
  </span>
);

const About = () => {
  return (
    <div className="bg-transparent pt-6">
      <h2 className="text-base font-bold mb-2 text-primary">About Me</h2>
      <p className="text-sm leading-relaxed text-muted-foreground mb-4 group">
        Hey, I&apos;m <EmphasizedText>Edwin Ignas</EmphasizedText>, a <EmphasizedText>Software Engineer</EmphasizedText> based in <EmphasizedText>Nairobi, Kenya</EmphasizedText>. 
        I specialize in <EmphasizedText>systems software design</EmphasizedText> and <EmphasizedText>software infrastructure development</EmphasizedText>, focusing on building 
        high-performance, efficient, and fast systems.
      </p>
      
      <p className="text-sm leading-relaxed text-muted-foreground mb-4 group">
        Other interests include <EmphasizedText>machine learning</EmphasizedText>, <EmphasizedText>web development</EmphasizedText>, and <EmphasizedText>databases</EmphasizedText>, to name a few.
      </p>

      <p className="text-sm leading-relaxed text-muted-foreground mb-4 group">
        My educational background is in <EmphasizedText>Mechatronics engineering</EmphasizedText> with emphasis on 
        <EmphasizedText> automotive embedded systems programming</EmphasizedText>.
      </p>

      <p className="text-sm leading-relaxed text-muted-foreground mb-4 group">
        Outside of work, I enjoy playing <EmphasizedText>football as a center forward</EmphasizedText>, <EmphasizedText>hiking</EmphasizedText>, <EmphasizedText>traveling</EmphasizedText>, 
        and listening to dope <EmphasizedText>music</EmphasizedText>.
      </p>

      <h3 className="text-lg font-serif font-bold mb-4 text-primary">Now</h3>
      <p className="text-sm leading-relaxed text-muted-foreground group">
        Currently working on <EmphasizedText>AdSpace.sh</EmphasizedText>, a platform designed 
        to help small businesses and individuals seamlessly reach wide and targeted audiences for their products across 
        social platforms at affordable prices.
      </p>
    </div>
  );
};

export default About;
