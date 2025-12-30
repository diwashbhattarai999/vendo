import type { MetadataRoute } from "next";

/**
 * The `manifest` function is used for Progressive Web App (PWA) metadata.
 * @returns The manifest metadata object.
 */
export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Vendo - SaaS Platform for Small Businesses in Nepal",
		short_name: "Vendo",
		description:
			"Vendo is a modern SaaS platform helping small businesses in Nepal go online with ease.",
		start_url: "/",
		display: "standalone",
		theme_color: "#4A90E2",
		background_color: "#ffffff",
		icons: [
			{
				src: "/web-app-manifest-192x192.png",
				sizes: "192x192",
				type: "image/png",
				purpose: "maskable",
			},
			{
				src: "/web-app-manifest-512x512.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "maskable",
			},
			{
				src: "/apple-icon.png",
				sizes: "180x180",
				type: "image/png",
			},
		],
	};
}
