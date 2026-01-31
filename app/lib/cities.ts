export interface City {
    name: string;
    country: string;
    lat: number;
    lon: number;
}

export const CITIES: City[] = [
    // Finland
    { name: "Helsinki", country: "Finland", lat: 60.1699, lon: 24.9384 },
    { name: "Tampere", country: "Finland", lat: 61.4978, lon: 23.7610 },
    { name: "Turku", country: "Finland", lat: 60.4518, lon: 22.2666 },
    { name: "Oulu", country: "Finland", lat: 65.0121, lon: 25.4651 },
    { name: "Espoo", country: "Finland", lat: 60.2055, lon: 24.6559 },
    { name: "Vantaa", country: "Finland", lat: 60.2818, lon: 25.0782 },
    { name: "Jyväskylä", country: "Finland", lat: 62.2426, lon: 25.7473 },
    { name: "Lahti", country: "Finland", lat: 60.9827, lon: 25.6615 },
    { name: "Kuopio", country: "Finland", lat: 62.8924, lon: 27.6770 },
    { name: "Pori", country: "Finland", lat: 61.4851, lon: 21.7974 },
    { name: "Rovaniemi", country: "Finland", lat: 66.5039, lon: 25.7294 },
    { name: "Joensuu", country: "Finland", lat: 62.6010, lon: 29.7636 },
    { name: "Vaasa", country: "Finland", lat: 63.0960, lon: 21.6158 },

    // Scandanavia & Nordics
    { name: "Stockholm", country: "Sweden", lat: 59.3293, lon: 18.0686 },
    { name: "Gothenburg", country: "Sweden", lat: 57.7089, lon: 11.9746 },
    { name: "Malmö", country: "Sweden", lat: 55.6050, lon: 13.0038 },
    { name: "Oslo", country: "Norway", lat: 59.9139, lon: 10.7522 },
    { name: "Bergen", country: "Norway", lat: 60.3913, lon: 5.3221 },
    { name: "Copenhagen", country: "Denmark", lat: 55.6761, lon: 12.5683 },
    { name: "Aarhus", country: "Denmark", lat: 56.1629, lon: 10.2039 },
    { name: "Reykjavik", country: "Iceland", lat: 64.1466, lon: -21.9426 },

    // Europe (Major)
    { name: "London", country: "UK", lat: 51.5074, lon: -0.1278 },
    { name: "Paris", country: "France", lat: 48.8566, lon: 2.3522 },
    { name: "Berlin", country: "Germany", lat: 52.5200, lon: 13.4050 },
    { name: "Munich", country: "Germany", lat: 48.1351, lon: 11.5820 },
    { name: "Rome", country: "Italy", lat: 41.9028, lon: 12.4964 },
    { name: "Milan", country: "Italy", lat: 45.4642, lon: 9.1900 },
    { name: "Madrid", country: "Spain", lat: 40.4168, lon: -3.7038 },
    { name: "Barcelona", country: "Spain", lat: 41.3851, lon: 2.1734 },
    { name: "Lisbon", country: "Portugal", lat: 38.7223, lon: -9.1393 },
    { name: "Amsterdam", country: "Netherlands", lat: 52.3676, lon: 4.9041 },
    { name: "Brussels", country: "Belgium", lat: 50.8503, lon: 4.3517 },
    { name: "Vienna", country: "Austria", lat: 48.2082, lon: 16.3738 },
    { name: "Zurich", country: "Switzerland", lat: 47.3769, lon: 8.5417 },
    { name: "Prague", country: "Czech Republic", lat: 50.0755, lon: 14.4378 },
    { name: "Warsaw", country: "Poland", lat: 52.2297, lon: 21.0122 },
    { name: "Budapest", country: "Hungary", lat: 47.4979, lon: 19.0402 },

    // World (Major)
    { name: "New York", country: "USA", lat: 40.7128, lon: -74.0060 },
    { name: "Los Angeles", country: "USA", lat: 34.0522, lon: -118.2437 },
    { name: "Chicago", country: "USA", lat: 41.8781, lon: -87.6298 },
    { name: "Miami", country: "USA", lat: 25.7617, lon: -80.1918 },
    { name: "Toronto", country: "Canada", lat: 43.6510, lon: -79.3470 },
    { name: "Vancouver", country: "Canada", lat: 49.2827, lon: -123.1207 },
    { name: "Tokyo", country: "Japan", lat: 35.6762, lon: 139.6503 },
    { name: "Kyoto", country: "Japan", lat: 34.9858, lon: 135.7588 },
    { name: "Seoul", country: "South Korea", lat: 37.5665, lon: 126.9780 },
    { name: "Singapore", country: "Singapore", lat: 1.3521, lon: 103.8198 },
    { name: "Sydney", country: "Australia", lat: -33.8688, lon: 151.2093 },
    { name: "Melbourne", country: "Australia", lat: -37.8136, lon: 144.9631 },
    { name: "Dubai", country: "UAE", lat: 25.2048, lon: 55.2708 },
    { name: "Mumbai", country: "India", lat: 19.0760, lon: 72.8777 },
    { name: "Bangkok", country: "Thailand", lat: 13.7563, lon: 100.5018 },
];
