import type { MetadataRoute } from "next";

import { getBaseUrl } from "@/utils/helpers";

/**
 * The `robots` function is used for robots.txt metadata used by search engines
 * @returns The metadata object
 */
export default function robots(): MetadataRoute.Robots {
	// Get base URL
	const baseUrl = getBaseUrl();

	// Return the robots.txt metadata
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
			},
		],
		sitemap: `${baseUrl}/sitemap.xml`,
		host: baseUrl,
	};
}
