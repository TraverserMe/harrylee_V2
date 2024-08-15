"use client";

import { UserSchema } from "@/schemas/user-schema";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {
//     id: string;
//     amount: number;
//     status: "pending" | "processing" | "success" | "failed";
//     email: string;
// };

export const columns: ColumnDef<UserSchema>[] = [
    // {
    //     id: "select",
    //     // header: ({ table }) => (
    //     //     <Checkbox
    //     //         checked={
    //     //             table.getIsAllPageRowsSelected() ||
    //     //             (table.getIsSomePageRowsSelected() && "indeterminate")
    //     //         }
    //     //         onCheckedChange={(value) =>
    //     //             table.toggleAllPageRowsSelected(!!value)
    //     //         }
    //     //         aria-label="Select all"
    //     //     />
    //     // ),
    //     cell: ({ row }) => (
    //         <Checkbox
    //             checked={row.getIsSelected()}
    //             onCheckedChange={(value) => row.toggleSelected(!!value)}
    //             aria-label="Select row"
    //         />
    //     ),
    //     enableSorting: false,
    //     enableHiding: false,
    // },
    // {
    //     id: "actions",
    //     cell: ({ row }) => {
    //         const user = row.original;

    //         return (
    //             <DropdownMenu>
    //                 <DropdownMenuTrigger asChild>
    //                     <Button variant="ghost" className="h-8 w-8 p-0">
    //                         <span className="sr-only">Open menu</span>
    //                         <MoreHorizontal className="h-4 w-4" />
    //                     </Button>
    //                 </DropdownMenuTrigger>
    //                 <DropdownMenuContent align="end">
    //                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //                     <DropdownMenuItem
    //                         onClick={() =>
    //                             navigator.clipboard.writeText(user.id)
    //                         }
    //                     >
    //                         Copy user ID
    //                     </DropdownMenuItem>
    //                     {/* <DropdownMenuSeparator />
    //                     <DropdownMenuItem>View customer</DropdownMenuItem>
    //                     <DropdownMenuItem>
    //                         View payment details
    //                     </DropdownMenuItem> */}
    //                 </DropdownMenuContent>
    //             </DropdownMenu>
    //         );
    //     },
    // },
    {
        accessorKey: "id",
        header: ({ column }) => {
            return <div className="text-center w-full">ID</div>;
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="w-full"
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "isAdmin",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="w-full"
                >
                    Admin
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return row.getValue("isAdmin") ? (
                <span className="text-green-500 text-center">Yes</span>
            ) : (
                <span className="text-red-500 ml-auto text-center">No</span>
            );
        },
    },
    {
        accessorKey: "isUser",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="w-full"
                >
                    User
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return row.getValue("isUser") ? (
                <span className="text-green-500 text-center">Yes</span>
            ) : (
                <span className="text-red-500 ml-auto text-center">No</span>
            );
        },
    },
];
