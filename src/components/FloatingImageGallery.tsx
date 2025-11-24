"use client";

import { useEffect, useRef, useState } from "react";
import { heroImageUrls } from "@/data/heroImages";

interface FloatingImage {
  id: number;
  url: string;
  x: number;
  y: number;
  vx: number; // velocity x
  vy: number; // velocity y
  size: number; // random size between min and max
  rotation: number;
  rotationSpeed: number;
}

const MIN_SIZE = 60; // minimum image size in pixels
const MAX_SIZE = 120; // maximum image size in pixels
const MAX_VELOCITY = 0.5; // maximum speed
const BOUNCE_DAMPING = 0.95; // damping factor for collisions
const NUM_IMAGES = 80; // total number of images to show

export function FloatingImageGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<FloatingImage[]>([]);
  const elementRefsRef = useRef<Map<number, HTMLDivElement>>(new Map());
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Initialize images only if we have URLs
  useEffect(() => {
    if (heroImageUrls.length === 0) return;

    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.offsetWidth || window.innerWidth;
    const containerHeight = container.offsetHeight || window.innerHeight;

    // Initialize images with random positions and velocities
    const initialImages = heroImageUrls.slice(0, NUM_IMAGES).map((url, index) => ({
      id: index,
      url,
      x: Math.random() * (containerWidth - MAX_SIZE),
      y: Math.random() * (containerHeight - MAX_SIZE),
      vx: (Math.random() - 0.5) * MAX_VELOCITY,
      vy: (Math.random() - 0.5) * MAX_VELOCITY,
      size: MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE),
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2, // degrees per frame
    }));

    setImages(initialImages);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || images.length === 0) return;

    const animate = () => {
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;

      images.forEach((image, i) => {
        // Update position
        image.x += image.vx;
        image.y += image.vy;
        image.rotation += image.rotationSpeed;

        // Bounce off edges
        if (image.x <= 0 || image.x + image.size >= containerWidth) {
          image.vx *= -BOUNCE_DAMPING;
          image.x = Math.max(0, Math.min(containerWidth - image.size, image.x));
        }
        if (image.y <= 0 || image.y + image.size >= containerHeight) {
          image.vy *= -BOUNCE_DAMPING;
          image.y = Math.max(0, Math.min(containerHeight - image.size, image.y));
        }

        // Collision detection with other images
        images.slice(i + 1).forEach((otherImage) => {
          const dx = image.x + image.size / 2 - (otherImage.x + otherImage.size / 2);
          const dy = image.y + image.size / 2 - (otherImage.y + otherImage.size / 2);
          const distance = Math.sqrt(dx * dx + dy * dy);
          const minDistance = (image.size + otherImage.size) / 2;

          if (distance < minDistance && distance > 0) {
            // Collision detected - bounce them apart
            const angle = Math.atan2(dy, dx);
            const sin = Math.sin(angle);
            const cos = Math.cos(angle);

            // Rotate velocities
            const vx1 = image.vx * cos + image.vy * sin;
            const vy1 = image.vy * cos - image.vx * sin;
            const vx2 = otherImage.vx * cos + otherImage.vy * sin;
            const vy2 = otherImage.vy * cos - otherImage.vx * sin;

            // Swap velocities (elastic collision)
            const finalVx1 = vx2;
            const finalVx2 = vx1;

            // Rotate back
            image.vx = finalVx1 * cos - vy1 * sin;
            image.vy = vy1 * cos + finalVx1 * sin;
            otherImage.vx = finalVx2 * cos - vy2 * sin;
            otherImage.vy = vy2 * cos + finalVx2 * sin;

            // Separate images to prevent overlap
            const overlap = minDistance - distance;
            const separationX = (dx / distance) * overlap * 0.5;
            const separationY = (dy / distance) * overlap * 0.5;

            image.x += separationX;
            image.y += separationY;
            otherImage.x -= separationX;
            otherImage.y -= separationY;

            // Apply damping
            image.vx *= BOUNCE_DAMPING;
            image.vy *= BOUNCE_DAMPING;
            otherImage.vx *= BOUNCE_DAMPING;
            otherImage.vy *= BOUNCE_DAMPING;
          }
        });

        // Update DOM directly for performance
        const element = elementRefsRef.current.get(image.id);
        if (element) {
          element.style.left = `${image.x}px`;
          element.style.top = `${image.y}px`;
          element.style.transform = `rotate(${image.rotation}deg)`;
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Handle window resize
    const handleResize = () => {
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      
      images.forEach((image) => {
        // Keep images within bounds
        image.x = Math.max(0, Math.min(containerWidth - image.size, image.x));
        image.y = Math.max(0, Math.min(containerHeight - image.size, image.y));
      });
    };

    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [images]);

  if (heroImageUrls.length === 0) {
    return null; // Don't render if no images
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {images.map((image) => (
        <div
          key={image.id}
          ref={(el) => {
            if (el) {
              elementRefsRef.current.set(image.id, el);
            } else {
              elementRefsRef.current.delete(image.id);
            }
          }}
          className="absolute"
          style={{
            left: `${image.x}px`,
            top: `${image.y}px`,
            width: `${image.size}px`,
            height: `${image.size}px`,
            transform: `rotate(${image.rotation}deg)`,
            willChange: "transform",
          }}
        >
          <div className="relative w-full h-full rounded-lg overflow-hidden border border-[#1A1B1F]/50 shadow-lg bg-[#111215]">
            <img
              src={image.url}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                // Hide the image if it fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
