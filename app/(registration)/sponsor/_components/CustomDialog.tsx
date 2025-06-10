import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface CustomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: Session | null;
}

function CustomDialog({ open, onOpenChange, session }: CustomDialogProps) {
  const [customPackage, setCustomPackage] = useState({
    name: "",
    budget: "",
    objectives: "",
    benefits: "",
    contactEmail: session?.user?.email || "",
    contactName: session?.user?.name || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSaveCustomPackage = async () => {
    // Validate required fields
    if (
      !customPackage.budget ||
      !customPackage.objectives ||
      !customPackage.benefits ||
      !customPackage.contactName ||
      !customPackage.contactEmail
    ) {
      setError("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/custom-sponsorships", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...customPackage,
          userId: session?.user?.id || null,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit custom sponsorship request");
      }

      onOpenChange(false);
      // Reset form
      setCustomPackage({
        name: "",
        budget: "",
        objectives: "",
        benefits: "",
        contactEmail: session?.user?.email || "",
        contactName: session?.user?.name || "",
      });

      // Show success message or redirect
      router.push("/sponsor/custom-success");
    } catch (err: any) {
      setError(err.message || "Failed to submit custom sponsorship");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Custom Sponsorship Package</DialogTitle>
            <DialogDescription>
              Tell us about your custom sponsorship requirements
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="packageName">Package Name (Optional)</Label>
              <Input
                id="packageName"
                value={customPackage.name}
                onChange={(e) =>
                  setCustomPackage({ ...customPackage, name: e.target.value })
                }
                placeholder="e.g., Technology Partner"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="budget">Estimated Budget (USD)*</Label>
              <Input
                id="budget"
                type="number"
                value={customPackage.budget}
                onChange={(e) =>
                  setCustomPackage({ ...customPackage, budget: e.target.value })
                }
                placeholder="Enter your budget amount"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="objectives">Marketing Objectives*</Label>
              <Input
                id="objectives"
                value={customPackage.objectives}
                onChange={(e) =>
                  setCustomPackage({
                    ...customPackage,
                    objectives: e.target.value,
                  })
                }
                placeholder="What are your key marketing objectives?"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="benefits">Desired Benefits*</Label>
              <Input
                id="benefits"
                value={customPackage.benefits}
                onChange={(e) =>
                  setCustomPackage({
                    ...customPackage,
                    benefits: e.target.value,
                  })
                }
                placeholder="What benefits are you looking for?"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="contactName">Contact Name*</Label>
              <Input
                id="contactName"
                value={customPackage.contactName}
                onChange={(e) =>
                  setCustomPackage({
                    ...customPackage,
                    contactName: e.target.value,
                  })
                }
                placeholder="Your name"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="contactEmail">Contact Email*</Label>
              <Input
                id="contactEmail"
                type="email"
                value={customPackage.contactEmail}
                onChange={(e) =>
                  setCustomPackage({
                    ...customPackage,
                    contactEmail: e.target.value,
                  })
                }
                placeholder="Your email"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              disabled={isSubmitting}
              onClick={handleSaveCustomPackage}
              className="bg-purple-700 hover:bg-purple-600 text-white"
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CustomDialog;
