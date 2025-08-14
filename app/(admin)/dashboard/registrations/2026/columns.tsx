import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export type Registration = {
  id: string;
  name?: string;
  email: string;
  company?: string;
  jobTitle?: string;
  phone?: string;
  companyName?: string;
  contactName?: string;
  boothSize?: string;
  sponsorshipLevel?: "silver" | "gold" | "platinum" | "diamond";
  registrationDate: Date;
  type: string;
};

export const columns: ColumnDef<Registration>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.original.name;
      const contactName = row.original.contactName;
      return name || contactName || "-";
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "company",
    header: "Company",
    cell: ({ row }) => {
      const company = row.original.company;
      const companyName = row.original.companyName;
      return company || companyName || "-";
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => row.original.phone || "-",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.original.type}
      </Badge>
    ),
  },
  {
    accessorKey: "boothSize",
    header: "Booth Size",
    cell: ({ row }) => {
      const boothSize = row.original.boothSize;
      return boothSize ? <Badge variant="secondary">{boothSize}</Badge> : null;
    },
  },
  {
    accessorKey: "sponsorshipLevel",
    header: "Sponsorship",
    cell: ({ row }) => {
      const level = row.original.sponsorshipLevel;
      if (!level) return null;

      const variantMap = {
        silver: "secondary",
        gold: "default",
        platinum: "destructive",
        diamond: "outline",
      } as const;

      const variant = variantMap[level] || "outline";

      return (
        <Badge variant={variant} className="capitalize">
          {level}
        </Badge>
      );
    },
  },
  {
    accessorKey: "registrationDate",
    header: "Registered On",
    cell: ({ row }) => {
      return format(new Date(row.original.registrationDate), "MMM dd, yyyy");
    },
  },
];
