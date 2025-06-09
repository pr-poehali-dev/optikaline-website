import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import BrandDropdown from "@/components/BrandDropdown";

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white border-b-2 border-[#b7b7b788] sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-[#e71a00]">
            OptikaLine
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-black hover:text-[#e71a00] transition-colors"
            >
              Главная
            </Link>
            <BrandDropdown />
            {isAuthenticated && (
              <>
                <Link
                  to="/catalog"
                  className="text-black hover:text-[#e71a00] transition-colors"
                >
                  Каталог
                </Link>
                <Link
                  to="/cart"
                  className="relative text-black hover:text-[#e71a00] transition-colors"
                >
                  <Icon name="ShoppingCart" size={20} />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#e71a00] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  Привет, {user?.fullName.split(" ")[0]}!
                </span>
                <Link to="/profile">
                  <Button variant="outline" size="sm">
                    <Icon name="User" size={16} />
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <Icon name="LogOut" size={16} />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Вход
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-[#e71a00] hover:bg-[#c41600]" size="sm">
                    Регистрация
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
