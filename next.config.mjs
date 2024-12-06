/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        domains: [
            'partners.bugherd.com' // Add full domain name including '.com'
        ]
    }
};

export default nextConfig;
