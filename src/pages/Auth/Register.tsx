import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    position: "",
    phone: "",
    password: "",
    confirmPassword: "",
    inn: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Ошибка",
        description: "Пароли не совпадают",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const success = await register({
        fullName: formData.fullName,
        company: formData.company,
        position: formData.position,
        phone: formData.phone,
        password: formData.password,
        inn: formData.inn || undefined,
        email: formData.email || undefined,
      });

      if (success) {
        toast({
          title: "Регистрация успешна",
          description: "Добро пожаловать в OptikaLine!",
        });
        navigate("/");
      } else {
        toast({
          title: "Ошибка регистрации",
          description: "Пользователь с таким телефоном уже существует",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Что-то пошло не так",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#e71a00]">
            Регистрация в OptikaLine
          </CardTitle>
          <CardDescription>
            Создайте аккаунт для оптовых закупок
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="fullName">ФИО *</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Иванов Иван Иванович"
                required
              />
            </div>
            <div>
              <Label htmlFor="company">Компания (ООО/ИП) *</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="ООО Оптика+"
                required
              />
            </div>
            <div>
              <Label htmlFor="position">Должность *</Label>
              <Input
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Директор"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Телефон *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+7 (900) 123-45-67"
                required
              />
            </div>
            <div>
              <Label htmlFor="inn">ИНН</Label>
              <Input
                id="inn"
                name="inn"
                value={formData.inn}
                onChange={handleChange}
                placeholder="1234567890"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.com"
              />
            </div>
            <div>
              <Label htmlFor="password">Пароль *</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Подтвердите пароль *</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#e71a00] hover:bg-[#c41600]"
              disabled={isLoading}
            >
              {isLoading ? "Регистрация..." : "Зарегистрироваться"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Уже есть аккаунт?{" "}
              <Link to="/login" className="text-[#e71a00] hover:underline">
                Войти
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
