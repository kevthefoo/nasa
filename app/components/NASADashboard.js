"use client";

import { useState, useEffect } from "react";
import {
    Rocket,
    Globe,
    Calendar,
    AlertTriangle,
    Star,
    Sun,
} from "lucide-react";
import AsteroidTracker from "./AsteroidTracker";
import APODDisplay from "./APODDisplay";
import EarthImagery from "./EarthImagery";
import MarsWeather from "./MarsWeather";
import SolarFlareMonitor from "./SolarFlareMonitor";
import EclipseTracker from "./EclipseTracker";
import LiveStats from "./LiveStats";

export default function NASADashboard() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [activeSection, setActiveSection] = useState("overview");

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const sections = [
        { id: "overview", label: "Live Overview", icon: Star },
        { id: "asteroids", label: "Asteroid Watch", icon: AlertTriangle },
        { id: "apod", label: "Picture of the Day", icon: Globe },
        { id: "earth", label: "Earth Imagery", icon: Globe },
        { id: "mars", label: "Mars Weather", icon: Sun },
        { id: "solar", label: "Solar Activity", icon: Sun },
        { id: "eclipses", label: "Eclipse Tracker", icon: Calendar },
    ];

    return (
        <div className="min-h-screen p-4 text-white">
            {/* Header */}
            <div className="mb-6 bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                        <Rocket className="w-10 h-10 text-blue-400" />
                        <div>
                            <h1 className="text-3xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                NASA Space Dashboard
                            </h1>
                            <p className="text-gray-300">
                                Live Space Data & Monitoring
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-mono">
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
                {activeSection === "overview" && <LiveStats />}
                {activeSection === "asteroids" && <AsteroidTracker />}
                {activeSection === "apod" && <APODDisplay />}
                {activeSection === "earth" && <EarthImagery />}
                {activeSection === "mars" && <MarsWeather />}
                {activeSection === "solar" && <SolarFlareMonitor />}
                {activeSection === "eclipses" && <EclipseTracker />}
            </div>
        </div>
    );
}
