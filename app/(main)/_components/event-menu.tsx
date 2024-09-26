import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { AlarmClock, CalendarDays, Timer, User } from "lucide-react"
import Image from "next/image"

const EventCard = ({ event }: any) => {
    return (
        <div className="border border-slate-600 rounded-lg grid grid-cols-1 md:grid-cols-5 p-4 gap-4">
            <Image
                className="col-span-2 w-full h-full rounded"
                src={'/evolve.jpg'} alt="" width={200} height={200} />
            <div className="col-span-3 space-y-10">
                <div className="flex mt-6">
                    <div className="border border-r-0 p-2 text-xs flex items-center rounded-bl-full rounded-tl-full gap-2 text-slate-400">
                        <AlarmClock className="text-purple-500" size={14} />
                        <p className="">{event.time}</p>
                    </div>
                    <div className="border p-2 text-xs flex items-center rounded-br-full rounded-tr-full gap-2 text-slate-400">
                        <CalendarDays className="text-purple-500" size={14} />
                        <p className="">{event.date}</p>
                    </div>
                </div>
                <div className="text-2xl font-bold text-slate-300">
                    <p className="">
                        {event.title}
                    </p>
                    <p className="text-slate-400">{event.description}</p>
                </div>
                <div className="flex items-center h-auto text-slate-400 gap-8">
                    <div className="flex items-center gap-4 flex-1">
                        <Avatar className="bg-purple-950 flex items-center justify-center text-white">
                            <User size={14} />
                        </Avatar>
                        <div className="text-slate-400">
                            <p className="font-bold">{event.speaker.name}</p>
                            <p className="text-sm">{event.speaker.role}</p>
                        </div>
                    </div>
                    <Separator className="h-8" orientation="vertical" />
                </div>
                <Button
                    className="bg-blue-600 hover:bg-blue-400"
                >Learn more</Button>
            </div>
        </div>
    )
}

function EventMenu({ events }: any) {
    return (
        <Tabs defaultValue="account" className="w-full bg-blue-950 pb-8">
            <TabsList className="grid bg-blue-950 h-auto focused:bg-blue-600 w-[500px] grid-cols-2 p-4">
                <TabsTrigger value="account">
                    <div className="flex gap-2 items-center">
                        <Timer size={14} />
                        <p className="">First day</p>
                    </div>
                </TabsTrigger>
                <TabsTrigger value="password">
                    <div className="flex gap-2 items-center">
                        <Timer size={14} />
                        <p className="">Second day</p>
                    </div>
                </TabsTrigger>
            </TabsList>
            <TabsContent value="account">
                <div className="p-4 bg-blue-950 space-y-8">
                    {events.map((event: any, index: any) => (
                        <EventCard key={index} event={event} />
                    ))}
                </div>
            </TabsContent>
            <TabsContent value="password">
                <div className="p-4 space-y-8 bg-blue-950">
                    {events.map((event: any, index: any) => (
                        <EventCard key={index} event={event} />
                    ))}
                </div>
            </TabsContent>
        </Tabs>
    )
}

export default EventMenu;
