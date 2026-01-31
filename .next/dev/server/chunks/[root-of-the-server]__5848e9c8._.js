module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/weather/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
// Helper to fill missing days if API provides fewer than 7
// (Free plan provides 3 days)
// Helper to fill missing days if API provides fewer than 7
// (Free plan provides 3 days)
function fillMockDays(lastRealDay, totalNeeded) {
    const mockDays = [];
    const baseDate = new Date(lastRealDay.date);
    // Simple deterministic pseudo-random logic based on base temps
    for(let i = 1; i <= totalNeeded; i++){
        const d = new Date(baseDate);
        d.setDate(baseDate.getDate() + i);
        const dateStr = d.toLocaleDateString("en-CA"); // YYYY-MM-DD
        const dayName = d.toLocaleDateString("en-GB", {
            weekday: 'short'
        });
        // Add some random variation
        const variance = Math.floor(Math.sin(d.getDate()) * 5);
        const varianceF = variance * 1.8;
        mockDays.push({
            date: dateStr,
            dayName,
            max_c: lastRealDay.max_c + variance,
            max_f: Math.round(lastRealDay.max_f + varianceF),
            min_c: lastRealDay.min_c + variance,
            min_f: Math.round(lastRealDay.min_f + varianceF),
            conditionText: i % 2 === 0 ? "Partly Cloudy" : "Sunny",
            conditionIcon: i % 2 === 0 ? "//cdn.weatherapi.com/weather/64x64/day/116.png" : "//cdn.weatherapi.com/weather/64x64/day/113.png",
            chance_of_rain: Math.abs(variance * 10),
            isMock: true
        });
    }
    return mockDays;
}
async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    if (!query) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Missing query parameter"
        }, {
            status: 400
        });
    }
    const apiKey = process.env.WEATHERAPI_KEY;
    if (!apiKey) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Server misconfigured"
        }, {
            status: 500
        });
    }
    try {
        // 3 days is typical free limit, but we ask for 7 just in case using a paid key eventually
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(query)}&days=7&aqi=yes&alerts=no`;
        const res = await fetch(url);
        if (!res.ok) {
            const errData = await res.json();
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: errData.error?.message || "Weather API Error"
            }, {
                status: res.status
            });
        }
        const data = await res.json();
        // --- Normalize Data ---
        // 1. Hourly (Next 10 hours from now)
        const currentEpoch = data.location.localtime_epoch;
        const allHours = data.forecast.forecastday.flatMap((d)=>d.hour);
        // Filter hours > current hour, take next 10
        const nextHoursRaw = allHours.filter((h)=>h.time_epoch >= currentEpoch).slice(0, 24);
        const hourly = nextHoursRaw.slice(0, 12).map((h, idx)=>({
                time: idx === 0 ? "Now" : new Date(h.time_epoch * 1000).toLocaleTimeString("en-US", {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                }),
                temp_c: Math.round(h.temp_c),
                temp_f: Math.round(h.temp_f),
                conditionText: h.condition.text,
                conditionIcon: h.condition.icon,
                chance_of_rain: h.chance_of_rain,
                isNow: idx === 0
            }));
        // 2. Daily (7 days ideally)
        const realDays = data.forecast.forecastday.map((d)=>{
            const dateObj = new Date(d.date);
            return {
                date: d.date,
                dayName: dateObj.toLocaleDateString("en-GB", {
                    weekday: 'short'
                }),
                max_c: Math.round(d.day.maxtemp_c),
                max_f: Math.round(d.day.maxtemp_f),
                min_c: Math.round(d.day.mintemp_c),
                min_f: Math.round(d.day.mintemp_f),
                conditionText: d.day.condition.text,
                conditionIcon: d.day.condition.icon,
                chance_of_rain: d.day.daily_chance_of_rain,
                isMock: false
            };
        });
        // Fill mocks if needed (up to 7)
        let finalDaily = [
            ...realDays
        ];
        if (finalDaily.length < 7) {
            const needed = 7 - finalDaily.length;
            const mocks = fillMockDays(finalDaily[finalDaily.length - 1], needed);
            finalDaily = [
                ...finalDaily,
                ...mocks
            ];
        } else {
            finalDaily = finalDaily.slice(0, 7);
        }
        if (finalDaily.length > 0) finalDaily[0].dayName = "Today";
        // 3. Details
        const today = data.forecast.forecastday[0];
        const currentHourData = today.hour.find((h)=>Math.abs(h.time_epoch - currentEpoch) < 3600) || today.hour[0];
        const details = {
            sunrise: today.astro.sunrise,
            sunset: today.astro.sunset,
            pressure_mb: data.current.pressure_mb,
            visibility_km: data.current.vis_km,
            uv: data.current.uv,
            humidity: data.current.humidity,
            wind_kph: data.current.wind_kph,
            feelsLike_c: data.current.feelslike_c,
            feelsLike_f: data.current.feelslike_f,
            airQualityIndex: data.current.air_quality?.["us-epa-index"]
        };
        const uiData = {
            location: {
                name: data.location.name,
                region: data.location.region,
                country: data.location.country,
                lat: data.location.lat,
                lon: data.location.lon,
                localtime: data.location.localtime,
                tz_id: data.location.tz_id
            },
            current: {
                temp_c: Math.round(data.current.temp_c),
                temp_f: Math.round(data.current.temp_f),
                conditionText: data.current.condition.text,
                conditionIcon: data.current.condition.icon,
                feelslike_c: Math.round(data.current.feelslike_c),
                feelslike_f: Math.round(data.current.feelslike_f),
                humidity: data.current.humidity,
                wind_kph: Math.round(data.current.wind_kph),
                uv: data.current.uv
            },
            hourly,
            daily: finalDaily,
            details,
            extraDetails: {
                precip_mm: data.current.precip_mm,
                cloud: data.current.cloud,
                gust_kph: data.current.gust_kph,
                moon_phase: today.astro.moon_phase,
                moon_illumination: parseInt(today.astro.moon_illumination) || 0,
                us_epa_index: data.current.air_quality?.["us-epa-index"] || 0,
                dewpoint_c: currentHourData.dewpoint_c,
                dewpoint_f: currentHourData.dewpoint_f
            }
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(uiData);
    } catch (error) {
        console.error("Weather API Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to fetch weather data"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5848e9c8._.js.map