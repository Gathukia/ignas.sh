'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { BackgroundContainer } from './Ui/Background';
import Navbar from './Components/Navbar';
import Header from './Components/Header'
import About from './Components/About';
import Articles from './Components/Articles';
import Projects from './Components/Projects';
import ActivityComponent from './Components/ActivityComponent'
import Footer from './Components/Footer';
import ProgressiveBlur from './Components/Blur'

export default function Home() {
  return (
    <BackgroundContainer contentType="written">
      <div className="min-h-screen bg-scrool bg-background dark:bg-transparent text-foreground">
        <Navbar/>
        <main className="max-w-xl mx-auto px-4 py-12">
          <article>

            {/* Introduction */}
            <ProgressiveBlur index={0}>
              <div><Header/></div>
            </ProgressiveBlur>
            
            {/* About Section */}
            <ProgressiveBlur index={1} className="mb-4">
              <About/>
            </ProgressiveBlur>

            {/* Articles Section */}
            <ProgressiveBlur index={2} className="mb-4">
              <Articles/>
            </ProgressiveBlur>

            {/* Articles Section */}
            <ProgressiveBlur index={3} className="mb-4">
              <Projects/>
            </ProgressiveBlur>
            
            {/* About Section */}
            <ProgressiveBlur index={4} className="mb-4">
              <ActivityComponent/>
            </ProgressiveBlur>
          </article>
        </main>
            {/* About Section */}
            <ProgressiveBlur index={5} className="mb-4">
              <Footer/>
            </ProgressiveBlur>
      </div>
    </BackgroundContainer>
  );
}



