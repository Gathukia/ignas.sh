"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  const navItems = [
    { id: "about", title: "about", href: "/" },
    { id: "blog", title: "blog", href: "/blog" },
    { id: "projects", title: "projects", href: "/projects" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className={`sticky ${isVisible ? "top-4" : "-top-20"} w-full z-10 transition-all duration-300`}>
      <nav
        className={`
          relative flex items-center
          max-w-60 mx-auto
          bg-card backdrop-blur-lg backdrop-filter
          rounded-full
          transition-all duration-300 ease-in-out
          border border-border
          ${isScrolled ? "shadow-lg shadow-primary/30 bg-background/60" : ""}
        `}
      >
        {/* Menu Items */}
        <div className="flex w-full">
          {navItems.map((item, index) => (
            <motion.div key={item.id} className="relative flex-grow">
              <Link
                href={item.href}
                className={`
                  relative block w-full py-2 text-center text-sm text-foreground rounded-full
                  transition-colors duration-200 hover:bg-popover/50 focus:outline-none
                  ${pathname === item.href ? "bg-popover text-popover-foreground font-semibold" : ""}
                  ${index === 0 ? "rounded-l-full" : ""}
                  ${index === navItems.length - 1 ? "rounded-r-full" : ""}
                `}
              >
                {item.title}
              </Link>
              {pathname === item.href && (
                <motion.div
                  className="absolute top-2 right-2 w-1.5 h-1.5 bg-popover-foreground rounded-full"
                  layoutId="activeIndicator"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;






