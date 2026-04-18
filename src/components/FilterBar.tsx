interface FilterBarProps {
  productCount?: number;
  onFilterClick: () => void;
  isHome?: boolean;
}

export default function FilterBar({ productCount = 0, onFilterClick, isHome = false }: FilterBarProps) {
  return (
    <div className={`w-full border-y sticky top-16 md:top-20 z-40 backdrop-blur-md transition-colors duration-500 ${
      isHome 
        ? 'bg-black/80 border-white/10' 
        : 'bg-background/80 border-foreground/5'
    }`}>
      <div className="max-w-screen-2xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className={`font-sans text-[10px] uppercase tracking-[0.4em] opacity-40 ${isHome ? 'text-white' : ''}`}>
          {isHome ? "Explore the P4P World" : `${productCount} Products`}
        </div>
        
        <button 
          onClick={onFilterClick}
          className="flex items-center space-x-4 group"
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.4em] group-hover:opacity-100 transition-opacity opacity-70">
            Filter & Sort
          </span>
          <div className="flex flex-col space-y-1 w-5">
            <div className="h-[1px] w-full bg-foreground/60 transition-all group-hover:w-1/2"></div>
            <div className="h-[1px] w-full bg-foreground/60"></div>
            <div className="h-[1px] w-full bg-foreground/60 transition-all group-hover:w-3/4"></div>
          </div>
        </button>
      </div>
    </div>
  );
}
