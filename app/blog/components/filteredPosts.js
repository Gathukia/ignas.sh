"use client"
import React, { useState, useMemo } from "react";
import Image from 'next/image';
import { CldImage } from 'next-cloudinary';
import { Tags, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';

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

const PostCard = ({ post, index }) => {
  const staggerClass = `stagger-${Math.min(index + 1, 10)}`;

  return (
    <Link href={`/blog/${post.slug}`}>
      <motion.div 
        className={`w-full bg-card rounded-2xl border border-border border-4 overflow-hidden shadow-lg mb-4 fade-in-translate ${staggerClass} cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-102`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex h-40">
          {/* Left Side: Image */}
          <div className="w-1/3 relative p-2">
            {/* Blurred background image */}
            <div 
              className="absolute inset-0 blur-md"
              style={{
                backgroundImage: `url(${post.heroImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(50px)',
                transform: 'scale(1.1)',
                backdropFilter: 'blur(40px)',
              }}
            ></div>
            {/* Main image with padding */}
            <motion.div 
              className="relative h-full rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
            >
              <CldImage
                src={post.heroImage}
                alt={post.title}
                width={400}
                height={300}
                crop="fill"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
          
          {/* Right Side: Text Content */}
          <div className="w-2/3 p-3 flex flex-col justify-between">
            <div>
              <h2 className="text-base font-bold text-foreground mb-1 line-clamp-2">{post.title}</h2>
              <p className="text-xs text-muted-foreground mb-1 line-clamp-2">{post.description}</p>
              <div className="flex flex-wrap gap-1 mb-1">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-1.5 py-0.5 bg-secondary text-secondary-foreground rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
                {post.tags.length > 3 && (
                  <span className="px-1.5 py-0.5 bg-secondary text-secondary-foreground rounded-full text-xs">
                    +{post.tags.length - 3}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>{post.readingTime}</span>
              <span>{new Date(post.publishDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

const TagsDisplay = ({ tags, selectedTag, onTagClick }) => (
  <div className="space-y-4 relative bg-card mx-4 p-3 rounded-ms rounded-br-2xl lg:rounded-bl-3xl lg:mr-2 lg:ml-4 border border-border border-4 shadow-sm">
    <div className="absolute -top-3 -left-3 bg-card border border-border border-4 rounded-full p-1">
      <Tags className="text-primary" size={24} />
    </div>
    <h2 className="text-xl font-semibold mb-2">Tags</h2>
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onTagClick('all')}
        className={`px-2 py-1 rounded-full text-xs font-semibold transition-colors duration-300 ${
          selectedTag === 'all'
            ? 'bg-primary text-primary-foreground'
            : 'bg-secondary-foreground/10 text-secondary-foreground hover:bg-primary/20'
        }`}
      >
        All
      </button>
      {tags.map(tag => (
        <button
          key={tag}
          onClick={() => onTagClick(tag)}
          className={`px-2 py-1 rounded-3xl text-xs font-semibold transition-colors duration-300 ${
            selectedTag === tag
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary-foreground/10 text-secondary-foreground hover:bg-primary/20'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  </div>
);

export const FilteredPosts = ({ initialPosts, initialTags }) => {
  const [selectedTag, setSelectedTag] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isTagsExpanded, setIsTagsExpanded] = useState(false);

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesTag = selectedTag === "all" || post.tags.includes(selectedTag);
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTag && matchesSearch;
    });
  }, [initialPosts, selectedTag, searchTerm]);

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setIsTagsExpanded(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <style>{animationStyles}</style>
      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-4">
        {/* Left - Post Titles */}
        <div className="md:col-span-3">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Posts</h1>
            <div className="w-1/3">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full px-3 py-2 bg-input text-foreground border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
              />
            </div>
          </div>
          {filteredPosts.length === 0 ? (
            <p className="text-center text-muted-foreground">No posts found.</p>
          ) : (
            <AnimatePresence>
              <motion.div layout className="space-y-4">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <PostCard post={post} index={index} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Right - Tags */}
        <div>
          <TagsDisplay
            tags={initialTags}
            selectedTag={selectedTag}
            onTagClick={handleTagClick}
          />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Posts</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setIsTagsExpanded(!isTagsExpanded)}
              className={`p-2 rounded-full transition-colors duration-300 ${
                isTagsExpanded
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-primary/20'
              }`}
            >
              <Tags size={20} />
            </button>
            <button
              onClick={() => setIsSearching(!isSearching)}
              className={`p-2 rounded-full transition-colors duration-300 ${
                isSearching
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-primary/20'
              }`}
            >
              <Search size={20} />
            </button>
          </div>
        </div>

        {isSearching && (
          <div className="mb-6 mx-2">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 bg-input text-foreground border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
            />
          </div>
        )}

        {isTagsExpanded && (
          <div className="mb-6 flex justify-center">
            <div className="w-full max-w-md">
              <TagsDisplay
                tags={initialTags}
                selectedTag={selectedTag}
                onTagClick={handleTagClick}
              />
            </div>
          </div>
        )}

        {filteredPosts.length === 0 ? (
          <p className="text-center text-muted-foreground">No posts found.</p>
        ) : (
          <AnimatePresence>
            <motion.div layout className="space-y-4">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <PostCard post={post} index={index} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default FilteredPosts;