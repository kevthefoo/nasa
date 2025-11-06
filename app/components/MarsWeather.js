"use client";

import { useState, useEffect, useCallback } from "react";
import { Thermometer, Wind, Eye, CloudRain, Sun, Calendar } from "lucide-react";

export default function MarsWeather() {
    const [marsData, setMarsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const generateSimulatedMarsWeather = () => {
        const sols = [];
        const currentSol = 3800 + Math.floor(Math.random() * 100); // Simulated current sol

        for (let i = 6; i >= 0; i--) {
            const sol = currentSol - i;
            sols.push({
                sol: sol,
                earthDate: new Date(Date.now() - i * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split("T")[0],
                temperature: {
                    high: Math.floor(Math.random() * 30) - 80, // -80 to -50°C
                    low: Math.floor(Math.random() * 40) - 120, // -120 to -80°C
                },
                pressure: 600 + Math.random() * 200, // 600-800 Pa
                windSpeed: Math.random() * 20 + 5, // 5-25 m/s
                windDirection: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][
                    Math.floor(Math.random() * 8)
                ],
                season: "Northern Summer",
                atmOpacity: Math.random() * 2 + 0.5, // 0.5-2.5
                weather: ["Clear", "Dusty", "Partly Cloudy"][
                    Math.floor(Math.random() * 3)
                ],
            });
        }

        return {
            sols: sols,
            latest: sols[sols.length - 1],
            location: "Elysium Planitia",
            mission: "InSight Lander (Simulated)",
        };
    };

    const fetchMarsWeather = useCallback(async () => {
        try {
            // Note: The original Mars Weather API has been discontinued
            // We'll simulate Mars weather data for demonstration
            const simulatedData = generateSimulatedMarsWeather();
            setMarsData(simulatedData);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // Use setTimeout to avoid synchronous setState warning
        const initialTimeout = setTimeout(fetchMarsWeather, 0);

        return () => {
            clearTimeout(initialTimeout);
        };
    }, [fetchMarsWeather]);

    const getTemperatureColor = (temp) => {
        if (temp > -60) return "text-orange-400";
        if (temp > -80) return "text-yellow-400";
        if (temp > -100) return "text-blue-400";
        return "text-cyan-400";
    };

    const getPressureColor = (pressure) => {
        if (pressure > 750) return "text-red-400";
        if (pressure > 650) return "text-yellow-400";
        return "text-green-400";
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                    Mars Weather
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10 animate-pulse"
                        >
                            <div className="h-6 bg-gray-600 rounded mb-2"></div>
                            <div className="h-8 bg-gray-600 rounded mb-2"></div>
                            <div className="h-4 bg-gray-600 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                    Mars Weather
                </h2>
                <div className="bg-red-500/20 backdrop-blur-md rounded-xl p-6 border border-red-500/30">
                    <div className="flex items-center gap-3">
                        <Sun className="w-6 h-6 text-red-400" />
                        <span className="text-red-300">
                            Failed to load Mars weather: {error}
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    const latest = marsData?.latest;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                    Mars Weather Report
                </h2>
                <div className="text-right">
                    <div className="text-sm text-gray-300">
                        {marsData?.location}
                    </div>
                    <div className="text-xs text-gray-400">
                        {marsData?.mission}
                    </div>
                </div>
            </div>

            {/* Current Weather Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                        <Thermometer className="w-6 h-6 text-red-400" />
                        <span className="text-sm text-gray-300">
                            Temperature
                        </span>
                    </div>
                    <div className="text-2xl font-bold mb-1">
                        <span
                            className={getTemperatureColor(
                                latest?.temperature?.high
                            )}
                        >
                            {latest?.temperature?.high}°C
                        </span>
                    </div>
                    <div className="text-sm text-gray-400">
                        Low: {latest?.temperature?.low}°C
                    </div>
                </div>

                <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                        <Wind className="w-6 h-6 text-blue-400" />
                        <span className="text-sm text-gray-300">Wind</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-400 mb-1">
                        {latest?.windSpeed?.toFixed(1)} m/s
                    </div>
                    <div className="text-sm text-gray-400">
                        Direction: {latest?.windDirection}
                    </div>
                </div>

                <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                        <CloudRain className="w-6 h-6 text-purple-400" />
                        <span className="text-sm text-gray-300">Pressure</span>
                    </div>
                    <div className="text-2xl font-bold mb-1">
                        <span className={getPressureColor(latest?.pressure)}>
                            {latest?.pressure?.toFixed(0)} Pa
                        </span>
                    </div>
                    <div className="text-sm text-gray-400">Atmospheric</div>
                </div>

                <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                        <Eye className="w-6 h-6 text-yellow-400" />
                        <span className="text-sm text-gray-300">
                            Visibility
                        </span>
                    </div>
                    <div className="text-2xl font-bold text-yellow-400 mb-1">
                        {latest?.atmOpacity?.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-400">Opacity (tau)</div>
                </div>
            </div>

            {/* Current Conditions */}
            <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Sol {latest?.sol} ({latest?.earthDate})
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <span className="text-gray-400">
                            Weather Condition:
                        </span>
                        <div className="text-white font-medium">
                            {latest?.weather}
                        </div>
                    </div>
                    <div>
                        <span className="text-gray-400">Season:</span>
                        <div className="text-white font-medium">
                            {latest?.season}
                        </div>
                    </div>
                    <div>
                        <span className="text-gray-400">
                            Sol (Martian Day):
                        </span>
                        <div className="text-white font-medium">
                            {latest?.sol}
                        </div>
                    </div>
                </div>
            </div>

            {/* Weekly History */}
            <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">
                    7-Day History
                </h3>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left text-gray-300 pb-2">
                                    Sol
                                </th>
                                <th className="text-left text-gray-300 pb-2">
                                    Earth Date
                                </th>
                                <th className="text-left text-gray-300 pb-2">
                                    High (°C)
                                </th>
                                <th className="text-left text-gray-300 pb-2">
                                    Low (°C)
                                </th>
                                <th className="text-left text-gray-300 pb-2">
                                    Pressure (Pa)
                                </th>
                                <th className="text-left text-gray-300 pb-2">
                                    Wind (m/s)
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {marsData?.sols?.map((sol, index) => (
                                <tr
                                    key={sol.sol}
                                    className="border-b border-white/5"
                                >
                                    <td className="py-2 text-white font-medium">
                                        {sol.sol}
                                    </td>
                                    <td className="py-2 text-gray-300">
                                        {sol.earthDate}
                                    </td>
                                    <td
                                        className={`py-2 ${getTemperatureColor(
                                            sol.temperature.high
                                        )}`}
                                    >
                                        {sol.temperature.high}
                                    </td>
                                    <td
                                        className={`py-2 ${getTemperatureColor(
                                            sol.temperature.low
                                        )}`}
                                    >
                                        {sol.temperature.low}
                                    </td>
                                    <td
                                        className={`py-2 ${getPressureColor(
                                            sol.pressure
                                        )}`}
                                    >
                                        {sol.pressure.toFixed(0)}
                                    </td>
                                    <td className="py-2 text-blue-400">
                                        {sol.windSpeed.toFixed(1)}{" "}
                                        {sol.windDirection}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Info */}
            <div className="bg-black/20 backdrop-blur-md rounded-xl p-4 border border-white/10">
                <div className="text-sm text-gray-300">
                    <p className="mb-2">
                        <strong className="text-white">
                            About Mars Weather:
                        </strong>{" "}
                        This data represents weather conditions on Mars as
                        measured by NASA missions. A Sol is a Martian day (24
                        hours, 39 minutes).
                    </p>
                    <p>
                        Mars has extreme temperature variations due to its thin
                        atmosphere and distance from the Sun. Dust storms can
                        dramatically affect visibility and temperature readings.
                    </p>
                </div>
            </div>
        </div>
    );
}
