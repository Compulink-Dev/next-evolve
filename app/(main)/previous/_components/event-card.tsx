import { FC } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface EventCardProps {
    title: string;
    description: string;
    date: string;
    imageUrl: string;
    onLearnMore: () => void;  // Update prop for Learn More button
}

const EventCard: FC<EventCardProps> = ({ title, description, date, imageUrl, onLearnMore }) => {
    return (
        <Card className="w-full max-w-md shadow-lg rounded-lg overflow-hidden bg-transparent">
            <CardHeader>
                <Image
                    src={imageUrl}
                    alt={title}
                    width={400}
                    height={200}
                    className="object-contain w-full h-48"
                />
            </CardHeader>

            <CardContent className="p-4">
                <CardTitle className="text-xl font-bold text-white">{title}</CardTitle>
                <CardDescription className="text-gray-500">{date}</CardDescription>
                <p className="mt-2 text-gray-600">{description}</p>
            </CardContent>

            <CardFooter className="p-4 flex justify-end">
                <Button className="bg-blue-600 hover:bg-blue-400" variant="default" onClick={onLearnMore}>Learn More</Button>
            </CardFooter>
        </Card>
    );
};

export default EventCard;
