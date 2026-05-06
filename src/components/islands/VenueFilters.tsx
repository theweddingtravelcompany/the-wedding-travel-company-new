import React, { useState, useEffect } from 'react';

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

export function VenueFilters() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    'Venue Type': [],
    'Type': [],
    'Location Type': []
  });

  // Prevent scrolling when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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

  return (
    <>
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-secondary text-white px-6 py-3 rounded-full font-bold text-[10px] tracking-widest uppercase hover:bg-secondary-hover transition-colors flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
        Refine Search {getActiveFilterCount() > 0 ? `(${getActiveFilterCount()})` : ''}
      </button>

      {/* Slide-out Panel Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end font-sans">
          <div className="absolute inset-0 bg-secondary/20 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
          
          {/* Slide-out Panel */}
          <div className="relative w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 pb-4">
              <h2 className="text-2xl font-serif text-secondary">Filters</h2>
              <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-secondary transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Scrollable Content */}
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
              <button onClick={() => setIsOpen(false)} className="bg-secondary text-white px-8 py-3.5 rounded-full text-sm font-bold hover:bg-secondary-hover transition-colors shadow-lg">
                View results {getActiveFilterCount() > 0 ? `(${getActiveFilterCount()})` : ''}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}