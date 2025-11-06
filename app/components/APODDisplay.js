"use client";

import { useState, useEffect } from "react";
import { Camera, Calendar, ExternalLink, Play, Pause } from "lucide-react";
import Image from "next/image";

export default function APODDisplay() {
    const [apod, setApod] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    useEffect(() => {
        fetchAPOD();
    }, []);

    const fetchAPOD = async () => {
        try {
            const response = await fetch(
                "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"
            );

            if (!response.ok) throw new Error("Failed to fetch APOD data");

            const data = await response.json();
            setApod(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleVideoToggle = () => {
        setIsVideoPlaying(!isVideoPlaying);
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                    Astronomy Picture of the Day
                </h2>
                <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10 animate-pulse">
                    <div className="aspect-video bg-gray-600 rounded-lg mb-4"></div>
                    <div className="h-8 bg-gray-600 rounded mb-2"></div>
                    <div className="h-4 bg-gray-600 rounded mb-2"></div>
                    <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                    Astronomy Picture of the Day
                </h2>
                <div className="bg-red-500/20 backdrop-blur-md rounded-xl p-6 border border-red-500/30">
                    <div className="flex items-center gap-3">
                        <Camera className="w-6 h-6 text-red-400" />
                        <span className="text-red-300">
                            Failed to load APOD: {error}
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
                    Astronomy Picture of the Day
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Calendar className="w-4 h-4" />
                    {apod?.date}
                </div>
            </div>

            <div className="bg-black/30 backdrop-blur-md rounded-xl overflow-hidden border border-white/10">
                {/* Media Display */}
                <div className="relative aspect-video">
                    {apod?.media_type === "image" ? (
                        <div className="relative w-full h-full">
                            <Image
                                src={apod.hdurl || apod.url}
                                alt={apod.title}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>
                    ) : apod?.media_type === "video" ? (
                        <div className="relative w-full h-full bg-black flex items-center justify-center">
                            {!isVideoPlaying ? (
                                <div className="text-center">
                                    <button
                                        onClick={handleVideoToggle}
                                        className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full transition-colors mb-4"
                                    >
                                        <Play className="w-8 h-8" />
                                    </button>
                                    <p className="text-white text-lg font-medium">
                                        {apod.title}
                                    </p>
                                    <p className="text-gray-300">
                                        Click to play video
                                    </p>
                                </div>
                            ) : (
                                <div className="relative w-full h-full">
                                    <iframe
                                        src={apod.url}
                                        title={apod.title}
                                        className="w-full h-full"
                                        allowFullScreen
                                    />
                                    <button
                                        onClick={handleVideoToggle}
                                        className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded transition-colors"
                                    >
                                        <Pause className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : null}

                    {/* Media Type Badge */}
                    <div className="absolute top-4 left-4">
                        <span className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                            {apod?.media_type === "image"
                                ? "📸 Image"
                                : "🎥 Video"}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-bold text-white flex-1">
                            {apod?.title}
                        </h3>
                        {apod?.hdurl && (
                            <a
                                href={apod.hdurl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm transition-colors flex items-center gap-2 ml-4"
                            >
                                <ExternalLink className="w-4 h-4" />
                                HD Version
                            </a>
                        )}
                    </div>

                    <div className="text-gray-300 leading-relaxed mb-4">
                        {apod?.explanation}
                    </div>

                    {apod?.copyright && (
                        <div className="border-t border-white/10 pt-4">
                            <p className="text-sm text-gray-400">
                                <span className="font-medium">Copyright:</span>{" "}
                                {apod.copyright}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-black/20 backdrop-blur-md rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-3">
                        <Camera className="w-5 h-5 text-blue-400" />
                        <div>
                            <div className="text-sm text-gray-400">
                                Media Type
                            </div>
                            <div className="text-white font-medium capitalize">
                                {apod?.media_type}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-black/20 backdrop-blur-md rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-green-400" />
                        <div>
                            <div className="text-sm text-gray-400">Date</div>
                            <div className="text-white font-medium">
                                {apod?.date}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-black/20 backdrop-blur-md rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-3">
                        <ExternalLink className="w-5 h-5 text-purple-400" />
                        <div>
                            <div className="text-sm text-gray-400">
                                Service Version
                            </div>
                            <div className="text-white font-medium">
                                NASA APOD API
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
