"use client";

import {
	ChartBarLineIcon,
	Crown03Icon,
	// Moon02Icon,
	// Send,
	Users,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
	// Avatar,
	// AvatarFallback,
	// AvatarGroup,
	// AvatarImage,
	Badge,
	// Button,
	// Card,
	// CardContent,
	// Input,
} from "@vendo/ui";
import { BackgroundGlow } from "@/components/shared/background-glow";
// import { useState } from "react";
import { Logo } from "@/components/shared/logo";

// Example early users for social proof
// const WAITLIST_PREVIEW = [
// 	{
// 		id: 1,
// 		name: "R",
// 		avatar: "https://randomuser.me/api/portraits/women/44.jpg",
// 	},
// 	{
// 		id: 2,
// 		name: "S",
// 		avatar: "https://randomuser.me/api/portraits/men/32.jpg",
// 	},
// 	{
// 		id: 3,
// 		name: "T",
// 		avatar: "https://randomuser.me/api/portraits/women/68.jpg",
// 	},
// ];

// Key Vendo features
const FEATURES = [
	{ id: 1, icon: Crown03Icon, title: "No-code online store builder" },
	{ id: 2, icon: Users, title: "Sales, inventory & customer management" },
	{
		id: 3,
		icon: ChartBarLineIcon,
		title: "Insights, analytics & AI-powered forecasting",
	},
];

export const ComingSoon = () => {
	// const [email, setEmail] = useState("");
	// const [subscribed, setSubscribed] = useState(false);
	// const isValid = Boolean(email);

	// function handleSubscribe(e?: React.FormEvent) {
	// 	if (e) e.preventDefault();
	// 	if (!isValid || subscribed) return;
	// 	setSubscribed(true);
	// 	setTimeout(() => setEmail(""), 2000);
	// }

	return (
		<div className="relative">
			<BackgroundGlow className="z-0" />

			<div className="z-10 font-public-sans! min-h-screen flex flex-col gap-16 items-center justify-center px-4 py-8">
				{/* Header Card */}
				{/* <Card className="rounded-full py-2 ring-0 shadow-2xl w-full max-w-xl">
				<CardContent className="px-4 flex items-center justify-between gap-16 min-w-100">
					<Logo wrapperClassName="size-12" className="rounded-full" />
					<Button
						variant="secondary"
						size="icon-lg"
						className="rounded-full size-12"
					>
						<HugeiconsIcon icon={Moon02Icon} />
					</Button>
				</CardContent>
			</Card> */}

				<Logo
					wrapperClassName="size-20 shadow-xl rounded-4xl"
					className="rounded-4xl"
				/>

				{/* Hero / Description */}
				<div className="flex flex-col items-center justify-center gap-4 max-w-4xl text-center">
					<Badge className="bg-card text-card-foreground text-sm h-8 px-4 shadow-2xl [&>svg]:size-4!">
						<HugeiconsIcon icon={Crown03Icon} />
						{/* Waitlist */}
						Coming Soon
					</Badge>

					<h1 className="text-4xl sm:text-5xl font-semibold leading-tight sm:tracking-wide text-balance">
						<span className="relative bg-linear-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
							Vendo:{" "}
							<svg
								className="absolute left-0 bottom-0 w-[calc(100%-2rem)] h-2"
								viewBox="0 0 200 8"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
							>
								<path
									d="M0 6 Q 50 0, 100 6 T 200 6"
									stroke="currentColor"
									strokeWidth="6"
									className="text-primary"
									fill="none"
								/>
							</svg>
						</span>
						Run your retail business
						<br />
						From offline to online effortlessly
					</h1>

					<p className="text-sm text-secondary-foreground mt-2">
						Vendo is an all-in-one platform for small retailers in Nepal —
						manage sales, inventory, payments, customers, and insights in one
						calm, modern workspace.
					</p>

					{/* Waitlist input */}
					{/* <form
					onSubmit={handleSubscribe}
					className="w-full flex items-center bg-card/30 rounded-full px-2 py-2 mt-6 gap-2 border max-w-md"
				>
					<Input
						type="email"
						placeholder="Your Email"
						value={email}
						disabled={subscribed}
						onChange={(e) => setEmail(e.target.value)}
						className="bg-transparent border-0 focus:ring-0 focus-visible:ring-0 px-4 h-12 text-base flex-1"
						autoComplete="email"
						required
					/>
					<Button
						type="submit"
						className="rounded-full h-14 px-6 text-base font-medium shadow-none"
						disabled={!isValid || subscribed}
					>
						<HugeiconsIcon icon={Send} className="mr-2" />
						{subscribed ? "Joined Waitlist" : "Join Waitlist"}
					</Button>
				</form> */}

					{/* Social proof */}
					{/* <div className="flex items-center gap-2 mt-3">
					<AvatarGroup className="flex -space-x-2">
						{WAITLIST_PREVIEW.map((user) => (
							<Avatar key={user.id}>
								<AvatarImage src={user.avatar} />
								<AvatarFallback>{user.name}</AvatarFallback>
							</Avatar>
						))}
					</AvatarGroup>
					<span className="text-xs text-slate-500 font-medium">
						Join <span className="font-semibold text-slate-900">1,000+</span>{" "}
						Nepali retailers waiting
					</span>
				</div> */}
				</div>

				{/* Feature cards */}
				<div className="w-full flex flex-col items-center justify-center mt-8">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
						{FEATURES.map((feature) => (
							<div
								key={feature.id}
								className="relative flex flex-col items-center"
							>
								<div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10 bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
									<HugeiconsIcon icon={feature.icon} className="size-6" />
								</div>
								<div className="bg-card rounded-2xl border border-border/50 pt-10 pb-6 px-10 flex flex-col items-center min-h-30 size-full">
									<span className="font-medium text-center text-base">
										{feature.title}
									</span>
								</div>
							</div>
						))}
					</div>

					<p className="text-xs text-muted-foreground text-center mt-6">
						Simple, modern, and tailored for Nepali retailers — manage your
						business with clarity.
					</p>
				</div>
			</div>
		</div>
	);
};
