"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

const formSchema = z.object({
  boothNumber: z.string().min(1, "Booth number is required"),
  paymentProof: z.string().optional(),
  additionalInfo: z.string().optional(),
  status: z.enum(["pending", "approved", "rejected"]),
});

export default function EditExhibitorPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      boothNumber: "",
      paymentProof: "",
      additionalInfo: "",
      status: "pending",
    },
  });

  useEffect(() => {
    async function fetchExhibitor() {
      try {
        const response = await fetch(`/api/exhibitors/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          form.reset({
            boothNumber: data.boothNumber,
            paymentProof: data.paymentProof || "",
            additionalInfo: data.additionalInfo || "",
            status: data.status,
          });
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch exhibitor data",
            variant: "destructive",
          });
          router.push("/dashboard/exhibitors");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchExhibitor();
  }, [params.id, form, router]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(`/api/exhibitors/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Exhibitor updated successfully",
        });
        router.push("/dashboard/exhibitors");
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.message || "Failed to update exhibitor",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  }

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Exhibitor</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="boothNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Booth Number *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter booth number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paymentProof"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Proof URL</FormLabel>
                <FormControl>
                  <Input placeholder="Enter payment proof URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <select
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...field}
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="additionalInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Information</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter any additional information"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard/exhibitors")}
            >
              Cancel
            </Button>
            <Button type="submit">Update Exhibitor</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
