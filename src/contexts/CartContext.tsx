import React, { createContext, useContext, useState } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  type: string;
  inStock: boolean;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  exportToExcel: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: Omit<CartItem, "quantity">) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + (item.inStock ? 1 : 0) }
            : i,
        );
      }
      return [...prevItems, { ...item, quantity: item.inStock ? 1 : 1 }];
    });
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      removeItem(id);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + (item.inStock ? item.price * item.quantity : 0),
    0,
  );

  const exportToExcel = () => {
    // Создание данных для Excel
    const data = items.map((item) => ({
      Название: item.name,
      Бренд: item.brand,
      Тип: item.type,
      Цена: item.inStock ? item.price : "Под заказ",
      Количество: item.quantity,
      Сумма: item.inStock ? item.price * item.quantity : 0,
      Статус: item.inStock ? "В наличии" : "Под заказ",
    }));

    // Имитация отправки в Telegram
    const orderText = `🛒 Новый заказ OptikaLine:\n\n${data
      .map(
        (item) =>
          `${item.Название} (${item.Бренд})\nТип: ${item.Тип}\nКоличество: ${item.Количество}\nЦена: ${item.Цена}\n`,
      )
      .join("\n")}\n💰 Общая сумма: ${totalPrice} руб.`;

    console.log("Отправка заказа в Telegram @leradeen:", orderText);

    // Здесь будет реальная интеграция с Telegram API
    alert("Заказ отправлен в Telegram @leradeen!");
    clearCart();
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        exportToExcel,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
