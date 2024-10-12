import React from 'react';
import { ArrowUpRight, ChevronRight } from 'lucide-react';

const latestArticles = [
  {
    slug: "hello",
    title: "React Hooks Deep Dive: Transforming Functional Components",
    description: "Explore how React hooks have transformed the way we write functional components in modern React applications.",
    date: "April 30, 2024"
  },
  {
    slug: "small",
    title: "What Then?",
    description: "Is this thing working?",
    date: "April 30, 2024"
  },
];

const AnimatedArrow = () => (
  <div className="transform transition-all duration-300 ease-in-out group-hover:rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
    <ArrowUpRight className="text-primary" size={24} />
  </div>
);

const BlogPreview = ({ title, description, slug, date }) => (
  <a href={`/blog/${slug}`} className="group block bg-background mb-4 p-4 border border-border rounded-2xl rounded-tr-3xl hover:shadow-md transition-all duration-300 ease-in-out">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-base font-semibold text-primary group-hover:text-primary/80 transition-colors duration-300">{title}</h3>
      <AnimatedArrow />
    </div>
    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{description}</p>
    <div className="flex justify-end">
      <p className="text-xs text-muted-foreground">{date}</p>
    </div>
  </a>
);

const Articles = () => {
  return (
    <div className="bg-transparent mx-auto relative pb-6">
      <h2 className="text-lg font-bold mb-3 text-primary">Articles and Thoughts</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Welcome to my blog. This is where I share my thoughts out loud!
      </p>
      <div>
        {latestArticles.map((article) => (
          <BlogPreview key={article.slug} {...article} />
        ))}
      </div>
      <a
        href="/blog"
        className="absolute bottom-0 right-0 text-sm text-primary flex items-center group hover:text-primary/80 transition-colors duration-300"
      >
        View All 
        <ChevronRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-0.5" />
      </a>
    </div>
  );
};

export default Articles;