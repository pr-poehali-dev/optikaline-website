import React from "react";
import HeroCarousel from "@/components/HeroCarousel";
import BrandsCarousel from "@/components/BrandsCarousel";

const Index: React.FC = () => {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--season-bg, #fff)" }}
    >
      <HeroCarousel />
      <BrandsCarousel />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-black">
            Почему выбирают OptikaLine?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-16 h-16 bg-[#e71a00] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">🏭</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Оптовые цены</h3>
              <p className="text-gray-600">
                Специальные цены для ваших закупок
              </p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-[#e71a00] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Быстрая доставка</h3>
              <p className="text-gray-600">Оперативная обработка заказов</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-[#e71a00] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Поддержка 24/7</h3>
              <p className="text-gray-600">Всегда готовы помочь с выбором</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
