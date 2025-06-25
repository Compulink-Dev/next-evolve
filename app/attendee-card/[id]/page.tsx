// app/attendee/[id]/page.tsx
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/connectToDB";
import attendeeCard from "@/models/attendeeCard";
import ClientAttendeePage from "./ClientAttendeePage";

export default async function AttendeePage({
  params,
}: {
  params: { id: string };
}) {
  await connectDB();

  const attendee = await attendeeCard.findById(params.id).lean();

  if (!attendee) {
    return notFound();
  }

  return <ClientAttendeePage attendee={JSON.parse(JSON.stringify(attendee))} />;
}
