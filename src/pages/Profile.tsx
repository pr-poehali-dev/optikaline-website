import React from "react";
import { useAuth } from "@/contexts/AuthContext";

const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-black">
          Профиль пользователя
        </h1>
        <div className="max-w-md mx-auto bg-gray-50 p-6 rounded-lg">
          <p className="text-lg mb-2">
            <strong>Имя:</strong> {user?.fullName}
          </p>
          <p className="text-lg text-gray-600">
            <strong>Email:</strong> {user?.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
