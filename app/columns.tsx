"use client";

import type { ColumnDef } from "@tanstack/react-table";

export type Payment = {
	id: string;
	title: string;
	description: string;
};

export const columns: ColumnDef<Payment>[] = [
	{
		accessorKey: "status",
		header: "Status",
	},
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "amount",
		header: "Amount",
	},
];
