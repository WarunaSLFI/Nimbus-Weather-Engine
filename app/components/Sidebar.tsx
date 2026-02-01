import React, { useState } from "react";
import Image from "next/image";
import { CloudSun, History, MapPin, X, Sun, Trash2 } from "lucide-react";
import { City } from "../lib/cities";
import SearchBox from "./SearchBox";

interface Props {
    favorites: City[];
    recent: City[];
    onSelectCity: (city: City) => void;
    onSearch: (query: string) => void;
    onRemoveFavorite: (city: City) => void;
    onRemoveRecent: (city: City) => void;
    unit: 'C' | 'F';
    setUnit: (unit: 'C' | 'F') => void;
    weatherIcon?: string;
}

export default function Sidebar({ favorites, recent, onSelectCity, onSearch, onRemoveFavorite, onRemoveRecent, unit, setUnit, weatherIcon }: Props) {
    const [showAllFavorites, setShowAllFavorites] = useState(false);

    return (
        <>
            <aside className="w-full lg:w-[320px] lg:h-screen lg:fixed lg:left-0 lg:top-0 bg-white border-b lg:border-b-0 lg:border-r border-slate-200 p-6 flex flex-col gap-8 z-20 overflow-visible lg:overflow-y-auto no-scrollbar shadow-sm lg:shadow-none">
                {/* Logo */}
                <div className="flex items-center gap-3 px-2">
                    <div className="relative w-12 h-12 flex items-center justify-center">
                        {weatherIcon ? (
                            <img
                                src={weatherIcon.startsWith("//") ? `https:${weatherIcon}` : weatherIcon}
                                alt="Current Weather"
                                className="w-full h-full object-contain drop-shadow-sm"
                            />
                        ) : (
                            <CloudSun size={36} className="text-blue-500" />
                        )}
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Nimbus
                    </h1>
                </div>

                {/* Search */}
                <SearchBox onSelectCity={onSearch} />

                {/* Unit Toggle */}
                <div className="bg-slate-100/80 rounded-lg p-1 flex gap-1 shadow-inner border border-slate-200/50 self-start w-fit min-w-[110px]">
                    <button
                        onClick={() => setUnit('C')}
                        className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300 flex-1 ${unit === 'C' ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        °C
                    </button>
                    <button
                        onClick={() => setUnit('F')}
                        className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300 flex-1 ${unit === 'F' ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        °F
                    </button>
                </div>

                {/* Favorites */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2 text-sm font-semibold text-slate-400 uppercase tracking-wider">
                        <span>Favorites</span>
                        {favorites.length > 3 && (
                            <button onClick={() => setShowAllFavorites(true)} className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors">
                                View All ({favorites.length})
                            </button>
                        )}
                    </div>

                    {favorites.length === 0 && (
                        <div className="text-xs text-slate-500 px-2 italic">Search and click star to add favorites</div>
                    )}

                    <div className="flex flex-col gap-3">
                        {favorites.slice(0, 3).map((fav) => (
                            <div
                                key={fav.name}
                                onClick={() => onSelectCity(fav)}
                                className="relative flex items-center justify-between bg-slate-50 hover:bg-white hover:border-blue-500/50 px-4 py-1.5 rounded-2xl border border-slate-200 transition-all group cursor-pointer shadow-sm hover:shadow-md"
                            >
                                <div className="flex items-center gap-3">

                                    <div className="min-w-0">
                                        <span className="text-lg font-medium text-slate-900 group-hover:text-slate-800 transition-colors truncate block">
                                            {fav.name}, {fav.country}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onRemoveFavorite(fav);
                                    }}
                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                                    title="Remove from favorites"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Searches */}
                <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between px-2 text-sm font-semibold text-slate-400 uppercase tracking-wider">
                        <span>Recent</span>
                        <History size={14} />
                    </div>

                    {recent.length === 0 && (
                        <div className="text-xs text-slate-500 px-2 italic">No recent searches</div>
                    )}

                    <ul className="space-y-1">
                        {recent.map((item) => (
                            <li key={item.name} className="group relative flex items-center">
                                <button
                                    onClick={() => onSelectCity(item)}
                                    className="w-full flex items-center gap-3 px-4 py-2 text-slate-900 hover:bg-slate-50 rounded-xl transition-colors"
                                >
                                    <MapPin size={18} className="text-slate-400 group-hover:text-slate-600 shrink-0" />
                                    <span className="truncate flex-1 text-left text-lg font-medium">{item.name}, {item.country}</span>
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onRemoveRecent(item);
                                    }}
                                    className="absolute right-2 p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-100 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                    title="Remove from history"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Footer / Tip */}
                <div className="mt-auto pt-6 border-t border-slate-200 px-2 hidden lg:block">
                    <p className="text-xs text-slate-500 leading-relaxed">
                        <span className="font-semibold text-slate-600">Pro Tip:</span> Press <kbd className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 text-slate-500 shadow-sm">K</kbd> to search anytime.
                    </p>
                </div>
            </aside>

            {/* View All Favorites Modal */}
            {showAllFavorites && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <h2 className="text-lg font-bold text-slate-900">All Favorites</h2>
                            <button onClick={() => setShowAllFavorites(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2 no-scrollbar">
                            {favorites.map(fav => (
                                <div key={fav.name} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/60 hover:border-slate-300 transition-colors group shadow-sm">
                                    <button onClick={() => { onSelectCity(fav); setShowAllFavorites(false); }} className="flex-1 text-left font-bold text-slate-900">
                                        {fav.name}, <span className="text-slate-500 font-normal">{fav.country}</span>
                                    </button>
                                    <button onClick={() => onRemoveFavorite(fav)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
