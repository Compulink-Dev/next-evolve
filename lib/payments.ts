// lib/payments.ts

import Purchase from "@/models/purchase";
import { connectDB } from "./connectToDB";


export async function checkUserAccess(userId: string, eventId: string): Promise<boolean> {
  try {
    await connectDB(); // Connect to your database
    
    // Check if there's a completed purchase for this user and event
    const purchase = await Purchase.findOne({
      userId,
      eventId,
      status: 'completed',
    }).exec();

    return !!purchase;
  } catch (error) {
    console.error('Error checking user access:', error);
    return false;
  }
}