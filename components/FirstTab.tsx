import React from "react";
import EventSchedule from "./EventSchedule";
import { Color, Colors } from "@/constant/colors";
import { Button } from "./ui/button";

function Schedule({ text }: { text: string }) {
  return <h1 className="text-gray-400 text-sm ">{text}</h1>;
}

function FirstTab() {
  return (
    <div>
      <div className="">
        <h1
          style={{ color: Colors.blue }}
          className="my-2 font-bold text-lg text-purple-500">Summit Day 1</h1>
        <div className="mb-6" style={{ color: Color.text }}>
          <EventSchedule text="  8:00 - 8:30 Arrival and Registration" />
          <EventSchedule text=" 8:30 – 9:30 Welcome and Vision Casting Simon Nyamuda / ETN" />
          <EventSchedule text="9:30 – 10:30 First Session / Keynote Speaker Regional or International" />
          <h1
            style={{ color: Colors.blue }}
            className="my-2 font-bold text-lg">Guest Speaker</h1>
          <EventSchedule text="10:30 -11:00 Second speaker/ Regional ICT" />
          <EventSchedule text="11:15 – 11:45 Teas" />
          <EventSchedule text="11:45 – 12:30 Panel discussion (Blend Moderator & Q&A)" />
          <EventSchedule text="13:00 – 14:00 Lunch" />
          <EventSchedule text="14:00 - 14:45 Session – ICT in Education" />
          <EventSchedule text="14:45 – 15:30 ICT in Renewable Energy" />
          <EventSchedule text="15:30 – 16:00 Panel Discussion (Blend Moderator & Q&A)" />
          <EventSchedule text="16:00 – 16:30 Teas" />
        </div>
        <EventSchedule text="Exhibition Stands – Time" />
        <div className="mt-4">
          <Button>
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FirstTab;
