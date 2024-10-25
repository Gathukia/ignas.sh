"use client";
import React, { useState, useEffect } from "react";
import { CornerUpLeft } from "lucide-react";
import Link from "next/link";

const TableOfContents = ({ toc, activeId }) => (
  <nav className="pl-4">
    <div className="space-y-2 max-h-[70vh] overflow-y-auto">
      {toc.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(item.id).scrollIntoView({ behavior: 'smooth' });
          }}
          className={`block py-1 px-2 rounded transition-all duration-200 text-sm ${
            activeId === item.id
              ? "bg-primary/10 text-primary font-medium"
              : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
          }`}
        >
          {item.title}
        </a>
      ))}
    </div>
  </nav>
);

const MainPostWrapper = ({ children, toc }) => {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [toc]);

  return (
    <div className="flex flex-col h-full bg-transparent">
      <div className="flex-1 flex">
        {/* Left sidebar */}
        <aside className="hidden lg:block mt-8 w-64 xl:w-72 pl-12 pr-0 bg-transparent border-r-4 border-primary border-dotted overflow-y-none overflow-hidden max-h-96 min-h-10 sticky top-16">
          <Link
            href="/blog"
            className="flex items-center text-primary hover:text-muted-foreground transition-colors mb-6 no-underline"
          >
            <CornerUpLeft size={24} className="mr-2" />
            <span className="font-semibold">Back to Posts</span>
          </Link>
          <h3 className="text-base font-semibold text-muted-foreground px-4 mb-2">On This Page</h3>
          <TableOfContents toc={toc} activeId={activeId} />
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-hidden">
          {/* Content area */}
          <div className="max-w-2xl xl:max-w-2xl mx-auto px-2">
            <article className="">
              {children}
            </article>
          </div>
        </main>

        {/* Right sidebar (optional future content) */}
        <aside className="hidden xl:block w-64 p-6 bg-transparent"></aside>
      </div>
    </div>
  );
};

export default MainPostWrapper;