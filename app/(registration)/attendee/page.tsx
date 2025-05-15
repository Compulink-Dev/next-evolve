"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UploadDropzone } from "@/lib/uploadthing";

export default function AttendeeRegistration() {
  const { data: session } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    seatNumber: "",
    additionalInfo: "",
    paymentProof: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/attendees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user?.id,
          ...formData,
        }),
      });

      if (response.ok) {
        router.push("/attendee/success");
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Attendee Registration
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="seatNumber">Seat Number</Label>
            <Input
              id="seatNumber"
              name="seatNumber"
              type="text"
              required
              value={formData.seatNumber}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="additionalInfo">Additional Information</Label>
            <Textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div>
            <Label>Payment Proof</Label>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const formData = new FormData();
                formData.append("file", file);

                const res = await fetch("/api/upload", {
                  method: "POST",
                  body: formData,
                });

                const result = await res.json();

                if (res.ok) {
                  setFormData((prev) => ({
                    ...prev,
                    paymentProof: result.url,
                  }));
                } else {
                  alert("Upload failed");
                }
              }}
            />
            {formData.paymentProof && (
              <div className="">
                <img
                  src={formData.paymentProof}
                  alt="Payment Proof"
                  className="mt-2 max-h-32"
                />

                <p className="text-sm text-green-600 mt-2">
                  Payment proof uploaded!
                </p>
              </div>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Complete Registration"}
          </Button>
        </form>
      </div>
    </div>
  );
}
