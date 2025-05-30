"use client";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

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

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phoneNumber: string;
}

const getExhibitorsWithUsers = async () => {
  try {
    const res = await fetch(`${process.env.API_ROUTE}/api/exhibitors`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch exhibitors: ${res.status}`);
    }

    const data = await res.json();

    // Fetch user details for each exhibitor
    const exhibitorsWithUsers = await Promise.all(
      data.exhibitors.map(async (exhibitor: any) => {
        const userRes = await fetch(
          `${process.env.API_ROUTE}/api/registration/${exhibitor.userId}`,
          {
            cache: "no-store",
          }
        );
        const userData = await userRes.json();
        return {
          ...exhibitor,
          userId: userData.user || {
            firstName: "Unknown",
            lastName: "User",
            email: "unknown@example.com",
            company: "Unknown Company",
            phoneNumber: "N/A",
          },
        };
      })
    );

    return { exhibitors: exhibitorsWithUsers };
  } catch (error) {
    console.error("Error loading exhibitors with users", error);
    return { exhibitors: [] };
  }
};

async function Exhibitors() {
  const { exhibitors } = await getExhibitorsWithUsers();

  const [selectedExhibitor, setSelectedExhibitor] = useState<Exhibitor | null>(
    null
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteClick = (exhibitor: Exhibitor) => {
    setSelectedExhibitor(exhibitor);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedExhibitor) return;

    try {
      const res = await fetch(
        `${process.env.API_ROUTE}/api/exhibitors/${selectedExhibitor._id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        // Refresh the page or update state
        window.location.reload();
      } else {
        console.error("Failed to delete exhibitor");
      }
    } catch (error) {
      console.error("Error deleting exhibitor:", error);
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Exhibitors Management</h1>
        <Link href="/dashboard/exhibitors/new">
          <Button className="flex items-center gap-2">
            <Plus size={14} />
            <span>Add New Exhibitor</span>
          </Button>
        </Link>
      </div>

      {exhibitors.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">No exhibitors found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exhibitors.map((exhibitor: Exhibitor) => (
            <Card key={exhibitor._id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">
                      {exhibitor.userId.firstName} {exhibitor.userId.lastName}
                    </CardTitle>
                    <CardDescription>
                      {exhibitor.userId.company}
                    </CardDescription>
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
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Booth Number:</span>
                  <span>{exhibitor.boothNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Email:</span>
                  <span>{exhibitor.userId.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Phone:</span>
                  <span>{exhibitor.userId.phoneNumber}</span>
                </div>
                {exhibitor.additionalInfo && (
                  <div className="pt-2">
                    <p className="text-sm font-medium">Additional Info:</p>
                    <p className="text-sm text-gray-600">
                      {exhibitor.additionalInfo}
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Link href={`/dashboard/exhibitors/${exhibitor._id}`}>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </Link>
                <Link href={`/dashboard/exhibitors/${exhibitor._id}/edit`}>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteClick(exhibitor)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              exhibitor record.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default Exhibitors;
