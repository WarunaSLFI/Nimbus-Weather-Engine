import React from "react";
import { CloudRain, Cloud, Wind, Moon, Droplets, Leaf } from "lucide-react";
import { UIExtraDetails } from "../lib/types";

interface Props {
    data: UIExtraDetails;
    unit: 'C' | 'F';
}

export default function ExtraDetailsGrid({ data, unit }: Props) {
    const items = [
        { label: "Precipitation", value: `${data.precip_mm} mm`, icon: CloudRain },
        { label: "Cloud Cover", value: `${data.cloud}%`, icon: Cloud },
        { label: "Wind Gust", value: `${data.gust_kph} kph`, icon: Wind },
        { label: "Dew Point", value: unit === 'C' ? `${data.dewpoint_c}°C` : `${data.dewpoint_f}°F`, icon: Droplets },
        { label: "Moon Phase", value: data.moon_phase, icon: Moon, span: 2 },
    ];

    // Add AQI if available/relevant? We have EPA index.
    // 1-2 Good, 3-4 Moderate, 5-6 Unhealthy.
    const getAqiLabel = (idx: number) => {
        if (idx <= 2) return "Good";
        if (idx <= 4) return "Moderate";
        return "Unhealthy";
    }

    if (data.us_epa_index > 0) {
        items.push({ label: "Air Quality", value: getAqiLabel(data.us_epa_index), icon: Leaf });
    }

    return (
        <div className="grid grid-cols-2 gap-4">
            {items.map((detail, idx) => {
                const Icon = detail.icon;
                return (
                    <div key={idx} className={`bg-white border border-slate-200 shadow-sm p-5 rounded-3xl flex flex-col justify-between gap-2 hover:bg-slate-50 transition-colors h-24 ${detail.span ? "col-span-2" : ""}`}>
                        <div className="flex items-center justify-between text-slate-500">
                            <span className="text-xs font-semibold uppercase tracking-wider">{detail.label}</span>
                            <Icon size={18} className="text-slate-400" />
                        </div>
                        <div className="text-xl font-semibold text-slate-900 truncate" title={detail.value}>{detail.value}</div>
                    </div>
                );
            })}
        </div>
    )
}
