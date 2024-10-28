"use client";

import React, { useState, useEffect } from "react";
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
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "blog", title: "Blog", href: "/blog" },
  { id: "project", title: "Projects", href: "/project" },
];

// Navigation Links Component
function NavLinks({ pathname }) {
  return (
    <div className="flex items-center space-x-6">
      {navItems.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className="relative py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
        >
          {item.title}
          {pathname.startsWith(item.href) && (
            <motion.div
              className="absolute -bottom-1 left-0 h-0.5 w-full bg-primary"
              layoutId="activeUnderline"
              initial={false}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}
            />
          )}
        </Link>
      ))}
    </div>
  );
}

// Breadcrumb Trail Component
function BreadcrumbTrail({ segments }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="font-medium hover:text-primary">
            ignas.sh
          </BreadcrumbLink>
        </BreadcrumbItem>
        {segments.map((segment, index) => (
          <React.Fragment key={index}>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink 
                href={`/${segments.slice(0, index + 1).join("/")}`}
                className="capitalize hover:text-primary"
              >
                {segment}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <div className="w-full max-w-xl px-4 bg-background/95 border-b">
      <nav
        className={cn(
          "relative mx-auto bg-card/95 backdrop-blur-xl backdrop-filter",
          "transition-all duration-300 ease-in-out",
          isScrolled && "shadow-sm shadow-primary/10"
        )}
      >
        {/* Mobile Navigation */}
        <div className="md:hidden p-4">
          <BreadcrumbTrail segments={pathSegments} />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between p-4">
          <BreadcrumbTrail segments={pathSegments} />
          <NavLinks pathname={pathname} />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;






