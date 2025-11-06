"use client";

import { useState, useEffect } from "react";
import { Thermometer, Wind, Sun } from "lucide-react";

export default function SimpleMarsWeather() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate Mars weather data
        setTimeout(() => {
            setData({
                sol: 3847,
                temperature: { high: -73, low: -115 },
                pressure: 748,
                windSpeed: 12.4,
                season: "Northern Winter",
            });
            setLoading(false);
        }, 1800);
    }, []);

    if (loading) {
        return (
            <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <div className="animate-pulse">
                    <div className="h-6 bg-gray-600 rounded mb-4"></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="h-16 bg-gray-600 rounded"></div>
                        <div className="h-16 bg-gray-600 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Sun className="w-6 h-6 text-red-400" />
                Mars Weather Report
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                        <Thermometer className="w-4 h-4 text-red-400" />
                        <span className="text-sm text-gray-400">
                            Temperature
                        </span>
                    </div>
                    <div className="text-lg font-semibold text-red-400">
                        {data.temperature.high}°C
                    </div>
                    <div className="text-xs text-gray-500">
                        Low: {data.temperature.low}°C
                    </div>
                </div>

                <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                        <Wind className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-gray-400">
                            Wind Speed
                        </span>
                    </div>
                    <div className="text-lg font-semibold text-blue-400">
                        {data.windSpeed} m/s
                    </div>
                </div>

                <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-sm text-gray-400">
                        Sol (Martian Day)
                    </div>
                    <div className="text-lg font-semibold text-white">
                        {data.sol}
                    </div>
                    <div className="text-xs text-gray-500">{data.season}</div>
                </div>
            </div>

            <div className="text-sm text-gray-400">
                Pressure: {data.pressure} Pa • Elysium Planitia
            </div>
        </div>
    );
}
