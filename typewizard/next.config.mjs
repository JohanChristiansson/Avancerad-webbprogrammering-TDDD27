
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:5000/api/:path*', // Change the port if necessary
            },
        ];
    }
};

export default nextConfig;