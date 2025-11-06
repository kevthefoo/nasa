"use client";

import { useState, useEffect, useCallback } from "react";
import { Zap, Sun, AlertTriangle, Activity, BarChart3 } from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    AreaChart,
    Area,
} from "recharts";

export default function SolarFlareMonitor() {
    const [solarData, setSolarData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [flareHistory, setFlareHistory] = useState([]);
    const [staticFlares, setStaticFlares] = useState([]);

    const generateSolarData = useCallback(() => {
        // Simulate solar activity data
        const now = new Date();
        const history = [];

        // Generate 24 hours of data
        for (let i = 23; i >= 0; i--) {
            const time = new Date(now.getTime() - i * 60 * 60 * 1000);
            history.push({
                time: time.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
                timestamp: time.getTime(),
                xrayFlux: Math.random() * 0.0001 + 0.00001, // Simulated X-ray flux
                protonFlux: Math.random() * 100 + 10, // Simulated proton flux
                kpIndex: Math.random() * 9, // Geomagnetic index
                solarWind: Math.random() * 200 + 300, // Solar wind speed
            });
        }

        // Generate recent flare events
        const flares = [];
        for (let i = 0; i < 5; i++) {
            const eventTime = new Date(
                now.getTime() - Math.random() * 24 * 60 * 60 * 1000
            );
            const magnitude = Math.random();
            let flareClass = "A";
            if (magnitude > 0.8) flareClass = "X";
            else if (magnitude > 0.6) flareClass = "M";
            else if (magnitude > 0.4) flareClass = "C";
            else if (magnitude > 0.2) flareClass = "B";

            flares.push({
                id: `FL${Date.now()}-${i}`,
                class: flareClass,
                magnitude: (magnitude * 10).toFixed(1),
                time: eventTime,
                duration: Math.floor(Math.random() * 120) + 30, // 30-150 minutes
                location: `N${Math.floor(Math.random() * 40) + 10}W${
                    Math.floor(Math.random() * 60) + 20
                }`,
                status: i === 0 ? "ongoing" : "completed",
            });
        }

        const currentConditions = {
            solarWindSpeed: Math.floor(Math.random() * 200) + 300,
            geomagneticStorm: Math.random() > 0.7 ? "Minor" : "Quiet",
            xrayBackground: (Math.random() * 0.00005 + 0.00001).toExponential(
                1
            ),
            protonEvent: Math.random() > 0.8,
            auroraForecast: Math.random() > 0.6 ? "Visible" : "Not Visible",
            kpIndex: Math.floor(Math.random() * 9),
        };

        // Generate static example flares
        const currentTime = new Date();
        const exampleFlares = [
            {
                class: "M",
                magnitude: "2.4",
                time: new Date(currentTime.getTime() - 2 * 60 * 60 * 1000),
                location: "N15W30",
                status: "completed",
            },
            {
                class: "C",
                magnitude: "8.7",
                time: new Date(currentTime.getTime() - 6 * 60 * 60 * 1000),
                location: "S20E45",
                status: "completed",
            },
            {
                class: "B",
                magnitude: "5.2",
                time: new Date(currentTime.getTime() - 12 * 60 * 60 * 1000),
                location: "N25W60",
                status: "completed",
            },
        ];

        setSolarData(currentConditions);
        setFlareHistory(history);
        setStaticFlares(exampleFlares);
        setLoading(false);
    }, []);

    useEffect(() => {
        // Initialize data with a slight delay to avoid sync setState warning
        const initialTimeout = setTimeout(generateSolarData, 0);

        // Set up interval for updates
        const interval = setInterval(generateSolarData, 60000); // Update every minute

        return () => {
            clearTimeout(initialTimeout);
            clearInterval(interval);
        };
    }, [generateSolarData]);

    const getFlareColor = (flareClass) => {
        switch (flareClass) {
            case "X":
                return "text-red-400 bg-red-500/20";
            case "M":
                return "text-orange-400 bg-orange-500/20";
            case "C":
                return "text-yellow-400 bg-yellow-500/20";
            case "B":
                return "text-blue-400 bg-blue-500/20";
            default:
                return "text-green-400 bg-green-500/20";
        }
    };

    const getKpColor = (kp) => {
        if (kp >= 7) return "text-red-400";
        if (kp >= 5) return "text-orange-400";
        if (kp >= 3) return "text-yellow-400";
        return "text-green-400";
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                    Solar Activity Monitor
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10 animate-pulse"
                        >
                            <div className="h-48 bg-gray-600 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                    Solar Activity Monitor
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Activity className="w-4 h-4" />
                    Real-time Space Weather
                </div>
            </div>

            {/* Current Conditions */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div className="bg-black/30 backdrop-blur-md rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                        <Sun className="w-5 h-5 text-yellow-400" />
                        <span className="text-sm text-gray-300">
                            Solar Wind
                        </span>
                    </div>
                    <div className="text-lg font-bold text-yellow-400">
                        {solarData?.solarWindSpeed} km/s
                    </div>
                </div>

                <div className="bg-black/30 backdrop-blur-md rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-5 h-5 text-purple-400" />
                        <span className="text-sm text-gray-300">Kp Index</span>
                    </div>
                    <div
                        className={`text-lg font-bold ${getKpColor(
                            solarData?.kpIndex
                        )}`}
                    >
                        {solarData?.kpIndex?.toFixed(1)}
                    </div>
                </div>

                <div className="bg-black/30 backdrop-blur-md rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                        <span className="text-sm text-gray-300">
                            Geomagnetic
                        </span>
                    </div>
                    <div className="text-lg font-bold text-white">
                        {solarData?.geomagneticStorm}
                    </div>
                </div>

                <div className="bg-black/30 backdrop-blur-md rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-5 h-5 text-blue-400" />
                        <span className="text-sm text-gray-300">
                            X-ray Flux
                        </span>
                    </div>
                    <div className="text-lg font-bold text-blue-400">
                        {solarData?.xrayBackground}
                    </div>
                </div>

                <div className="bg-black/30 backdrop-blur-md rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                        <BarChart3 className="w-5 h-5 text-green-400" />
                        <span className="text-sm text-gray-300">Aurora</span>
                    </div>
                    <div className="text-lg font-bold text-green-400">
                        {solarData?.auroraForecast}
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-4">
                        Solar Wind Speed (24h)
                    </h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={flareHistory}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#374151"
                                />
                                <XAxis
                                    dataKey="time"
                                    stroke="#9CA3AF"
                                    fontSize={12}
                                    interval="preserveStartEnd"
                                />
                                <YAxis stroke="#9CA3AF" fontSize={12} />
                                <Area
                                    type="monotone"
                                    dataKey="solarWind"
                                    stroke="#3B82F6"
                                    fill="#3B82F6"
                                    fillOpacity={0.2}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-4">
                        Geomagnetic Activity (Kp Index)
                    </h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={flareHistory}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#374151"
                                />
                                <XAxis
                                    dataKey="time"
                                    stroke="#9CA3AF"
                                    fontSize={12}
                                    interval="preserveStartEnd"
                                />
                                <YAxis
                                    stroke="#9CA3AF"
                                    fontSize={12}
                                    domain={[0, 9]}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="kpIndex"
                                    stroke="#8B5CF6"
                                    strokeWidth={2}
                                    dot={{
                                        fill: "#8B5CF6",
                                        strokeWidth: 0,
                                        r: 3,
                                    }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Recent Solar Flares */}
            <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Recent Solar Flares
                </h3>

                <div className="space-y-3">
                    {staticFlares.map((flare, index) => {
                        const flareColor = getFlareColor(flare.class);
                        return (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                            >
                                <div className="flex items-center gap-4">
                                    <span
                                        className={`px-2 py-1 rounded text-sm font-bold ${flareColor}`}
                                    >
                                        {flare.class}
                                        {flare.magnitude}
                                    </span>
                                    <div>
                                        <div className="text-white font-medium">
                                            {flare.time.toLocaleTimeString()}
                                        </div>
                                        <div className="text-gray-400 text-sm">
                                            Location: {flare.location}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div
                                        className={`text-sm font-medium ${
                                            flare.status === "ongoing"
                                                ? "text-yellow-400"
                                                : "text-gray-400"
                                        }`}
                                    >
                                        {flare.status}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Alert Banner */}
            {solarData?.protonEvent && (
                <div className="bg-red-500/20 backdrop-blur-md rounded-xl p-4 border border-red-500/30">
                    <div className="flex items-center gap-3">
                        <AlertTriangle className="w-6 h-6 text-red-400" />
                        <div>
                            <div className="text-red-300 font-semibold">
                                Solar Proton Event in Progress
                            </div>
                            <div className="text-red-200 text-sm">
                                Elevated proton levels detected. Satellite
                                operations may be affected.
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Info */}
            <div className="bg-black/20 backdrop-blur-md rounded-xl p-4 border border-white/10">
                <div className="text-sm text-gray-300">
                    <p className="mb-2">
                        <strong className="text-white">
                            Space Weather Monitoring:
                        </strong>{" "}
                        Solar flares are classified by X-ray intensity: A
                        (smallest), B, C, M, and X (largest). The Kp index
                        measures geomagnetic disturbance.
                    </p>
                    <p>
                        High solar activity can affect satellite communications,
                        GPS accuracy, and create beautiful auroras at higher
                        latitudes.
                    </p>
                </div>
            </div>
        </div>
    );
}
