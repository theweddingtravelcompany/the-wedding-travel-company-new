import { useState } from 'react';
import { WishlistButton } from '@/components/wishlist/WishlistButton';

interface Venue {
  id: string;
  title: string;
  location: string;
  description: string;
  price: string;
  tags: string[];
  image: string;
  category?: string;
  rating?: string;
  guestCount?: string;
  href?: string;
  searchTags?: string[];
}

const CATEGORY_VENUE_TYPE = {
  title: 'Venue Type',
  options: ['Hotel', 'Beach', 'Yacht', 'Chapel', 'Ceremony Venue', 'Town Hall', 'Church', 'Castle', 'Park', 'Heritage Site']
};

const CATEGORY_TYPE = {
  title: 'Type',
  options: ['Family', 'Adult-Only', 'Budget', 'Same Sex', 'All-Inclusive', 'Luxury', 'Seaview', 'Small & Intimate', 'Elopement']
};

const CATEGORY_LOCATION = {
  title: 'Location Type',
  options: ['Countryside', 'Town', 'Beachside', 'City', 'Coastal', 'Rural', 'Near Beach']
};

export function WeddingSearch({ venues }: { venues: Venue[] }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    'Venue Type': [],
    'Type': [],
    'Location Type': []
  });

  const toggleFilter = (category: string, option: string) => {
    setSelectedFilters(prev => {
      const categoryFilters = prev[category] || [];
      if (categoryFilters.includes(option)) {
        return { ...prev, [category]: categoryFilters.filter(item => item !== option) };
      } else {
        return { ...prev, [category]: [...categoryFilters, option] };
      }
    });
  };

  const getActiveFilterCount = () => {
    return Object.values(selectedFilters).flat().length;
  };

  const clearFilters = () => {
    setSelectedFilters({
      'Venue Type': [],
      'Type': [],
      'Location Type': []
    });
  };

  const filteredVenues = venues.filter(venue => {
    const venueTypes = selectedFilters['Venue Type'] || [];
    const types = selectedFilters['Type'] || [];
    const locationTypes = selectedFilters['Location Type'] || [];

    const matchesVenueType = venueTypes.length === 0 || venueTypes.some(vt => venue.searchTags?.includes(vt));
    const matchesType = types.length === 0 || types.some(t => venue.searchTags?.includes(t));
    const matchesLocationType = locationTypes.length === 0 || locationTypes.some(lt => venue.searchTags?.includes(lt));

    return matchesVenueType && matchesType && matchesLocationType;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold font-serif text-secondary">Available Venues</h2>
        <button 
          onClick={() => setIsFilterOpen(true)}
          className="bg-secondary text-white px-6 py-3 rounded-full font-bold text-[10px] tracking-widest uppercase hover:bg-secondary-hover transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
          Refine Search {getActiveFilterCount() > 0 ? `(${getActiveFilterCount()})` : ''}
        </button>
      </div>

      {filteredVenues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVenues.map((venue) => (
            <div key={venue.id} className="bg-white border border-border rounded-xl overflow-hidden shadow-sm hover:-translate-y-1 transition-transform duration-300 flex flex-col group relative">
            <div className="relative aspect-video overflow-hidden">
              <img src={venue.image} alt={venue.title} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute top-4 left-4 bg-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-secondary flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                {venue.tags && venue.tags.length > 0 ? venue.tags[0] : 'Featured Venue'}
              </div>
              <div className="absolute top-4 right-4 z-10">
                <WishlistButton 
                  venue={{
                    id: venue.id.toString(),
                    name: venue.title,
                    location: venue.location,
                    image: venue.image,
                    priceFrom: venue.price,
                    url: venue.href || `/venues/${venue.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
                  }}
                  iconOnly={true}
                />
              </div>
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-bold uppercase tracking-[2px] text-primary">
                  {venue.location.split(',')[0]} • {venue.category || 'Venue'}
                </p>
                <div className="bg-white px-2 py-1 rounded-full flex items-center gap-1 shadow-sm border border-border/50">
                  <div className="flex items-center gap-0.5">
                    <div className="w-2 h-2 rounded-full bg-[#00aa6c]"></div>
                    <div className="w-2 h-2 rounded-full bg-[#00aa6c]"></div>
                    <div className="w-2 h-2 rounded-full bg-[#00aa6c]"></div>
                    <div className="w-2 h-2 rounded-full bg-[#00aa6c]"></div>
                    {venue.rating === "5.0" ? (
                      <div className="w-2 h-2 rounded-full bg-[#00aa6c]"></div>
                    ) : (
                      <div className="relative w-2 h-2 rounded-full bg-[#e0e0e0] overflow-hidden">
                        <div className="absolute top-0 left-0 bottom-0 w-1/2 bg-[#00aa6c]"></div>
                      </div>
                    )}
                  </div>
                  <span className="text-secondary font-bold text-[10px]">{venue.rating || '4.8'}</span>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold font-serif text-secondary mb-3">{venue.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-grow">{venue.description}</p>
              
              <div className="flex items-end justify-between mb-6">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-1">From</span>
                  <span className="text-2xl font-bold text-secondary">{venue.price}</span>
                </div>
                <div className="text-[12px] text-muted-foreground text-right">{venue.guestCount || 'Based on 20 guests'}</div>
              </div>
              
                <div className="flex flex-col gap-5 mt-auto">
                  <a href={venue.href || `/venues/${venue.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="bg-[#A81E82] text-white text-center py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#8e196e] transition-colors w-full">View Venue</a>
                  <a href="/enquire2" className="text-[#1F2A44] text-[10px] font-bold uppercase tracking-[2px] text-center hover:opacity-80 transition-opacity">Enquire Now</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white border border-border rounded-xl">
          <h3 className="text-2xl font-serif text-secondary mb-3">No venues match</h3>
          <p className="text-muted-foreground mb-6">Try adjusting your filters to see more results.</p>
          <button onClick={clearFilters} className="text-primary font-bold hover:underline">Clear all filters</button>
        </div>
      )}

      {/* Slide-out Filters Panel */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end font-sans">
          <div className="absolute inset-0 bg-secondary/20 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 pb-4">
              <h2 className="text-2xl font-serif text-secondary">Filters</h2>
              <button onClick={() => setIsFilterOpen(false)} className="text-muted-foreground hover:text-secondary transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="p-6 space-y-10 pt-2 pb-8">
              
              {/* 1. Venue Type - Icon Buttons */}
              <div>
                <h3 className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-4">1. {CATEGORY_VENUE_TYPE.title}</h3>
                <div className="grid grid-cols-3 gap-3">
                  {CATEGORY_VENUE_TYPE.options.map((option, i) => {
                    const isSelected = selectedFilters[CATEGORY_VENUE_TYPE.title]?.includes(option);
                    return (
                      <button 
                        key={i} 
                        onClick={() => toggleFilter(CATEGORY_VENUE_TYPE.title, option)}
                        className={`border rounded-xl p-4 flex flex-col items-center justify-center gap-3 transition-colors group h-[88px] ${
                          isSelected ? 'border-secondary bg-surface' : 'border-border hover:border-secondary'
                        }`}
                      >
                        <svg className={`w-5 h-5 transition-colors ${isSelected ? 'text-secondary' : 'text-muted-foreground group-hover:text-secondary'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                        <span className="text-[8px] font-bold tracking-wider uppercase text-secondary text-center leading-tight">{option}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Type - Checkboxes */}
              <div>
                <h3 className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-4">2. {CATEGORY_TYPE.title}</h3>
                <div className="space-y-4">
                  {CATEGORY_TYPE.options.map((option) => {
                    const isSelected = selectedFilters[CATEGORY_TYPE.title]?.includes(option);
                    return (
                      <button 
                        key={option} 
                        onClick={() => toggleFilter(CATEGORY_TYPE.title, option)} 
                        className="flex items-center gap-3 group w-full text-left"
                      >
                        <div className={`w-5 h-5 border rounded flex items-center justify-center transition-colors flex-shrink-0 ${isSelected ? 'bg-secondary border-secondary' : 'border-border group-hover:border-secondary'}`}>
                          <svg className={`w-3 h-3 text-white ${isSelected ? 'opacity-100' : 'opacity-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <span className="text-sm text-secondary">{option}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Location Type - Pill Buttons */}
              <div>
                <h3 className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-4">3. {CATEGORY_LOCATION.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {CATEGORY_LOCATION.options.map((option) => {
                    const isSelected = selectedFilters[CATEGORY_LOCATION.title]?.includes(option);
                    return (
                      <button 
                        key={option} 
                        onClick={() => toggleFilter(CATEGORY_LOCATION.title, option)} 
                        className={`text-xs px-4 py-2.5 rounded-full transition-colors ${isSelected ? 'bg-secondary text-white border-secondary' : 'bg-white border border-border text-secondary hover:border-secondary'}`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Sticky Bottom Actions */}
            <div className="sticky bottom-0 bg-white border-t border-border p-6 flex items-center justify-between z-10">
              <button onClick={clearFilters} className="text-sm font-bold text-secondary hover:text-primary transition-colors">Clear all</button>
              <button 
                onClick={() => filteredVenues.length > 0 && setIsFilterOpen(false)} 
                disabled={filteredVenues.length === 0}
                className={`px-8 py-3.5 rounded-full text-sm font-bold transition-colors shadow-lg ${
                  filteredVenues.length > 0 
                    ? 'bg-secondary text-white hover:bg-secondary-hover' 
                    : 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                }`}
              >
                View results {filteredVenues.length > 0 ? `(${filteredVenues.length})` : '(0 results)'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}