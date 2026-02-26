import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const UploadCard = ({ onFileSelect, selectedFile }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file) => {
    if (file && ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
      onFileSelect(file);
    } else {
      alert('Please select a valid image file (.jpg, .png)');
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 shadow-2xl"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Deepfake Detection & Explainable AI (Grad-CAM)
        </h2>
        <p className="text-gray-400">
          Upload an image to detect deepfakes and visualize the model's decision using Grad-CAM.
        </p>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
          isDragOver
            ? 'border-primary bg-primary/10'
            : 'border-gray-600 hover:border-primary/50 hover:bg-gray-700/30'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files[0])}
          className="hidden"
        />

        {selectedFile ? (
          <div className="space-y-4">
            <div className="w-32 h-32 mx-auto rounded-lg overflow-hidden bg-gray-700">
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-gray-300">{selectedFile.name}</p>
            <button className="bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-lg transition-colors duration-200">
              Change Image
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-gray-700 rounded-full flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <p className="text-lg font-medium text-foreground mb-2">
                Drag and drop or click to upload an image (.jpg, .png)
              </p>
              <p className="text-sm text-gray-400">
                Supported formats: JPG, JPEG, PNG
              </p>
            </div>
            <button className="bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 mx-auto">
              <Upload className="w-4 h-4" />
              <span>Select Image</span>
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default UploadCard;
