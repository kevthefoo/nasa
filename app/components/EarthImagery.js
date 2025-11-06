"use client";

import { useState, useEffect } from "react";
import { Globe, MapPin, Calendar, Satellite } from "lucide-react";
import Image from "next/image";

export default function EarthImagery() {
    const [earthData, setEarthData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [coordinates, setCoordinates] = useState({
        lat: 40.7128,
        lon: -74.006,
    }); // Default: NYC
    const [customLocation, setCustomLocation] = useState("");

    // Popular locations for demonstration
    const popularLocations = [
        { name: "New York City", lat: 40.7128, lon: -74.006 },
        { name: "London", lat: 51.5074, lon: -0.1278 },
        { name: "Tokyo", lat: 35.6762, lon: 139.6503 },
        { name: "Sydney", lat: -33.8688, lon: 151.2093 },
        { name: "Sahara Desert", lat: 25.0, lon: 0.0 },
        { name: "Amazon Rainforest", lat: -3.4653, lon: -62.2159 },
        { name: "Great Barrier Reef", lat: -18.2871, lon: 147.6992 },
        { name: "Mount Everest", lat: 27.9881, lon: 86.925 },
    ];

    useEffect(() => {
        fetchEarthImagery();
    }, [coordinates]);

    const fetchEarthImagery = async () => {
        setLoading(true);
        try {
            // Get a date from a few days ago to ensure image availability
            const date = new Date();
            date.setDate(date.getDate() - 5);
            const dateStr = date.toISOString().split("T")[0];

            const response = await fetch(
                `https://api.nasa.gov/planetary/earth/imagery?lon=${coordinates.lon}&lat=${coordinates.lat}&date=${dateStr}&dim=0.4&api_key=DEMO_KEY`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch Earth imagery");
            }

            // The Earth Imagery API returns the image directly
            const imageBlob = await response.blob();
            const imageUrl = URL.createObjectURL(imageBlob);

            setEarthData({
                imageUrl,
                date: dateStr,
                coordinates: { ...coordinates },
            });
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleLocationSelect = (location) => {
        setCoordinates({ lat: location.lat, lon: location.lon });
        setCustomLocation(location.name);
    };

    const handleCustomCoordinates = (e) => {
        e.preventDefault();
        const coords = customLocation
            .split(",")
            .map((coord) => parseFloat(coord.trim()));
        if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
            setCoordinates({ lat: coords[0], lon: coords[1] });
        }
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                    Earth Imagery
                </h2>
                <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10 animate-pulse">
                    <div className="aspect-square bg-gray-600 rounded-lg mb-4"></div>
                    <div className="h-6 bg-gray-600 rounded mb-2"></div>
                    <div className="h-4 bg-gray-600 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                    Earth from Space
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Satellite className="w-4 h-4" />
                    Landsat 8 Satellite
                </div>
            </div>

            {/* Location Selector */}
            <div className="bg-black/20 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Select Location
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {popularLocations.map((location, index) => (
                        <button
                            key={index}
                            onClick={() => handleLocationSelect(location)}
                            className="bg-white/10 hover:bg-blue-500/20 text-gray-300 hover:text-white px-3 py-2 rounded-lg text-sm transition-colors"
                        >
                            {location.name}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleCustomCoordinates} className="flex gap-3">
                    <input
                        type="text"
                        value={customLocation}
                        onChange={(e) => setCustomLocation(e.target.value)}
                        placeholder="Enter coordinates: lat, lon (e.g., 40.7128, -74.0060)"
                        className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        View
                    </button>
                </form>
            </div>

            {/* Earth Image */}
            {error ? (
                <div className="bg-red-500/20 backdrop-blur-md rounded-xl p-6 border border-red-500/30">
                    <div className="flex items-center gap-3">
                        <Globe className="w-6 h-6 text-red-400" />
                        <span className="text-red-300">
                            No imagery available for these coordinates. Try a
                            different location or date.
                        </span>
                    </div>
                </div>
            ) : earthData ? (
                <div className="bg-black/30 backdrop-blur-md rounded-xl overflow-hidden border border-white/10">
                    <div className="relative aspect-square max-w-2xl mx-auto">
                        <Image
                            src={earthData.imageUrl}
                            alt={`Earth imagery at ${coordinates.lat}, ${coordinates.lon}`}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-4">
                            <div className="text-white">
                                <div className="text-lg font-semibold">
                                    Coordinates: {coordinates.lat.toFixed(4)}°,{" "}
                                    {coordinates.lon.toFixed(4)}°
                                </div>
                                <div className="text-sm text-gray-300">
                                    Captured: {earthData.date}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-black/20 backdrop-blur-md rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-blue-400" />
                        <div>
                            <div className="text-sm text-gray-400">
                                Resolution
                            </div>
                            <div className="text-white font-medium">
                                30m per pixel
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-black/20 backdrop-blur-md rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-green-400" />
                        <div>
                            <div className="text-sm text-gray-400">
                                Image Date
                            </div>
                            <div className="text-white font-medium">
                                {earthData?.date || "Loading..."}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-black/20 backdrop-blur-md rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-3">
                        <Satellite className="w-5 h-5 text-purple-400" />
                        <div>
                            <div className="text-sm text-gray-400">
                                Data Source
                            </div>
                            <div className="text-white font-medium">
                                Landsat 8
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Info */}
            <div className="bg-black/20 backdrop-blur-md rounded-xl p-4 border border-white/10">
                <div className="text-sm text-gray-300">
                    <p className="mb-2">
                        <strong className="text-white">
                            About Earth Imagery:
                        </strong>{" "}
                        This service provides Landsat 8 satellite imagery of
                        Earth. Images are typically available 16 days after
                        capture due to processing time.
                    </p>
                    <p>
                        The imagery shows a natural color composite with
                        30-meter resolution, perfect for observing geographical
                        features, urban development, and environmental changes
                        over time.
                    </p>
                </div>
            </div>
        </div>
    );
}
