/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '/**/*',
            },
            {
                protocol: 'https',
                hostname: "avatars.githubusercontent.com",
                pathname: '/**/*',
            },
            {
                protocol: 'https',
                hostname: "cdn.discordapp.com",
                pathname: '/**/*',
            },
            {
                // example cloudinary url:
                // (http://res.cloudinary.com/{cloudName}/image/upload/**)
                protocol: 'http',
                hostname: 'res.cloudinary.com',
                pathname: `/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload/**`,
            }
        ]
    }
}

module.exports = nextConfig
