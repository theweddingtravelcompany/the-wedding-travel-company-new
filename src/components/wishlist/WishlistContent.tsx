import React, { useState } from 'react';
import { useWishlist } from '@/lib/wishlist';
import { WishlistEmailModal } from './WishlistEmailModal';

export const WishlistContent: React.FC = () => {
  const { items, removeItem, clearWishlist } = useWishlist();
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  // Avoid hydration mismatch by rendering a placeholder until mounted on client
  const [mounted, setMounted] = useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="min-h-[50vh]"></div>;

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-12 text-center">
          <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#1F2A44] mb-3">Your shortlist is empty</h2>
          <p className="text-stone-500 mb-8 max-w-md mx-auto">
            Start exploring our beautiful wedding venues and save your favourites to compare later.
          </p>
          <a
            href="/wedding-search"
            className="inline-block px-10 py-4 bg-[#A81E82] text-white font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#8e196e] transition-colors shadow-lg"
          >
            Explore Venues
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header with count */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <p className="text-stone-500">
          {items.length} venue{items.length !== 1 ? 's' : ''} in your shortlist
        </p>
        
        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsEmailModalOpen(true)}
            className="flex items-center gap-2 text-[#A81E82] hover:text-[#8e196e] text-xs font-bold uppercase tracking-widest transition-colors bg-white px-4 py-2 rounded-lg border border-[#A81E82]/20 hover:border-[#A81E82] hover:bg-[#A81E82]/5 shadow-sm cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Wishlist via Email
          </button>
          
          <button
            onClick={() => {
              if (confirm('Are you sure you want to clear your shortlist?')) {
                clearWishlist();
              }
            }}
            className="text-stone-400 hover:text-red-500 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
          >
            Clear all
          </button>
        </div>
      </div>

      <WishlistEmailModal 
        isOpen={isEmailModalOpen} 
        onClose={() => setIsEmailModalOpen(false)} 
      />

      {/* Venue Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <button
                onClick={() => removeItem(item.id)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-400 hover:text-red-500 hover:bg-white transition-colors shadow-md cursor-pointer"
                aria-label="Remove from shortlist"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-bold text-[#1F2A44] mb-2 group-hover:text-[#A81E82] transition-colors">
                {item.name}
              </h3>
              <p className="text-stone-500 text-sm mb-4">{item.location}</p>

              {item.priceFrom && (
                <p className="text-[#A81E82] font-semibold text-sm mb-4">
                  {item.priceFrom}
                </p>
              )}

              <div className="flex gap-3 pt-4 border-t border-stone-100">
                <a
                  href={item.url}
                  className="flex-1 px-4 py-3 border border-[#A81E82] text-[#A81E82] text-center font-bold text-xs uppercase tracking-widest hover:bg-[#A81E82] hover:text-white transition-colors"
                >
                  View Venue
                </a>
                <a
                  href="/enquire2?from=wishlist"
                  className="flex-1 px-4 py-3 bg-[#A81E82] text-white text-center font-bold text-xs uppercase tracking-widest hover:bg-[#8e196e] transition-colors"
                >
                  Enquire
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 bg-gradient-to-r from-[#1F2A44] to-[#2d3a5c] rounded-2xl p-8 text-center">
        <h3 className="text-white text-xl font-serif font-bold mb-3">
          Ready to start planning?
        </h3>
        <p className="text-stone-300 mb-6 max-w-xl mx-auto">
          Send us an enquiry about your shortlist and our wedding specialists will be in touch to help you plan your perfect day.
        </p>
        <a
          href="/enquire2?from=wishlist"
          className="inline-block px-10 py-4 bg-white text-[#1F2A44] font-bold text-xs uppercase tracking-[0.2em] hover:bg-stone-100 transition-colors"
        >
          Enquire Now
        </a>
      </div>
    </div>
  );
};