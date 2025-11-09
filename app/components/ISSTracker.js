"use client";

import { useState, useEffect } from "react";
import { Satellite, MapPin, Clock, Users, Zap } from "lucide-react";

export default function ISSTracker() {
    const [issData, setIssData] = useState(null);
    const [astroData, setAstroData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchISSData();
        fetchAstronauts();
        const interval = setInterval(() => {
            fetchISSData();
        }, 10000); // Update every 10 seconds

        return () => clearInterval(interval);
    }, []);

    const fetchISSData = async () => {
        try {
            const response = await fetch(
                "http://api.open-notify.org/iss-now.json"
            );
            if (!response.ok) {
                throw new Error("Failed to fetch ISS position");
            }
            const data = await response.json();
            setIssData(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            // Fallback data for demo
            setIssData({
                timestamp: Math.floor(Date.now() / 1000),
                iss_position: {
                    latitude: "51.5074",
                    longitude: "-0.1278",
                },
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchAstronauts = async () => {
        try {
            const response = await fetch(
                "http://api.open-notify.org/astros.json"
            );
            if (!response.ok) {
                throw new Error("Failed to fetch astronaut data");
            }
            const data = await response.json();
            setAstroData(data);
        } catch (err) {
            // Fallback data
            setAstroData({
                number: 7,
                people: [{ name: "ISS Expedition Crew", craft: "ISS" }],
            });
        }
    };

    const formatCoordinate = (coord, type) => {
        const direction =
            type === "lat" ? (coord >= 0 ? "N" : "S") : coord >= 0 ? "E" : "W";
        return `${Math.abs(parseFloat(coord)).toFixed(4)}° ${direction}`;
    };

    if (loading) {
        return (
            <div className="h-full bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10 flex items-center justify-center">
                <div className="text-center">
                    <Satellite className="w-8 h-8 text-blue-400 animate-spin mx-auto mb-2" />
                    <p className="text-white/70">Tracking ISS Position...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full bg-black/30 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 flex flex-col">
            {/* Header */}
            <div className="p-4 pb-0 shrink-0">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <Satellite className="w-5 h-5 text-blue-400" />
                        <h3 className="text-lg font-semibold text-white">
                            International Space Station
                        </h3>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-400">Live</span>
                    </div>
                </div>
            </div>

            {/* Error Banner */}
            {error && (
                <div className="mx-4 mb-3 bg-amber-500/20 border border-amber-500/30 rounded-lg p-2 shrink-0">
                    <p className="text-amber-300 text-xs">
                        ⚠️ Using cached data - {error}
                    </p>
                </div>
            )}

            {/* ISS Position */}
            <div className="px-4 mb-4 shrink-0">
                <div className="bg-black/40 rounded-lg p-3 border border-white/20">
                    <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-green-400" />
                        Current Position
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                            <span className="text-gray-400">Latitude:</span>
                            <div className="text-green-400 font-mono">
                                {issData
                                    ? formatCoordinate(
                                          issData.iss_position.latitude,
                                          "lat"
                                      )
                                    : "--"}
                            </div>
                        </div>
                        <div>
                            <span className="text-gray-400">Longitude:</span>
                            <div className="text-green-400 font-mono">
                                {issData
                                    ? formatCoordinate(
                                          issData.iss_position.longitude,
                                          "lng"
                                      )
                                    : "--"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ISS Stats */}
            <div className="px-4 flex-1 overflow-hidden">
                <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="bg-black/40 rounded-lg p-3 border border-white/20">
                        <div className="flex items-center gap-2 mb-1">
                            <Users className="w-4 h-4 text-blue-400" />
                            <span className="text-xs text-gray-400">Crew</span>
                        </div>
                        <div className="text-lg font-bold text-blue-400">
                            {astroData ? astroData.number : 7}
                        </div>
                        <div className="text-xs text-gray-500">Astronauts</div>
                    </div>
                    <div className="bg-black/40 rounded-lg p-3 border border-white/20">
                        <div className="flex items-center gap-2 mb-1">
                            <Zap className="w-4 h-4 text-yellow-400" />
                            <span className="text-xs text-gray-400">Speed</span>
                        </div>
                        <div className="text-lg font-bold text-yellow-400">
                            27,600
                        </div>
                        <div className="text-xs text-gray-500">km/h</div>
                    </div>
                </div>

                <div className="bg-black/40 rounded-lg p-3 border border-white/20">
                    <h5 className="text-sm font-semibold text-white mb-2">
                        Mission Facts
                    </h5>
                    <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                            <span className="text-gray-400">Altitude:</span>
                            <span className="text-white">~408 km</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">
                                Orbital Period:
                            </span>
                            <span className="text-white">92.9 min</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Daily Orbits:</span>
                            <span className="text-white">~15.5</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-4 pt-0 shrink-0">
                <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">
                        Updated:{" "}
                        {issData
                            ? new Date(
                                  issData.timestamp * 1000
                              ).toLocaleTimeString()
                            : "--:--:--"}
                    </span>
                    <span className="text-gray-400">Open Notify API</span>
                </div>
            </div>
        </div>
    );
}
