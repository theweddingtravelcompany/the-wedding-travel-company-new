import { useState } from 'react';
import { WishlistButton } from '@/components/wishlist/WishlistButton';

interface ReceptionOption {
  id: string;
  name: string;
  type: string;
  capacity: string;
  description: string;
  price: string;
  priceNote?: string;
  images: string[];
  features: string[];
}

export function ReceptionPopup({ option }: { option: ReceptionOption }) {
  const [activeImage, setActiveImage] = useState(option.images[0]);

  return (
    <div className="flex flex-col md:flex-row h-full overflow-y-auto md:overflow-hidden bg-white">
      {/* Left Column: Image Gallery */}
      <div className="w-full h-[50vh] md:h-full md:w-1/2 relative bg-gray-100 flex-shrink-0 flex flex-col">
        <div className="flex-1 overflow-hidden relative group h-full">
          <img 
            src={activeImage} 
            alt={option.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Wishlist Button */}
          <div className="absolute top-4 left-4 z-10">
            <WishlistButton 
              iconOnly 
              venue={{
                id: option.id,
                name: option.name,
                location: option.type + ' Reception',
                priceFrom: option.price,
                image: option.images[0],
                url: typeof window !== 'undefined' ? window.location.pathname : '#'
              }} 
            />
          </div>
        </div>

        {/* Thumbnails */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 p-1">
          {option.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(img)}
              className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${activeImage === img ? 'border-[#A81E82] scale-110 shadow-lg' : 'border-white/50 opacity-80 hover:opacity-100'}`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Right Column: Content */}
      <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto">
        <div className="mb-auto">
          <span className="text-[#A81E82] text-xs font-bold uppercase tracking-widest block mb-2">{option.type}</span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#1F2A44] mb-4">{option.name}</h2>
          
          <div className="flex items-center gap-2 text-[#666666] mb-6">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            <span className="text-sm font-medium">Capacity: {option.capacity}</span>
          </div>

          <p className="text-[#666666] leading-relaxed mb-8">
            {option.description}
          </p>

          <h3 className="text-lg font-bold font-serif text-[#1F2A44] mb-6">Features & Inclusions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-10">
            {option.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm text-[#3D3938]">
                <span className="text-[#A81E82] mt-0.5">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </span>
                {feature}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6 pt-8 border-t border-gray-100">
          <div className="bg-[#A81E82]/5 p-6 rounded-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#666666] mb-1">Pricing starting from</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#A81E82]">{option.price}</span>
            </div>
            {option.priceNote && <p className="text-[11px] text-[#666666] mt-1">{option.priceNote}</p>}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/enquire2" className="flex-1 bg-[#A81E82] text-white text-center py-4 rounded-xl font-bold uppercase tracking-widest text-[12px] hover:bg-[#8e196e] transition-colors shadow-md">
              Enquire Now
            </a>
            <button 
              onClick={() => {
                (document.getElementById('reception-dialog') as HTMLDialogElement)?.close();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex-1 bg-[#1F2A44] text-white text-center py-4 rounded-xl font-bold uppercase tracking-widest text-[12px] hover:bg-[#151d2f] transition-colors"
            >
              Back to Venue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
