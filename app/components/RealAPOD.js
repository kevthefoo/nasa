"use client";

import { useState, useEffect } from "react";
import { Camera, Calendar, ExternalLink, Loader } from "lucide-react";
import Image from "next/image";

export default function RealAPOD() {
    const [apod, setApod] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAPOD();
    }, []);

    const fetchAPOD = async () => {
        try {
            setLoading(true);
            setError(null);

            // Using NASA's public DEMO_KEY (rate limited)
            const response = await fetch(
                "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setApod(data);
        } catch (err) {
            console.error("Error fetching APOD:", err);
            setError(`Failed to load NASA data: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                    <Camera className="w-6 h-6 text-blue-400" />
                    <h3 className="text-xl font-semibold text-white">
                        Astronomy Picture of the Day
                    </h3>
                </div>
                <div className="aspect-video bg-gray-800/50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                        <Loader className="w-8 h-8 text-blue-400 animate-spin mx-auto mb-2" />
                        <p className="text-white/70">Loading NASA APOD...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                    <Camera className="w-6 h-6 text-red-400" />
                    <h3 className="text-xl font-semibold text-white">
                        Astronomy Picture of the Day
                    </h3>
                </div>
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
                    <p className="text-red-300">{error}</p>
                    <button
                        onClick={fetchAPOD}
                        className="mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-black/30 backdrop-blur-md rounded-xl overflow-hidden border border-white/10">
            {/* Header */}
            <div className="p-6 pb-0">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <Camera className="w-6 h-6 text-blue-400" />
                        <h3 className="text-xl font-semibold text-white">
                            Astronomy Picture of the Day
                        </h3>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Calendar className="w-4 h-4" />
                        {apod?.date}
                    </div>
                </div>
            </div>

            {/* Media */}
            <div className="px-6">
                {apod?.media_type === "image" ? (
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                        <Image
                            src={apod.url}
                            alt={apod.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                ) : apod?.media_type === "video" ? (
                    <div className="aspect-video rounded-lg overflow-hidden mb-4">
                        <iframe
                            src={apod.url}
                            title={apod.title}
                            className="w-full h-full"
                            allowFullScreen
                        />
                    </div>
                ) : null}
            </div>

            {/* Content */}
            <div className="p-6 pt-0">
                <div className="mb-4">
                    <h4 className="text-lg font-semibold text-white mb-2">
                        {apod?.title}
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-4">
                        {apod?.explanation}
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-400">
                            Type: {apod?.media_type}
                        </span>
                        {apod?.copyright && (
                            <span className="text-gray-400">
                                © {apod.copyright}
                            </span>
                        )}
                    </div>
                    {apod?.hdurl && (
                        <a
                            href={apod.hdurl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors"
                        >
                            <ExternalLink className="w-4 h-4" />
                            HD Image
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
