import React, { useState, useRef, useEffect } from 'react';

interface VenueImageSliderProps {
  images: string[];
  alt: string;
}

export const VenueImageSlider: React.FC<VenueImageSliderProps> = ({ images, alt }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / clientWidth);
      if (index !== currentIndex) {
        setCurrentIndex(index);
      }
    }
  };

  const scrollToImage = (index: number) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollTo({
        left: index * clientWidth,
        behavior: 'smooth',
      });
    }
  };

  // Add more images if only one is provided for demo purposes (the user asked for a slider)
  // In a real scenario, these would come from the venue data
  const displayImages = images.length > 1 ? images : [
    images[0],
    `https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&w=800&q=80`,
    `https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&w=800&q=80`
  ];

  return (
    <div className="relative group w-full h-full overflow-hidden">
      {/* Scrollable Container */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex w-full h-full overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {displayImages.map((src, index) => (
          <div key={index} className="flex-none w-full h-full snap-center">
            <img 
              crossOrigin="anonymous"
              src={src} 
              alt={`${alt} - Image ${index + 1}`}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
        {displayImages.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              scrollToImage(index);
            }}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              currentIndex === index 
                ? 'bg-white w-3 opacity-100' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Side Controls (Discreetly shown on hover) */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          scrollToImage(Math.max(0, currentIndex - 1));
        }}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/40"
        aria-label="Previous image"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
      </button>
      <button 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          scrollToImage(Math.min(displayImages.length - 1, currentIndex + 1));
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/40"
        aria-label="Next image"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
      </button>
    </div>
  );
};