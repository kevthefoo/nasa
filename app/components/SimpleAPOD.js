"use client";

import { useState, useEffect } from "react";
import { Camera, Calendar } from "lucide-react";

export default function SimpleAPOD() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        // Simulate loading
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, []);

    if (loading) {
        return (
            <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <div className="animate-pulse">
                    <div className="aspect-video bg-gray-600 rounded-lg mb-4"></div>
                    <div className="h-6 bg-gray-600 rounded mb-2"></div>
                    <div className="h-4 bg-gray-600 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Camera className="w-6 h-6 text-blue-400" />
                Astronomy Picture of the Day
            </h3>

            <div className="aspect-video bg-linear-to-br from-purple-900/50 to-blue-900/50 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center">
                    <Camera className="w-12 h-12 text-white/50 mx-auto mb-2" />
                    <p className="text-white/70">NASA APOD Image</p>
                    <p className="text-sm text-white/50">
                        Loading from NASA API...
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-300">
                <Calendar className="w-4 h-4" />
                <span>Today&apos;s featured astronomy image</span>
            </div>
        </div>
    );
}
