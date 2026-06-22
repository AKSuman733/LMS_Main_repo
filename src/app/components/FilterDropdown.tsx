import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface FilterDropdownProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function FilterDropdown({ label, options, selected, onChange }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const hasSelection = selected.length > 0;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-4 py-2 border rounded-[8px] text-[13px] whitespace-nowrap transition-colors flex items-center gap-2 ${
          hasSelection || isOpen
            ? 'bg-[#2D1B69] text-white border-[#2D1B69]'
            : 'bg-white border-[#E2E1F0] text-[#1A1A2E] hover:bg-[#F7F6F3]'
        }`}
      >
        {label}
        {hasSelection && <span className="ml-1 bg-white text-[#2D1B69] rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">{selected.length}</span>}
        <ChevronDown size={14} className={hasSelection || isOpen ? 'text-white' : 'text-[#6B6B80]'} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-[#E2E1F0] rounded-[8px] shadow-lg z-50 overflow-hidden">
          <div className="p-3 border-b border-[#E2E1F0] flex justify-between items-center">
            <span className="text-[13px] font-medium text-[#1A1A2E]">{label} Filters</span>
            {hasSelection && (
              <button
                onClick={() => onChange([])}
                className="text-[12px] text-[#2D1B69] hover:underline"
              >
                Clear
              </button>
            )}
          </div>
          <div className="max-h-60 overflow-y-auto p-2">
            {options.map((option) => (
              <label
                key={option}
                className="flex items-center gap-3 p-2 hover:bg-[#F7F6F3] rounded-[6px] cursor-pointer"
              >
                <div
                  className={`w-4 h-4 border rounded-[4px] flex items-center justify-center ${
                    selected.includes(option)
                      ? 'bg-[#2D1B69] border-[#2D1B69]'
                      : 'border-[#E2E1F0] bg-white'
                  }`}
                >
                  {selected.includes(option) && <Check size={12} className="text-white" />}
                </div>
                <span className="text-[14px] text-[#1A1A2E]">{option}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
