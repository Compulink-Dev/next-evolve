"use client";

import { useEffect, useRef, useState } from "react";
import RegisterCard from "@/components/RegisterCard";
import html2canvas from "html2canvas";

interface Attendee {
  _id: string;
  name: string;
  organization: string;
  imageUrl: string;
}

export default function ClientAttendeePage({
  attendee,
}: {
  attendee: Attendee;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [generatedPng, setGeneratedPng] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const [publicUrl, setPublicUrl] = useState("");

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      // Check for Web Share API support
      setCanShare(!!navigator.share);
      // Set public URL (replace with your actual deployed URL in production)
      setPublicUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setCanShare(!!navigator.share);
      checkAutoDownload();
    }
  }, []);

  const checkAutoDownload = () => {
    const shouldAutoDownload = localStorage.getItem("autoDownload");
    if (shouldAutoDownload === "true") {
      localStorage.removeItem("autoDownload");
      generateAndDownloadPng();
    }
  };

  const generatePng = async () => {
    if (!cardRef.current) return null;

    setIsGenerating(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      const pngUrl = canvas.toDataURL("image/png");
      setGeneratedPng(pngUrl);
      return pngUrl;
    } catch (err) {
      console.error("Error generating PNG:", err);
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const generateAndDownloadPng = async () => {
    const pngUrl = await generatePng();
    if (!pngUrl) return;

    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `EVOLVE-ICT-Attendee-Card-${attendee.name || "attendee"}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const downloadPng = async () => {
    if (!generatedPng) {
      const png = await generatePng();
      if (!png) return;
    }

    // iOS-specific handling
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      // Create a new window with the image
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Download Attendee Card</title>
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin:0;padding:0;display:flex;justify-content:center;align-items:center;height:100vh;">
              <img src="${generatedPng}" style="max-width:100%;max-height:100%;" />
              <p style="position:absolute;bottom:20px;text-align:center;">
                Press and hold the image to save it
              </p>
            </body>
          </html>
        `);
        newWindow.document.close();
      }
    } else {
      // Standard download for other devices
      const downloadLink = document.createElement("a");
      downloadLink.href = generatedPng!;
      downloadLink.download = `EVOLVE-ICT-Attendee-Card-${attendee.name || "attendee"}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const shareOnSocialMedia = async (platform: string) => {
    setIsGenerating(true);

    try {
      // Generate PNG if not already available
      const pngToShare = generatedPng || (await generatePng());
      if (!pngToShare) {
        console.error("Failed to generate PNG");
        return;
      }

      const text = `Evolve ICT Summit`;
      const publicUrl = `https://www.facebook.com/share/16UPfqWroj/`;
      const encodedText = encodeURIComponent(text);
      const encodedUrl = encodeURIComponent(publicUrl);
      const encodedImageUrl = attendee.imageUrl
        ? encodeURIComponent(attendee.imageUrl)
        : "";

      // Convert data URL to blob
      const blob = await fetch(pngToShare).then((res) => res.blob());
      const file = new File([blob], "attendee-card.png", { type: "image/png" });

      // Platform-specific sharing
      switch (platform) {
        case "facebook":
          // Try Web Share API first
          if (navigator.share) {
            try {
              await navigator.share({
                title: "My Attendee Card",
                text: text,
                files: [file],
              });
              return;
            } catch (err) {
              console.log("Web Share cancelled, falling back to URL");
            }
          }
          // Fallback to URL sharing
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&picture=${encodedImageUrl}&quote=${encodedText}`,
            "_blank",
            "width=580,height=400"
          );
          break;

        case "linkedin":
          // LinkedIn only supports URL sharing
          window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            "_blank",
            "width=550,height=420"
          );
          break;

        case "whatsapp":
          // Try Web Share API first
          if (navigator.share) {
            try {
              await navigator.share({
                title: "My Attendee Card",
                text: text,
                files: [file],
              });
              return;
            } catch (err) {
              console.log("Web Share cancelled, falling back to URL");
            }
          }
          // Fallback to URL sharing
          window.open(
            `https://wa.me/?text=${encodedText}%0A%0A${publicUrl}%0A%0A${encodedImageUrl ? `Image: ${encodedImageUrl}` : ""}`,
            "_blank",
            "width=800,height=600"
          );
          break;

        case "twitter":
          window.open(
            `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}&hashtags=EvolveICT`,
            "_blank",
            "width=550,height=420"
          );
          break;

        case "native":
          if (navigator.share) {
            try {
              await navigator.share({
                title: "My Attendee Card",
                text: text,
                files: [file],
              });
            } catch (err) {
              console.log("Web Share cancelled:", err);
            }
          }
          break;

        default:
          console.warn("Unknown platform:", platform);
      }
    } catch (err) {
      console.error("Sharing error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <div className="mb-8 w-full max-w-md" ref={cardRef}>
        <RegisterCard
          name={attendee.name}
          organization={attendee.organization}
          imageUrl={attendee.imageUrl}
        />
      </div>

      <div className="flex flex-col items-center gap-4 w-full max-w-md">
        <div className="w-full">
          <h3 className="text-sm font-medium text-gray-700 mb-2 text-center">
            Attach image & Share your attendee card
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {canShare && (
              <button
                onClick={() => shareOnSocialMedia("native")}
                disabled={isGenerating}
                className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? "Sharing..." : "Share"}
              </button>
            )}
            <button
              onClick={() => shareOnSocialMedia("twitter")}
              disabled={isGenerating}
              className="flex items-center justify-center gap-2 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white py-2 px-3 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
              Twitter
            </button>
            <button
              onClick={() => shareOnSocialMedia("facebook")}
              disabled={isGenerating}
              className="flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#166fe5] text-white py-2 px-3 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
              Facebook
            </button>
            <button
              onClick={() => shareOnSocialMedia("linkedin")}
              disabled={isGenerating}
              className="flex items-center justify-center gap-2 bg-[#0A66C2] hover:bg-[#0956a7] text-white py-2 px-3 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
              </svg>
              LinkedIn
            </button>
            <button
              onClick={() => shareOnSocialMedia("whatsapp")}
              disabled={isGenerating}
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white py-2 px-3 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335 .157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </button>
          </div>
        </div>

        <button
          onClick={downloadPng}
          disabled={isGenerating}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            generatedPng
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50`}
        >
          {isGenerating
            ? "Generating..."
            : generatedPng
              ? "Download PNG"
              : "Generate PNG"}
        </button>
      </div>
    </div>
  );
}
