// app/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { uploadToCloudinary } from "@/utils/cloudinary";

export default function RegistrationPage() {
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [attendeeId, setAttendeeId] = useState("");
  const [pdfPublicUrl, setPdfPublicUrl] = useState("");
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !organization || !image) {
      setError("Please fill all fields");
      return;
    }

    setIsLoading(true);

    try {
      // Upload image to Cloudinary
      const cloudinaryResponse = await uploadToCloudinary(image);
      const imageUrl = cloudinaryResponse.secure_url;

      // Prepare data for API
      const attendeeData = {
        name: name.trim(),
        organization: organization.trim(),
        imageUrl,
      };

      // Save attendee data and generate PDF
      const response = await fetch("/api/attendee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(attendeeData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Registration failed");
      }

      const data = await response.json();

      // Redirect to attendee card page
      router.push(`/attendee-card/${data._id}`);

      // Optional: You can still keep these state updates if needed elsewhere
      setAttendeeId(data._id || "");
      setPdfPublicUrl(data.publicUrl);
      setSuccess(true);
    } catch (err: any) {
      console.error("Registration error:", err);
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!pdfPublicUrl) {
      setError("No PDF available for download");
      return;
    }

    try {
      const response = await fetch(pdfPublicUrl);
      if (!response.ok) throw new Error("Failed to download PDF");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `EVOLVE-ICT-Attendee-Card-${name}.pdf`;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error("Download error:", error);
      setError("Failed to download PDF. Please try again.");
    }
  };

  const shareOnSocialMedia = (platform: string) => {
    if (!pdfPublicUrl) {
      setError("No shareable link available");
      return;
    }

    const text = `I'm attending EVOLVE ICT Summit 2025! Check out my attendee card. #EVOLVEICT2025`;
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(pdfPublicUrl);

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
          "_blank",
          "width=550,height=420"
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
          "_blank",
          "width=580,height=400"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
          "_blank",
          "width=550,height=420"
        );
        break;
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
          "_blank",
          "width=800,height=600"
        );
        break;
      case "email":
        window.open(
          `mailto:?subject=My EVOLVE ICT Summit 2025 Attendee Card&body=${encodedText}%0A%0A${encodedUrl}`,
          "_blank"
        );
        break;
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="p-8">
            <div className="flex justify-center mb-8">
              <Image
                src="/logo.png"
                alt="Conference Logo"
                width={200}
                height={100}
              />
            </div>
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
              Registration Successful!
            </h1>

            <div className="space-y-6">
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                Thank you for registering for EVOLVE ICT Summit 2025!
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-medium text-gray-800">
                  Your Attendee Card
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={handleDownload}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Download PDF
                  </button>

                  <button
                    onClick={() => router.push(`/attende-card/${attendeeId}`)}
                    className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    View Online
                  </button>
                </div>

                <div className="pt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Share on Social Media
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => shareOnSocialMedia("twitter")}
                      className="flex items-center justify-center gap-2 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white py-2 px-3 rounded text-sm"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                      Twitter
                    </button>

                    <button
                      onClick={() => shareOnSocialMedia("facebook")}
                      className="flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#166fe5] text-white py-2 px-3 rounded text-sm"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                      Facebook
                    </button>

                    <button
                      onClick={() => shareOnSocialMedia("linkedin")}
                      className="flex items-center justify-center gap-2 bg-[#0A66C2] hover:bg-[#0956a7] text-white py-2 px-3 rounded text-sm"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                      </svg>
                      LinkedIn
                    </button>

                    <button
                      onClick={() => shareOnSocialMedia("whatsapp")}
                      className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white py-2 px-3 rounded text-sm"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="flex justify-center mb-8">
            <Image
              src="/logo.png"
              alt="Conference Logo"
              width={200}
              height={100}
            />
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Register for EVOLVE ICT Summit 2025
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Organization
              </label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Profile Photo
              </label>
              <div className="mt-1 flex items-center">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                  {preview ? (
                    <Image
                      src={preview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200"></div>
                  )}
                </div>
                <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="sr-only"
                    required
                  />
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading
                  ? "Registering..."
                  : "Register & Get My Attendee Card"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
