import { NextRequest, NextResponse } from "next/server";
import { WeatherApiSearchItem, SearchResultItem } from "@/app/lib/types";

// Simple in-memory cache
const CACHE = new Map<string, { data: SearchResultItem[]; timestamp: number }>();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query || query.length < 2) {
        return NextResponse.json({ results: [] });
    }

    // Check Cache
    const cacheKey = query.toLowerCase().trim();
    const cached = CACHE.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return NextResponse.json({ results: cached.data });
    }

    const apiKey = process.env.WEATHERAPI_KEY;
    if (!apiKey) {
        return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    try {
        const res = await fetch(
            `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${encodeURIComponent(query)}`
        );

        if (!res.ok) {
            // If empty or error, return empty list slightly safer
            return NextResponse.json({ results: [] });
        }

        const data: WeatherApiSearchItem[] = await res.json();

        const normalized: SearchResultItem[] = data.map((item) => ({
            id: item.id,
            name: item.name,
            region: item.region,
            country: item.country,
            lat: item.lat,
            lon: item.lon,
        }));

        // Cache it
        CACHE.set(cacheKey, { data: normalized, timestamp: Date.now() });

        return NextResponse.json({ results: normalized });
    } catch (error) {
        console.error("Search API Error:", error);
        return NextResponse.json({ error: "Failed to fetch search results" }, { status: 500 });
    }
}
