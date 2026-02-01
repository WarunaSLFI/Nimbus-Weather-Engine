import React from "react";
import { UIDetails } from "../lib/types";
import { Sunrise, Sunset, Sun, Droplets, Wind, Thermometer, Gauge, Eye } from "lucide-react";

interface Props {
    data: UIDetails;
    unit: 'C' | 'F';
}

export default function DetailsGrid({ data: details, unit }: Props) {
    return (
        <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-normal text-slate-900 mb-4">Weather Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-slate-100 text-slate-500">
                        <Thermometer size={24} />
                    </div>
                    <div>
                        <p className="text-lg font-normal text-slate-500 whitespace-nowrap">Feels Like</p>
                        <p className="text-lg font-semibold text-slate-900">{unit === 'C' ? details.feelsLike_c : details.feelsLike_f}°{unit}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-slate-100 text-slate-500">
                        <Wind size={24} />
                    </div>
                    <div>
                        <p className="text-lg font-normal text-slate-500 whitespace-nowrap">Wind</p>
                        <p className="text-lg font-semibold text-slate-900">{details.wind_kph} kph</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-slate-100 text-slate-500">
                        <Droplets size={24} />
                    </div>
                    <div>
                        <p className="text-lg font-normal text-slate-500 whitespace-nowrap">Humidity</p>
                        <p className="text-lg font-semibold text-slate-900">{details.humidity}%</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-slate-100 text-slate-500">
                        <Sun size={24} />
                    </div>
                    <div>
                        <p className="text-lg font-normal text-slate-500 whitespace-nowrap">UV Index</p>
                        <p className="text-lg font-semibold text-slate-900">{details.uv}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
