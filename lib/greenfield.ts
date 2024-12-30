import { Client, VisibilityType } from "@bnb-chain/greenfield-js-sdk";
import "../envConfig";

const RPC_URL = process.env.RPC_URL ?? "";
const CHAIN_ID = process.env.CHAIN_ID ?? "";
const BUCKET_NAME = process.env.BUCKET_NAME ?? "";
const PRIVATE_KEY = process.env.PRIVATE_KEY ?? "";

export const createGreenfieldClient = () => Client.create(RPC_URL, CHAIN_ID);

export const createAndUploadObject = async (
	username: string,
	timestamp: number,
	imageData: Buffer,
) => {
	const client = createGreenfieldClient();
	const filename = `tweet-${username}-${timestamp}.png`;

	const uploadResult = await client.object.delegateUploadObject(
		{
			bucketName: BUCKET_NAME,
			objectName: filename,
			body: {
				name: filename,
				type: "image/png",
				size: imageData.length,
				content: imageData,
			},
			delegatedOpts: {
				visibility: VisibilityType.VISIBILITY_TYPE_PUBLIC_READ,
			},
		},
		{
			type: "ECDSA",
			privateKey: PRIVATE_KEY,
		},
	);

	return {
		...uploadResult,
		filename,
	};
};

export const getObject = async (objName: string) => {
	const client = createGreenfieldClient();
	const objectInfo = await client.object.getObject(
		{
			bucketName: BUCKET_NAME,
			objectName: objName,
		},
		{ type: "ECDSA", privateKey: PRIVATE_KEY },
	);

	return objectInfo.body;
};
