import type { Metadata } from "next";
import { Inter, Public_Sans } from "next/font/google";

import "@vendo/ui/index.css";
import "@/styles/globals.css";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

const publicSans = Public_Sans({
	variable: "--font-public-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Vendo",
	description: "Vendo - The SaaS Platform for small businesses.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.variable} ${publicSans.variable} antialiased`}>
				{children}
			</body>
		</html>
	);
}
