import React from 'react';
import { FaGlobe} from 'react-icons/fa';

const SiteCompact = () => (
  <div className="bg-card text-card-foreground p-4 rounded-lg shadow-md h-full">
    <FaGlobe className="text-3xl mb-2 text-blue-500" />
    <h2 className="text-lg font-bold mb-2">Digital Explorations</h2>
    <p className="text-sm">Diving deep into web3 technologies</p>
  </div>
);

export default SiteCompact;