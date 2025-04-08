'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

export function useCamera() {
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Toggle camera function
  const toggleCamera = useCallback(async () => {
    try {
      if (cameraEnabled) {
        // Turn off camera
        if (cameraStream) {
          cameraStream.getTracks().forEach(track => track.stop());
          setCameraStream(null);
        }
        setCameraEnabled(false);
        setCameraError(null);
        // Clear any captured image when turning off camera
        setCapturedImage(null);
      } else {
        // Turn on camera
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: "user"
          } 
        });
        
        setCameraStream(stream);
        setCameraEnabled(true);
        setCameraError(null);
        
        // Add a small delay to ensure the video element is in the DOM
        setTimeout(() => {
          // If we have a video element reference, set its source to the stream
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            
            // Add event listeners to debug video loading
            videoRef.current.onloadedmetadata = () => {
              videoRef.current?.play().catch(e => console.error('Error playing video:', e));
            };
          }
        }, 100);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setCameraError('Could not access camera. Please check permissions and try again.');
      setCameraEnabled(false);
    }
  }, [cameraEnabled, cameraStream]);
  
  // Function to resize image before sending
  const resizeImageForUpload = useCallback((imageDataUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        const img = new Image();
        img.onload = () => {
          // Create a canvas for resizing
          const canvas = document.createElement('canvas');
          
          // Calculate new dimensions while maintaining aspect ratio
          let width = img.width;
          let height = img.height;
          const maxDimension = 800;
          
          if (width > height && width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
          
          // Set canvas dimensions
          canvas.width = width;
          canvas.height = height;
          
          // Draw resized image on canvas
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
          }
          
          ctx.drawImage(img, 0, 0, width, height);
          
          // Convert to JPEG with 80% quality
          const resizedImageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
          
          resolve(resizedImageDataUrl);
        };
        
        img.onerror = () => {
          reject(new Error('Failed to load image for resizing'));
        };
        
        img.src = imageDataUrl;
      } catch (error) {
        console.error('Error resizing image:', error);
        reject(error);
      }
    });
  }, []);
  
  // Function to capture image from camera
  const captureImage = useCallback(async () => {
    if (!videoRef.current || !cameraStream) {
      console.error('Cannot capture image: video element or camera stream not available');
      return null;
    }
    
    try {
      // Create canvas if it doesn't exist
      if (!canvasRef.current) {
        const canvas = document.createElement('canvas');
        canvasRef.current = canvas;
      }
      
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw the current video frame to the canvas
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }
      
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas to data URL (base64 encoded image)
      const originalImageDataUrl = canvas.toDataURL('image/jpeg', 1.0);
      
      // Resize the image
      const resizedImageDataUrl = await resizeImageForUpload(originalImageDataUrl);
      
      setCapturedImage(resizedImageDataUrl);
      return resizedImageDataUrl;
    } catch (error) {
      console.error('Error capturing image:', error);
      setCameraError('Failed to capture image. Please try again.');
      return null;
    }
  }, [videoRef, cameraStream, resizeImageForUpload]);
  
  // Function to discard captured image
  const discardImage = useCallback(() => {
    setCapturedImage(null);
  }, []);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Stop camera stream if component unmounts while camera is on
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => {
          try {
            track.stop();
          } catch (error) {
            console.error('Error stopping camera track:', error);
          }
        });
      }
      
      // Clear any captured image when unmounting
      if (capturedImage) {
        URL.revokeObjectURL(capturedImage);
      }
    };
  }, [cameraStream, capturedImage]);
  
  return {
    cameraEnabled,
    cameraStream,
    cameraError,
    capturedImage,
    videoRef,
    toggleCamera,
    captureImage,
    discardImage,
    setCameraError
  };
}
