"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const MainPostWrapper = ({ children }) => {
  return (
    <div className="flex flex-col h-full bg-transparent">
      <div className="flex-1 flex">
        {/* Main content */}
        <main className="flex-1 overflow-hidden">
          {/* Content area */}
          <div className="max-w-2xl xl:max-w-2xl mx-auto px-2">
            <article className="">
              {children}
            </article>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainPostWrapper;