"use client";

import React, { useEffect, useState } from "react";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IRegistration } from "@/models/registration";
import { DataTable } from "@/components/DataTable";

export default function RegistrationsPage() {
  const router = useRouter();
  const [registrations, setRegistrations] = useState<IRegistration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRegistrations() {
      try {
        const response = await fetch("/api/registration");
        if (response.ok) {
          const data = await response.json();
          setRegistrations(data);
        } else {
          toast.error("Failed to fetch registrations");
        }
      } catch (error) {
        toast.error("An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchRegistrations();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Registrations Management</h1>
        <Button onClick={() => router.push("/admin/registrations/new")}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <DataTable columns={columns} data={registrations} />
    </div>
  );
}
