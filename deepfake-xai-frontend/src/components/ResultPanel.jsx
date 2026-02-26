import React from 'react';
import { motion } from 'framer-motion';

const ResultPanel = ({ prediction, confidence, explanation }) => {
  if (!prediction) return null;

  const isReal = prediction === 'Real';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 shadow-2xl"
    >
      <h3 className="text-xl font-bold text-foreground mb-4">Prediction Result</h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-300">Prediction:</span>
          <span className={`font-bold text-lg ${isReal ? 'text-green-400' : 'text-red-400'}`}>
            {prediction}
          </span>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-300">Confidence Level:</span>
            <span className="text-sm text-gray-400">{(confidence * 100).toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${confidence * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-3 rounded-full ${isReal ? 'bg-green-500' : 'bg-red-500'}`}
            />
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-foreground mb-2">
            Model Explanation (XAI - Grad-CAM):
          </h4>
          <p className="text-gray-300 leading-relaxed">{explanation}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultPanel;
