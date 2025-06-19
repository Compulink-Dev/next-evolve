// app/attendee/[id]/page.tsx
import { notFound } from "next/navigation";
import RegisterCard from "@/components/RegisterCard";
import { connectDB } from "@/lib/connectToDB";
import attendeeCard from "@/models/attendeeCard";

interface Attendee {
  _id: string;
  name: string;
  organization: string;
  imageUrl: string;
}

export default async function AttendeePage({
  params,
}: {
  params: { id: string };
}) {
  await connectDB();

  const attendee = (await attendeeCard
    .findById(params.id)
    .lean()) as Attendee | null;

  if (!attendee) {
    return notFound();
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <RegisterCard
        name={attendee.name}
        organization={attendee.organization}
        imageUrl={attendee.imageUrl}
      />
    </div>
  );
}
