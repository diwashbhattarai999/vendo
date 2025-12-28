import type { Config } from "jest";
import { config as baseConfig } from "./base";

export const nestConfig = {
	...baseConfig,
	rootDir: "src",
	testRegex: ".*\\.spec\\.ts$",
	transform: {
		"^.+\\.(t|j)s$": "ts-jest",
	},
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/$1",
	},
	modulePaths: ["<rootDir>"],
	collectCoverageFrom: ["**/*.(t|j)s"],
	coveragePathIgnorePatterns: ["node_modules", "generated", "dist", "runtime", ".*\\.prisma"],
	coverageDirectory: "../coverage",
	testEnvironment: "node",
} as const satisfies Config;
