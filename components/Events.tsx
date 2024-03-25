import { Colors } from "@/constant/colors";
import Link from "next/link";
import React from "react";
import Title from "./Title";
import Tabs from "@/components/Tabs"

function Events() {
  return (
    <div>
      <div className="container  mx-auto max-w-7xl my-8 px-4">
        <h1 className="my-4 text-sm text-gray-400">
          Please click dropdown to download a copy of the programme.{"  "}
          <span className="text-purple-600 hover:text-purple-300 hover:scale-105">
            <Link
              style={{ color: Colors.blue }}
              href="/">Download</Link>
          </span>
        </h1>

        <Title name={'Event Program'} color={"text-blue-950"} />
      </div>
      <div className="mt-4">
        <Tabs />
      </div>
    </div>
  );
}

export default Events;
