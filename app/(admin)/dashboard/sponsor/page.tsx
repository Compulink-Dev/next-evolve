"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { sponsorSchema, SponsorInput } from "@/lib/validators/sponsorSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

export default function AdminSponsorDashboard() {
  const [sponsors, setSponsors] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SponsorInput>({
    resolver: zodResolver(sponsorSchema),
  });

  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchSponsors = async () => {
    const res = await fetch("/api/sponsor");
    const data = await res.json();
    setSponsors(data);
  };

  const onSubmit = async (data: SponsorInput) => {
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/sponsor/${editingId}` : "/api/sponsor";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    reset();
    setEditingId(null);
    fetchSponsors();
  };

  const onEdit = (sponsor: any) => {
    setEditingId(sponsor._id);
    setValue("name", sponsor.name);
    setValue("link", sponsor.link);
    setValue("type", sponsor.type);
    setValue("imageUrl", sponsor.imageUrl);
  };

  const onDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this sponsor?")) {
      await fetch(`/api/sponsors/${id}`, { method: "DELETE" });
      fetchSponsors();
    }
  };

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Sponsor Management</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4  p-6 rounded-lg shadow"
      >
        <div>
          <label className="block mb-1">Name</label>
          <Input {...register("name")} className="w-full p-2 rounded " />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block mb-1">Link</label>
          <Input
            {...register("link")}
            className="w-full p-2 rounded text-black"
          />
          {errors.link && <p className="text-red-500">{errors.link.message}</p>}
        </div>

        <div>
          <label className="block mb-1">Type</label>
          <select
            {...register("type")}
            className="w-full p-2 rounded text-black"
          >
            <option value="">Select type</option>
            <option value="sponsor">Sponsor</option>
            <option value="endorsement">Endorsement</option>
            <option value="media">Media</option>
          </select>
          {errors.type && <p className="text-red-500">{errors.type.message}</p>}
        </div>

        <div>
          <label className="block mb-1">Image URL</label>
          <Input
            {...register("imageUrl")}
            className="w-full p-2 rounded text-black"
          />
          {errors.imageUrl && (
            <p className="text-red-500">{errors.imageUrl.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
        >
          {editingId ? "Update Sponsor" : "Add Sponsor"}
        </button>
      </form>

      {/* Sponsor List */}
      <div className="mt-10">
        <h2 className="text-2xl mb-4">Current Sponsors</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor._id}
              className="p-4 rounded shadow flex flex-col items-center text-center"
            >
              <img
                src={sponsor.imageUrl}
                alt={sponsor.name}
                className="h-24 w-24 object-contain mb-2"
              />
              <p className="font-bold">{sponsor.name}</p>
              <p className="text-sm">{sponsor.type}</p>
              <a
                href={sponsor.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 text-sm break-words"
              >
                {sponsor.link}
              </a>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => onEdit(sponsor)}
                  className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(sponsor._id)}
                  className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
