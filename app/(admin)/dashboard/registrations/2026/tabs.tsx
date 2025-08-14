"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Star, User } from "lucide-react";
import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";

export function RegistryPage() {
  const [activeTab, setActiveTab] = useState("attendees");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/registration/next?type=${activeTab}`
        );
        const result = await response.json();
        if (response.ok) {
          setData(result);
        } else {
          console.error("Failed to fetch data:", result.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  const getTabContent = () => {
    if (loading) {
      return (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      );
    }

    if (data.length === 0) {
      return (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">No {activeTab} registered yet</p>
        </div>
      );
    }

    return <DataTable columns={columns} data={data} />;
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">2026 Event Registrations</h1>
        <Badge variant="outline" className="text-sm py-1 px-3">
          Total: {data.length}
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="attendees">
            <User className="w-4 h-4 mr-2" />
            Attendees
          </TabsTrigger>
          <TabsTrigger value="exhibitors">
            <Building2 className="w-4 h-4 mr-2" />
            Exhibitors
          </TabsTrigger>
          <TabsTrigger value="sponsors">
            <Star className="w-4 h-4 mr-2" />
            Sponsors
          </TabsTrigger>
        </TabsList>

        <TabsContent value="attendees">
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Attendee Registrations</CardTitle>
            </CardHeader>
            <CardContent>{getTabContent()}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exhibitors">
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Exhibitor Registrations</CardTitle>
            </CardHeader>
            <CardContent>{getTabContent()}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sponsors">
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Sponsor Registrations</CardTitle>
            </CardHeader>
            <CardContent>{getTabContent()}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
