import React from 'react';
import { FaQuoteRight, FaRandom } from 'react-icons/fa';

const QuotesComponent = () => {
  const quotes = [
    { text: "The universe is under no obligation to make sense to you.", author: "Neil deGrasse Tyson" },
    { text: "Imagination is more important than knowledge.", author: "Albert Einstein" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  ];

  const currentQuote = quotes[0]; // In a real app, you might randomly select a quote

  return (
    <div className="bg-card text-card-foreground p-6 rounded-lg shadow-lg h-full flex flex-col">
      <FaQuoteRight className="text-4xl mb-4 text-indigo-500" />
      <h2 className="text-xl font-bold mb-4">Quote of the Day</h2>
      <div className="flex-grow flex flex-col justify-center">
        <blockquote className="text-lg italic mb-4">"{currentQuote.text}"</blockquote>
        <p className="text-right text-md font-semibold">- {currentQuote.author}</p>
      </div>
      <button className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-full flex items-center justify-center">
        <FaRandom className="mr-2" /> New Quote
      </button>
    </div>
  );
};

export default QuotesComponent;