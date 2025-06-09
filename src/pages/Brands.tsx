import React from "react";
import BrandsCarousel from "@/components/BrandsCarousel";

const Brands: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-black">
          Бренды очков
        </h1>
        <BrandsCarousel />
      </div>
    </div>
  );
};

export default Brands;
