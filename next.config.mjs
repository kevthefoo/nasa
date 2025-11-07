/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "www.nasa.gov",
                port: "",
                pathname: "/sites/default/files/**",
            },
            {
                protocol: "https",
                hostname: "epic.gsfc.nasa.gov",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "api.nasa.gov",
                port: "",
                pathname: "/EPIC/archive/**",
            },
            {
                protocol: "https",
                hostname: "apod.nasa.gov",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
