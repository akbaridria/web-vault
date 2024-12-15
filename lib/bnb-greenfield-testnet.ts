import { defineChain } from "viem";

export const bscGreenfieldTestnet = defineChain({
	id: 5600,
	name: "BNB Greenfield Chain - Testnet",
	nativeCurrency: {
		decimals: 18,
		name: "tBNB",
		symbol: "tBNB",
	},
	rpcUrls: {
		default: {
			http: ["https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org"],
		},
	},
	blockExplorers: {
		default: {
			name: "BNB Greenfield Testnet Scan",
			url: "https://testnet.greenfieldscan.com/",
		},
	},
	testnet: false,
});
