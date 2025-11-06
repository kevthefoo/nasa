"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, Target, Zap, Calendar } from "lucide-react";
import { format } from "date-fns";

export default function AsteroidTracker() {
    const [asteroids, setAsteroids] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAsteroids();
    }, []);

    const fetchAsteroids = async () => {
        try {
            const today = new Date();
            const endDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); // Next 7 days

            const startDateStr = today.toISOString().split("T")[0];
            const endDateStr = endDate.toISOString().split("T")[0];

            const response = await fetch(
                `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDateStr}&end_date=${endDateStr}&api_key=DEMO_KEY`
            );

            if (!response.ok) throw new Error("Failed to fetch asteroid data");

            const data = await response.json();

            // Flatten the asteroid data from all dates
            const allAsteroids = [];
            Object.keys(data.near_earth_objects).forEach((date) => {
                data.near_earth_objects[date].forEach((asteroid) => {
                    allAsteroids.push({
                        ...asteroid,
                        approach_date: date,
                    });
                });
            });

            // Sort by closest approach distance
            allAsteroids.sort((a, b) => {
                const distanceA = parseFloat(
                    a.close_approach_data[0]?.miss_distance?.kilometers || 0
                );
                const distanceB = parseFloat(
                    b.close_approach_data[0]?.miss_distance?.kilometers || 0
                );
                return distanceA - distanceB;
            });

            setAsteroids(allAsteroids.slice(0, 10)); // Top 10 closest
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const getDangerLevel = (asteroid) => {
        const isHazardous = asteroid.is_potentially_hazardous_asteroid;
        const distance = parseFloat(
            asteroid.close_approach_data[0]?.miss_distance?.kilometers || 0
        );

        if (isHazardous && distance < 7500000) return "high";
        if (isHazardous || distance < 15000000) return "medium";
        return "low";
    };

    const getDangerColor = (level) => {
        switch (level) {
            case "high":
                return "text-red-400 bg-red-500/20";
            case "medium":
                return "text-yellow-400 bg-yellow-500/20";
            default:
                return "text-green-400 bg-green-500/20";
        }
    };

    const formatDistance = (km) => {
        const distance = parseFloat(km);
        if (distance > 149597870) {
            // More than 1 AU
            return `${(distance / 149597870.7).toFixed(2)} AU`;
        } else if (distance > 1000000) {
            return `${(distance / 1000000).toFixed(2)}M km`;
        } else {
            return `${distance.toLocaleString()} km`;
        }
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                    Asteroid Watch
                </h2>
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10 animate-pulse"
                        >
                            <div className="h-6 bg-gray-600 rounded mb-2"></div>
                            <div className="h-4 bg-gray-600 rounded mb-2"></div>
                            <div className="h-4 bg-gray-600 rounded w-1/2"></div>
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
                    Asteroid Watch
                </h2>
                <div className="bg-red-500/20 backdrop-blur-md rounded-xl p-6 border border-red-500/30">
                    <div className="flex items-center gap-3">
                        <AlertTriangle className="w-6 h-6 text-red-400" />
                        <span className="text-red-300">
                            Failed to load asteroid data: {error}
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                    Asteroid Watch
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Target className="w-4 h-4" />
                    Next 7 days • Closest approaches
                </div>
            </div>

            <div className="grid gap-4">
                {asteroids.map((asteroid, index) => {
                    const dangerLevel = getDangerLevel(asteroid);
                    const dangerColor = getDangerColor(dangerLevel);
                    const closeApproach = asteroid.close_approach_data[0];

                    return (
                        <div
                            key={asteroid.id}
                            className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-black/40 transition-all duration-300"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-semibold text-white">
                                            {asteroid.name}
                                        </h3>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${dangerColor}`}
                                        >
                                            {dangerLevel.toUpperCase()}
                                        </span>
                                        {asteroid.is_potentially_hazardous_asteroid && (
                                            <AlertTriangle className="w-5 h-5 text-red-400" />
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <span className="text-gray-400">
                                                Closest Approach:
                                            </span>
                                            <div className="text-white font-medium">
                                                {format(
                                                    new Date(
                                                        closeApproach.close_approach_date
                                                    ),
                                                    "MMM d, yyyy"
                                                )}
                                            </div>
                                            <div className="text-gray-300">
                                                {
                                                    closeApproach.close_approach_date_full
                                                }
                                            </div>
                                        </div>

                                        <div>
                                            <span className="text-gray-400">
                                                Miss Distance:
                                            </span>
                                            <div className="text-white font-medium">
                                                {formatDistance(
                                                    closeApproach.miss_distance
                                                        .kilometers
                                                )}
                                            </div>
                                            <div className="text-gray-300">
                                                {parseFloat(
                                                    closeApproach.miss_distance
                                                        .lunar
                                                ).toFixed(1)}{" "}
                                                lunar distances
                                            </div>
                                        </div>

                                        <div>
                                            <span className="text-gray-400">
                                                Estimated Diameter:
                                            </span>
                                            <div className="text-white font-medium">
                                                {asteroid.estimated_diameter.meters.estimated_diameter_min.toFixed(
                                                    0
                                                )}{" "}
                                                -{" "}
                                                {asteroid.estimated_diameter.meters.estimated_diameter_max.toFixed(
                                                    0
                                                )}{" "}
                                                m
                                            </div>
                                            <div className="text-gray-300">
                                                Velocity:{" "}
                                                {parseFloat(
                                                    closeApproach
                                                        .relative_velocity
                                                        .kilometers_per_second
                                                ).toFixed(2)}{" "}
                                                km/s
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-xs text-gray-400">
                                <span>ID: {asteroid.id}</span>
                                <span>
                                    Orbiting Body: {closeApproach.orbiting_body}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="bg-black/20 backdrop-blur-md rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span>
                        Data from NASA&apos;s Near Earth Object Web Service • Updated
                        every hour
                    </span>
                </div>
            </div>
        </div>
    );
}
