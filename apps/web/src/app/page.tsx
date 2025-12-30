import { ComponentExample } from "@/components/component-example";
// import { env } from "../config/env";

export default function Home() {
	return (
		// <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
		// 	<main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
		// 		<div className="flex flex-col gap-2">
		// 			<h1>Welcome to Next.js App</h1>

		// 			<p>
		// 				API URL:{" "}
		// 				<a href={env.NEXT_PUBLIC_API_URL} target="_blank">
		// 					{env.NEXT_PUBLIC_API_URL}
		// 				</a>
		// 			</p>
		// 			<p>
		// 				Base URL:{" "}
		// 				<a href={env.NEXT_PUBLIC_APP_URL} target="_blank">
		// 					{env.NEXT_PUBLIC_APP_URL}
		// 				</a>
		// 			</p>
		// 		</div>
		// 	</main>
		// </div>

		<ComponentExample />
	);
}
