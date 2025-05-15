"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SessionLayout from "../../_components/SessionWrapper";

// Define types for your data
interface Delegate {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface Sponsorship {
  _id: string;
  userId: string;
  tier: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
  paymentProof?: string;
  additionalInfo?: string;
  createdAt: string;
  delegates?: Delegate[];
}

interface Tier {
  name: string;
  price: string;
  features: string[];
  featured: boolean;
  color: string;
  textColor: string;
}

const sponsorshipTiers: Tier[] = [
  {
    name: "PLATINUM",
    price: "$15,000",
    features: [
      "Co-Naming rights",
      "Logo on all advertising",
      "Logo on screens in main auditorium and breakaway rooms",
      "Co-branded crew shirts",
      "Logo on conference packs",
      "Banners inside and outside venue",
      "15 Delegate tickets",
      "6m x 6m Exhibition Space",
      "Name mentions on all radio and online advertising",
    ],
    featured: true,
    color: "bg-gradient-to-br from-gray-200 to-gray-400",
    textColor: "text-gray-800",
  },
  {
    name: "GOLD",
    price: "$10,000",
    features: [
      "Logo on all advertising as gold sponsor",
      "Logo on screen in main auditorium",
      "Banners inside and outside venue",
      "10 Delegate tickets",
      "3m x 3m Exhibition Space",
      "Logo on all online advertising",
    ],
    featured: false,
    color: "bg-gradient-to-br from-yellow-400 to-yellow-600",
    textColor: "text-yellow-900",
  },
  {
    name: "SILVER",
    price: "$7,500",
    features: [
      "Logo on all advertising as silver sponsor",
      "Logo on screen as silver sponsor",
      "Banners inside and outside venue",
      "7 Delegate tickets",
      "3m x 3m Exhibition Space",
      "Logo on all online advertising",
    ],
    featured: false,
    color: "bg-gradient-to-br from-gray-300 to-gray-500",
    textColor: "text-gray-800",
  },
  {
    name: "BRONZE",
    price: "$5,000",
    features: [
      "Logo on screen in main auditorium",
      "Banners inside and outside venue",
      "5 Delegate tickets",
      "Logo on online advertising as bronze sponsor",
    ],
    featured: false,
    color: "bg-gradient-to-br from-amber-600 to-amber-800",
    textColor: "text-amber-100",
  },
];

function SponsorDashboard() {
  const { data: session } = useSession();
  const [sponsorship, setSponsorship] = useState<Sponsorship | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [delegates, setDelegates] = useState<Delegate[]>([]);
  const [newDelegate, setNewDelegate] = useState<Omit<Delegate, "id">>({
    name: "",
    email: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSponsorship = async () => {
      try {
        const res = await fetch("/api/sponsorships/latest");
        const data = await res.json();
        setSponsorship(data);

        if (data.delegates) {
          setDelegates(data.delegates);
        }
      } catch (error) {
        console.error("Failed to fetch sponsorship:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSponsorship();
  }, []);

  const handleAddDelegate = () => {
    if (newDelegate.name && newDelegate.email) {
      setDelegates([
        ...delegates,
        { ...newDelegate, id: Date.now().toString() },
      ]);
      setNewDelegate({ name: "", email: "", phone: "" });
    }
  };

  const handleRemoveDelegate = (id: string) => {
    setDelegates(delegates.filter((delegate) => delegate.id !== id));
  };

  const handleSubmitDelegates = async () => {
    if (!sponsorship) return;

    try {
      const response = await fetch(
        `/api/sponsorships/${sponsorship._id}/delegates`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ delegates }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update delegates");
      }

      setIsDialogOpen(false);
      const res = await fetch("/api/sponsorships/latest");
      const data = await res.json();
      setSponsorship(data);
    } catch (error) {
      console.error("Error submitting delegates:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!sponsorship) {
    return (
      <div className="flex justify-center items-center h-screen">
        No sponsorship found
      </div>
    );
  }

  const tier = sponsorshipTiers.find((t: Tier) => t.name === sponsorship.tier);
  const maxDelegates =
    tier?.features
      .find((f: string) => f.includes("Delegate tickets"))
      ?.match(/\d+/)?.[0] || "0";

  return (
    <SessionLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Sponsorship Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sponsorship Details Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Your Sponsorship</span>
                <Badge
                  variant={
                    sponsorship.status === "approved" ? "default" : "outline"
                  }
                >
                  {sponsorship.status.toUpperCase()}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold">
                    {sponsorship.tier} Sponsorship
                  </h3>
                  <p className="text-2xl font-bold">
                    ${sponsorship.amount.toLocaleString()}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Benefits:</h4>
                  <ul className="space-y-2">
                    {tier?.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {sponsorship.paymentProof && (
                  <div>
                    <h4 className="font-medium mb-2">Payment Proof:</h4>
                    <a
                      href={sponsorship.paymentProof}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Payment Proof
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => setIsDialogOpen(true)}
                disabled={delegates.length >= parseInt(maxDelegates)}
              >
                Manage Delegates ({delegates.length}/{maxDelegates})
              </Button>
            </CardFooter>
          </Card>

          {/* User Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <p className="font-medium">{session?.user?.name}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p className="font-medium">{session?.user?.email}</p>
                </div>
                <div>
                  <Label>Sponsorship Date</Label>
                  <p className="font-medium">
                    {new Date(sponsorship.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Delegates Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Manage Delegates</DialogTitle>
              <DialogDescription>
                Add and manage your delegate information ({delegates.length}/
                {maxDelegates} slots used)
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newDelegate.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewDelegate({ ...newDelegate, name: e.target.value })
                    }
                    placeholder="Delegate name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newDelegate.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewDelegate({ ...newDelegate, email: e.target.value })
                    }
                    placeholder="Delegate email"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={newDelegate.phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewDelegate({ ...newDelegate, phone: e.target.value })
                    }
                    placeholder="Delegate phone"
                  />
                </div>
              </div>

              <Button
                onClick={handleAddDelegate}
                disabled={
                  !newDelegate.name ||
                  !newDelegate.email ||
                  delegates.length >= parseInt(maxDelegates)
                }
              >
                Add Delegate
              </Button>

              {delegates.length > 0 && (
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {delegates.map((delegate) => (
                        <TableRow key={delegate.id}>
                          <TableCell>{delegate.name}</TableCell>
                          <TableCell>{delegate.email}</TableCell>
                          <TableCell>{delegate.phone}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveDelegate(delegate.id)}
                            >
                              Remove
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitDelegates}>Save Delegates</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </SessionLayout>
  );
}

export default SponsorDashboard;
