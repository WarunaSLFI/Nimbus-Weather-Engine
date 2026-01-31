import React, { useMemo } from "react";

interface Props {
    condition: string;
}

export default function WeatherBackground({ condition }: Props) {
    const cond = (condition || "").toLowerCase();

    // Determine effect type
    const isRain = cond.includes("rain") || cond.includes("drizzle") || cond.includes("shower");
    const isSnow = cond.includes("snow") || cond.includes("ice") || cond.includes("freezing") || cond.includes("blizzard");
    const isCloudy = cond.includes("cloud") || cond.includes("overcast") || cond.includes("fog") || cond.includes("mist") || cond.includes("haze");
    const isSunny = cond.includes("sun") || cond.includes("clear");
    const isThunder = cond.includes("thunder");

    // Generate random particles
    const particles = useMemo(() => {
        return Array.from({ length: 40 }).map(() => ({
            left: Math.random() * 100,
            duration: 0.5 + Math.random() * 0.5,
            delay: Math.random() * 2,
            size: 4 + Math.random() * 6, // Slightly larger
            snowDuration: 3 + Math.random() * 4
        }));
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Background Overlays - Make them more distinct */}
            {isSnow && <div className="absolute inset-0 bg-slate-100/30" />}
            {isRain && <div className="absolute inset-0 bg-slate-200/20" />}
            {isCloudy && <div className="absolute inset-0 bg-slate-100/40" />}
            {isSunny && <div className="absolute inset-0 bg-amber-50/20" />}

            {/* Sunny / Clear Effect */}
            {isSunny && (
                <div className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] bg-amber-200/30 rounded-full blur-[100px] animate-pulse" />
            )}

            {/* Rain Effect */}
            {isRain && (
                <div className="absolute inset-0">
                    {particles.slice(0, 30).map((p, i) => (
                        <div
                            key={i}
                            className="absolute bg-slate-400/40 w-[2px] h-[50px] rounded-full"
                            style={{
                                left: `${p.left}%`,
                                top: `-60px`,
                                animation: `fall ${p.duration}s linear infinite`,
                                animationDelay: `${p.delay}s`
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Snow Effect */}
            {isSnow && (
                <div className="absolute inset-0">
                    {particles.map((p, i) => (
                        <div
                            key={i}
                            className="absolute bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                            style={{
                                left: `${p.left}%`,
                                top: `-20px`,
                                width: `${p.size}px`,
                                height: `${p.size}px`,
                                animation: `snow ${p.snowDuration}s linear infinite`,
                                animationDelay: `${p.delay * 2}s`
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Cloudy / Fog Effect */}
            {isCloudy && (
                <div className="absolute inset-0">
                    <div
                        className="absolute top-0 left-0 w-[400%] h-full flex gap-32"
                        style={{ animation: 'drift 50s linear infinite' }}
                    >
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="w-[500px] h-[400px] bg-slate-300/40 rounded-full blur-[90px]" />
                        ))}
                    </div>
                </div>
            )}

            {/* Thunder Flash */}
            {isThunder && (
                <div
                    className="absolute inset-0 bg-white"
                    style={{ animation: 'flash 8s infinite' }}
                />
            )}
        </div>
    );
}
