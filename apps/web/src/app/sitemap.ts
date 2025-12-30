import type { MetadataRoute } from "next";

import { getBaseUrl } from "@/utils/helpers";

/**
 * The `sitemap` function is used for sitemap.xml metadata used by search engines
 * @returns The metadata object
 */
export default function sitemap(): MetadataRoute.Sitemap {
	// Get base URL
	const baseUrl = getBaseUrl();

	// Define static routes
	const staticRoutes = ["", "/about", "/contact"];

	// Create sitemap URLs
	const urls: MetadataRoute.Sitemap = [];

	// Add static routes to sitemap
	staticRoutes.forEach((path) => {
		urls.push({
			url: `${baseUrl}${path}`,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 0.7,
		});
	});

	// Return the sitemap URLs
	return urls;
}
