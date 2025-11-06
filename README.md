# 🚀 NASA Space Dashboard

A beautiful, real-time space data dashboard built with Next.js, perfect for YouTube streaming and space enthusiasts!

![NASA Dashboard](https://img.shields.io/badge/NASA-API-blue) ![Next.js](https://img.shields.io/badge/Next.js-16.0-black) ![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4)

## ✨ Features

### 🌟 Live Data Sections

-   **Mission Control Overview** - Real-time statistics and mission status
-   **Near-Earth Object Tracker** - Live asteroid tracking from NASA's NEO API
-   **Astronomy Picture of the Day** - Daily featured space imagery
-   **Mars Weather Report** - Simulated Mars weather data from various missions
-   **Earth from Space** - Satellite imagery (expandable)
-   **Solar Activity Monitor** - Space weather and solar flare tracking

### 🎨 UI Features

-   **Glass Morphism Design** - Modern backdrop-blur effects
-   **Responsive Layout** - Works on all screen sizes
-   **Live Clock** - Real-time display perfect for streaming
-   **Smooth Animations** - Polished transitions and hover effects
-   **Dark Theme** - Space-themed color palette
-   **YouTube Streaming Ready** - Optimized for broadcast use

## 🛠️ Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your dashboard!

## 🔑 NASA API Setup

### Get Your Free NASA API Key

1. Visit [NASA API Portal](https://api.nasa.gov/)
2. Generate your free API key
3. Replace `DEMO_KEY` in components with your key

### Rate Limits

-   **DEMO_KEY**: 30 requests per hour
-   **Personal API Key**: 1,000 requests per hour

## 📺 YouTube Streaming Setup

### OBS Studio Configuration

1. **Add Browser Source**:

    - URL: `http://localhost:3000`
    - Width: 1920, Height: 1080

2. **Streaming Tips**:
    - Use fullscreen mode for best results
    - The dashboard updates automatically
    - Dark theme reduces streaming bandwidth

## 🎛️ Available Data Sources

### Currently Integrated

-   **APOD** - Astronomy Picture of the Day (Live)
-   **NEO** - Near Earth Object tracking (Live)
-   **Mars Weather** - Simulated weather data
-   **Solar Activity** - Space weather monitoring
-   **ISS Statistics** - International Space Station data

### Easy to Add

-   **ISS Location** - Real-time position
-   **Earth Imagery** - Landsat satellite images
-   **Exoplanet Data** - Confirmed exoplanets
-   **Solar Flare Events** - DONKI space weather

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Other Options

-   Netlify
-   Docker
-   Traditional hosting

## 🤝 Contributing

Feel free to:

-   Add new NASA API integrations
-   Improve the UI/UX
-   Add new visualization features
-   Report bugs and issues

## 📄 License

MIT License - Perfect for YouTube creators and space enthusiasts!

## 🔗 Useful Links

-   [NASA API Documentation](https://api.nasa.gov/)
-   [Next.js Documentation](https://nextjs.org/docs)
-   [OBS Studio](https://obsproject.com/)

---

🌌 **Perfect for Space Content Creators!** 🌌

Made with ❤️ for the YouTube space community
