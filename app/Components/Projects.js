import React from 'react';
import { ArrowUpRight, ChevronRight, Github } from 'lucide-react';

const featuredProjects = [
  {
    title: 'vm i/o',
    description: 'A minimal header file written in C to help you read terminal inputs such as complex key combinations and mouse movements when making terminal applications',
    repo: 'https://github.com/Mayur57/countless',
    status: 'complete',
    tech: ['C', 'Terminal']
  },
  {
    title: 'Voom',
    description: 'A terminal-based text editor inspired by Vim',
    repo: 'https://github.com/Mayur57/twitter-nuke',
    status: 'complete',
    tech: ['Rust', 'Terminal']
  },
];

const AnimatedArrow = () => (
  <div className="transform transition-all duration-300 ease-in-out group-hover:rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
    <ArrowUpRight className="text-primary" size={24} />
  </div>
);

const ProjectCard = ({ title, description, repo, status, tech }) => (
  <div className="group bg-background mb-4 p-4 border border-border rounded-2xl hover:shadow-md transition-all duration-300 ease-in-out">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-base font-semibold text-primary group-hover:text-primary/80 transition-colors duration-300">{title}</h3>
      <AnimatedArrow />
    </div>
    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
    <div className="flex flex-wrap gap-2 mb-4">
      {tech.map((item, index) => (
        <span key={index} className="text-xs px-2 py-1 bg-secondary/50 text-secondary-foreground border border-border rounded-full">{item}</span>
      ))}
    </div>
    <div className="flex justify-between items-center">
      <span className={`text-xs px-2 py-1 rounded-full ${status === 'complete' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
        {status}
      </span>
      <a href={repo} className="flex items-center text-xs text-primary hover:text-primary/80 transition-colors duration-300">
        <Github size={14} className="mr-1" />
        View on GitHub
      </a>
    </div>
  </div>
);

const Projects = () => {
  return (
    <div className="bg-transparent mx-auto relative pb-6">
      <h2 className="text-lg font-bold mb-3 text-primary">Featured Projects</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Explore some of my recent projects and developments in software engineering.
      </p>
      <div>
        {featuredProjects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
      <a
        href="/projects"
        className="absolute bottom-0 right-0 text-sm text-primary flex items-center group hover:text-primary/80 transition-colors duration-300"
      >
        View All 
        <ChevronRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-0.5" />
      </a>
    </div>
  );
};

export default Projects;