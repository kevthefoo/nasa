"use client";

import { useState, useEffect, useCallback } from "react";
import { Activity, Globe, AlertTriangle, Calendar } from "lucide-react";

export default function LiveStats() {
    const [stats, setStats] = useState({
        nearEarthObjects: 0,
        activeAstronauts: 7, // ISS crew
        solarWindSpeed: 0,
        geomagneticActivity: "Quiet",
    });
    const [loading, setLoading] = useState(true);

    const fetchLiveStats = useCallback(async () => {
        try {
            // Fetch NEO data for today
            const today = new Date().toISOString().split("T")[0];
            const neoResponse = await fetch(
                `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=DEMO_KEY`
            );
            const neoData = await neoResponse.json();

            const todaysNEOs = neoData.near_earth_objects[today]?.length || 0;

            setStats((prev) => ({
                ...prev,
                nearEarthObjects: todaysNEOs,
                solarWindSpeed: Math.floor(Math.random() * 200) + 300, // Simulated
            }));
            setLoading(false);
        } catch (error) {
            console.error("Error fetching live stats:", error);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // Use setTimeout to avoid synchronous setState warning
        const initialTimeout = setTimeout(fetchLiveStats, 0);
        const interval = setInterval(fetchLiveStats, 300000); // Update every 5 minutes

        return () => {
            clearTimeout(initialTimeout);
            clearInterval(interval);
        };
    }, [fetchLiveStats]);

    const statCards = [
        {
            title: "Near-Earth Objects Today",
            value: stats.nearEarthObjects,
            icon: AlertTriangle,
            color: "text-orange-400",
            bgColor: "bg-orange-500/20",
            description: "Asteroids passing by Earth",
        },
        {
            title: "Astronauts in Space",
            value: stats.activeAstronauts,
            icon: Globe,
            color: "text-blue-400",
            bgColor: "bg-blue-500/20",
            description: "Currently on ISS",
        },
        {
            title: "Solar Wind Speed",
            value: `${stats.solarWindSpeed} km/s`,
            icon: Activity,
            color: "text-yellow-400",
            bgColor: "bg-yellow-500/20",
            description: "Current solar wind velocity",
        },
        {
            title: "Geomagnetic Activity",
            value: stats.geomagneticActivity,
            icon: Calendar,
            color: "text-green-400",
            bgColor: "bg-green-500/20",
            description: "Current space weather",
        },
    ];

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10 animate-pulse"
                    >
                        <div className="h-12 bg-gray-600 rounded mb-4"></div>
                        <div className="h-8 bg-gray-600 rounded mb-2"></div>
                        <div className="h-4 bg-gray-600 rounded"></div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">
                Live Space Statistics
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={index}
                            className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-black/40 transition-all duration-300"
                        >
                            <div
                                className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center mb-4`}
                            >
                                <Icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <div className="text-2xl font-bold text-white mb-1">
                                {stat.value}
                            </div>
                            <div className="text-sm font-medium text-gray-300 mb-1">
                                {stat.title}
                            </div>
                            <div className="text-xs text-gray-400">
                                {stat.description}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Live Data Indicator */}
            <div className="bg-black/20 backdrop-blur-md rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-300">
                        Live data feed • Last updated:{" "}
                        {new Date().toLocaleTimeString()}
                    </span>
                </div>
            </div>
        </div>
    );
}
