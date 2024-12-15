import React, {
	type ElementType,
	type HTMLAttributes,
	type ReactNode,
} from "react";

interface TypographyProps extends HTMLAttributes<HTMLElement> {
	variant?: "h1" | "h2" | "h3" | "h4" | "p" | "p2" | "p3";
	children: ReactNode;
	className?: string;
}

export function Typography({
	variant = "p",
	children,
	className = "",
	...props
}: TypographyProps) {
	const variantStyles: Record<
		NonNullable<TypographyProps["variant"]>,
		string
	> = {
		h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
		h2: "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
		h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
		h4: "scroll-m-20 text-xl font-semibold tracking-tight",
		p: "",
		p2: "text-sm ",
		p3: "text-xs ",
	};

	const components: Record<
		NonNullable<TypographyProps["variant"]>,
		ElementType
	> = {
		h1: "h1",
		h2: "h2",
		h3: "h3",
		h4: "h4",
		p: "p",
		p2: "p",
		p3: "p",
	};

	const Component = components[variant];

	return (
		<Component className={`${variantStyles[variant]} ${className}`} {...props}>
			{children}
		</Component>
	);
}
