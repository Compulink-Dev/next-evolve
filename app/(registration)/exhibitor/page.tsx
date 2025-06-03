"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import InteractiveFloorPlan from "../_components/FloorPlan";
import Image from "next/image";
import SessionLayout from "../_components/SessionWrapper";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectBoothPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [selectedBooth, setSelectedBooth] = useState<string | null>(null);
  const [approvedBooths, setApprovedBooths] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [companyName, setCompanyName] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<
    "web" | "ecocash" | "onemoney"
  >("web");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const [paymentInstructions, setPaymentInstructions] = useState("");

  useEffect(() => {
    const fetchApprovedBooths = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/exhibitors");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        const approved = data.exhibitors.map(
          (exhibitor: any) => exhibitor.boothNumber
        );
        setApprovedBooths(approved);
      } catch (error) {
        console.error("Failed to fetch approved booths:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchApprovedBooths();
  }, []);

  const handleBoothSubmit = async () => {
    if (!selectedBooth || !companyName) {
      setPaymentError("Please select a booth and enter your company name");
      return;
    }
    setIsPaymentDialogOpen(true);
  };

  const handlePayment = async () => {
    if (!session?.user?.id || !selectedBooth || !companyName) return;

    setIsProcessingPayment(true);
    setPaymentError("");

    try {
      // First create the exhibitor record
      const exhibitorResponse = await fetch("/api/exhibitors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id,
          companyName,
          boothNumber: selectedBooth,
          additionalInfo,
          status: "pending_payment",
        }),
      });

      if (!exhibitorResponse.ok) {
        const errorData = await exhibitorResponse.json();
        throw new Error(errorData.error || "Failed to create exhibitor record");
      }

      const exhibitor = await exhibitorResponse.json();

      // Validate mobile number if needed
      if (paymentMethod !== "web" && !mobileNumber) {
        throw new Error("Please enter your mobile number");
      }

      const payload = {
        paymentMethod,
        mobileNumber: paymentMethod !== "web" ? mobileNumber : undefined,
        email: session.user.email,
        tierName: "Exhibitor",
        tierPrice: 1000,
        exhibitorId: exhibitor._id,
      };

      // Then initiate payment with exhibitor ID in reference
      const paymentResponse = await fetch("/api/paynow/exhibitor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...payload,
          reference: `Exhibitor-${exhibitor._id}-${Date.now()}`,
        }),
      });

      const paymentData = await paymentResponse.json();

      if (!paymentResponse.ok) {
        throw new Error(paymentData.error || "Payment initiation failed");
      }

      // Handle response
      if (paymentMethod === "web" && paymentData.redirectUrl) {
        window.location.href = paymentData.redirectUrl;
      } else if (paymentMethod !== "web" && paymentData.instructions) {
        setPaymentInstructions(paymentData.instructions);
        setPaymentInitiated(true);
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

  return (
    <SessionLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <Image
              src="/floor_plan_page_1.png"
              alt="HICC Ground Floor Plan"
              width={1200}
              height={600}
              className="w-full rounded-lg shadow-md"
              priority
            />
          </div>

          <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">
              Exhibitor Booth Selection
            </h1>

            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Enter your company name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="additionalInfo">Additional Information</Label>
                <Input
                  id="additionalInfo"
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  placeholder="Any special requirements"
                />
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Available Booths</h2>
              {isLoading ? (
                <div className="text-center py-4">
                  Loading booth availability...
                </div>
              ) : (
                <InteractiveFloorPlan
                  onSelectBooth={(boothId) => setSelectedBooth(boothId)}
                  selectedBooth={selectedBooth}
                  approvedBooths={approvedBooths}
                />
              )}
            </div>

            <div className="flex justify-between items-center">
              <div>
                {selectedBooth && (
                  <p className="font-medium">Selected: Booth {selectedBooth}</p>
                )}
              </div>
              <Button
                onClick={handleBoothSubmit}
                disabled={!selectedBooth || !companyName || isLoading}
              >
                Reserve Booth ($1000)
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Exhibitor Payment</DialogTitle>
            <DialogDescription>
              Complete your $1000 payment to reserve Booth {selectedBooth}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
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
                <Label>Mobile Number *</Label>
                <Input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder={`Enter your ${paymentMethod === "ecocash" ? "Econet" : "NetOne"} number`}
                  required
                />
              </div>
            )}

            {paymentInitiated && paymentInstructions && (
              <div className="p-4 bg-gray-100 rounded-md">
                <h4 className="font-medium mb-2">Payment Instructions</h4>
                <p className="whitespace-pre-line">{paymentInstructions}</p>
                <p className="mt-2 text-sm text-gray-600">
                  {` You'll receive a prompt on your phone to complete the payment.`}
                </p>
              </div>
            )}

            {paymentError && (
              <p className="text-red-500 text-sm font-medium">{paymentError}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsPaymentDialogOpen(false);
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
              >
                {isProcessingPayment ? "Processing..." : "Pay $1000"}
              </Button>
            ) : (
              <Button onClick={() => window.location.reload()}>Done</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SessionLayout>
  );
}
