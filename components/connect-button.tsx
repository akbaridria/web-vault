import { bscGreenfieldTestnet } from "@/lib/bnb-greenfield-testnet";
import { ConnectKitButton } from "connectkit";
import {
	CirclePlusIcon,
	TriangleAlertIcon,
	WalletMinimalIcon,
} from "lucide-react";
import { useSwitchChain } from "wagmi";
import { Button } from "./ui/button";

export const ConnectButton = () => {
	const { switchChain } = useSwitchChain();
	return (
		<ConnectKitButton.Custom>
			{({ isConnected, isConnecting, show, unsupported }) => {
				return (
					<>
						{!isConnected && (
							<Button
								onClick={show}
								className="w-full"
								disabled={isConnecting}
								variant={"default"}
							>
								<WalletMinimalIcon />
								<div>Connect Wallet</div>
							</Button>
						)}
						{unsupported && isConnected && (
							<Button
								onClick={() =>
									switchChain({ chainId: bscGreenfieldTestnet.id })
								}
								className="w-full"
								disabled={isConnecting}
								variant="destructive"
							>
								<TriangleAlertIcon />
								<div>Switch to Greenfield Testnet</div>
							</Button>
						)}
						{isConnected && !unsupported && (
							<Button>
								<CirclePlusIcon />
								<div>Add Archive</div>
							</Button>
						)}
					</>
				);
			}}
		</ConnectKitButton.Custom>
	);
};
