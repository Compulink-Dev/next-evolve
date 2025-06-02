"use client";

import React, { useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Tier {
  name: string;
  price: number;
  features: string[];
  featured: boolean;
  color: string;
  textColor: string;
  paymentLink: string; // Add this line
}

const sponsorshipTiers: Tier[] = [
  {
    name: "PLATINUM",
    price: 15000,
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
    paymentLink:
      "https://www.paynow.co.zw/Payment/Link/?q=c2VhcmNoPWRldmNvbXB1bGluayU0MGdtYWlsLmNvbSZhbW91bnQ9MTUwMDAuMDAmcmVmZXJlbmNlPVBsYXRpbXVuJmw9MQ%3d%3d",
  },
  {
    name: "GOLD",
    price: 10000,
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
    paymentLink:
      "https://www.paynow.co.zw/Payment/Link/?q=c2VhcmNoPWRldmNvbXB1bGluayU0MGdtYWlsLmNvbSZhbW91bnQ9MTAwMDAuMDAmcmVmZXJlbmNlPUdvbGQmbD0x",
  },
  {
    name: "SILVER",
    price: 7500,
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
    paymentLink:
      "https://www.paynow.co.zw/Payment/Link/?q=c2VhcmNoPWRldmNvbXB1bGluayU0MGdtYWlsLmNvbSZhbW91bnQ9MTAwMDAuMDAmcmVmZXJlbmNlPUdvbGQmbD0x",
  },
  {
    name: "BRONZE",
    price: 5000,
    features: [
      "Logo on screen in main auditorium",
      "Banners inside and outside venue",
      "5 Delegate tickets",
      "Logo on online advertising as bronze sponsor",
    ],
    featured: false,
    color: "bg-gradient-to-br from-amber-600 to-amber-800",
    textColor: "text-amber-100",
    paymentLink:
      "https://www.paynow.co.zw/Payment/Link/?q=c2VhcmNoPWRldmNvbXB1bGluayU0MGdtYWlsLmNvbSZhbW91bnQ9MTAwMDAuMDAmcmVmZXJlbmNlPUdvbGQmbD0x",
  },
];

function Sponsors() {
  const router = useRouter();
  const { data: session } = useSession();
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<
    "web" | "ecocash" | "onemoney"
  >("web");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const [pollUrl, setPollUrl] = useState("");
  const [paymentInstructions, setPaymentInstructions] = useState("");
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBecomeSponsor = (tier: Tier) => {
    if (!session) {
      router.push("/sign-in");
      return;
    }
    setSelectedTier(tier);
    setIsDialogOpen(true);
    setPaymentInitiated(false);
    setPaymentError("");
  };

  const handlePayment = async () => {
    if (!selectedTier || !session?.user?.email) return;

    setIsProcessingPayment(true);
    setPaymentError("");

    try {
      // Validate mobile number if needed
      if (paymentMethod !== "web" && !mobileNumber) {
        throw new Error("Please enter your mobile number");
      }

      const response = await fetch("/api/paynow/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethod,
          mobileNumber: paymentMethod !== "web" ? mobileNumber : undefined,
          email: session.user.email,
          tierName: selectedTier.name,
          tierPrice: selectedTier.price,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Payment initiation failed");
      }

      // Handle response
      if (paymentMethod === "web" && data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else if (paymentMethod !== "web" && data.instructions) {
        setPaymentInstructions(data.instructions);
        setPaymentInitiated(true);
        setPollUrl(data.pollUrl);

        // Optional: Start polling for payment status
        startPolling(data.pollUrl);
      } else {
        throw new Error("Unexpected response from payment gateway");
      }
    } catch (error: any) {
      setPaymentError(error.message || "Payment processing failed");
      console.error("Payment error:", error);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // Optional polling function
  const startPolling = async (pollUrl: string) => {
    let attempts = 0;
    const maxAttempts = 10;
    const interval = 5000; // 5 seconds

    const poll = async () => {
      attempts++;
      try {
        const response = await fetch("/api/paynow/webhook", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pollUrl }),
        });

        const data = await response.json();

        if (data.success) {
          // Payment successful
          setPaymentInitiated(false);
          router.push(
            `/sponsor/success?tier=${selectedTier?.name}&amount=${selectedTier?.price}`
          );
          return;
        }

        if (attempts < maxAttempts) {
          setTimeout(poll, interval);
        } else {
          setPaymentError("Payment verification timed out");
        }
      } catch (error) {
        console.error("Polling error:", error);
        if (attempts < maxAttempts) {
          setTimeout(poll, interval);
        }
      }
    };

    setTimeout(poll, interval);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPaymentProof(file);

      if (file.type === "application/pdf") {
        setPreviewUrl("PDF uploaded: " + file.name);
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = async () => {
    if (!selectedTier || !session?.user?.id) return;

    setIsSubmitting(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("tier", selectedTier.name);
      formData.append("amount", selectedTier.price.toString());
      formData.append("userId", session.user.id);
      formData.append("additionalInfo", additionalInfo || "");

      let paymentProofUrl = "";

      if (paymentProof) {
        const fileData = new FormData();
        fileData.append("file", paymentProof);

        const uploadRes = await fetch("/api/upload-cloudinary", {
          method: "POST",
          body: fileData,
        });

        if (!uploadRes.ok) {
          throw new Error("Failed to upload payment proof");
        }

        const uploadJson = await uploadRes.json();
        paymentProofUrl = uploadJson.secure_url;
      }

      const response = await fetch("/api/sponsorships", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tier: selectedTier.name,
          amount: selectedTier.price,
          additionalInfo,
          userId: session.user.id,
          paymentProofUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit sponsorship");
      }

      setIsDialogOpen(false);
      router.push(
        `/sponsor/success?tier=${selectedTier.name}&amount=${selectedTier.price}`
      );
    } catch (err: any) {
      setError(err.message || "Failed to submit sponsorship");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900 via-indigo-900 to-gray-900">
      <div className="absolute top-5 right-6">
        <Button
          onClick={() => router.push("/")}
          variant={"ghost"}
          size="icon"
          className="text-white"
        >
          <X />
        </Button>
      </div>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-12">
          Sponsorship Opportunities
        </h1>
        <div className="">
          {session?.user && (
            <div className="mb-2 text-white">
              <p className="font-medium">Applying as: {session.user.name}</p>
              <p className="text-sm">{session.user.email}</p>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 mt-8 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sponsorshipTiers.map((tier) => (
            <Card
              key={tier.name}
              className={`${tier.featured ? "border-2 border-white scale-105" : ""} flex flex-col h-full`}
            >
              <CardHeader className={`${tier.color} ${tier.textColor} p-6`}>
                <CardTitle className="text-2xl font-bold text-center">
                  {tier.name} SPONSOR
                </CardTitle>
                <div className="text-3xl font-extrabold text-center mt-2">
                  ${tier.price.toLocaleString()}
                </div>
              </CardHeader>

              <CardContent className="flex-grow p-6">
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="p-6">
                <Button
                  onClick={() => handleBecomeSponsor(tier)}
                  className={`w-full ${tier.featured ? "bg-white text-purple-900 hover:bg-gray-100" : "bg-purple-700 hover:bg-purple-600"}`}
                  size="lg"
                >
                  Become {tier.name} Sponsor
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Custom Sponsorship Packages Available
          </h2>
          <p className="max-w-2xl mx-auto mb-6">
            We can create tailored sponsorship opportunities to meet your
            specific marketing objectives and budget requirements.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="text-white border-white hover:bg-white hover:text-purple-900"
          >
            Contact Us for Custom Options
          </Button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              Apply for {selectedTier?.name} Sponsorship
            </DialogTitle>
            <DialogDescription>
              {session?.user && (
                <div className="mb-2">
                  <p className="font-medium">
                    Applying as: {session.user.name}
                  </p>
                  <p className="text-sm">{session.user.email}</p>
                </div>
              )}
              {selectedTier && (
                <div className="mb-2">
                  <p className="font-bold">
                    Amount: ${selectedTier.price.toLocaleString()}
                  </p>
                </div>
              )}
              Please choose your payment method and provide any additional
              information.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="additionalInfo">Additional Information</Label>
              <Input
                id="additionalInfo"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="Any special requests or information"
              />
            </div>

            <div className="grid gap-2">
              <Label>Payment Method</Label>
              <Select
                value={paymentMethod}
                onValueChange={(value: "web" | "ecocash" | "onemoney") =>
                  setPaymentMethod(value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web">Paynow Web</SelectItem>
                  <SelectItem value="ecocash">Ecocash</SelectItem>
                  <SelectItem value="onemoney">OneMoney</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(paymentMethod === "ecocash" || paymentMethod === "onemoney") && (
              <div className="grid gap-2">
                <Label>Mobile Number</Label>
                <Input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder={`Enter your ${paymentMethod === "ecocash" ? "Econet" : "NetOne"} number`}
                />
              </div>
            )}

            {paymentInitiated && paymentInstructions && (
              <div className="p-4 bg-gray-100 rounded-md">
                <h4 className="font-medium mb-2">Payment Instructions</h4>
                <p className="whitespace-pre-line">{paymentInstructions}</p>
                <p className="mt-2 text-sm text-gray-600">
                  You'll receive a prompt on your phone to complete the payment.
                </p>
              </div>
            )}

            {paymentError && (
              <p className="text-red-500 text-sm font-medium">{paymentError}</p>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => {
                setIsDialogOpen(false);
                setPaymentInitiated(false);
              }}
              disabled={isProcessingPayment}
            >
              Cancel
            </Button>
            {!paymentInitiated ? (
              <Button
                onClick={handlePayment}
                disabled={
                  isProcessingPayment ||
                  (paymentMethod !== "web" && !mobileNumber)
                }
                className="bg-purple-700 hover:bg-purple-600 text-white"
              >
                {isProcessingPayment ? (
                  <div className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  `Pay $${selectedTier?.price.toLocaleString()}`
                )}
              </Button>
            ) : (
              <Button
                onClick={() => window.location.reload()}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Done
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Sponsors;
