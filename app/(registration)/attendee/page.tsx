"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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

export default function AttendeeRegistration() {
  const { data: session } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    seatNumber: "",
    additionalInfo: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<
    "web" | "ecocash" | "onemoney"
  >("web");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const [paymentInstructions, setPaymentInstructions] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPaymentDialogOpen(true);
  };

  const handlePayment = async () => {
    if (!session?.user?.id) return;

    setIsProcessingPayment(true);
    setPaymentError("");

    try {
      const attendeeResponse = await fetch("/api/attendees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id,
          seatNumber: "AUTO-" + Math.floor(Math.random() * 100), // Generate a unique seat number
          status: "pending",
        }),
      });

      if (!attendeeResponse.ok) {
        const errorData = await attendeeResponse.json();
        throw new Error(errorData.error || "Failed to create attendee record");
      }

      const attendee = await attendeeResponse.json();

      // Validate mobile number if needed
      if (paymentMethod !== "web" && !mobileNumber) {
        throw new Error("Please enter your mobile number");
      }

      const payload = {
        paymentMethod,
        mobileNumber: paymentMethod !== "web" ? mobileNumber : undefined,
        email:
          process.env.NODE_ENV === "development"
            ? "digitalpayments@compulink.co.zw"
            : session.user.email,
        tierName: "Attendee",
        tierPrice: 200,
      };

      // Then initiate payment with attendee ID in reference
      const paymentResponse = await fetch("/api/paynow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...payload,
          reference: `Attendee-${attendee._id}-${Date.now()}`,
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

          <Button
            type="submit"
            className="w-full button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Proceed to Payment ($200)"}
          </Button>
        </form>

        {/* Payment Dialog */}
        <Dialog
          open={isPaymentDialogOpen}
          onOpenChange={setIsPaymentDialogOpen}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Attendee Payment</DialogTitle>
              <DialogDescription>
                Complete your $200 payment to register as an attendee
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

              {(paymentMethod === "ecocash" ||
                paymentMethod === "onemoney") && (
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
                    {`  You'll receive a prompt on your phone to complete the
                    payment.`}
                  </p>
                </div>
              )}

              {paymentError && (
                <p className="text-red-500 text-sm font-medium">
                  {paymentError}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-4">
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
                    "Pay $200"
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
    </div>
  );
}
