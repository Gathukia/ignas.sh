"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "blog", title: "Blog", href: "/blog" },
  { id: "project", title: "Projects", href: "/project" },
];

// Animated Link Component
const AnimatedLink = ({ href, children }) => {
  const linkRef = useRef(null);
  const pathname = usePathname();
  const [width, setWidth] = useState(0);
  const active = pathname.startsWith(href);

  useEffect(() => {
    if (linkRef.current) {
      setWidth(linkRef.current.offsetWidth);
    }
  }, [linkRef.current?.offsetWidth]);

  return (
    <Link
      ref={linkRef}
      href={href}
      className={cn(
        "relative px-4 py-2 text-sm tracking-wide transition-colors duration-300",
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
      )}
    >
      <span className="relative z-10">{children}</span>
      {active && (
        <motion.div
          className="absolute h-0.5 bottom-0 left-0 bg-primary"
          style={{ width }}
          layoutId="activeUnderline"
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
      )}
    </Link>
  );
};

// Navigation Links Component
const NavLinks = () => (
  <div className="flex items-center space-x-4">
    {navItems.map((item) => (
      <AnimatedLink key={item.id} href={item.href}>
        {item.title}
      </AnimatedLink>
    ))}
  </div>
);

const BreadcrumbTrail = ({ segments }) => (
  <Breadcrumb>
    <BreadcrumbList className="flex items-center space-x-1 text-sm">
      <BreadcrumbItem>
        <BreadcrumbLink 
          href="/" 
          className="flex items-center gap-2 font-mono font-medium text-foreground hover:text-foreground/80 transition-colors"
        >
          <Terminal className="h-5 w-5" />
          <span>ignas.sh</span>
        </BreadcrumbLink>
      </BreadcrumbItem>
      {segments.map((segment, index) => (
        <React.Fragment key={index}>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4 text-muted-foreground/60" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink 
              href={`/${segments.slice(0, index + 1).join("/")}`}
              className="font-mono text-muted-foreground hover:text-foreground transition-colors capitalize"
            >
              {segment}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </React.Fragment>
      ))}
    </BreadcrumbList>
  </Breadcrumb>
);

const Navbar = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="absolute inset-0 bg-transparent backdrop-blur-[8px]" />
        <div className="relative mx-auto max-w-3xl px-4 py-px">
          {/* Mobile Breadcrumbs */}
          <div className="md:hidden">
            <BreadcrumbTrail segments={pathSegments} />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between">
            <BreadcrumbTrail segments={pathSegments} />
            <NavLinks />
          </div>
        </div>
      </nav>
      {/* Prevent content from going under navbar */}
    </>
  );
};

export default Navbar;





