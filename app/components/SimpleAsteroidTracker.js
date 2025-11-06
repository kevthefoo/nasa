"use client";

import { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function SimpleAsteroidTracker() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate data loading
        setTimeout(() => {
            setData({
                count: 12,
                closest: "2023 DW - 4.2M km",
                nextApproach: "Tomorrow",
            });
            setLoading(false);
        }, 2000);
    }, []);

    if (loading) {
        return (
            <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <div className="animate-pulse">
                    <div className="h-6 bg-gray-600 rounded mb-4"></div>
                    <div className="h-4 bg-gray-600 rounded mb-2"></div>
                    <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-orange-400" />
                Near-Earth Asteroids
            </h3>
            <div className="space-y-3">
                <div className="flex justify-between">
                    <span className="text-gray-400">Active Tracking:</span>
                    <span className="text-white font-semibold">
                        {data.count} objects
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Closest Approach:</span>
                    <span className="text-orange-400 font-semibold">
                        {data.closest}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Next Event:</span>
                    <span className="text-blue-400 font-semibold">
                        {data.nextApproach}
                    </span>
                </div>
            </div>
        </div>
    );
}
