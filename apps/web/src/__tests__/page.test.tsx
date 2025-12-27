import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "../app/page";

describe("Home", () => {
	it("renders a welcome message", () => {
		render(<Home />);
		const heading = screen.getByRole("main");
		expect(heading).toBeInTheDocument();
		expect(heading).toHaveTextContent("Welcom to Next.js App");
	});
});
