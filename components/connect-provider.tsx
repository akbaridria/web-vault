"use client";
import { bscGreenfieldTestnet } from "@/lib/bnb-greenfield-testnet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { WagmiProvider, createConfig } from "wagmi";

const config = createConfig(
	getDefaultConfig({
		chains: [bscGreenfieldTestnet],
		walletConnectProjectId:
			process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "",
		appName: "Web Vault",
		appDescription:
			"A Wayback Machine for users to privately archive publicly accessible web content",
	}),
);

const queryClient = new QueryClient();

export const ConnectProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<ConnectKitProvider>{children}</ConnectKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
};
