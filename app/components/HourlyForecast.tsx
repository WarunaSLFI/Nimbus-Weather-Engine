import React from "react";
import { UIHourly } from "../lib/types";

interface Props {
    data: UIHourly[];
    unit: 'C' | 'F';
}

export default function HourlyForecast({ data, unit }: Props) {
    return (
        <div className="col-span-12">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900">Hourly Forecast</h3>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {data.map((hour, idx) => {
                    const temp = unit === 'C' ? hour.temp_c : hour.temp_f;
                    return (
                        <div
                            key={idx}
                            className={`p-2 py-1 rounded-2xl border flex flex-col items-center gap-0 transition-all hover:shadow-lg ${hour.isNow
                                ? "bg-slate-100 text-slate-900 border-slate-200 shadow-sm"
                                : "bg-white border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-50"
                                }`}
                        >
                            <span className={`text-base font-semibold text-slate-500`}>{hour.time}</span>
                            <img src={`https:${hour.conditionIcon}`} alt={hour.conditionText} className="w-10 h-10 object-contain" />
                            <span className="text-xl font-bold text-slate-900">{temp}°</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
