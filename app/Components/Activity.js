import React from 'react';
import MapComponent from './Map';

const Activity = () => {
  return (
    <div className="bg-background border-border rounded-3xl rounded-b-none shadow-lg overflow-hidden">
          {/* Map component on top for mobile, right side for large screens */}
          <div className="h-[270px] md:h-[270px] lg:h-[270px]">
              <MapComponent />
          </div>
    </div>
  );
};

export default Activity;
