"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { countries } from "@/constant/data";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Title from "@/app/(main)/_components/title";
import { X } from "lucide-react";
import {
  onlineRegistrationSchema,
  OnlineRegistrationFormData,
} from "@/lib/validators";
import bcrypt from "bcryptjs";

export default function SponsorRegistration() {
  const { isLoaded, signUp } = useSignUp();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"online" | "offline">("online");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OnlineRegistrationFormData>({
    resolver: zodResolver(onlineRegistrationSchema),
    defaultValues: {
      type: "sponsor",
      mode: "online",
      sponsorshipLevel: "",
    },
  });

  const onSubmit: SubmitHandler<OnlineRegistrationFormData> = async (data) => {
    setLoading(true);
    try {
      const payload = { ...data };

      if (mode === "online") {
        // Create a new object without confirmPassword
        const { confirmPassword, ...rest } = payload;
        const finalPayload = rest;

        // Create user in Clerk
        //@ts-expect-error
        const result = await signUp.create({
          emailAddress: payload.email,
          password: payload.password,
          firstName: payload.firstName,
          lastName: payload.lastName,
        });

        console.log("Sending payload:", JSON.stringify(finalPayload, null, 2));

        const res = await fetch(`/api/registration`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalPayload),
        });
        // ... rest of your code
      } else {
        // Handle offline mode
        const res = await fetch(`/api/registration`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      console.log("Sending payload:", JSON.stringify(payload, null, 2));

      const res = await fetch(`/api/registration`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseData = await res.json();
      console.log("API response:", responseData);

      if (res.ok) {
        toast.success("Registration Successful");
        router.push("/selection");
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Registration failed");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-purple-900 h-screen">
      <div className="max-w-4xl mx-auto p-8 text-slate-400 ">
        <div className="flex items-center justify-between">
          <Title title="Sponsor Registration" />
          <Button onClick={() => router.back()} variant={"ghost"}>
            <X />
          </Button>
        </div>

        <div className="flex gap-4 mb-6">
          <Button
            className="button"
            variant={mode === "online" ? "default" : "outline"}
            onClick={() => setMode("online")}
          >
            Online Registration
          </Button>
          <Button
            className="button"
            variant={mode === "offline" ? "default" : "outline"}
            onClick={() => setMode("offline")}
          >
            Offline Registration
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <input type="hidden" {...register("type")} value="sponsor" />
          <input type="hidden" {...register("mode")} value={mode} />

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

            {mode === "online" && (
              <>
                <div>
                  <Label>Password</Label>
                  <Input
                    {...register("password")}
                    placeholder="Enter your password"
                    type="password"
                    className="bg-transparent placeholder:text-slate-400"
                  />
                  {errors.password && (
                    <span className="text-red-600 text-xs">
                      {errors.password.message}
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
                  {errors.confirmPassword && (
                    <span className="text-red-600 text-xs">
                      {errors.confirmPassword.message}
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
              </select>
              {errors.sponsorshipLevel && (
                <span className="text-red-600 text-xs">
                  {errors.sponsorshipLevel.message}
                </span>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full mt-4 bg-purple-950 hover:bg-purple-700"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}
