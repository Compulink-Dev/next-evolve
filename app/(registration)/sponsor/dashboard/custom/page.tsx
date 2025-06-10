import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/connectToDB";
import CustomSponsorship from "@/models/customSponsorship";
import { redirect } from "next/navigation";
import SponsorshipTable from "../../_components/SponsorshipTable";

export default async function AdminSponsorships() {
  const { userId } = auth();

  // Redirect if not admin
  if (userId !== process.env.ADMIN_ID) {
    redirect("/");
  }

  await connectDB();
  const sponsorships = await CustomSponsorship.find().sort({ createdAt: -1 });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Sponsorship Requests</h1>
      <SponsorshipTable data={sponsorships} />
    </div>
  );
}
