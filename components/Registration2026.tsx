"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Loader2, Building2, Star, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function RegistrationForm2026() {
  const [activeTab, setActiveTab] = useState("attendee");
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const initialFormData = {
    attendee: {
      name: "",
      email: "",
      company: "",
      jobTitle: "",
      phone: "",
      interests: [],
    },
    exhibitor: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      boothSize: "10x10",
      products: "",
      employeesAttending: 1,
    },
    sponsor: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      sponsorshipLevel: "silver",
      marketingMaterials: false,
    },
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/registration/next", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: activeTab,
          ...formData[activeTab as keyof typeof formData],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle API validation errors
        if (data.details && Array.isArray(data.details)) {
          const errorMessages = data.details
            .map((err: any) => err.message)
            .join("\n");
          throw new Error(errorMessages);
        }
        throw new Error(data.message || data.error || "Registration failed");
      }

      toast.success("Registration Successful!", {
        description: "Thank you for registering for our 2026 event.",
      });

      setFormData(initialFormData);
    } catch (error: any) {
      toast.error("Registration Failed", {
        description:
          error.message || "There was an error submitting your registration.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    tab: string
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    setFormData((prev) => ({
      ...prev,
      [tab]: {
        ...prev[tab as keyof typeof prev],
        [name]:
          type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      },
    }));
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-800 to-purple-900">
      {/* Only render animated background on client side */}
      {isClient && !shouldReduceMotion && (
        <motion.div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        >
          {[...Array(20)].map((_, i) => {
            // Generate stable keys for each circle
            const key = `circle-${i}`;

            // Use consistent values for server and client
            const width = 50 + Math.sin(i * 100) * 50;
            const height = 50 + Math.cos(i * 100) * 50;
            const top = 10 + ((i * 4) % 80);
            const left = 10 + ((i * 7) % 80);

            return (
              <motion.div
                key={key}
                className="absolute rounded-full bg-purple-400"
                style={{
                  width: `${width}px`,
                  height: `${height}px`,
                  top: `${top}%`,
                  left: `${left}%`,
                }}
                animate={{
                  x: [0, Math.sin(i) * 30],
                  y: [0, Math.cos(i) * 30],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 10 + (i % 10),
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            );
          })}
        </motion.div>
      )}

      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Register for <span className="text-purple-300">2026 Event</span>
          </h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Join us for the most exciting event of 2026! Register as an
            attendee, exhibitor, or sponsor.
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl"
        >
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 bg-transparent p-0 text-red-200">
              <TabsTrigger
                value="attendee"
                className="py-6  data-[state=active]:bg-purple-800/50 data-[state=active]:text-white"
              >
                <User className="mr-2 h-5 w-5" />
                Attendee
              </TabsTrigger>
              <TabsTrigger
                value="exhibitor"
                className="py-6 data-[state=active]:bg-purple-800/50 data-[state=active]:text-white"
              >
                <Building2 className="mr-2 h-5 w-5" />
                Exhibitor
              </TabsTrigger>
              <TabsTrigger
                value="sponsor"
                className="py-6 data-[state=active]:bg-purple-800/50 data-[state=active]:text-white"
              >
                <Star className="mr-2 h-5 w-5" />
                Sponsor
              </TabsTrigger>
            </TabsList>

            <div className="p-6 md:p-8">
              <TabsContent value="attendee">
                <Card className="border-0 bg-transparent text-white shadow-none">
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      Attendee Registration
                    </CardTitle>
                    <CardDescription className="text-purple-200">
                      Join us as an attendee to network and learn from industry
                      leaders.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="attendee-name" className="text-white">
                            Full Name
                          </Label>
                          <Input
                            id="attendee-name"
                            name="name"
                            value={formData.attendee.name}
                            onChange={(e) => handleInputChange(e, "attendee")}
                            placeholder="John Doe"
                            className="bg-white/10 border-white/20 text-white"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="attendee-email"
                            className="text-white"
                          >
                            Email
                          </Label>
                          <Input
                            id="attendee-email"
                            name="email"
                            type="email"
                            value={formData.attendee.email}
                            onChange={(e) => handleInputChange(e, "attendee")}
                            placeholder="john@example.com"
                            className="bg-white/10 border-white/20 text-white"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="attendee-company"
                            className="text-white"
                          >
                            Company
                          </Label>
                          <Input
                            id="attendee-company"
                            name="company"
                            value={formData.attendee.company}
                            onChange={(e) => handleInputChange(e, "attendee")}
                            placeholder="Your Company"
                            className="bg-white/10 border-white/20 text-white"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="attendee-jobTitle"
                            className="text-white"
                          >
                            Job Title
                          </Label>
                          <Input
                            id="attendee-jobTitle"
                            name="jobTitle"
                            value={formData.attendee.jobTitle}
                            onChange={(e) => handleInputChange(e, "attendee")}
                            placeholder="Your Position"
                            className="bg-white/10 border-white/20 text-white"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="attendee-phone"
                            className="text-white"
                          >
                            Phone Number
                          </Label>
                          <Input
                            id="attendee-phone"
                            name="phone"
                            value={formData.attendee.phone}
                            onChange={(e) => handleInputChange(e, "attendee")}
                            placeholder="+1 (555) 123-4567"
                            className="bg-white/10 border-white/20 text-white"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button
                          type="submit"
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                          disabled={isLoading}
                        >
                          {isLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          )}
                          Register as Attendee
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="exhibitor">
                <Card className="border-0 bg-transparent text-white shadow-none">
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      Exhibitor Registration
                    </CardTitle>
                    <CardDescription className="text-purple-200">
                      Showcase your products and services to thousands of
                      attendees.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label
                            htmlFor="exhibitor-companyName"
                            className="text-white"
                          >
                            Company Name
                          </Label>
                          <Input
                            id="exhibitor-companyName"
                            name="companyName"
                            value={formData.exhibitor.companyName}
                            onChange={(e) => handleInputChange(e, "exhibitor")}
                            placeholder="Your Company"
                            className="bg-white/10 border-white/20 text-white"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="exhibitor-contactName"
                            className="text-white"
                          >
                            Contact Person
                          </Label>
                          <Input
                            id="exhibitor-contactName"
                            name="contactName"
                            value={formData.exhibitor.contactName}
                            onChange={(e) => handleInputChange(e, "exhibitor")}
                            placeholder="John Doe"
                            className="bg-white/10 border-white/20 text-white"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="exhibitor-email"
                            className="text-white"
                          >
                            Email
                          </Label>
                          <Input
                            id="exhibitor-email"
                            name="email"
                            type="email"
                            value={formData.exhibitor.email}
                            onChange={(e) => handleInputChange(e, "exhibitor")}
                            placeholder="contact@company.com"
                            className="bg-white/10 border-white/20 text-white"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="exhibitor-phone"
                            className="text-white"
                          >
                            Phone Number
                          </Label>
                          <Input
                            id="exhibitor-phone"
                            name="phone"
                            value={formData.exhibitor.phone}
                            onChange={(e) => handleInputChange(e, "exhibitor")}
                            placeholder="+1 (555) 123-4567"
                            className="bg-white/10 border-white/20 text-white"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="exhibitor-boothSize"
                            className="text-white"
                          >
                            Booth Size Preference
                          </Label>
                          <select
                            id="exhibitor-boothSize"
                            name="boothSize"
                            value={formData.exhibitor.boothSize}
                            onChange={(e) => handleInputChange(e, "exhibitor")}
                            className="flex h-10 w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            required
                          >
                            <option value="10x10">10x10 ft</option>
                            <option value="10x20">10x20 ft</option>
                            <option value="20x20">20x20 ft</option>
                            <option value="custom">
                              Custom (please specify in notes)
                            </option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="exhibitor-employeesAttending"
                            className="text-white"
                          >
                            Number of Employees Attending
                          </Label>
                          <Input
                            id="exhibitor-employeesAttending"
                            name="employeesAttending"
                            type="number"
                            min="1"
                            value={formData.exhibitor.employeesAttending}
                            onChange={(e) => handleInputChange(e, "exhibitor")}
                            className="bg-white/10 border-white/20 text-white"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="exhibitor-products"
                          className="text-white"
                        >
                          Products/Services to Exhibit
                        </Label>
                        <textarea
                          id="exhibitor-products"
                          name="products"
                          value={formData.exhibitor.products}
                          onChange={(e) => handleInputChange(e, "exhibitor")}
                          rows={3}
                          className="flex w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Briefly describe what you'll be exhibiting"
                          required
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button
                          type="submit"
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                          disabled={isLoading}
                        >
                          {isLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          )}
                          Register as Exhibitor
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sponsor">
                <Card className="border-0 bg-transparent text-white shadow-none">
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      Sponsor Registration
                    </CardTitle>
                    <CardDescription className="text-purple-200">
                      Gain visibility and connect with your target audience
                      through sponsorship.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label
                            htmlFor="sponsor-companyName"
                            className="text-white"
                          >
                            Company Name
                          </Label>
                          <Input
                            id="sponsor-companyName"
                            name="companyName"
                            value={formData.sponsor.companyName}
                            onChange={(e) => handleInputChange(e, "sponsor")}
                            placeholder="Your Company"
                            className="bg-white/10 border-white/20 text-white"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="sponsor-contactName"
                            className="text-white"
                          >
                            Contact Person
                          </Label>
                          <Input
                            id="sponsor-contactName"
                            name="contactName"
                            value={formData.sponsor.contactName}
                            onChange={(e) => handleInputChange(e, "sponsor")}
                            placeholder="John Doe"
                            className="bg-white/10 border-white/20 text-white"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sponsor-email" className="text-white">
                            Email
                          </Label>
                          <Input
                            id="sponsor-email"
                            name="email"
                            type="email"
                            value={formData.sponsor.email}
                            onChange={(e) => handleInputChange(e, "sponsor")}
                            placeholder="contact@company.com"
                            className="bg-white/10 border-white/20 text-white"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sponsor-phone" className="text-white">
                            Phone Number
                          </Label>
                          <Input
                            id="sponsor-phone"
                            name="phone"
                            value={formData.sponsor.phone}
                            onChange={(e) => handleInputChange(e, "sponsor")}
                            placeholder="+1 (555) 123-4567"
                            className="bg-white/10 border-white/20 text-white"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="sponsor-sponsorshipLevel"
                            className="text-white"
                          >
                            Sponsorship Level
                          </Label>
                          <select
                            id="sponsor-sponsorshipLevel"
                            name="sponsorshipLevel"
                            value={formData.sponsor.sponsorshipLevel}
                            onChange={(e) => handleInputChange(e, "sponsor")}
                            className="flex h-10 w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            required
                          >
                            <option value="silver">Silver ($5,000)</option>
                            <option value="gold">Gold ($10,000)</option>
                            <option value="platinum">Platinum ($25,000)</option>
                            <option value="diamond">Diamond ($50,000+)</option>
                          </select>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="sponsor-marketingMaterials"
                            name="marketingMaterials"
                            checked={formData.sponsor.marketingMaterials}
                            onChange={(e) => handleInputChange(e, "sponsor")}
                            className="h-4 w-4 rounded border-white/20 bg-white/10 text-purple-600 focus:ring-purple-500"
                          />
                          <Label
                            htmlFor="sponsor-marketingMaterials"
                            className="text-white"
                          >
                            Would you like to distribute marketing materials?
                          </Label>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button
                          type="submit"
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                          disabled={isLoading}
                        >
                          {isLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          )}
                          Register as Sponsor
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
