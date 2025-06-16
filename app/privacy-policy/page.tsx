// app/privacy-policy/page.tsx
import Image from "next/image";
import React from "react";

export const metadata = {
  title: "Privacy Policy - Evolve ICT Summit",
  description: "Read the privacy policy for evolveictsummit.com",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="">
      <main className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
        <Image
          src={"./logo.png"}
          alt=""
          width={250}
          height={250}
          className="mb-8"
        />
        <h1 className="text-3xl font-bold mb-6">
          Privacy Policy for Evolve ICT Summit
        </h1>
        <p className="mb-4">
          <strong>Effective Date:</strong> 16/06/2025
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          1. Information We Collect
        </h2>
        <p>
          We may collect the following types of personal and non-personal
          information:
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>Full name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Job title</li>
          <li>Company/organization</li>
          <li>Country and city</li>
          <li>Any other information you voluntarily submit through forms</li>
        </ul>
        <p>Non-Personal Information:</p>
        <ul className="list-disc ml-6 mb-4">
          <li>IP address</li>
          <li>Browser type and version</li>
          <li>Pages visited and time spent on site</li>
          <li>Device information</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc ml-6 mb-4">
          <li>Register attendees, sponsors, exhibitors, and speakers</li>
          <li>Send event updates, confirmations, and newsletters</li>
          <li>Respond to inquiries or requests</li>
          <li>Improve our website and services</li>
          <li>Enforce our terms, protect rights, and prevent fraud</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          3. Sharing of Your Information
        </h2>
        <ul className="list-disc ml-6 mb-4">
          <li>
            We do not sell, trade, or rent your personal information to third
            parties.
          </li>
          <li>
            Service providers involved in event logistics, email, or analytics
          </li>
          <li>Partners or sponsors (with your consent)</li>
          <li>Government or law enforcement when required by law</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          4. Cookies and Tracking
        </h2>
        <p className="mb-4">
          We use cookies to enhance your experience. You may disable cookies in
          your browser settings, though this may affect functionality.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Data Security</h2>
        <p className="mb-4">
          We take steps to protect your data, but no method of internet
          transmission is 100% secure.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Your Rights</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>Access, correct, or delete your personal data</li>
          <li>Withdraw consent at any time</li>
          <li>Object to or restrict processing</li>
          <li>Lodge complaints with a data protection authority</li>
        </ul>
        <p className="mb-4">
          Contact us at: <strong>info@evolveictsummit.com</strong>
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          7. Third-Party Links
        </h2>
        <p className="mb-4">
          We are not responsible for third-party privacy practices or content.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          8. Children's Privacy
        </h2>
        <p className="mb-4">
          We do not knowingly collect personal information from children under
          16.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          9. Updates to This Policy
        </h2>
        <p className="mb-4">
          We may update this Privacy Policy. Changes will be reflected on this
          page.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">10. Contact Us</h2>
        <p className="mb-4">
          Email: <strong>info@evolveictsummit.com</strong>
          <br />
          Website:{" "}
          <a className="text-blue-500" href="https://www.evolveictsummit.com">
            www.evolveictsummit.com
          </a>
        </p>
      </main>
    </div>
  );
}
