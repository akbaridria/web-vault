import type { ApiError } from "@/types";
import { QueryClient } from "@tanstack/react-query";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function customFetch<T>(
	url: string,
	options: RequestInit = {},
): Promise<T> {
	const defaultHeaders = {
		"Content-Type": "application/json",
	};

	try {
		const response = await fetch(`${url}`, {
			...options,
			headers: {
				...defaultHeaders,
				...options.headers,
			},
		});

		if (!response.ok) {
			const error: ApiError = await response.json();
			throw new Error(
				error.message || `HTTP error! status: ${response.status}`,
			);
		}

		return response.json();
	} catch (error) {
		console.error("API Error:", error);
		throw error;
	}
}

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5,
			retry: 3,
			retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
			refetchOnWindowFocus: false,
			refetchOnMount: false,
		},
	},
});

export const api = {
	get: <T>(url: string, options?: RequestInit) =>
		customFetch<T>(url, { method: "GET", ...options }),

	post: <T>(url: string, data?: unknown, options?: RequestInit) =>
		customFetch<T>(url, {
			method: "POST",
			body: JSON.stringify(data),
			...options,
		}),

	put: <T>(url: string, data?: unknown, options?: RequestInit) =>
		customFetch<T>(url, {
			method: "PUT",
			body: JSON.stringify(data),
			...options,
		}),

	delete: <T>(url: string, options?: RequestInit) =>
		customFetch<T>(url, { method: "DELETE", ...options }),
};
