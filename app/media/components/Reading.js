import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card'; // Assuming you have a reusable Card component
import Image from 'next/image';

// Helper function to fetch data from Literal API
const fetchBooks = async (url, apiKey) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
  const data = await response.json();
  return data;
};

const ReadingComponent = () => {
  const [currentBooks, setCurrentBooks] = useState([]);
  const [allTimeBestBooks, setAllTimeBestBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = 'your-literal-api-key'; // Replace with your Literal API key
  const CURRENT_BOOKS_URL = 'https://api.literal.club/me/current-reading'; // Replace with the correct endpoint
  const BEST_BOOKS_URL = 'https://api.literal.club/me/best-books'; // Replace with the correct endpoint

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [currentData, bestData] = await Promise.all([
          fetchBooks(CURRENT_BOOKS_URL, API_KEY),
          fetchBooks(BEST_BOOKS_URL, API_KEY),
        ]);
        setCurrentBooks(currentData.books);
        setAllTimeBestBooks(bestData.books);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data from Literal API:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center text-primary">Loading books...</p>;
  }

  return (
    <div className="flex flex-col space-y-6">
      {/* Currently Reading Section */}
      <Card className="w-full bg-gradient-to-br from-secondary to-secondary/50 shadow-lg rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
        <CardContent className="p-4 h-full">
          <h2 className="text-lg sm:text-xl font-bold text-primary mb-4">Currently Reading</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {currentBooks.map((book) => (
              <div
                key={book.id}
                className="flex flex-col items-center bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <Image
                  src={book.coverUrl}
                  alt={book.title}
                  width={120}
                  height={180}
                  className="rounded-md"
                />
                <div className="mt-2 text-center">
                  <p className="text-sm sm:text-base font-medium text-primary">{book.title}</p>
                  <p className="text-xs text-muted-foreground">{book.author}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* All-Time Best Books Section */}
      <Card className="w-full bg-gradient-to-br from-secondary to-secondary/50 shadow-lg rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
        <CardContent className="p-4 h-full">
          <h2 className="text-lg sm:text-xl font-bold text-primary mb-4">All-Time Best Books</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {allTimeBestBooks.map((book) => (
              <div
                key={book.id}
                className="flex flex-col items-center bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <Image
                  src={book.coverUrl}
                  alt={book.title}
                  width={120}
                  height={180}
                  className="rounded-md"
                />
                <div className="mt-2 text-center">
                  <p className="text-sm sm:text-base font-medium text-primary">{book.title}</p>
                  <p className="text-xs text-muted-foreground">{book.author}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReadingComponent;