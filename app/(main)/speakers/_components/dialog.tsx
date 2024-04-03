import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image";


const Speak = ({ imageUrl, name, desc, pos }: any) => {
    return (
        <div
            className="mx-8 flex justify-between mb-8">
            <div className="border border-white w-full h-full rounded text-white flex flex-col justify-between">
                <div className="flex items-center justify-center p-4">
                    <Image
                        src={imageUrl}
                        alt={name}
                        width={180}
                        height={180}
                        className='rounded-full p-4 bg-white'
                    />
                </div>
                <hr />
                <div className="p-8 text-center h-full text-sm bg-gradient-to-br from-blue-950 via-blue-600 to-blue-300 bg-blue-600 flex flex-col gap-2 items-center justify-center">
                    <p className="font-bold text-lg">{name}</p>
                    <p className="">{pos}</p>
                    <p className="font-bold text-lg">{desc}</p>
                </div>
            </div>
        </div>
    )
}

export async function SpeakerDialog({ id, name, pos, desc, imageUrl, bio }: any) {


    return (
        <Dialog >
            <DialogTrigger asChild>
                {/* <Button variant="outline">View Profile</Button> */}
                <Speak
                    name={name}
                    pos={pos}
                    desc={desc}
                    imageUrl={imageUrl}
                />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                    <div className="flex gap-4 items-center">
                        <div className="flex items-center justify-center p-4">
                            <Image
                                src={imageUrl}
                                alt={name}
                                width={240}
                                height={240}
                                className='rounded-full p-4 bg-white'
                            />
                        </div>
                        <div className="">
                            <DialogTitle>{name}</DialogTitle>
                            <div className="my-2">
                                <DialogDescription>
                                    {desc}
                                </DialogDescription>
                            </div>
                            <div className="text-xs">
                                {pos}
                            </div>
                        </div>
                    </div>
                </DialogHeader>
                <div className="bg-blue-500 rounded p-2 text-sm text-white">{bio}</div>
                {/* <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter> */}
            </DialogContent>
        </Dialog>
    )
}
