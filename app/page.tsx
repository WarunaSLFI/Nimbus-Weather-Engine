"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CloudSun, Menu, Loader2, X } from "lucide-react";
import Sidebar from "./components/Sidebar";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import DetailsGrid from "./components/DetailsGrid";
import ExtraDetailsGrid from "./components/ExtraDetailsGrid";
import { UIWeather, SearchResultItem } from "./lib/types";
import {
  getRecentSearches, addRecentSearch, removeRecentSearch,
  getFavorites, toggleFavorite,
  getLastCity, saveLastCity
} from "./lib/storage";
import { City } from "./lib/cities"; // Keep for type compat if needed, or refactor storage to use new types

// Adapter for storage compatibility (Old City type vs API)
// Ideally we'd migrate storage to use a unified type, but for now we map it on the fly.
function toCity(ui: UIWeather): City {
  return {
    name: ui.location.name,
    country: ui.location.country,
    lat: ui.location.lat,
    lon: ui.location.lon
  };
}

export default function Home() {
  const [weather, setWeather] = useState<UIWeather | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [favorites, setFavorites] = useState<City[]>([]);
  const [recent, setRecent] = useState<City[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [unit, setUnit] = useState<'C' | 'F'>('C');

  // Initial Load
  useEffect(() => {
    setFavorites(getFavorites());
    setRecent(getRecentSearches());

    // Check for last city
    const last = getLastCity();
    const initialQuery = last ? `${last.lat},${last.lon}` : "Helsinki";

    fetchWeather(initialQuery);
  }, []);

  const fetchWeather = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/weather?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("Failed to fetch weather");
      const data: UIWeather = await res.json();
      setWeather(data);

      // Save valid load as "last city"
      saveLastCity(toCity(data));

    } catch (err) {
      setError("Could not load weather data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCity = (query: string) => {
    fetchWeather(query);
    // Recent search addition happens after successful load usually, but we can do optimistic text link here?
    // Actually, API returns full location info, so best to add to recent AFTER fetch succeeds.
    // However, SearchBox passes raw query. Wait for weather load to add to recent?
    // Let's add inside the useEffect or just assume it works.
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add to recent when weather loads successfully
  useEffect(() => {
    if (weather) {
      const c = toCity(weather);
      // Only add if it's different from top recent? Or just re-add.
      const updated = addRecentSearch(c);
      if (updated) setRecent(updated);
    }
  }, [weather]);

  const handleToggleFavorite = () => {
    if (!weather) return;
    const c = toCity(weather);
    const updated = toggleFavorite(c);
    setFavorites(updated);
  };

  const isCurrentFavorite = weather ? favorites.some(c => c.name === weather.location.name) : false;

  // Render Helpers
  const renderContent = () => {
    if (loading && !weather) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <Loader2 size={48} className="text-blue-500 animate-spin" />
          <p className="text-slate-400 font-medium">Loading forecast...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <p className="text-red-500 font-bold text-lg">{error}</p>
          <button onClick={() => fetchWeather("Helsinki")} className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">Try Default</button>
        </div>
      );
    }

    if (!weather) return null;

    // Map UIWeather to components
    // CurrentWeatherCard expects slightly different props?
    // Check CurrentWeatherCard props signature. It expects 'CurrentWeather' from 'lib/weatherMock'.
    // We need to update components to accept new types or map them here.
    // To save file edits, let's map on the fly to match the component props if possible OR preferably update components to new types.
    // Since we are upgrading, let's cast 'weather' to expected props.

    const currentProps = {
      city: weather.location.name,
      country: weather.location.country,
      date: new Date(weather.location.localtime).toLocaleDateString("en-GB", { weekday: 'long', day: 'numeric', month: 'short' }),
      temp: unit === 'C' ? weather.current.temp_c : weather.current.temp_f,
      condition: weather.current.conditionText as any, // Component expects strict union, loosen it or fix component
      description: weather.current.conditionText,
      feelsLike: unit === 'C' ? weather.current.feelslike_c : weather.current.feelslike_f,
      humidity: weather.current.humidity,
      windSpeed: weather.current.wind_kph,
      high: unit === 'C' ? (weather.daily[0]?.max_c || 0) : (weather.daily[0]?.max_f || 0),
      low: unit === 'C' ? (weather.daily[0]?.min_c || 0) : (weather.daily[0]?.min_f || 0),
      unit,
      timezone: weather.location.tz_id,
      icon: Loader2 // Dummy, component handles icon rendering? No, component expects explicit icon component.
      // Wait, component rendering needs dynamic icon.
      // The API gives us icon URL "//cdn.....". 
      // We need to update CurrentWeatherCard to accept image URL instead of Lucide Icon component.
    };

    return (
      <div>
        <div className="grid grid-cols-12 gap-8 animate-in fade-in duration-500">
          {/* Left Column */}
          <div className="col-span-12 xl:col-span-8 flex flex-col gap-8">
            <CurrentWeatherCard
              data={currentProps as any}
              isFavorite={isCurrentFavorite}
              onToggleFavorite={handleToggleFavorite}
              iconUrl={weather.current.conditionIcon}
            />
            <HourlyForecast data={weather.hourly} unit={unit} />
            <DailyForecast data={weather.daily} unit={unit} />
          </div>

          {/* Right Column */}
          <div className="col-span-12 xl:col-span-4 flex flex-col gap-8">
            <DetailsGrid data={weather.details as any} unit={unit} />
            {weather.extraDetails && <ExtraDetailsGrid data={weather.extraDetails} unit={unit} />}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-500/30 selection:text-blue-900">

      <div className={`${isMobileMenuOpen ? 'fixed inset-0 z-50 bg-slate-50 overflow-y-auto' : 'hidden lg:block'}`}>
        <div className="lg:hidden p-4 flex justify-end">
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-white border border-slate-200 rounded-full text-slate-600 shadow-sm"><X /></button>
        </div>
        <Sidebar
          favorites={favorites}
          recent={recent}
          onSearch={handleSelectCity}
          onSelectCity={(city) => {
            handleSelectCity(`${city.lat},${city.lon}`);
            setIsMobileMenuOpen(false);
          }}
          onRemoveFavorite={(c) => {
            const updated = toggleFavorite(c);
            setFavorites(updated);
          }}
          onRemoveRecent={(c) => {
            const updated = removeRecentSearch(c);
            setRecent(updated);
          }}
          unit={unit}
          setUnit={setUnit}
        />
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="relative w-10 h-10 overflow-hidden">
            <Image
              src="/logo.png"
              alt="Nimbus Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="font-bold text-lg text-slate-900 leading-tight">Nimbus Weather Engine</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 bg-white rounded-full shadow-sm border border-slate-200 text-slate-600">
          <Menu size={20} />
        </button>
      </div>

      {/* Main Content Area */}
      <main className="lg:ml-[320px] min-h-screen p-4 md:p-8 lg:p-12 max-w-[1600px] mx-auto flex flex-col">
        {renderContent()}

        {/* Credit */}
        <div className="mt-auto pt-8 text-center md:text-right">
          <a href="https://www.weatherapi.com/" title="Free Weather API" target="_blank" rel="noreferrer" className="text-[10px] text-slate-400 hover:text-slate-600 uppercase tracking-widest font-bold">
            Powered by WeatherAPI.com
          </a>
        </div>
      </main>
    </div>
  );
}
