import React, { useState } from 'react';
import { motion } from 'framer-motion';

const GradCamViewer = ({ originalImage, heatmapImage, overlayImage }) => {
  const [activeTab, setActiveTab] = useState('original');

  if (!originalImage) return null;

  const tabs = [
    { id: 'original', label: 'Original', image: originalImage },
    { id: 'overlay', label: 'Overlay', image: overlayImage },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 shadow-2xl"
    >
      <h3 className="text-xl font-bold text-foreground mb-4">Visualization Mode</h3>

      <div className="flex space-x-1 mb-4 bg-gray-700/50 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-primary text-white shadow-lg'
                : 'text-gray-300 hover:text-white hover:bg-gray-600/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="relative">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md mx-auto"
        >
          <img
            src={tabs.find(tab => tab.id === activeTab)?.image}
            alt={`${activeTab} view`}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GradCamViewer;
