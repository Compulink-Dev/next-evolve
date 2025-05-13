"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Title from "@/app/(main)/_components/title";
import { X } from "lucide-react";

export default function ContractPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("registrationId", params.id);

      const res = await fetch("/api/registration/contract", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success("Contract uploaded successfully");
        router.push(`/admin/registrations/${params.id}`);
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Failed to upload contract");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 text-slate-400">
      <div className="flex items-center justify-between">
        <Title title="Upload Contract" />
        <Button onClick={() => router.back()} variant={"ghost"}>
          <X />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        <div>
          <Label>Contract File</Label>
          <Input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            className="bg-transparent"
          />
        </div>

        <Button
          type="submit"
          className="w-full mt-4 bg-purple-950 hover:bg-purple-700"
          disabled={loading || !file}
        >
          {loading ? "Uploading..." : "Upload Contract"}
        </Button>
      </form>
    </div>
  );
}
