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

    // Wait a bit for DOM to be ready so we can get text element positions
    setTimeout(() => {
      const containerWidth = container.offsetWidth || window.innerWidth;
      const containerHeight = container.offsetHeight || window.innerHeight;
      
      // Get text element positions to avoid
      const contentEl = document.getElementById('hero-content');
      let avoidArea = { x: 0, y: 0, width: 0, height: 0 };
      
      if (contentEl) {
        const containerRect = container.getBoundingClientRect();
        const contentRect = contentEl.getBoundingClientRect();
        const padding = 100; // Extra padding around text
        avoidArea = {
          x: contentRect.left - containerRect.left - padding,
          y: contentRect.top - containerRect.top - padding,
          width: contentRect.width + padding * 2,
          height: contentRect.height + padding * 2,
        };
      }

      // Initialize images with random positions, avoiding text area
      const initialImages = heroImageUrls.slice(0, NUM_IMAGES).map((url, index) => {
        let x, y;
        let attempts = 0;
        
        // Try to place image outside the avoid area
        do {
          x = Math.random() * (containerWidth - MAX_SIZE);
          y = Math.random() * (containerHeight - MAX_SIZE);
          attempts++;
        } while (
          attempts < 50 && 
          x + MAX_SIZE > avoidArea.x && 
          x < avoidArea.x + avoidArea.width &&
          y + MAX_SIZE > avoidArea.y && 
          y < avoidArea.y + avoidArea.height
        );
        
        return {
          id: index,
          url,
          x,
          y,
          vx: (Math.random() - 0.5) * MAX_VELOCITY,
          vy: (Math.random() - 0.5) * MAX_VELOCITY,
          size: MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE),
        };
      });

      setImages(initialImages);
    }, 100);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || images.length === 0) return;

    const animate = () => {
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      
      // Get bounding boxes of text elements to avoid
      const titleEl = document.getElementById('hero-title');
      const subtitleEl = document.getElementById('hero-subtitle');
      const buttonEl = document.getElementById('hero-button');
      const contentEl = document.getElementById('hero-content');
      
      const avoidZones: Array<{ x: number; y: number; width: number; height: number }> = [];
      
      if (titleEl && contentEl) {
        const contentRect = contentEl.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const titleRect = titleEl.getBoundingClientRect();
        const subtitleRect = subtitleEl?.getBoundingClientRect();
        const buttonRect = buttonEl?.getBoundingClientRect();
        
        // Add padding around text elements
        const padding = 20;
        
        if (titleRect) {
          avoidZones.push({
            x: titleRect.left - containerRect.left - padding,
            y: titleRect.top - containerRect.top - padding,
            width: titleRect.width + padding * 2,
            height: titleRect.height + padding * 2,
          });
        }
        
        if (subtitleRect) {
          avoidZones.push({
            x: subtitleRect.left - containerRect.left - padding,
            y: subtitleRect.top - containerRect.top - padding,
            width: subtitleRect.width + padding * 2,
            height: subtitleRect.height + padding * 2,
          });
        }
        
        if (buttonRect) {
          avoidZones.push({
            x: buttonRect.left - containerRect.left - padding,
            y: buttonRect.top - containerRect.top - padding,
            width: buttonRect.width + padding * 2,
            height: buttonRect.height + padding * 2,
          });
        }
      }

      images.forEach((image, i) => {
        // Update position
        image.x += image.vx;
        image.y += image.vy;

        // Check collision with avoid zones (text elements)
        avoidZones.forEach((zone) => {
          const imageCenterX = image.x + image.size / 2;
          const imageCenterY = image.y + image.size / 2;
          const zoneCenterX = zone.x + zone.width / 2;
          const zoneCenterY = zone.y + zone.height / 2;
          
          // Check if image overlaps with zone
          const dx = imageCenterX - zoneCenterX;
          const dy = imageCenterY - zoneCenterY;
          const minDistX = (image.size / 2) + (zone.width / 2);
          const minDistY = (image.size / 2) + (zone.height / 2);
          
          if (Math.abs(dx) < minDistX && Math.abs(dy) < minDistY) {
            // Collision detected - push image away
            const overlapX = minDistX - Math.abs(dx);
            const overlapY = minDistY - Math.abs(dy);
            
            // Push in the direction of least overlap
            if (overlapX < overlapY) {
              image.x += dx > 0 ? overlapX : -overlapX;
              image.vx *= -BOUNCE_DAMPING;
            } else {
              image.y += dy > 0 ? overlapY : -overlapY;
              image.vy *= -BOUNCE_DAMPING;
            }
            
            // Also reverse velocity component towards the zone
            const angle = Math.atan2(dy, dx);
            const pushForce = 0.3;
            image.vx += Math.cos(angle) * pushForce;
            image.vy += Math.sin(angle) * pushForce;
          }
        });

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
