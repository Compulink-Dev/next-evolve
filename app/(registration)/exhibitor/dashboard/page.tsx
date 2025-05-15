// app/dashboard/exhibitor/page.tsx
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { connectDB } from "@/lib/connectToDB";
import Exhibitor from "@/models/exhibitor";
import { getServerSession } from "next-auth";
import Image from "next/image";
import SessionLayout from "../../_components/SessionWrapper";

export default async function ExhibitorDashboard() {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session)
    return (
      <div className="p-6 text-center text-red-500">
        Please log in to access your dashboard.
      </div>
    );

  const exhibitor = await Exhibitor.findOne({ userId: session.user.id });

  if (!exhibitor) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-semibold mb-2">No Booth Registered</h2>
        <p className="text-gray-600">You haven’t selected a booth yet.</p>
      </div>
    );
  }

  return (
    <SessionLayout>
      <div className="p-6 ">
        <h1 className="text-3xl font-bold mb-6">Exhibitor Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Floor Plan Image */}
          <div className="rounded-xl overflow-hidden shadow-md border">
            <Image
              src="/floor_plan_page_1.png"
              alt="HICC Floor Plan"
              width={800}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Exhibitor Info */}
          <div className="bg-white rounded-xl shadow-md p-6 border">
            <h2 className="text-xl font-semibold mb-4">Your Booth Details</h2>

            <div className="space-y-3">
              <p>
                <span className="font-medium">Booth Number:</span>{" "}
                <span className="text-blue-600 font-semibold">
                  {exhibitor.boothNumber}
                </span>
              </p>

              <p>
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`inline-block px-2 py-1 rounded-full text-white text-sm ${
                    exhibitor.status === "approved"
                      ? "bg-green-600"
                      : exhibitor.status === "pending"
                        ? "bg-yellow-500"
                        : "bg-gray-500"
                  }`}
                >
                  {exhibitor.status}
                </span>
              </p>

              <p>
                <span className="font-medium">Additional Info:</span>{" "}
                {exhibitor.additionalInfo || (
                  <span className="text-gray-400 italic">None provided</span>
                )}
              </p>

              <p>
                <span className="font-medium">Registered:</span>{" "}
                {new Date(exhibitor.createdAt).toLocaleDateString()} @{" "}
                {new Date(exhibitor.createdAt).toLocaleTimeString()}
              </p>

              {/* Payment Proof Image (Optional) */}
              {exhibitor.paymentProof && (
                <div className="mt-4">
                  <span className="font-medium block mb-1">Payment Proof:</span>
                  <Image
                    src={exhibitor.paymentProof}
                    alt="Payment Proof"
                    width={400}
                    height={300}
                    className="rounded border w-full max-w-md object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SessionLayout>
  );
}
