import React, { useState, useRef, useEffect } from 'react';

interface Detection {
  label: string;
  confidence: number;
  bbox: [number, number, number, number]; // [x, y, width, height] in percentages
  color: string;
}

// Mock detections for demo purposes (since actual YOLO model isn't connected yet)
const MOCK_DETECTIONS: Record<string, Detection[]> = {
  'image1': [
    { label: 'person', confidence: 0.92, bbox: [15, 20, 15, 45], color: '#3b82f6' },
    { label: 'backpack', confidence: 0.85, bbox: [20, 25, 10, 15], color: '#a855f7' },
    { label: 'car', confidence: 0.78, bbox: [60, 40, 30, 20], color: '#ef4444' },
  ],
  'image2': [
    { label: 'laptop', confidence: 0.95, bbox: [25, 40, 50, 40], color: '#3b82f6' },
    { label: 'cup', confidence: 0.88, bbox: [80, 50, 10, 15], color: '#a855f7' },
    { label: 'mouse', confidence: 0.82, bbox: [75, 65, 8, 10], color: '#ef4444' },
  ],
  'image3': [
    { label: 'dog', confidence: 0.91, bbox: [30, 35, 25, 40], color: '#3b82f6' },
    { label: 'frisbee', confidence: 0.86, bbox: [60, 20, 10, 5], color: '#a855f7' },
    { label: 'tree', confidence: 0.65, bbox: [5, 5, 20, 80], color: '#ef4444' },
  ]
};

const SAMPLE_IMAGES = [
  { id: 'image1', src: 'https://images.unsplash.com/photo-1515548625976-92f588c75d42?q=80&w=1000&auto=format&fit=crop', alt: 'Urban Scene' },
  { id: 'image2', src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop', alt: 'Workspace' },
  { id: 'image3', src: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1000&auto=format&fit=crop', alt: 'Park Scene' },
];

const CVPipeline: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(SAMPLE_IMAGES[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showDetections, setShowDetections] = useState(false);
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.5);
  const [iouThreshold, setIouThreshold] = useState(0.45);
  const [processingTime, setProcessingTime] = useState(0);

  const runDetection = () => {
    setIsProcessing(true);
    setShowDetections(false);
    
    // Simulate API latency
    setTimeout(() => {
      setIsProcessing(false);
      setShowDetections(true);
      setProcessingTime(Math.floor(Math.random() * 50) + 120); // Random time between 120-170ms
    }, 1500);
  };

  const handleImageSelect = (img: typeof SAMPLE_IMAGES[0]) => {
    setSelectedImage(img);
    setShowDetections(false);
  };

  // Filter detections based on current confidence threshold
  const currentDetections = showDetections 
    ? (MOCK_DETECTIONS[selectedImage.id] || []).filter(d => d.confidence >= confidenceThreshold)
    : [];

  return (
    <div className="w-full bg-slate-900/50 border border-slate-700 rounded-xl overflow-hidden backdrop-blur-sm">
      <div className="p-6 border-b border-slate-700 flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            CV Pipeline Demo
          </h3>
          <p className="text-gray-400 text-sm mt-1">YOLOv8 Object Detection Inference</p>
        </div>
        <div className="flex gap-2">
          {SAMPLE_IMAGES.map((img) => (
            <button
              key={img.id}
              onClick={() => handleImageSelect(img)}
              className={`w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                selectedImage.id === img.id ? 'border-blue-500 scale-105' : 'border-slate-600 opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
        {/* Main Viewport */}
        <div className="lg:col-span-2 relative bg-black aspect-video flex items-center justify-center overflow-hidden border-r border-slate-700">
          <div className="relative w-full h-full">
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt} 
              className={`w-full h-full object-contain transition-opacity duration-300 ${isProcessing ? 'opacity-50' : 'opacity-100'}`}
            />
            
            {/* Scanning Effect */}
            {isProcessing && (
              <div className="absolute inset-0 z-10">
                <div className="w-full h-1 bg-blue-500/80 shadow-[0_0_15px_rgba(59,130,246,1)] animate-[scan_1.5s_ease-in-out_infinite]"></div>
                <div className="absolute inset-0 bg-blue-500/10 animate-pulse"></div>
              </div>
            )}

            {/* Bounding Boxes */}
            {currentDetections.map((det, idx) => (
              <div
                key={idx}
                className="absolute border-2 pointer-events-none transition-all duration-300 animate-fade-in"
                style={{
                  left: `${det.bbox[0]}%`,
                  top: `${det.bbox[1]}%`,
                  width: `${det.bbox[2]}%`,
                  height: `${det.bbox[3]}%`,
                  borderColor: det.color,
                  boxShadow: `0 0 20px ${det.color}40`
                }}
              >
                <div 
                  className="absolute -top-7 left-0 px-2 py-0.5 text-xs font-bold text-white rounded shadow-sm whitespace-nowrap flex gap-2"
                  style={{ backgroundColor: det.color }}
                >
                  <span className="uppercase">{det.label}</span>
                  <span className="bg-black/20 px-1 rounded">{(det.confidence * 100).toFixed(0)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls & Metrics */}
        <div className="p-6 bg-slate-800/30 flex flex-col gap-8">
          
          {/* Controls */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label className="text-gray-300">Confidence Threshold</label>
                <span className="text-blue-400 font-mono">{(confidenceThreshold * 100).toFixed(0)}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.05"
                value={confidenceThreshold}
                onChange={(e) => setConfidenceThreshold(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label className="text-gray-300">IoU Threshold</label>
                <span className="text-blue-400 font-mono">{(iouThreshold * 100).toFixed(0)}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.05"
                value={iouThreshold}
                onChange={(e) => setIouThreshold(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </div>

          <button
            onClick={runDetection}
            disabled={isProcessing}
            className={`w-full py-4 rounded font-bold tracking-widest uppercase transition-all
              ${isProcessing 
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]'
              }`}
          >
            {isProcessing ? 'Processing...' : 'Run Detection Model'}
          </button>

          {/* Metrics Panel */}
          <div className="mt-auto bg-black/40 rounded-lg p-4 border border-slate-700/50">
            <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Inference Metrics</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-400 mb-1">Inference Time</div>
                <div className="text-xl font-mono text-green-400">
                  {showDetections ? `${processingTime}ms` : '--'}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">Objects Found</div>
                <div className="text-xl font-mono text-blue-400">
                  {showDetections ? currentDetections.length : '--'}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">Model</div>
                <div className="text-sm font-mono text-gray-300">YOLOv8-Large</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">Resolution</div>
                <div className="text-sm font-mono text-gray-300">640x640</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CVPipeline;