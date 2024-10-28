import React from 'react';
import { BackgroundContainer } from '../Ui/Background';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default async function Projects() {
  return (
    <BackgroundContainer contentType="written">
      <div className="flex flex-col min-h-screen bg-scroll bg-background dark:bg-transparent text-foreground">
        <Navbar />
        <main className="max-w-3xl mx-auto py-16 px-6">
          <h1 className="text-4xl font-extrabold mb-8 text-center">Projects & Tools</h1>
          <p className="mb-6 text-lg leading-relaxed text-center">
            here you will find a stash of my projects and tools i have worked on some for my own 
            use and others that you might find useful too!
          </p>

          <p className="mb-10 text-lg leading-relaxed text-center">most of them are open source on github</p>

          <div className="text-center text-xl font-semibold text-gray-500 dark:text-gray-400">
            🚧 This section is currently under construction. Stay tuned for exciting updates! 🚧
          </div>

          {/* Placeholder for future project showcases */}
        </main>
      </div>
    </BackgroundContainer>
  );
}