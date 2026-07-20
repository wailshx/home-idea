import { useState, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, Maximize2 } from "lucide-react";

type ProductGalleryProps = {
  images: string[];
  name: string;
  isNew?: boolean;
};

const ProductGallery = ({ images, name, isNew }: ProductGalleryProps) => {
  const [current, setCurrent] = useState(0);
  const [zooming, setZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [fullscreen, setFullscreen] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!imgRef.current) return;
      const rect = imgRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setZoomPos({ x, y });
    },
    []
  );

  return (
    <>
      <div className="relative">
        {/* Decorative orbit */}
        <div className="absolute -inset-8 anim-spin-slow opacity-20 pointer-events-none">
          <div className="w-full h-full rounded-full border border-dashed border-gold/30" />
        </div>

        {/* Main image */}
        <div
          ref={imgRef}
          className="relative aspect-square overflow-hidden gold-border shadow-deep bg-ink cursor-crosshair"
          onMouseEnter={() => setZooming(true)}
          onMouseLeave={() => setZooming(false)}
          onMouseMove={handleMouseMove}
        >
          <img
            src={images[current]}
            alt={`${name} — vue ${current + 1}`}
            className="w-full h-full object-cover transition-transform duration-300"
            style={
              zooming
                ? {
                    transform: "scale(2.2)",
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  }
                : undefined
            }
          />

          {/* Zoom hint */}
          {!zooming && (
            <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-background/70 backdrop-blur border border-gold/30 text-[10px] tracking-[0.2em] uppercase text-gold/70">
              <ZoomIn className="w-3 h-3" /> Zoom au survol
            </div>
          )}

          {/* Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 grid place-items-center bg-background/60 backdrop-blur border border-gold/30 text-gold hover:bg-gold/20 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 grid place-items-center bg-background/60 backdrop-blur border border-gold/30 text-gold hover:bg-gold/20 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Badge */}
          {isNew && (
            <div className="absolute top-4 left-4 text-[10px] tracking-[0.3em] uppercase bg-gradient-gold text-ink px-4 py-1.5">
              Nouveauté
            </div>
          )}

          {/* Fullscreen button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setFullscreen(true);
            }}
            className="absolute top-4 right-4 w-10 h-10 grid place-items-center bg-background/60 backdrop-blur border border-gold/30 text-gold hover:bg-gold/20 transition-colors"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-3 mt-4">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`relative w-20 h-20 overflow-hidden border transition-all ${
                  i === current
                    ? "border-gold ring-1 ring-gold/40"
                    : "border-gold/20 opacity-50 hover:opacity-80"
                }`}
              >
                <img
                  src={img}
                  alt={`${name} miniature ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen lightbox */}
      {fullscreen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center cursor-pointer"
          onClick={() => setFullscreen(false)}
        >
          <button
            onClick={() => setFullscreen(false)}
            className="absolute top-6 right-6 w-12 h-12 grid place-items-center border border-gold/40 text-gold hover:bg-gold/10 transition-colors"
          >
            ✕
          </button>
          <img
            src={images[current]}
            alt={name}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 grid place-items-center border border-gold/40 text-gold hover:bg-gold/10 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 grid place-items-center border border-gold/40 text-gold hover:bg-gold/10 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ProductGallery;
