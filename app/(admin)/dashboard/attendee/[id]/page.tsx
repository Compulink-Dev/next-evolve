import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, Edit } from "lucide-react";

interface Exhibitor {
  _id: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    phoneNumber: string;
  };
  boothNumber: string;
  status: "pending" | "approved" | "rejected";
  paymentProof?: string;
  additionalInfo?: string;
  createdAt: string;
  updatedAt: string;
}

async function getExhibitor(id: string): Promise<Exhibitor> {
  const res = await fetch(`${process.env.API_ROUTE}/api/exhibitors/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch exhibitor");
  }

  return res.json();
}

export default async function ExhibitorDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const exhibitor = await getExhibitor(params.id);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Link href="/dashboard/exhibitors" className="flex items-center gap-2">
          <ArrowLeft size={16} />
          <span>Back to Exhibitors</span>
        </Link>
        <Link href={`/dashboard/exhibitors/${params.id}/edit`}>
          <Button variant="outline">
            <Edit size={16} className="mr-2" />
            Edit
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">
                {exhibitor.userId.firstName} {exhibitor.userId.lastName}
              </CardTitle>
              <p className="text-lg text-gray-600">
                {exhibitor.userId.company}
              </p>
            </div>
            <Badge
              variant={
                exhibitor.status === "approved"
                  ? "default"
                  : exhibitor.status === "pending"
                    ? "secondary"
                    : "destructive"
              }
            >
              {exhibitor.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Exhibitor Details</h3>
              <div className="mt-2 space-y-2">
                <p>
                  <span className="font-medium">Booth Number:</span>{" "}
                  {exhibitor.boothNumber}
                </p>
                <p>
                  <span className="font-medium">Created At:</span>{" "}
                  {new Date(exhibitor.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Last Updated:</span>{" "}
                  {new Date(exhibitor.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {exhibitor.paymentProof && (
              <div>
                <h3 className="font-medium">Payment Proof</h3>
                <a
                  href={exhibitor.paymentProof}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Payment Proof
                </a>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium">User Information</h3>
              <div className="mt-2 space-y-2">
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {exhibitor.userId.email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  {exhibitor.userId.phoneNumber}
                </p>
              </div>
            </div>

            {exhibitor.additionalInfo && (
              <div>
                <h3 className="font-medium">Additional Information</h3>
                <p className="mt-2 text-gray-700">{exhibitor.additionalInfo}</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Link href={`/dashboard/exhibitors/${params.id}/edit`}>
            <Button>Edit Exhibitor</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
