import { cn } from "@vendo/ui";
import Image from "next/image";
import VendoLogo from "@/assets/logo.svg";

interface LogoProps extends React.HTMLAttributes<HTMLImageElement> {
	wrapperClassName?: string;
	className?: string;
}

export const Logo = ({ wrapperClassName, className, ...props }: LogoProps) => {
	return (
		<div className={cn("relative size-12", wrapperClassName)}>
			<Image
				src={VendoLogo}
				alt="Vendo Logo"
				fill
				{...props}
				className={cn("object-contain size-full", className)}
			/>
		</div>
	);
};
