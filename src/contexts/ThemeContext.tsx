import React, { createContext, useContext, useState } from "react";

type Season = "default" | "summer" | "spring" | "winter" | "autumn";

interface SeasonTheme {
  background: string;
  name: string;
}

const seasonThemes: Record<Season, SeasonTheme> = {
  default: { background: "#fff", name: "Стандартная" },
  summer: { background: "#dcffd4", name: "Лето" },
  spring: { background: "#ffd4ed", name: "Весна" },
  winter: { background: "#d4e2ff", name: "Зима" },
  autumn: { background: "#ffe5d4", name: "Осень" },
};

interface ThemeContextType {
  currentSeason: Season;
  setSeason: (season: Season) => void;
  currentTheme: SeasonTheme;
  seasonThemes: Record<Season, SeasonTheme>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentSeason, setCurrentSeason] = useState<Season>("default");

  const setSeason = (season: Season) => {
    setCurrentSeason(season);
    document.documentElement.style.setProperty(
      "--season-bg",
      seasonThemes[season].background,
    );
  };

  const currentTheme = seasonThemes[currentSeason];

  return (
    <ThemeContext.Provider
      value={{
        currentSeason,
        setSeason,
        currentTheme,
        seasonThemes,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
