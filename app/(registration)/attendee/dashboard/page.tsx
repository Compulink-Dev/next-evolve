import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { connectDB } from "@/lib/connectToDB";
import Attendee from "@/models/attendee";
import { getServerSession } from "next-auth";
import SessionLayout from "../../_components/SessionWrapper";

export default async function AttendeeDashboard() {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session)
    return (
      <div className="p-6 text-center text-red-500">
        Please log in to access your dashboard.
      </div>
    );

  const attendee = await Attendee.findOne({ userId: session.user.id });

  if (!attendee) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-semibold mb-2">No Registration Found</h2>
        <p className="text-gray-600">
          {`   You haven't registered as an attendee yet.`}
        </p>
      </div>
    );
  }

  return (
    <SessionLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Attendee Dashboard</h1>

        <div className="bg-white rounded-xl shadow-md p-6 border max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">
            Your Registration Details
          </h2>

          <div className="space-y-3">
            <p>
              <span className="font-medium">Seat Number:</span>{" "}
              <span className="text-blue-600 font-semibold">
                {attendee.seatNumber}
              </span>
            </p>

            <p>
              <span className="font-medium">Status:</span>{" "}
              <span
                className={`inline-block px-2 py-1 rounded-full text-white text-sm ${
                  attendee.status === "approved"
                    ? "bg-green-600"
                    : attendee.status === "pending"
                      ? "bg-yellow-500"
                      : "bg-gray-500"
                }`}
              >
                {attendee.status}
              </span>
            </p>

            <p>
              <span className="font-medium">Additional Info:</span>{" "}
              {attendee.additionalInfo || (
                <span className="text-gray-400 italic">None provided</span>
              )}
            </p>

            <p>
              <span className="font-medium">Registered:</span>{" "}
              {new Date(attendee.createdAt).toLocaleDateString()} @{" "}
              {new Date(attendee.createdAt).toLocaleTimeString()}
            </p>

            {attendee.paymentProof && (
              <div className="mt-4">
                <span className="font-medium block mb-1">Payment Proof:</span>
                <img
                  src={attendee.paymentProof}
                  alt="Payment Proof"
                  className="rounded border w-full max-w-md object-contain"
                />
              </div>
            )}
          </div>

          <div className="mt-6 pt-6 border-t">
            <h3 className="font-medium mb-2">Event Information</h3>
            <p className="text-gray-600">
              Your seat has been reserved. Please bring your confirmation email
              and ID to the event.
            </p>
          </div>
        </div>
      </div>
    </SessionLayout>
  );
}
