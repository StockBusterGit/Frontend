import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin(
    './app/i18n/request.ts'
);

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config: { module: { rules: { test: RegExp; use: string[]; }[]; }; }) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });
        return config;
    },
};



module.exports = withNextIntl(nextConfig);