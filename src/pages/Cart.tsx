import React from "react";
import { useCart } from "@/contexts/CartContext";

const Cart: React.FC = () => {
  const { totalItems } = useCart();

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-black">
          Корзина
        </h1>
        <div className="text-center text-gray-600">
          <p>Товаров в корзине: {totalItems}</p>
          <p className="mt-4">Функционал корзины в разработке</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
