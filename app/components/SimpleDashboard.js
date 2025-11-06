"use client";

import { useState, useEffect } from "react";
import { Rocket, Star, Activity, AlertTriangle } from "lucide-react";
import SimpleAsteroidTracker from "./SimpleAsteroidTracker";
import SimpleAPOD from "./SimpleAPOD";
import SimpleMarsWeather from "./SimpleMarsWeather";

export default function SimpleDashboard() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [activeSection, setActiveSection] = useState("overview");

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const sections = [
        { id: "overview", label: "Overview", icon: Star },
        { id: "asteroids", label: "Asteroids", icon: AlertTriangle },
        { id: "apod", label: "Picture of Day", icon: Star },
        { id: "mars", label: "Mars Weather", icon: Activity },
    ];

    return (
        <div className="min-h-screen p-4 text-white">
            {/* Header */}
            <div className="mb-6 bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                        <Rocket className="w-10 h-10 text-blue-400" />
                        <div>
                            <h1 className="text-3xl font-bold text-white">
                                NASA Space Dashboard
                            </h1>
                            <p className="text-gray-300">
                                Live Space Data & Monitoring
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-mono text-blue-400">
                            {currentTime.toLocaleTimeString()}
                        </div>
                        <div className="text-sm text-gray-300">
                            {currentTime.toLocaleDateString()}
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="mb-6 bg-black/20 backdrop-blur-md rounded-xl p-2 border border-white/10">
                <div className="flex flex-wrap gap-2">
                    {sections.map((section) => {
                        const Icon = section.icon;
                        return (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                                    activeSection === section.id
                                        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                                        : "bg-white/10 hover:bg-white/20 text-gray-300"
                                }`}
                            >
                                <Icon className="w-4 h-4" />
                                {section.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
                {activeSection === "overview" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <SimpleAsteroidTracker />
                        <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10">
                            <h3 className="text-xl font-semibold text-white mb-4">
                                Live Statistics
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">
                                        ISS Astronauts:
                                    </span>
                                    <span className="text-green-400 font-semibold">
                                        7
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">
                                        Solar Wind Speed:
                                    </span>
                                    <span className="text-yellow-400 font-semibold">
                                        425 km/s
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">
                                        Space Weather:
                                    </span>
                                    <span className="text-blue-400 font-semibold">
                                        Quiet
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10">
                            <h3 className="text-xl font-semibold text-white mb-4">
                                Quick Stats
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">
                                        Active Missions:
                                    </span>
                                    <span className="text-purple-400 font-semibold">
                                        42
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">
                                        Data Feeds:
                                    </span>
                                    <span className="text-green-400 font-semibold">
                                        Online
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">
                                        Last Update:
                                    </span>
                                    <span className="text-gray-300 font-semibold">
                                        Now
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {activeSection === "asteroids" && <SimpleAsteroidTracker />}
                {activeSection === "apod" && <SimpleAPOD />}
                {activeSection === "mars" && <SimpleMarsWeather />}
            </div>

            {/* Footer */}
            <div className="mt-8 text-center text-gray-400 text-sm">
                <p>
                    🚀 NASA API Dashboard • Built for YouTube Streaming •
                    Real-time Space Data
                </p>
            </div>
        </div>
    );
}
