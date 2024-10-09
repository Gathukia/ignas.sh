import React from 'react';
import { FaGlobe, FaExternalLinkAlt } from 'react-icons/fa';

const SiteExpanded = () => {
  const sites = [
    { name: "Web3 Foundation", url: "https://web3.foundation/", description: "Nurturing and stewarding technologies and applications in the fields of decentralized web software protocols." },
    { name: "Ethereum.org", url: "https://ethereum.org/", description: "Learn about Ethereum, the revolutionary blockchain technology." },
    { name: "IPFS", url: "https://ipfs.io/", description: "A peer-to-peer hypermedia protocol designed to preserve and grow humanity's knowledge." },
  ];

  return (
    <div className="bg-card text-card-foreground p-6 rounded-lg shadow-lg h-full flex flex-col">
      <FaGlobe className="text-4xl mb-4 text-blue-500" />
      <h2 className="text-xl font-bold mb-4">Exploring Web3</h2>
      <div className="flex-grow overflow-y-auto">
        {sites.map((site, index) => (
          <div key={index} className="mb-4 last:mb-0">
            <h3 className="text-lg font-semibold flex items-center">
              {site.name}
              <a href={site.url} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500">
                <FaExternalLinkAlt className="text-sm" />
              </a>
            </h3>
            <p className="text-sm text-muted-foreground">{site.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SiteExpanded;