import { useState, useRef, useCallback, useEffect } from "react";
import { RotateCcw } from "lucide-react";

type Viewer360Props = {
  images: string[];
  name: string;
};

const Viewer360 = ({ images, name }: Viewer360Props) => {
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleStart = useCallback(
    (clientX: number) => {
      setIsDragging(true);
      setStartX(clientX);
    },
    []
  );

  const handleMove = useCallback(
    (clientX: number) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const diff = clientX - startX;
      const threshold = rect.width / images.length;
      if (Math.abs(diff) > threshold) {
        const steps = Math.floor(diff / threshold);
        setCurrent((prev) => {
          const next = prev + (steps > 0 ? 1 : -1);
          return ((next % images.length) + images.length) % images.length;
        });
        setStartX(clientX);
      }
    },
    [isDragging, startX, images.length]
  );

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const onMouseUp = () => handleEnd();
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    const onTouchEnd = () => handleEnd();

    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("touchmove", onTouchMove);
      window.addEventListener("touchend", onTouchEnd);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [isDragging, handleMove, handleEnd]);

  const angle = (current / images.length) * 360;

  return (
    <div className="relative">
      <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-4 flex items-center gap-2">
        <RotateCcw className="w-3 h-3" /> Vue 360° — Glissez pour tourner
      </div>
      <div
        ref={containerRef}
        className="relative aspect-square overflow-hidden gold-border bg-ink select-none"
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
        onMouseDown={(e) => handleStart(e.clientX)}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      >
        <div
          className="w-full h-full transition-transform"
          style={{
            transform: `perspective(800px) rotateY(${angle}deg)`,
            transformStyle: "preserve-3d",
            transition: isDragging ? "none" : "transform 0.4s ease-out",
          }}
        >
          <img
            src={images[current]}
            alt={`${name} — vue 360° ${current + 1}`}
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>

        {/* Rotation indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2 bg-background/70 backdrop-blur border border-gold/30">
          <div className="relative w-32 h-1 bg-gold/20 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-gold rounded-full transition-all duration-200"
              style={{ width: `${((current + 1) / images.length) * 100}%` }}
            />
          </div>
          <span className="text-[10px] tracking-wider text-gold/70">
            {current + 1}/{images.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Viewer360;
