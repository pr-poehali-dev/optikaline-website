import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const brands = [
  { name: "Mustang", slug: "mustang" },
  { name: "Osse", slug: "osse" },
  { name: "Hawk", slug: "hawk" },
  { name: "Diverso", slug: "diverso" },
];

const BrandDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-black hover:text-[#e71a00] transition-colors"
      >
        <span>Бренды</span>
        <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={16} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[120px] z-50">
          {brands.map((brand) => (
            <Link
              key={brand.slug}
              to={`/brands/${brand.slug}`}
              className="block px-4 py-2 text-black hover:bg-gray-50 hover:text-[#e71a00] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {brand.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrandDropdown;
