import React, { useState } from 'react';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';
import UploadCard from '../components/UploadCard';
import ResultPanel from '../components/ResultPanel';
import GradCamViewer from '../components/GradCamViewer';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const Home = () => {
  const { isDark } = useTheme();
  const [selectedFile, setSelectedFile] = useState(null);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [heatmapImage, setHeatmapImage] = useState(null);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setResults(null);
    setError(null);
  };

  const handleRunDetection = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Real API call to Flask backend
      const response = await axios.post('http://localhost:5000/predict', formData);

      setResults(response.data);

      // Fetch heatmap image
      const heatmapResponse = await axios.get(`http://localhost:5000/heatmap/${response.data.heatmap_path}`, {
        responseType: 'blob'
      });
      const heatmapUrl = URL.createObjectURL(heatmapResponse.data);
      setHeatmapImage(heatmapUrl);

    } catch (err) {
      setError('Failed to process the image. Please try again.');
      console.error('API Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-background text-foreground' : 'bg-background-light text-foreground-light'}`}>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <UploadCard onFileSelect={handleFileSelect} selectedFile={selectedFile} />

          {selectedFile && !results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <button
                onClick={handleRunDetection}
                disabled={isLoading}
                className="bg-primary hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 mx-auto"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Analyzing with AI model...</span>
                  </>
                ) : (
                  <span>Run Detection</span>
                )}
              </button>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-900/50 border border-red-700 rounded-lg p-4 text-center text-red-300"
            >
              {error}
            </motion.div>
          )}

          {results && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ResultPanel
                prediction={results.prediction}
                confidence={results.confidence}
                explanation={results.explanation}
              />
              <GradCamViewer
                originalImage={URL.createObjectURL(selectedFile)}
                heatmapImage={heatmapImage}
                overlayImage={heatmapImage} // Using heatmap as overlay for now
              />
            </div>
          )}

          <AboutSection />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
