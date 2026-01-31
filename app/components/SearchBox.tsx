"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, MapPin, X, Loader2 } from "lucide-react";
import { SearchResultItem } from "../lib/types";

interface Props {
    onSelectCity: (query: string) => void;
}

// Debounce Helper
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

export default function SearchBox({ onSelectCity }: Props) {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 300);

    const [isOpen, setIsOpen] = useState(false);
    const [suggestions, setSuggestions] = useState<SearchResultItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    // Fetch Logic
    useEffect(() => {
        if (!debouncedQuery || debouncedQuery.length < 2) {
            setSuggestions([]);
            return;
        }

        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        const controller = new AbortController();
        abortControllerRef.current = controller;

        setIsLoading(true);

        fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`, { signal: controller.signal })
            .then(res => res.json())
            .then(data => {
                if (data.results) {
                    setSuggestions(data.results);
                    setIsOpen(true);
                    setActiveIndex(-1);
                }
            })
            .catch(err => {
                if (err.name !== 'AbortError') console.error(err);
            })
            .finally(() => {
                setIsLoading(false);
            });

    }, [debouncedQuery]);

    // Click Outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Keyboard Nav
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen || suggestions.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (activeIndex >= 0) {
                selectItem(suggestions[activeIndex]);
            }
        } else if (e.key === "Escape") {
            setIsOpen(false);
        }
    };

    const selectItem = (item: SearchResultItem) => {
        const q = `${item.lat},${item.lon}`;
        onSelectCity(q);
        setQuery("");
        setIsOpen(false);
    };

    return (
        <div ref={wrapperRef} className="relative z-50 w-full group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-800 transition-colors pointer-events-none">
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
            </div>

            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsOpen(true)}
                placeholder="Search for cities..." // Changed placeholder text
                className="w-full bg-slate-100 border border-slate-200 text-slate-900 rounded-2xl py-2.5 pl-12 pr-10 focus:outline-none focus:ring-2 focus:ring-slate-400/20 focus:border-slate-400 transition-all font-medium placeholder:text-slate-400 shadow-sm focus:bg-white"
            />

            {query && (
                <button
                    onClick={() => { setQuery(""); setSuggestions([]); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors"
                >
                    <X size={16} />
                </button>
            )}

            {/* Dropdown Results */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 max-h-[300px] overflow-y-auto no-scrollbar py-2">
                    {suggestions.length > 0 ? (
                        <ul>
                            {suggestions.map((item, index) => (
                                <li key={item.id}>
                                    <button
                                        onClick={() => selectItem(item)}
                                        className={`w-full text-left px-5 py-3 flex flex-col transition-colors ${index === activeIndex ? "bg-slate-100" : "hover:bg-slate-50"
                                            }`}
                                        onMouseEnter={() => setActiveIndex(index)}
                                    >
                                        <span className={`font-bold text-sm ${index === activeIndex ? "text-slate-900" : "text-slate-900"}`}>
                                            {item.name}
                                        </span>
                                        <span className={`text-xs ${index === activeIndex ? "text-slate-600" : "text-slate-500"}`}>
                                            {item.region ? `${item.region}, ` : ""}{item.country}
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        query.length > 2 && !isLoading && (
                            <div className="p-4 text-center text-slate-400 text-sm">
                                No locations found.
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
}
