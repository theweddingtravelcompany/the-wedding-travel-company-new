import React, { useState } from 'react';
import { useWishlist } from '@/lib/wishlist';

export const WishlistEmailModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const { items } = useWishlist();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call for now
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 3000);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif font-bold text-[#1F2A44]">Send Shortlist</h2>
            <button onClick={onClose} className="text-stone-400 hover:text-[#A81E82] transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#1F2A44] mb-2">Shortlist Sent!</h3>
              <p className="text-stone-500">Check your email for your venue shortlist.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-stone-500 text-sm mb-4">
                We'll send your shortlist of {items.length} venues to your email address.
              </p>
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-[#1F2A44] mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:border-[#A81E82] focus:ring-1 focus:ring-[#A81E82] outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full px-8 py-4 bg-[#A81E82] text-white font-bold uppercase tracking-widest text-xs hover:bg-[#8e196e] transition-colors disabled:opacity-70"
              >
                {status === 'loading' ? 'Sending...' : 'Send Shortlist'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};