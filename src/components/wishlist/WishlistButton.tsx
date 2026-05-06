import React from 'react';
import { useWishlist, type WishlistItem } from '@/lib/wishlist';

interface Props {
  venue: WishlistItem;
  className?: string;
  iconOnly?: boolean;
}

export const WishlistButton: React.FC<Props> = ({ venue, className = "", iconOnly = false }) => {
  const { isInWishlist, addItem, removeItem } = useWishlist();
  
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const inWishlist = mounted ? isInWishlist(venue.id) : false;

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeItem(venue.id);
    } else {
      addItem(venue);
    }
  };

  if (iconOnly) {
    return (
      <button 
        onClick={toggleWishlist}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
          inWishlist 
            ? 'bg-[#A81E82] text-white' 
            : 'bg-white/90 backdrop-blur-sm text-stone-400 hover:text-[#A81E82]'
        } shadow-md ${className}`}
        aria-label={inWishlist ? "Remove from shortlist" : "Add to shortlist"}
        title={inWishlist ? "Remove from shortlist" : "Add to shortlist"}
      >
        <svg className="w-5 h-5" fill={inWishlist ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    );
  }

  return (
    <button
      onClick={toggleWishlist}
      className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer ${
        inWishlist
          ? 'text-[#A81E82]'
          : 'text-stone-500 hover:text-[#A81E82]'
      } ${className}`}
    >
      <svg className="w-5 h-5" fill={inWishlist ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      {inWishlist ? 'Saved to Shortlist' : 'Add to Shortlist'}
    </button>
  );
};