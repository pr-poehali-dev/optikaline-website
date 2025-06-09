import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/contexts/CartContext";
import Icon from "@/components/ui/icon";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  type: string;
  gender: string;
  season: string;
  sale: boolean;
  salePrice?: number;
  image: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Классические очки",
    brand: "mustang",
    price: 5500,
    type: "optical",
    gender: "unisex",
    season: "all",
    sale: false,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300&h=200&fit=crop",
  },
  {
    id: 2,
    name: "Солнцезащитные очки",
    brand: "osse",
    price: 4200,
    type: "sunglasses",
    gender: "women",
    season: "summer",
    sale: true,
    salePrice: 3360,
    image:
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=300&h=200&fit=crop",
  },
  {
    id: 3,
    name: "Спортивные очки",
    brand: "hawk",
    price: 6800,
    type: "sport",
    gender: "men",
    season: "all",
    sale: false,
    image:
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=300&h=200&fit=crop",
  },
  {
    id: 4,
    name: "Офисные очки",
    brand: "diverso",
    price: 3900,
    type: "optical",
    gender: "unisex",
    season: "all",
    sale: true,
    salePrice: 2730,
    image:
      "https://images.unsplash.com/photo-1556306530-7c471e263c87?w=300&h=200&fit=crop",
  },
];

const Catalog: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();
  const [filters, setFilters] = useState({
    brand: searchParams.get("brand") || "",
    type: "",
    gender: "",
    season: "",
    minPrice: "",
    maxPrice: "",
    onSale: false,
  });
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(mockProducts);

  const seasonColors = {
    spring: "bg-green-50 border-green-200",
    summer: "bg-yellow-50 border-yellow-200",
    autumn: "bg-orange-50 border-orange-200",
    winter: "bg-blue-50 border-blue-200",
    all: "bg-white",
  };

  useEffect(() => {
    let filtered = mockProducts.filter((product) => {
      return (
        (!filters.brand || product.brand === filters.brand) &&
        (!filters.type || product.type === filters.type) &&
        (!filters.gender ||
          product.gender === filters.gender ||
          product.gender === "unisex") &&
        (!filters.season ||
          product.season === filters.season ||
          product.season === "all") &&
        (!filters.minPrice || product.price >= parseInt(filters.minPrice)) &&
        (!filters.maxPrice || product.price <= parseInt(filters.maxPrice)) &&
        (!filters.onSale || product.sale)
      );
    });
    setFilteredProducts(filtered);
  }, [filters]);

  const currentSeason = filters.season || "all";
  const containerClass =
    seasonColors[currentSeason as keyof typeof seasonColors] ||
    seasonColors.all;

  return (
    <div
      className={`min-h-screen ${containerClass} transition-colors duration-300`}
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          Каталог очков
        </h1>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md border">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Фильтры
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Бренд
                  </label>
                  <Select
                    value={filters.brand}
                    onValueChange={(value) =>
                      setFilters({ ...filters, brand: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Все бренды" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Все бренды</SelectItem>
                      <SelectItem value="mustang">Mustang</SelectItem>
                      <SelectItem value="osse">Osse</SelectItem>
                      <SelectItem value="hawk">Hawk</SelectItem>
                      <SelectItem value="diverso">Diverso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Тип</label>
                  <Select
                    value={filters.type}
                    onValueChange={(value) =>
                      setFilters({ ...filters, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Все типы" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Все типы</SelectItem>
                      <SelectItem value="optical">Оптические</SelectItem>
                      <SelectItem value="sunglasses">Солнцезащитные</SelectItem>
                      <SelectItem value="sport">Спортивные</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Пол</label>
                  <Select
                    value={filters.gender}
                    onValueChange={(value) =>
                      setFilters({ ...filters, gender: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Все" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Все</SelectItem>
                      <SelectItem value="men">Мужские</SelectItem>
                      <SelectItem value="women">Женские</SelectItem>
                      <SelectItem value="unisex">Унисекс</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Сезон
                  </label>
                  <Select
                    value={filters.season}
                    onValueChange={(value) =>
                      setFilters({ ...filters, season: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Все сезоны" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Все сезоны</SelectItem>
                      <SelectItem value="spring">Весна</SelectItem>
                      <SelectItem value="summer">Лето</SelectItem>
                      <SelectItem value="autumn">Осень</SelectItem>
                      <SelectItem value="winter">Зима</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Цена от
                    </label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={filters.minPrice}
                      onChange={(e) =>
                        setFilters({ ...filters, minPrice: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Цена до
                    </label>
                    <Input
                      type="number"
                      placeholder="999999"
                      value={filters.maxPrice}
                      onChange={(e) =>
                        setFilters({ ...filters, maxPrice: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sale"
                    checked={filters.onSale}
                    onCheckedChange={(checked) =>
                      setFilters({ ...filters, onSale: !!checked })
                    }
                  />
                  <label htmlFor="sale" className="text-sm font-medium">
                    Только акции
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="mb-4 text-gray-600">
              Найдено товаров: {filteredProducts.length}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm border overflow-hidden"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2 capitalize">
                      {product.brand}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        {product.sale && product.salePrice ? (
                          <div>
                            <span className="text-lg font-bold text-[#e71a00]">
                              {product.salePrice} ₽
                            </span>
                            <span className="text-sm text-gray-500 line-through ml-2">
                              {product.price} ₽
                            </span>
                          </div>
                        ) : (
                          <span className="text-lg font-bold text-black">
                            {product.price} ₽
                          </span>
                        )}
                      </div>
                      {product.sale && (
                        <span className="bg-[#e71a00] text-white text-xs px-2 py-1 rounded">
                          АКЦИЯ
                        </span>
                      )}
                    </div>
                    <Button
                      onClick={() =>
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price:
                            product.sale && product.salePrice
                              ? product.salePrice
                              : product.price,
                          image: product.image,
                        })
                      }
                      className="w-full bg-[#e71a00] hover:bg-[#c41600]"
                    >
                      <Icon name="ShoppingCart" size={16} className="mr-2" />В
                      корзину
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Icon
                  name="Search"
                  size={48}
                  className="mx-auto text-gray-400 mb-4"
                />
                <p className="text-gray-600">
                  Товары не найдены. Попробуйте изменить фильтры.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
