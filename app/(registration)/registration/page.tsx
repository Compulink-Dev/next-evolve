"use client";

import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { countries } from "@/constant/data";
import Title from "@/app/(main)/_components/title";
import { X } from "lucide-react";
import {
  onlineRegistrationSchema,
  offlineRegistrationSchema,
  type OnlineRegistrationFormData,
  type OfflineRegistrationFormData,
  UserRole,
} from "@/lib/validators";
import { signIn } from "next-auth/react";

export default function Registration() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "attendee";
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const parsedRole = UserRole.safeParse(role);
  const [mode, setMode] = useState<"online" | "offline">("online");
  const defaultRole = parsedRole.success ? parsedRole.data : "attendee";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<OnlineRegistrationFormData | OfflineRegistrationFormData>({
    resolver: zodResolver(
      mode === "online" ? onlineRegistrationSchema : offlineRegistrationSchema
    ),
    defaultValues: {
      type: defaultRole,
      mode: "online",
    },
  });

  useEffect(() => {
    if (defaultRole) {
      setValue("type", defaultRole);
    }
  }, [defaultRole, setValue]);

  const onSubmit: SubmitHandler<
    OnlineRegistrationFormData | OfflineRegistrationFormData
  > = async (data) => {
    setLoading(true);
    try {
      const payload = { ...data, email: data.email.toLowerCase() };
      console.log("Payload:", JSON.stringify(payload, null, 2));

      const res = await fetch(`/api/registration`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseData = await res.json();

      if (res.ok) {
        toast.success("Registration Successful");

        if (mode === "online") {
          const onlineData = data as OnlineRegistrationFormData;
          await signIn("credentials", {
            email: data.email,
            password: onlineData.password,
            callbackUrl: `/${data.type}`,
          });
        } else {
          window.location.href =
            responseData.redirectUrl || "/sign-in?registered=true";
        }
      } else {
        toast.error(responseData.error || "Registration failed");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const currentMode = watch("mode");

  // Function to handle downloading the offline registration form
  const handleDownloadForm = () => {
    // Path to your document in the public folder
    const formPath = `/register.pdf`;

    // Create a temporary anchor element to trigger the download
    const link = document.createElement("a");
    link.href = formPath;
    link.download = `register.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-purple-900 md:h-screen">
      <div className="max-w-4xl mx-auto p-8 text-slate-400">
        <div className="flex items-center justify-between">
          <Title
            title={`${role.charAt(0).toUpperCase() + role.slice(1)} Registration`}
          />
          <Button onClick={() => router.back()} variant="ghost">
            <X />
          </Button>
        </div>

        <div className="flex flex-col md:flex-row mt-4 gap-4 mb-6">
          <Button
            variant={mode === "online" ? "default" : "outline"}
            onClick={() => {
              setMode("online");
              setValue("mode", "online");
            }}
          >
            Online Registration
          </Button>
          <Button
            variant={mode === "offline" ? "default" : "outline"}
            onClick={() => {
              setMode("offline"); // Add this line
              setValue("mode", "offline");
            }}
          >
            Offline Registration
          </Button>
        </div>

        {mode === "online" ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <input type="hidden" {...register("type")} />
            <input type="hidden" {...register("mode")} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>First Name</Label>
                <Input
                  {...register("firstName")}
                  placeholder="Enter your first name"
                  className="bg-transparent placeholder:text-slate-400"
                />
                {errors.firstName && (
                  <span className="text-red-600 text-xs">
                    {errors.firstName.message}
                  </span>
                )}
              </div>

              <div>
                <Label>Last Name</Label>
                <Input
                  {...register("lastName")}
                  placeholder="Enter your last name"
                  className="bg-transparent placeholder:text-slate-400"
                />
                {errors.lastName && (
                  <span className="text-red-600 text-xs">
                    {errors.lastName.message}
                  </span>
                )}
              </div>

              <div>
                <Label>Job Title</Label>
                <Input
                  {...register("jobTitle")}
                  placeholder="Enter your job title"
                  className="bg-transparent placeholder:text-slate-400"
                />
                {errors.jobTitle && (
                  <span className="text-red-600 text-xs">
                    {errors.jobTitle.message}
                  </span>
                )}
              </div>

              <div>
                <Label>Company</Label>
                <Input
                  {...register("company")}
                  placeholder="Enter your company name"
                  className="bg-transparent placeholder:text-slate-400"
                />
                {errors.company && (
                  <span className="text-red-600 text-xs">
                    {errors.company.message}
                  </span>
                )}
              </div>

              <div>
                <Label>Email</Label>
                <Input
                  {...register("email")}
                  placeholder="Enter your email address"
                  className="bg-transparent placeholder:text-slate-400"
                />
                {errors.email && (
                  <span className="text-red-600">{errors.email.message}</span>
                )}
              </div>

              {currentMode === "online" && (
                <>
                  <div>
                    <Label>Password</Label>
                    <Input
                      {...register("password")}
                      placeholder="Enter your password"
                      type="password"
                      className="bg-transparent placeholder:text-slate-400"
                    />
                    {(errors as any).password && (
                      <span className="text-red-600 text-xs">
                        {(errors as any).password.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <Label>Confirm Password</Label>
                    <Input
                      {...register("confirmPassword")}
                      placeholder="Confirm your password"
                      type="password"
                      className="bg-transparent placeholder:text-slate-400"
                    />
                    {(errors as any).confirmPassword && (
                      <span className="text-red-600 text-xs">
                        {(errors as any).confirmPassword.message}
                      </span>
                    )}
                  </div>
                </>
              )}

              <div>
                <Label>Phone Number</Label>
                <Input
                  {...register("phoneNumber")}
                  placeholder="Enter your phone number"
                  className="bg-transparent placeholder:text-slate-400"
                />
                {errors.phoneNumber && (
                  <span className="text-red-600">
                    {errors.phoneNumber.message}
                  </span>
                )}
              </div>

              <div>
                <Label>Country/Region</Label>
                <select
                  {...register("country")}
                  className="w-full bg-transparent border p-2 rounded-lg"
                >
                  {countries.map((country) => (
                    <option key={country.name} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <span className="text-red-600 text-xs">
                    {errors.country.message}
                  </span>
                )}
              </div>

              <div>
                <Label>State/Province</Label>
                <Input
                  {...register("state")}
                  placeholder="Enter your state or province"
                  className="bg-transparent placeholder:text-slate-400"
                />
                {errors.state && (
                  <span className="text-red-600 text-xs">
                    {errors.state.message}
                  </span>
                )}
              </div>

              <div>
                <Label>Industry</Label>
                <Input
                  {...register("industry")}
                  placeholder="Enter your industry"
                  className="bg-transparent placeholder:text-slate-400"
                />
                {errors.industry && (
                  <span className="text-red-600 text-xs">
                    {errors.industry.message}
                  </span>
                )}
              </div>

              <div>
                <Label>Company Size</Label>
                <select
                  {...register("companySize")}
                  className="w-full bg-transparent border p-2 rounded-lg"
                >
                  <option value=""></option>
                  <option value="Micro Enterprise: 1-9 employees">
                    Micro Enterprise: 1-9 employees
                  </option>
                  <option value="Small Enterprise: 10-49 employees">
                    Small Enterprise: 10-49 employees
                  </option>
                  <option value="Medium Enterprise: 50-249 employees">
                    Medium Enterprise: 50-249 employees
                  </option>
                  <option value="Large Enterprise: 250-999 employees">
                    Large Enterprise: 250-999 employees
                  </option>
                  <option value="Enterprise: 1000+ employees">
                    Enterprise: 1000+ employees
                  </option>
                </select>
                {errors.companySize && (
                  <span className="text-red-600 text-xs">
                    {errors.companySize.message}
                  </span>
                )}
              </div>

              {role === "sponsor" && (
                <div>
                  <Label>Sponsorship Level</Label>
                  <select
                    {...register("sponsorshipLevel")}
                    className="w-full bg-transparent border p-2 rounded-lg"
                  >
                    <option value=""></option>
                    <option value="Platinum">Platinum</option>
                    <option value="Gold">Gold</option>
                    <option value="Silver">Silver</option>
                    <option value="Bronze">Bronze</option>
                    <option value="Startup">Startup</option>
                  </select>
                  {(errors as any).sponsorshipLevel && (
                    <span className="text-red-600 text-xs">
                      {(errors as any).sponsorshipLevel.message}
                    </span>
                  )}
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full mt-4 bg-purple-950 hover:bg-purple-700"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        ) : (
          <div className="bg-purple-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Offline Registration</h2>
            <p className="mb-4">
              To register offline, please download the registration form below,
              fill it out completely, and submit it to our office.
            </p>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Download Form:</h3>
              <Button
                onClick={handleDownloadForm}
                className="bg-purple-950 hover:bg-purple-700"
              >
                Download {role.charAt(0).toUpperCase() + role.slice(1)}{" "}
                Registration Form
              </Button>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Submission Instructions:</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Download and print the registration form</li>
                <li>Fill out all required fields</li>
                <li>Sign and date the form</li>
                <li>Submit via email or in person to our office</li>
              </ol>
            </div>

            <div className="text-sm text-purple-200">
              <p>
                Need help? Contact our registration team at
                info@evolveictsummit.com
              </p>
            </div>
          </div>
        )}
        <ToastContainer />
      </div>
    </div>
  );
}
