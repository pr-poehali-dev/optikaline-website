import React from "react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const brands = [
  {
    id: "mustang",
    name: "Mustang",
    logo: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=200&h=150&fit=crop",
    description: "Спортивные и стильные оправы",
  },
  {
    id: "osse",
    name: "Osse",
    logo: "https://images.unsplash.com/photo-1556306084-f327875aaa50?w=200&h=150&fit=crop",
    description: "Элегантный дизайн для бизнеса",
  },
  {
    id: "hawk",
    name: "Hawk",
    logo: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=200&h=150&fit=crop",
    description: "Премиум качество и стиль",
  },
  {
    id: "diverso",
    name: "Diverso",
    logo: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=200&h=150&fit=crop",
    description: "Разнообразие моделей для всех",
  },
];

const BrandsCarousel: React.FC = () => {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-black">
          Наши бренды
        </h2>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {brands.map((brand) => (
              <CarouselItem
                key={brand.id}
                className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <Link to={`/brands/${brand.id}`}>
                  <div className="border-2 border-[#b7b7b788] rounded-lg p-6 hover:border-[#e71a00] transition-colors hover:shadow-lg">
                    <div className="aspect-[4/3] mb-4 overflow-hidden rounded-lg">
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-black mb-2">
                      {brand.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{brand.description}</p>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default BrandsCarousel;
