"use client";

import { useState, useEffect, useCallback } from "react";
import { Moon, Sun, Calendar, MapPin, Clock, Globe } from "lucide-react";
import { format, addDays, isAfter, isBefore } from "date-fns";

export default function EclipseTracker() {
    const [eclipses, setEclipses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedType, setSelectedType] = useState("all");

    const generateEclipseData = useCallback(() => {
        // Generate simulated eclipse data for the next few years
        const eclipseData = [
            {
                id: 1,
                type: "solar",
                category: "Total",
                date: new Date("2024-04-08"),
                duration: 268, // seconds
                magnitude: 1.0566,
                location: "North America",
                path: "Mexico, USA (Texas to Maine), Canada",
                visibility:
                    "Total eclipse visible across parts of North America",
                maxEclipse: "18:17 UTC",
                saros: 139,
            },
            {
                id: 2,
                type: "lunar",
                category: "Partial",
                date: new Date("2024-09-18"),
                duration: 183, // minutes
                magnitude: 0.085,
                location: "Global",
                path: "Europe, Africa, Asia, Americas",
                visibility: "Visible from most of Earth except Australia",
                maxEclipse: "02:44 UTC",
                saros: 118,
            },
            {
                id: 3,
                type: "solar",
                category: "Annular",
                date: new Date("2024-10-02"),
                duration: 445, // seconds
                magnitude: 0.9326,
                location: "South America",
                path: "Chile, Argentina",
                visibility: "Annular eclipse over southern South America",
                maxEclipse: "18:45 UTC",
                saros: 144,
            },
            {
                id: 4,
                type: "lunar",
                category: "Total",
                date: new Date("2025-03-14"),
                duration: 200, // minutes
                magnitude: 1.178,
                location: "Global",
                path: "Pacific, Americas, Western Europe, Western Africa",
                visibility:
                    "Total lunar eclipse visible from Americas and western regions",
                maxEclipse: "06:59 UTC",
                saros: 129,
            },
            {
                id: 5,
                type: "solar",
                category: "Partial",
                date: new Date("2025-03-29"),
                duration: 210, // seconds
                magnitude: 0.9375,
                location: "North Atlantic",
                path: "North Atlantic, Europe, Asia, Africa",
                visibility: "Partial solar eclipse across Europe and Asia",
                maxEclipse: "10:47 UTC",
                saros: 149,
            },
            {
                id: 6,
                type: "lunar",
                category: "Total",
                date: new Date("2025-09-07"),
                duration: 190, // minutes
                magnitude: 1.362,
                location: "Global",
                path: "Europe, Africa, Asia, Australia",
                visibility:
                    "Total lunar eclipse visible from Eastern Hemisphere",
                maxEclipse: "18:11 UTC",
                saros: 134,
            },
            {
                id: 7,
                type: "solar",
                category: "Total",
                date: new Date("2026-08-12"),
                duration: 378, // seconds
                magnitude: 1.0386,
                location: "Arctic, Europe, Asia",
                path: "Greenland, Iceland, Spain, Russia, China",
                visibility:
                    "Total solar eclipse crossing Arctic and northern regions",
                maxEclipse: "17:47 UTC",
                saros: 146,
            },
        ];

        setEclipses(eclipseData);
        setLoading(false);
    }, []);

    useEffect(() => {
        // Use setTimeout to avoid synchronous setState warning
        const initialTimeout = setTimeout(generateEclipseData, 0);

        return () => {
            clearTimeout(initialTimeout);
        };
    }, [generateEclipseData]);

    const getEclipseIcon = (type) => {
        return type === "solar" ? Sun : Moon;
    };

    const getEclipseColor = (type, category) => {
        if (type === "solar") {
            return category === "Total"
                ? "text-orange-400 bg-orange-500/20 border-orange-500/30"
                : "text-yellow-400 bg-yellow-500/20 border-yellow-500/30";
        } else {
            return category === "Total"
                ? "text-purple-400 bg-purple-500/20 border-purple-500/30"
                : "text-blue-400 bg-blue-500/20 border-blue-500/30";
        }
    };

    const getTimeUntil = (eclipseDate) => {
        const now = new Date();
        const diff = eclipseDate.getTime() - now.getTime();

        if (diff < 0) return "Past event";

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );

        if (days > 365) {
            return `${Math.floor(days / 365)} year${
                Math.floor(days / 365) > 1 ? "s" : ""
            }, ${days % 365} days`;
        } else if (days > 30) {
            return `${Math.floor(days / 30)} month${
                Math.floor(days / 30) > 1 ? "s" : ""
            }, ${days % 30} days`;
        } else if (days > 0) {
            return `${days} day${days > 1 ? "s" : ""}, ${hours} hour${
                hours > 1 ? "s" : ""
            }`;
        } else {
            return `${hours} hour${hours > 1 ? "s" : ""}`;
        }
    };

    const filteredEclipses = eclipses.filter((eclipse) => {
        if (selectedType === "all") return true;
        return eclipse.type === selectedType;
    });

    const upcomingEclipses = filteredEclipses.filter((eclipse) =>
        isAfter(eclipse.date, new Date())
    );
    const pastEclipses = filteredEclipses.filter((eclipse) =>
        isBefore(eclipse.date, new Date())
    );

    if (loading) {
        return (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                    Eclipse Tracker
                </h2>
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10 animate-pulse"
                        >
                            <div className="h-6 bg-gray-600 rounded mb-2"></div>
                            <div className="h-4 bg-gray-600 rounded mb-2"></div>
                            <div className="h-4 bg-gray-600 rounded w-3/4"></div>
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
                    Eclipse Tracker
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Calendar className="w-4 h-4" />
                    Solar & Lunar Eclipses
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="bg-black/20 backdrop-blur-md rounded-xl p-2 border border-white/10">
                <div className="flex gap-2">
                    {[
                        { id: "all", label: "All Eclipses", icon: Globe },
                        { id: "solar", label: "Solar", icon: Sun },
                        { id: "lunar", label: "Lunar", icon: Moon },
                    ].map((filter) => {
                        const Icon = filter.icon;
                        return (
                            <button
                                key={filter.id}
                                onClick={() => setSelectedType(filter.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                                    selectedType === filter.id
                                        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                                        : "bg-white/10 hover:bg-white/20 text-gray-300"
                                }`}
                            >
                                <Icon className="w-4 h-4" />
                                {filter.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Upcoming Eclipses */}
            {upcomingEclipses.length > 0 && (
                <div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                        Upcoming Eclipses
                    </h3>
                    <div className="space-y-4">
                        {upcomingEclipses.map((eclipse) => {
                            const Icon = getEclipseIcon(eclipse.type);
                            const colorClass = getEclipseColor(
                                eclipse.type,
                                eclipse.category
                            );

                            return (
                                <div
                                    key={eclipse.id}
                                    className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-black/40 transition-all duration-300"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <div
                                                className={`p-3 rounded-lg ${colorClass} border`}
                                            >
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-semibold text-white">
                                                    {eclipse.category}{" "}
                                                    {eclipse.type === "solar"
                                                        ? "Solar"
                                                        : "Lunar"}{" "}
                                                    Eclipse
                                                </h4>
                                                <p className="text-gray-300">
                                                    {format(
                                                        eclipse.date,
                                                        "MMMM d, yyyy"
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-blue-400 font-medium">
                                                {getTimeUntil(eclipse.date)}
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                until eclipse
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                        <div>
                                            <span className="text-gray-400 text-sm">
                                                Maximum Eclipse:
                                            </span>
                                            <div className="text-white font-medium flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {eclipse.maxEclipse}
                                            </div>
                                        </div>

                                        <div>
                                            <span className="text-gray-400 text-sm">
                                                Duration:
                                            </span>
                                            <div className="text-white font-medium">
                                                {eclipse.type === "solar"
                                                    ? `${Math.floor(
                                                          eclipse.duration / 60
                                                      )}m ${
                                                          eclipse.duration % 60
                                                      }s`
                                                    : `${eclipse.duration} minutes`}
                                            </div>
                                        </div>

                                        <div>
                                            <span className="text-gray-400 text-sm">
                                                Magnitude:
                                            </span>
                                            <div className="text-white font-medium">
                                                {eclipse.magnitude}
                                            </div>
                                        </div>

                                        <div>
                                            <span className="text-gray-400 text-sm">
                                                Saros Cycle:
                                            </span>
                                            <div className="text-white font-medium">
                                                {eclipse.saros}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="flex items-start gap-2">
                                            <MapPin className="w-4 h-4 text-green-400 mt-0.5" />
                                            <div>
                                                <span className="text-gray-400 text-sm">
                                                    Visibility:
                                                </span>
                                                <div className="text-white">
                                                    {eclipse.visibility}
                                                </div>
                                                <div className="text-gray-300 text-sm mt-1">
                                                    {eclipse.path}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Recent Past Eclipses */}
            {pastEclipses.length > 0 && (
                <div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                        Recent Eclipses
                    </h3>
                    <div className="space-y-4">
                        {pastEclipses
                            .slice(-3)
                            .reverse()
                            .map((eclipse) => {
                                const Icon = getEclipseIcon(eclipse.type);
                                const colorClass = getEclipseColor(
                                    eclipse.type,
                                    eclipse.category
                                );

                                return (
                                    <div
                                        key={eclipse.id}
                                        className="bg-black/20 backdrop-blur-md rounded-xl p-4 border border-white/10 opacity-75"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`p-2 rounded-lg ${colorClass} border`}
                                                >
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-white">
                                                        {eclipse.category}{" "}
                                                        {eclipse.type ===
                                                        "solar"
                                                            ? "Solar"
                                                            : "Lunar"}{" "}
                                                        Eclipse
                                                    </h4>
                                                    <p className="text-gray-400 text-sm">
                                                        {format(
                                                            eclipse.date,
                                                            "MMMM d, yyyy"
                                                        )}{" "}
                                                        • {eclipse.location}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="text-gray-500 text-sm">
                                                Past Event
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            )}

            {/* Eclipse Information */}
            <div className="bg-black/20 backdrop-blur-md rounded-xl p-4 border border-white/10">
                <h4 className="text-lg font-semibold text-white mb-3">
                    Eclipse Information
                </h4>
                <div className="text-sm text-gray-300 space-y-2">
                    <p>
                        <strong className="text-white">Solar Eclipses:</strong>{" "}
                        Occur when the Moon passes between Earth and the Sun,
                        casting a shadow on Earth&apos;s surface.
                    </p>
                    <p>
                        <strong className="text-white">Lunar Eclipses:</strong>{" "}
                        Happen when Earth passes between the Sun and Moon,
                        causing Earth&apos;s shadow to fall on the Moon.
                    </p>
                    <p>
                        <strong className="text-white">Magnitude:</strong> For
                        solar eclipses, represents the fraction of the
                        Sun&apos;s diameter obscured. For lunar eclipses, the
                        fraction of the Moon&apos;s diameter obscured.
                    </p>
                </div>
            </div>
        </div>
    );
}
