import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const brandData = {
  mustang: {
    name: "Mustang",
    description: "Стильные и качественные очки от немецкого бренда Mustang",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&h=400&fit=crop",
    features: ["Немецкое качество", "Современный дизайн", "Прочные материалы"],
  },
  osse: {
    name: "Osse",
    description:
      "Элегантные очки турецкого производства с европейским качеством",
    image:
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&h=400&fit=crop",
    features: [
      "Турецкое производство",
      "Европейские стандарты",
      "Доступные цены",
    ],
  },
  hawk: {
    name: "Hawk",
    description: "Спортивные и повседневные очки для активного образа жизни",
    image:
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800&h=400&fit=crop",
    features: ["Спортивный стиль", "Надежная защита", "Удобная посадка"],
  },
  diverso: {
    name: "Diverso",
    description: "Разнообразие стилей и форм для любого вкуса",
    image:
      "https://images.unsplash.com/photo-1556306530-7c471e263c87?w=800&h=400&fit=crop",
    features: ["Широкий выбор", "Классические формы", "Качественные линзы"],
  },
};

const Brand: React.FC = () => {
  const { brandSlug } = useParams<{ brandSlug: string }>();
  const brand = brandSlug
    ? brandData[brandSlug as keyof typeof brandData]
    : null;

  if (!brand) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">
            Бренд не найден
          </h1>
          <Link to="/brands">
            <Button>Вернуться к брендам</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link
              to="/brands"
              className="flex items-center text-gray-600 hover:text-[#e71a00] mb-4"
            >
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Назад к брендам
            </Link>
            <h1 className="text-4xl font-bold text-black mb-4">{brand.name}</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div>
              <p className="text-lg text-gray-700 mb-6">{brand.description}</p>
              <h3 className="text-xl font-semibold mb-4">Особенности:</h3>
              <ul className="space-y-2">
                {brand.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Icon
                      name="Check"
                      size={16}
                      className="text-green-600 mr-2"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Link to={`/catalog?brand=${brandSlug}`}>
              <Button className="bg-[#e71a00] hover:bg-[#c41600] text-white px-8 py-3 text-lg">
                Смотреть каталог {brand.name}
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brand;
