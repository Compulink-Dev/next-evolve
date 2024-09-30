import { FC } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface SpeakerCardProps {
    name: string;
    bio: string;
    talkTitle: string;
    profileImageUrl: string;
    onLearnMore: () => void; // Function to handle modal opening
}

const SpeakerCard: FC<SpeakerCardProps> = ({ name, bio, talkTitle, profileImageUrl, onLearnMore }) => {
    return (
        <Card className="w-full max-w-md shadow-lg rounded-lg overflow-hidden">
            <CardHeader>
                <Image
                    src={profileImageUrl}
                    alt={name}
                    width={400}
                    height={200}
                    className="object-contain w-full h-48"
                />
            </CardHeader>

            <CardContent className="p-4">
                <CardTitle className="text-xl font-bold">{name}</CardTitle>
                <CardDescription className="text-gray-500">{talkTitle}</CardDescription>
                <p className="mt-2 text-gray-700">{bio}</p>
            </CardContent>

            <CardFooter className="p-4 flex justify-end">
                <Button
                    className="bg-blue-700 hover:bg-blue-500"
                    variant="default" onClick={onLearnMore}>Learn More</Button>
            </CardFooter>
        </Card>
    );
};

export default SpeakerCard;
