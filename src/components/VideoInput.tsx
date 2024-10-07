import React, { useRef, useCallback, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { Camera, Upload, Image as ImageIcon } from 'lucide-react';

interface VideoInputProps {
  index: number;
  onVehicleCount: (count: number) => void;
}

const VideoInput: React.FC<VideoInputProps> = ({ index, onVehicleCount }) => {
  const webcamRef = useRef<Webcam>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [model, setModel] = useState<cocoSsd.ObjectDetection | null>(null);
  const [inputType, setInputType] = useState<'webcam' | 'upload' | 'image'>('webcam');
  const [uploadedMedia, setUploadedMedia] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>('');

  useEffect(() => {
    const loadModel = async () => {
      try {
        setDebugInfo('Loading TensorFlow.js...');
        await tf.ready();
        setDebugInfo('Setting up WebGL backend...');
        await tf.setBackend('webgl');
        setDebugInfo('Loading COCO-SSD model...');
        const loadedModel = await cocoSsd.load();
        setModel(loadedModel);
        setDebugInfo('Model loaded successfully');
      } catch (error) {
        console.error('Failed to load TensorFlow.js or COCO-SSD model:', error);
        setDebugInfo(`Error: ${error instanceof Error ? error.message : String(error)}`);
      }
    };

    loadModel();
  }, []);

  const detectObjects = useCallback(async (element: HTMLVideoElement | HTMLImageElement) => {
    if (!model || !canvasRef.current) {
      setDebugInfo('Detection failed: missing model or canvas');
      return;
    }

    const canvas = canvasRef.current;
    canvas.width = 'videoWidth' in element ? element.videoWidth : element.width;
    canvas.height = 'videoHeight' in element ? element.videoHeight : element.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setDebugInfo('Detection failed: unable to get canvas context');
      return;
    }

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(element, 0, 0, ctx.canvas.width, ctx.canvas.height);

    try {
      const predictions = await model.detect(element);
      const vehicles = predictions.filter(
        pred => ['car', 'truck', 'bus', 'motorcycle'].includes(pred.class)
      );

      vehicles.forEach(vehicle => {
        ctx.beginPath();
        ctx.rect(...vehicle.bbox);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'red';
        ctx.fillStyle = 'red';
        ctx.stroke();
        ctx.fillText(
          `${vehicle.class} ${Math.round(vehicle.score * 100)}%`,
          vehicle.bbox[0],
          vehicle.bbox[1] > 10 ? vehicle.bbox[1] - 5 : 10
        );
      });

      onVehicleCount(vehicles.length);
      setDebugInfo(`Detected ${vehicles.length} vehicles`);
    } catch (error) {
      console.error('Detection error:', error);
      setDebugInfo(`Detection error: ${error instanceof Error ? error.message : String(error)}`);
    }

    if (isDetecting && 'videoWidth' in element) {
      requestAnimationFrame(() => detectObjects(element));
    }
  }, [model, isDetecting, onVehicleCount]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const mediaUrl = URL.createObjectURL(file);
      setUploadedMedia(mediaUrl);
      setInputType(file.type.startsWith('video') ? 'upload' : 'image');
      setIsDetecting(false);
      setDebugInfo(`File uploaded: ${file.name}`);
    }
  };

  const startDetection = () => {
    setIsDetecting(true);
    if (inputType === 'webcam' && webcamRef.current?.video) {
      detectObjects(webcamRef.current.video);
    } else if (inputType === 'upload' && videoRef.current) {
      videoRef.current.play();
      detectObjects(videoRef.current);
    } else if (inputType === 'image' && imageRef.current) {
      detectObjects(imageRef.current);
    }
  };

  const stopDetection = () => {
    setIsDetecting(false);
    if (inputType === 'upload' && videoRef.current) {
      videoRef.current.pause();
    }
    setDebugInfo('Detection stopped');
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Intersection {index + 1}</h3>
      <div className="mb-4">
        <button
          onClick={() => { setInputType('webcam'); stopDetection(); }}
          className={`mr-2 px-3 py-1 rounded ${
            inputType === 'webcam' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          <Camera className="inline-block mr-1" size={16} />
          Webcam
        </button>
        <button
          onClick={() => { setInputType('upload'); stopDetection(); triggerFileInput(); }}
          className={`mr-2 px-3 py-1 rounded ${
            inputType === 'upload' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          <Upload className="inline-block mr-1" size={16} />
          Upload Video
        </button>
        <button
          onClick={() => { setInputType('image'); stopDetection(); triggerFileInput(); }}
          className={`px-3 py-1 rounded ${
            inputType === 'image' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          <ImageIcon className="inline-block mr-1" size={16} />
          Upload Image
        </button>
      </div>
      <div className="relative">
        <input
          type="file"
          accept={inputType === 'image' ? "image/*" : "video/*"}
          onChange={handleFileUpload}
          className="hidden"
          ref={fileInputRef}
        />
        {inputType === 'webcam' && (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full h-48 rounded-lg"
          />
        )}
        {inputType === 'upload' && (
          uploadedMedia ? (
            <video
              ref={videoRef}
              src={uploadedMedia}
              className="w-full h-48 rounded-lg"
              controls
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
              <p>No video uploaded</p>
            </div>
          )
        )}
        {inputType === 'image' && (
          uploadedMedia ? (
            <img
              ref={imageRef}
              src={uploadedMedia}
              alt="Uploaded image"
              className="w-full h-48 rounded-lg object-cover"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
              <p>No image uploaded</p>
            </div>
          )
        )}
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-48 rounded-lg"
        />
      </div>
      <button
        onClick={isDetecting ? stopDetection : startDetection}
        className={`mt-2 px-4 py-2 rounded transition-colors ${
          model
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        disabled={!model || (inputType !== 'webcam' && !uploadedMedia)}
      >
        {isDetecting ? 'Stop Detection' : model ? 'Start Detection' : 'Initializing...'}
      </button>
      <div className="mt-2 text-sm text-gray-600">
        {debugInfo}
      </div>
    </div>
  );
};

export default VideoInput;