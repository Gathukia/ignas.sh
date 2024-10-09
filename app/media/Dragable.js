import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// Import existing components
import PhotosComponent from './components/Photos';
import MusicComponent from './components/Music';
import QuotesComponent from './components/Quotes';
import MapComponent from "./components/Map";
import WeatherComponent from "./components/WeatherComponent";
import TimeComponent from "./components/TimeComponent";
// Placeholder components for new items
const ReadingComponent = () => <div>Reading Component</div>;
const WatchingComponent = () => <div>Watching Component</div>;

const ResponsiveGridLayout = WidthProvider(Responsive);

const Card = ({ children }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`w-full h-full backdrop-blur-md rounded-xl shadow-lg overflow-hidden
      ${theme === 'dark' 
        ? 'bg-bunker-400 text-card-foreground border border-border' 
        : 'bg-card text-card-foreground border border-border'}
    `}>
      <div className="w-full h-full">
        {children}
      </div>
    </div>
  );
};

const baseLayouts = {
  lg: [
    { i: "map", x: 0, y: 0, w: 4, h: 6 },
    { i: "time", x: 4, y: 0, w: 2, h: 12},
    { i: "weather", x: 6, y: 0, w: 3, h: 4 },
    { i: "photos", x: 4, y: 4, w: 5, h: 8 },
    { i: "music", x: 0, y: 6, w: 4, h: 15 },
    { i: "reading", x: 10, y: 20, w: 3, h: 8 },
    { i: "watching", x: 10, y: 10, w: 3, h: 12 },
    { i: "quotes", x: 4, y: 12, w: 5, h: 8 },
  ],
  md: [
    { i: "map", x: 0, y: 0, w: 6, h: 6 },
    { i: "time", x: 6, y: 0, w: 3, h: 4 },
    { i: "weather", x: 9, y: 0, w: 3, h: 4 },
    { i: "photos", x: 6, y: 4, w: 6, h: 6 },
    { i: "music", x: 0, y: 6, w: 6, h: 15 },
    { i: "reading", x: 0, y: 11, w: 6, h: 4 },
    { i: "watching", x: 6, y: 9, w: 6, h: 4 },
    { i: "quotes", x: 0, y: 15, w: 12, h: 2 },
  ],
  sm: [
    { i: "map", x: 0, y: 0, w: 5, h: 4 },
    { i: "time", x: 0, y: 4, w: 2, h: 4 },
    { i: "weather", x: 3, y: 4, w: 2, h: 4 },
    { i: "photos", x: 0, y: 8, w: 6, h: 10 },
    { i: "music", x: 0, y: 22, w: 6, h: 20 },
    { i: "reading", x: 3, y: 42, w: 6, h: 10 },
    { i: "watching", x: 0, y: 52, w: 6, h: 10 },
    { i: "quotes", x: 3, y: 62, w: 6, h: 8 },
  ],
};

const MediaGrid = () => {
  const [layouts, setLayouts] = useState(baseLayouts);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  const items = [
    { id: "map", Component: MapComponent },
    { id: "time", Component: TimeComponent },
    { id: "weather", Component: WeatherComponent },
    { id: "photos", Component: PhotosComponent },
    { id: "music", Component: MusicComponent },
    { id: "reading", Component: ReadingComponent },
    { id: "watching", Component: WatchingComponent },
    { id: "quotes", Component: QuotesComponent },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const generateDOM = () => {
    return items.map((item) => (
      <div key={item.id} className="grid-item">
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          className="w-full h-full"
        >
          <Card>
            <item.Component />
          </Card>
        </motion.div>
      </div>
    ));
  };

  const onLayoutChange = (currentLayout, allLayouts) => {
    setLayouts(allLayouts);
  };

  if (!mounted) return null;

  return (
    <div className={`w-full mx-auto h-full transition-colors duration-200
      ${theme === 'dark'
        ? 'bg-background text-foreground'
        : 'bg-background text-foreground'}
    `}>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        onLayoutChange={onLayoutChange}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 12, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={30}
        isResizable={false}
        isDraggable={false}
        compactType="vertical"
        preventCollision={false}
        margin={[5, 5]}  // This sets the gap to 10px both horizontally and vertically
        containerPadding={[2, 2]}  // This adds padding around the grid
        useCSSTransforms={true}
      >
        {generateDOM()}
      </ResponsiveGridLayout>
    </div>
  );
};

export default MediaGrid;