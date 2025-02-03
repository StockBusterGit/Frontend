import createNextIntlPlugin from 'next-intl/plugin';
import {NextConfig} from "next";

const withNextIntl: (config?: NextConfig) => NextConfig = createNextIntlPlugin(
    './app/i18n/request.ts'
);

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.futura-sciences.com',
				port: '',
				pathname: '**',
			},
		],
	},
	webpack(config: { module: { rules: { test: RegExp; use: string[]; }[]; }; }) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"],
		});
		return config;
	},
};



module.exports = withNextIntl(nextConfig);