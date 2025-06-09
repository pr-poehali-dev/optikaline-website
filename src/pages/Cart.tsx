import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import * as XLSX from "xlsx";

const Cart: React.FC = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, totalItems } =
    useCart();

  const exportToExcel = () => {
    const data = items.map((item) => ({
      Название: item.name,
      Цена: item.price,
      Количество: item.quantity,
      Сумма: item.price * item.quantity,
    }));

    data.push({
      Название: "ИТОГО",
      Цена: "",
      Количество: "",
      Сумма: getTotalPrice(),
    });

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Корзина");
    XLSX.writeFile(wb, "корзина.xlsx");
  };

  const sendToTelegram = () => {
    const orderText = items
      .map(
        (item) =>
          `${item.name} - ${item.quantity} шт. x ${item.price}₽ = ${item.price * item.quantity}₽`,
      )
      .join("\n");

    const totalText = `\nИТОГО: ${getTotalPrice()}₽`;
    const message = encodeURIComponent(
      `Новый заказ:\n${orderText}${totalText}`,
    );

    // Замените на реальный chat_id и bot_token
    const telegramUrl = `https://t.me/share/url?url=${message}`;
    window.open(telegramUrl, "_blank");
  };

  if (totalItems === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-black">
            Корзина
          </h1>
          <div className="text-center py-12">
            <Icon
              name="ShoppingCart"
              size={64}
              className="mx-auto text-gray-400 mb-4"
            />
            <p className="text-xl text-gray-600 mb-4">Ваша корзина пуста</p>
            <Link to="/catalog">
              <Button className="bg-[#e71a00] hover:bg-[#c41600]">
                Перейти к покупкам
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-black">
          Корзина
        </h1>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Товар
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Цена
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Количество
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Сумма
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            className="h-16 w-16 rounded-lg object-cover mr-4"
                            src={item.image}
                            alt={item.name}
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {item.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.price} ₽
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            <Icon name="Minus" size={16} />
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(
                                item.id,
                                parseInt(e.target.value) || 1,
                              )
                            }
                            className="w-20 text-center"
                            min="1"
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Icon name="Plus" size={16} />
                          </Button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.price * item.quantity} ₽
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-center text-xl font-bold mb-6">
              <span>Итого:</span>
              <span>{getTotalPrice()} ₽</span>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <Button
                onClick={exportToExcel}
                variant="outline"
                className="flex items-center justify-center"
              >
                <Icon name="Download" size={16} className="mr-2" />
                Скачать Excel
              </Button>

              <Button
                onClick={sendToTelegram}
                variant="outline"
                className="flex items-center justify-center"
              >
                <Icon name="Send" size={16} className="mr-2" />
                Отправить в Telegram
              </Button>

              <Button className="bg-[#e71a00] hover:bg-[#c41600]">
                <Icon name="CreditCard" size={16} className="mr-2" />
                Оформить заказ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
