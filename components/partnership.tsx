import React from "react";
import Title from "./NewTitle";
import Image from "next/image";
import { Button } from "./ui/button";
import { Colors } from "@/constant/colors";
import Link from "next/link";

function Partnership() {
  return (
    <div className="bg-blue-950 p-8">
      <div className="flex items-center justify-center">
        <Image src={"/logo.png"} alt="" width={200} height={200} />
      </div>
      <div className="">
        <Title
          title="Join the biggest Marketing"
          subtitle="Community of the world"
        />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-8">
        <Link href={"/selection"}>
          <Button className="bg-blue-800 hover:bg-blue-600">
            Partner with us
          </Button>
        </Link>
        <Link href={"/selection"}>
          <Button className="bg-blue-800 hover:bg-blue-600">
            Register for Exhibition
          </Button>
        </Link>
        <Link href={"/selection"}>
          <Button
            className=" hover:bg-blue-900"
            style={{ background: Colors.primary }}
          >
            Purchase a Ticket
          </Button>
        </Link>
      </div>
      <div className="my-8 flex items-center justify-center w-full">
        <Image
          src={"/line-min.png"}
          alt=""
          width={200}
          height={200}
          className="w-full animate-pulse object-contain"
        />
      </div>
    </div>
  );
}

export default Partnership;
