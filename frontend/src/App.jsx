import React, { useState, useRef, useEffect } from 'react';
import './general.css';

function App() {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [closestIndex, setClosestIndex] = useState(0);
  const satellitesRef = useRef(null);

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setStartX(event.clientX);
    satellitesRef.current.style.transition = 'none'; // Disable transition for smooth dragging
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;

    const dx = event.clientX - startX;
    const rotationY = currentRotation + dx * 0.05; // Adjust rotation speed as needed
    satellitesRef.current.style.transform = `rotateY(${rotationY}deg)`;
  };

  const handleMouseUp = (event) => {
    if (!isDragging) return;

    setIsDragging(false);
    const dx = event.clientX - startX;
    const newRotation = currentRotation + dx * 0.5;
    const snappedRotation = Math.round(newRotation / 120) * 120; // Snap to the nearest 120 degrees
    satellitesRef.current.style.transition = 'transform 0.5s ease'; // Enable transition for smooth snapping
    satellitesRef.current.style.transform = `rotateY(${snappedRotation}deg)`;
    setCurrentRotation(snappedRotation);
  };

  const handleTouchStart = (event) => {
    setIsDragging(true);
    setStartX(event.touches[0].clientX);
    satellitesRef.current.style.transition = 'none'; // Disable transition for smooth dragging
  };

  const handleTouchMove = (event) => {
    if (!isDragging) return;

    const dx = event.touches[0].clientX - startX;
    const rotationY = currentRotation + dx * 0.5; // Adjust rotation speed as needed
    satellitesRef.current.style.transform = `rotateY(${rotationY}deg)`;
  };

  const handleTouchEnd = (event) => {
    if (!isDragging) return;

    setIsDragging(false);
    const dx = event.changedTouches[0].clientX - startX;
    const newRotation = currentRotation + dx * 0.5;
    const snappedRotation = Math.round(newRotation / 120) * 120; // Snap to the nearest 120 degrees
    satellitesRef.current.style.transition = 'transform 0.5s ease'; // Enable transition for smooth snapping
    satellitesRef.current.style.transform = `rotateY(${snappedRotation}deg)`;
    setCurrentRotation(snappedRotation);
  };

  useEffect(() => {
    // Calculate the closest index based on currentRotation
    const rotation = currentRotation % 360;
    const index = Math.round(rotation / 120) % 3;
    setClosestIndex((index + 3) % 3); // Ensure index is positive
  }, [currentRotation]);

  return (
    <div 
      className="satellites" 
      ref={satellitesRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onContextMenu={(e) => e.preventDefault()} // Prevent right-click menu
    >
      <div className={`satellite ${closestIndex === 0 ? 'front' : ''}`} style={{ '--i': 0 }}>학술팀</div>
      <div className={`satellite ${closestIndex === 1 ? 'front' : ''}`} style={{ '--i': 120 }}>미디어팀</div>
      <div className={`satellite ${closestIndex === 2 ? 'front' : ''}`} style={{ '--i': 240 }}>디자인팀</div>
    </div>
  );
}

export default App;
