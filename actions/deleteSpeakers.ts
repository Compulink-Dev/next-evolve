'use server'

export async function deleteSpeaker(id: string) {
  const baseUrl = process.env.API_ROUTE || 'http://localhost:3000/api';
  try {
    const res = await fetch(`${baseUrl}/speakers?id=${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Failed to delete speaker");
    }
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}