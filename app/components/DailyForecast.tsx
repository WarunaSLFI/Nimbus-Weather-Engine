import React from "react";
import { CloudRain, CloudSun, Droplets, MapPin, Thermometer, Umbrella, Wind } from "lucide-react";
import { UIDaily } from "../lib/types";

interface Props {
    data: UIDaily[];
    unit: 'C' | 'F';
}

export default function DailyForecast({ data, unit }: Props) {
    return (
        <div className="bg-white border border-slate-200 shadow-sm rounded-[2rem] p-8 flex flex-col">
            <h3 className="text-xl font-bold text-slate-900 mb-6">7-Day Forecast</h3>
            <div className="flex flex-col gap-1 flex-1">
                {data.map((day, idx) => {
                    return (
                        <div key={idx} className="group flex items-center justify-between py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 px-2 rounded-xl transition-colors cursor-default">
                            <div className="flex items-center gap-4 w-32">
                                <span className="text-slate-500 font-medium w-12">{day.dayName}</span>
                                <div className="flex items-center gap-2">
                                    <img src={`https:${day.conditionIcon}`} alt={day.conditionText} className="w-8 h-8 object-contain" />
                                </div>
                            </div>

                            <div className="flex-1 flex items-center justify-center">
                                {day.chance_of_rain > 0 ? (
                                    <div className="flex items-center gap-1 text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">
                                        <CloudRain size={14} />
                                        <span className="text-sm font-bold">{day.chance_of_rain}%</span>
                                    </div>
                                ) : (
                                    <span className="text-sm text-slate-400 font-medium">{day.conditionText}</span>
                                )}
                            </div>

                            <div className="flex items-center gap-4 w-32 justify-end">
                                <span className="font-bold text-slate-900">{unit === 'C' ? day.max_c : day.max_f}°</span>
                                <span className="text-slate-400 font-medium">{unit === 'C' ? day.min_c : day.min_f}°</span>
                            </div>
                        </div>
                    );
                })}
            </div>
            {data.some(d => d.isMock) && (
                <div className="mt-4 pt-4 border-t border-slate-100 text-center">
                    <p className="text-[10px] text-slate-400">
                        * Extended forecast estimated.
                    </p>
                </div>
            )}
        </div>
    )
}
