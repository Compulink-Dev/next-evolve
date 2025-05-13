import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { IRegistration } from "@/models/registration";

export const columns: ColumnDef<IRegistration>[] = [
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }: { row: { getValue: (key: string) => string } }) => {
      const type = row.getValue("type");
      return (
        <span className="capitalize">
          {type === "sponsor" ? "Sponsor" : "Exhibitor"}
        </span>
      );
    },
  },
  {
    accessorKey: "mode",
    header: "Mode",
    cell: ({ row }: { row: { getValue: (key: string) => string } }) => {
      const mode = row.getValue("mode");
      return (
        <span className="capitalize">
          {mode === "online" ? "Online" : "Offline"}
        </span>
      );
    },
  },
  {
    accessorKey: "contractStatus",
    header: "Contract Status",
    cell: ({ row }: { row: { getValue: (key: string) => string } }) => {
      const status = row.getValue("contractStatus");
      return <span className="capitalize">{status || "N/A"}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }: { row: { original: IRegistration } }) => {
      const registration = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Link href={`/admin/registrations/${registration._id}`}>
              <DropdownMenuItem>View/Edit</DropdownMenuItem>
            </Link>
            <Link href={`/admin/registrations/${registration._id}/contract`}>
              <DropdownMenuItem>Manage Contract</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
