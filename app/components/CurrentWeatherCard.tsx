import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import WeatherBackground from "./WeatherBackground";

// Flexible props to handle both mock (Step 2) and real (Step 3) shapes ideally, 
// but we optimize for Step 3 now.
interface Props {
    data: {
        city: string;
        date: string;
        temp: number;
        condition: string;
        description: string;
        feelsLike: number;
        humidity: number;
        windSpeed: number;
        high: number;
        low: number;
        unit: 'C' | 'F';
        timezone: string;
    };
    iconUrl: string; // New: Image URL from API
    isFavorite: boolean;
    onToggleFavorite: () => void;
}

export default function CurrentWeatherCard({ data, iconUrl, isFavorite, onToggleFavorite }: Props) {
    const [currentTime, setCurrentTime] = useState<string>("");

    useEffect(() => {
        const updateClock = () => {
            try {
                const timeStr = new Date().toLocaleTimeString("en-US", {
                    timeZone: data.timezone,
                    hour: 'numeric',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true
                });
                setCurrentTime(timeStr);
            } catch (e) {
                // Fallback if timezone is invalid
                setCurrentTime(new Date().toLocaleTimeString());
            }
        };

        updateClock();
        const timer = setInterval(updateClock, 1000);
        return () => clearInterval(timer);
    }, [data.timezone]);

    return (
        <div className="col-span-12 xl:col-span-8 bg-white text-slate-900 rounded-[2rem] border border-slate-200 shadow-sm p-0 relative overflow-hidden flex flex-col h-auto transition-all duration-500 pb-0">
            <WeatherBackground condition={data.condition} />

            {/* Background Decor (Static fallback) */}
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                {/* Could use <img src={iconUrl} /> here huge but simplified */}
            </div>

            {/* Top Section */}
            <div className="p-4 md:p-5 flex flex-col justify-start relative z-10 gap-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-1 flex items-center gap-3 text-slate-900">
                                {data.city}
                            </h2>
                            <p className="text-slate-500 text-lg md:text-xl font-medium">{data.date}</p>
                        </div>

                        <button
                            onClick={onToggleFavorite}
                            className="mt-1 p-2 rounded-full hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200"
                            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                        >
                            <Star
                                size={24}
                                className={`transition-all ${isFavorite ? "fill-amber-400 text-amber-400" : "text-slate-300 hover:text-amber-400"}`}
                            />
                        </button>
                    </div>

                    <div className="bg-slate-100/50 px-4 py-2 rounded-lg text-sm font-medium text-slate-800 border border-slate-200 self-start">
                        Live Updates
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-4 md:gap-8 animate-in fade-in zoom-in duration-500 pb-0">
                    <div className="flex flex-col">
                        <div className="text-7xl md:text-8xl font-semibold tracking-tight text-slate-900 leading-none tabular-nums">
                            {data.temp}°{data.unit}
                        </div>
                        {currentTime && (
                            <div className="text-xl md:text-2xl font-medium text-slate-900 mt-1 tracking-tight tabular-nums">
                                {currentTime}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-1 mb-1 items-center md:items-end">
                        <div className="flex items-center gap-2 text-lg md:text-xl font-medium capitalize text-slate-900">
                            <img src={`https:${iconUrl}`} alt={data.condition} className="w-10 h-10 object-contain" />
                            {data.condition}
                        </div>
                        <div className="text-slate-400 font-normal text-base md:text-lg tabular-nums">
                            H: {data.high}°{data.unit}  &bull;  L: {data.low}°{data.unit}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
