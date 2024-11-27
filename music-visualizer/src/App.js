import React, { useRef, useState, useEffect } from 'react';
import p5 from 'p5';
import 'tailwindcss/tailwind.css';

const CymaticVisualizer = () => {
  const canvasRef = useRef(null);
  const audioRef = useRef(null); // Reference to the audio element
  const audioContextRef = useRef(null);
  const analyzerRef = useRef(null);
  const isPlayingRef = useRef(false);

  // Define state for canvas background and drawing color
  const [canvasBackground, setCanvasBackground] = useState("#202123");
  const [drawingColor, setDrawingColor] = useState("#F7F7F8");
  const [frequency, setFrequency] = useState(440);  // Default frequency
  const [visualizerType, setVisualizerType] = useState('cymatic'); // Current visualizer type

  useEffect(() => {
    const sketch = (p) => {
      let penPositions = [];
      let backwardSpeed = 1; // Default backward speed

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
        p.noFill();
        p.strokeWeight(2);

        // Set up camera controls
        let fov = 20;
        let cameraZ = (p.height / 2.0) / p.tan(p.PI * fov / 360.0);
        p.perspective(fov, p.width / p.height, cameraZ / 10.0, cameraZ * 10.0);
      };

      p.draw = () => {
        p.stroke(drawingColor);
        p.background(canvasBackground);

        if (analyzerRef.current) {
          const bufferLength = analyzerRef.current.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);
          analyzerRef.current.getByteFrequencyData(dataArray);

          // Get the dominant frequency
          const dominantFrequency = dataArray.reduce((max, val, index) => {
            return val > dataArray[max] ? index : max;
          }, 0);

          setFrequency(dominantFrequency * (audioContextRef.current.sampleRate / 2) / bufferLength);
        }

        if (visualizerType === 'cymatic') {
          renderCymatic(p, penPositions, backwardSpeed);
        } else if (visualizerType === 'waveform') {
          renderWaveform(p);
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };

      const renderCymatic = (p, penPositions, backwardSpeed) => {
        let amplitude = p.map(p.sin(p.frameCount * (frequency / 100)), -1, 1, 50, 200);
        let angle = p.frameCount * (frequency / 100);
        let nextPenPosition = p.createVector(amplitude * p.cos(angle), amplitude * p.sin(angle), 0);

        // Move all previous positions backward
        for (let i = 0; i < penPositions.length; i++) {
          penPositions[i].z -= backwardSpeed;
        }

        // Store the current pen position
        penPositions.push(nextPenPosition);

        // Limit the number of positions stored
        if (penPositions.length > 50) {
          penPositions.splice(0, 1);
        }

        // Enable camera controls
        p.orbitControl();

        // Draw a smooth curve connecting the pen positions in 3D
        p.beginShape();
        for (let i = 0; i < penPositions.length; i++) {
          let { x, y, z } = penPositions[i];
          p.curveVertex(x, y, z);
        }
        p.endShape();
      };

      const renderWaveform = (p) => {
        if (analyzerRef.current) {
          const bufferLength = analyzerRef.current.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);
          analyzerRef.current.getByteTimeDomainData(dataArray);

          p.beginShape();
          for (let i = 0; i < bufferLength; i++) {
            const x = p.map(i, 0, bufferLength, -p.width / 2, p.width / 2);
            const y = p.map(dataArray[i], 0, 255, -p.height / 2, p.height / 2);
            p.vertex(x, y);
          }
          p.endShape();
        }
      };
    };

    const p5Instance = new p5(sketch, canvasRef.current);
    
    return () => {
      p5Instance.remove();
    };
  }, [canvasBackground, drawingColor, frequency, visualizerType]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyzerRef.current = audioContextRef.current.createAnalyser();
      analyzerRef.current.fftSize = 256;
      audioRef.current.src = URL.createObjectURL(file);
      const source = audioContextRef.current.createMediaElementSource(audioRef.current);
      source.connect(analyzerRef.current);
      analyzerRef.current.connect(audioContextRef.current.destination);
    }
  };

  const toggleAudio = () => {
    if (isPlayingRef.current) {
      audioRef.current.pause();
      isPlayingRef.current = false;
    } else {
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      audioRef.current.play();
      isPlayingRef.current = true;
    }
  };

  const toggleDarkMode = () => {
    const body = document.body;
    body.classList.toggle("dark-mode");
    body.classList.toggle("light-mode");
    if (body.classList.contains("dark-mode")) {
      setCanvasBackground("#202123");
      setDrawingColor("#F7F7F8");
    } else {
      setCanvasBackground("#F7F7F8");
      setDrawingColor("#202123");
    }
  };

  return (
    <div className="text-center p-5">
      <h1 className="text-4xl mb-5">Cymatic Audio Visualizer</h1>
      <div className="flex justify-center items-center mb-5">
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileUpload}
          className="mr-2 p-2 border rounded"
        />
        <button
          id="play-button"
          onClick={toggleAudio}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {isPlayingRef.current ? "Pause" : "Play"}
        </button>
      </div>
      <div className="flex justify-center items-center mb-5">
        <button
          onClick={() => setVisualizerType('cymatic')}
          className={`px-4 py-2 ${visualizerType === 'cymatic' ? 'bg-blue-600 text-white' : 'bg-gray-200'} rounded mx-1`}
        >
          Cymatic
        </button>
        <button
          onClick={() => setVisualizerType('waveform')}
          className={`px-4 py-2 ${visualizerType === 'waveform' ? 'bg-blue-600 text-white' : 'bg-gray-200'} rounded mx-1`}
        >
          Waveform
        </button>
      </div>
      <div ref={canvasRef} className="w-full h-96"></div>
      <button
        onClick={toggleDarkMode}
        className="mt-5 px-4 py-2 bg-gray-800 text-white rounded"
      >
        Toggle Dark Mode
      </button>
      <audio ref={audioRef} hidden />
    </div>
  );
};

export default CymaticVisualizer;
