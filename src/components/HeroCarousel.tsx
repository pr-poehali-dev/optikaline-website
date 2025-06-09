import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const heroImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=1200&h=400&fit=crop",
    title: "Премиум коллекция очков",
    subtitle: "Лучшие бренды для вашего бизнеса",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1556306084-f327875aaa50?w=1200&h=400&fit=crop",
    title: "Солнцезащитные очки",
    subtitle: "Стильная защита от солнца",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=1200&h=400&fit=crop",
    title: "Медицинская оптика",
    subtitle: "Качественные решения для зрения",
  },
];

const HeroCarousel: React.FC = () => {
  return (
    <div className="relative">
      <Carousel className="w-full">
        <CarouselContent>
          {heroImages.map((image) => (
            <CarouselItem key={image.id}>
              <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-lg">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                      {image.title}
                    </h2>
                    <p className="text-lg md:text-xl">{image.subtitle}</p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
