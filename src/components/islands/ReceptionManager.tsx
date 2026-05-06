import { useState } from 'react';
import { ReceptionPopup } from './ReceptionPopup';

const RECEPTION_OPTIONS = [
  {
    id: 'beach-club',
    name: 'Seaside Beach Club',
    type: 'Beach',
    capacity: '150 guests',
    description: 'The Seaside Beach Club offers a breathtaking outdoor setting directly on the golden sands of Limassol. Experience a romantic reception under the stars with the sound of Mediterranean waves as your soundtrack.',
    price: '£1,499',
    priceNote: '*Premium beach furniture available',
    images: [
      'https://cdn.pagesmith.app/4604757a/images/Venue-Example-3.5-reception-pop-u0-1536.webp',
      'https://images.unsplash.com/photo-1762177446992-4cac5b44a05d?auto=format&w=800&q=80',
    ],
    features: [
      'Direct beach access',
      'Sunset view orientation',
      'Outdoor bar & lounge area',
      'Professional sound system',
      'Private restroom facilities',
      'Optional bonfire setup'
    ]
  },
  {
    id: 'ballroom',
    name: 'The Phoenix Ballroom',
    type: 'Ballroom',
    capacity: '300 guests',
    description: 'Our grand ballroom offers timeless elegance with high ceilings, crystal chandeliers, and a spacious dance floor. Perfect for larger celebrations requiring a sophisticated indoor setting.',
    price: '£2,199',
    priceNote: '*AV equipment included',
    images: [
      'https://images.pexels.com/photos/36260533/pexels-photo-36260533.jpeg?auto=format&w=800&q=80',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&w=800&q=80',
    ],
    features: [
      'Climate controlled',
      'Grand entrance doors',
      'Private bar service',
      'Dedicated stage area',
      'Mood lighting options',
      'Full kitchen access'
    ]
  },
  {
    id: 'terrace',
    name: 'Olive Garden Terrace',
    type: 'Terrace',
    capacity: '80 guests',
    description: 'Surrounded by ancient olive trees and fragrant Mediterranean herbs, this intimate terrace offers a rustic yet refined atmosphere with panoramic views of the resort gardens.',
    price: '£1,199',
    priceNote: '*Natural floral decor included',
    images: [
      'https://images.unsplash.com/photo-1752857015585-e8c5230549c3?auto=format&w=800&q=80',
      'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&w=800&q=80',
    ],
    features: [
      'Garden view panoramic',
      'Rustic stone architecture',
      'Fairy light installations',
      'Intimate dining layout',
      'Accessible location',
      'Heated for evening events'
    ]
  }
];

export function ReceptionManager() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedOption = RECEPTION_OPTIONS.find(o => o.id === selectedId);

  // Expose function to global window so Astro can call it
  if (typeof window !== 'undefined') {
    (window as any).openReceptionPopup = (id: string) => {
      setSelectedId(id);
      (document.getElementById('reception-dialog') as HTMLDialogElement)?.showModal();
    };
  }

  return (
    <dialog
      id="reception-dialog"
      className="w-[95%] max-w-6xl rounded-[32px] p-0 backdrop:bg-black/60 backdrop:backdrop-blur-sm outline-none fixed inset-0 m-auto overflow-hidden shadow-2xl"
    >
      <div className="relative h-[90vh] md:h-[85vh]">
        <button
          onClick={() => (document.getElementById('reception-dialog') as HTMLDialogElement)?.close()}
          className="absolute top-6 right-6 z-50 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-[#1F2A44] hover:text-[#A81E82] transition-colors shadow-md"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {selectedOption ? (
          <ReceptionPopup option={selectedOption} />
        ) : (
          <div className="p-12 text-center text-[#666666]">Loading reception details...</div>
        )}
      </div>
    </dialog>
  );
}
