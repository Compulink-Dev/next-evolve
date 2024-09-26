import Image from "next/image";
import React, { ReactNode } from "react";
import { Colors } from "@/constant/colors";
import { sectors } from "@/constant/data";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"; // Assuming you have a tabs component
import Title from "@/app/(main)/_components/title";

const Card = ({ children }: { children: ReactNode }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-52 md:mt-8">{children}</div>
);

const ObjectiveSection = ({
  title,
  description,
  image,
  color,
  children,
}: {
  title: string;
  description: string;
  image: string;
  color: string;
  children?: ReactNode;
}) => (
  <Card>
    <Image
      unoptimized
      src={image}
      width={500}
      height={100}
      alt={title}
      className="w-full rounded shadow"
    />
    <div className="flex flex-col justify-center items-start">
      <h1 className={`font-bold text-2xl ${color}`}>{title}</h1>
      <p className="text-sm mt-4">{description}</p>
      {children}
    </div>
  </Card>
);

function Objectives() {
  return (
    <div className="container mx-auto flex flex-col gap-8 p-8" style={{ color: Colors.text, background: Colors.primary }}>
      <Title title="OBJECTIVES WE WANT TO ACHIEVE THROUGH EVOLVE ICT SUMMIT" color="text-white" />
      <Tabs defaultValue="collaboration" className="w-full">
        <TabsList className="grid grid-cols-1 md:grid-cols-5 gap-2 bg-blue-950 text-white">
          <TabsTrigger
            value="collaboration"
            className="data-[state=active]:bg-purple-600  rounded-md"
          >
            Collaboration
          </TabsTrigger>
          <TabsTrigger
            value="mentorship"
            className="data-[state=active]:bg-purple-600  rounded-md"
          >
            Mentorship
          </TabsTrigger>
          <TabsTrigger
            value="awareness"
            className="data-[state=active]:bg-purple-600  rounded-md"
          >
            Awareness
          </TabsTrigger>
          <TabsTrigger
            value="exposure"
            className="data-[state=active]:bg-purple-600  rounded-md"
          >
            Exposure
          </TabsTrigger>
          <TabsTrigger
            value="knowledge"
            className="data-[state=active]:bg-purple-600 rounded-md"
          >
            Knowledge Base
          </TabsTrigger>
        </TabsList>

        <TabsContent value="collaboration">
          <ObjectiveSection
            title="COLLABORATION"
            description="ICT is the key that links all sectors of industry. As such, Evolve ICT SUMMIT will bridge the digital divide across Government, Private Sector, diverse industry sectors, and institutions."
            image="/collab.jpg"
            color="text-purple-500"
          >
            <h1 className="font-bold text-lg my-4 text-purple-500">IDENTIFIED INDUSTRY SECTORS AND INSTITUTIONS</h1>
            <ol className="px-4 text-sm list-decimal">
              {sectors.map((sector) => (
                <li key={sector.id}>{sector.name}</li>
              ))}
            </ol>
          </ObjectiveSection>
        </TabsContent>

        <TabsContent value="mentorship">
          <ObjectiveSection
            title="MENTORSHIP"
            description="A platform through which the great minds in the ICT Industry in Africa and beyond can mentor and impart knowledge to Africa’s next generation of ICT enthusiasts."
            image="/mentor.jpg"
            color="text-orange-400"
          />
        </TabsContent>

        <TabsContent value="awareness">
          <ObjectiveSection
            title="AWARENESS"
            description="The creation of a platform where relevant ICT possibilities can be harnessed for the advancement of the African continent."
            image="/awareness.jpg"
            color="text-red-500"
          />
        </TabsContent>

        <TabsContent value="exposure">
          <ObjectiveSection
            title="EXPOSURE"
            description="Attract the greatest minds in the ICT Industry in Africa and the world to showcase cutting-edge latest trends in the ICT industry."
            image="/exposure.jpg"
            color="text-blue-600"
          />
        </TabsContent>

        <TabsContent value="knowledge">
          <ObjectiveSection
            title="KNOWLEDGE BASE"
            description="A centralized repository of information, a resource for the dissemination of information online or with the capacity to be put online. This will go a long way in Africa’s knowledge management."
            image="/knowledge.jpg"
            color="text-purple-500"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Objectives;
