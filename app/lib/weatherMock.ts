import { City } from './cities';
import {
    Cloud, CloudRain, CloudSun, Moon, Sun,
    Sunrise, Sunset, Thermometer, Wind, Droplets, Gauge, Eye, LucideIcon
} from 'lucide-react';

export type WeatherCondition = "Sunny" | "Cloudy" | "Rainy" | "Partly Cloudy" | "Clear" | "Snowy" | "Stormy";

export interface CurrentWeather {
    city: string;
    country: string;
    date: string;
    temp: number;
    condition: WeatherCondition;
    description: string;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    high: number;
    low: number;
    icon: LucideIcon;
}

export interface HourlyData {
    time: string;
    temp: number;
    icon: LucideIcon;
}

export interface DailyData {
    day: string;
    high: number;
    low: number;
    rain: number;
    icon: LucideIcon;
    condition: WeatherCondition;
}

export interface DetailData {
    label: string;
    value: string;
    icon: LucideIcon;
}

export interface FullWeatherData {
    current: CurrentWeather;
    hourly: HourlyData[];
    daily: DailyData[];
    details: DetailData[];
}

// Deterministic random number generator (Linear Congruential Generator)
class Random {
    private seed: number;

    constructor(seedStr: string) {
        let h = 0x811c9dc5;
        for (let i = 0; i < seedStr.length; i++) {
            h ^= seedStr.charCodeAt(i);
            h = Math.imul(h, 0x01000193);
        }
        this.seed = h >>> 0;
    }

    // Returns number between 0 and 1
    next(): number {
        this.seed = (this.seed * 1664525 + 1013904223) % 4294967296;
        return this.seed / 4294967296;
    }

    // Returns integer between min and max (inclusive)
    range(min: number, max: number): number {
        return Math.floor(this.next() * (max - min + 1)) + min;
    }
}

const CONDITIONS: { name: WeatherCondition; icon: LucideIcon; desc: string }[] = [
    { name: "Sunny", icon: Sun, desc: "Clear sky" },
    { name: "Cloudy", icon: Cloud, desc: "Overcast clouds" },
    { name: "Rainy", icon: CloudRain, desc: "Light rain" },
    { name: "Partly Cloudy", icon: CloudSun, desc: "Partly cloudy" },
    { name: "Clear", icon: Moon, desc: "Clear night sky" },
    { name: "Stormy", icon: CloudRain, desc: "Thunderstorm" },
];

export const generateWeatherData = (city: City): FullWeatherData => {
    const rng = new Random(city.name + new Date().getDate()); // Unique per city per day

    // Generate Base Temp based on latitude (rough approx)
    // Higher latitude -> colder. 
    // Lat 0 = 30C, Lat 60 = 10C, Lat 90 = -10C
    let baseTemp = 30 - (Math.abs(city.lat) / 90) * 40;
    baseTemp += rng.range(-5, 5); // Add variance
    baseTemp = Math.round(baseTemp);

    const conditionIdx = rng.range(0, CONDITIONS.length - 1);
    const condition = CONDITIONS[conditionIdx];

    const high = baseTemp + rng.range(2, 5);
    const low = baseTemp - rng.range(3, 8);

    // --- Current ---
    const current: CurrentWeather = {
        city: city.name,
        country: city.country,
        date: new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' }),
        temp: baseTemp,
        condition: condition.name,
        description: condition.desc,
        feelsLike: baseTemp + rng.range(-2, 3),
        humidity: rng.range(30, 90),
        windSpeed: rng.range(2, 25),
        high,
        low,
        icon: condition.icon,
    };

    // --- Hourly ---
    const hourly: HourlyData[] = [];
    let currentHour = new Date().getHours();

    for (let i = 0; i < 12; i++) {
        const hourTemp = baseTemp + rng.range(-3, 3);
        const hCond = CONDITIONS[rng.range(0, CONDITIONS.length - 1)];

        // Format time: Now, 14:00, 15:00
        const timeLabel = i === 0 ? "Now" : `${(currentHour + i) % 24}:00`;

        hourly.push({
            time: timeLabel,
            temp: hourTemp,
            icon: hCond.icon
        });
    }

    // --- Daily ---
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const todayIdx = new Date().getDay();
    const daily: DailyData[] = [];

    for (let i = 0; i < 7; i++) {
        const dHigh = high + rng.range(-5, 5);
        const dLow = low + rng.range(-5, 5);
        const dCond = CONDITIONS[rng.range(0, CONDITIONS.length - 1)];
        const dayLabel = i === 0 ? "Today" : days[(todayIdx + i) % 7];

        daily.push({
            day: dayLabel,
            high: dHigh,
            low: dLow,
            rain: rng.range(0, 80),
            icon: dCond.icon,
            condition: dCond.name
        });
    }

    // --- Details ---
    const details: DetailData[] = [
        { label: "Sunrise", value: `0${rng.range(5, 7)}:${rng.range(10, 59)} AM`, icon: Sunrise },
        { label: "Sunset", value: `${rng.range(16, 22)}:${rng.range(10, 59)} PM`, icon: Sunset },
        { label: "UV Index", value: `${rng.range(0, 10)} (${rng.range(0, 10) > 5 ? 'High' : 'Low'})`, icon: Sun },
        { label: "Humidity", value: `${rng.range(20, 90)}%`, icon: Droplets },
        { label: "Wind", value: `${rng.range(2, 30)} km/h`, icon: Wind },
        { label: "Feels Like", value: `${current.feelsLike}°`, icon: Thermometer },
        { label: "Pressure", value: `${rng.range(980, 1030)} hPa`, icon: Gauge },
        { label: "Visibility", value: `${rng.range(5, 20)} km`, icon: Eye },
    ];

    return { current, hourly, daily, details };
};
