"use client";

import React, { useState } from "react";
import { Colors } from "@/constant/colors";
import Title from "./NewTitle";

const Subscribe = () => {
  const [email, setEmail] = useState("");

  const sendMail = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      setEmail(""); // Clear the input on successful submission
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div className="p-8 text-slate-400 bg-blue-950">
      <div
        className="bg-blue-900 rounded p-8"
        style={{ background: Colors.primary }}
      >
        <div>
          <Title title="Stay Tunes with" subtitle="weekly Newsletter" />
        </div>
        <div className="px:0 md:px-32">
          <form
            onSubmit={sendMail}
            className="flex flex-col gap-4 justify-center"
          >
            <div className="bg-white flex items-center justify-between rounded p-1">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                style={{ color: Colors.secondary }}
                className="flex-1 py-2 px-4 rounded-sm outline-none placeholder:text-sm placeholder:text-blue-950"
                required // Ensure the email input is required
              />
              <button
                type="submit"
                style={{ backgroundColor: Colors.blue }}
                className="hidden md:flex py-2 px-4 bg-purple-600 text-white rounded-sm hover:bg-purple-400 hover:scale-95 text-sm transition duration-1000"
              >
                Send Email
              </button>
            </div>
            <p className="text-center">No worries, we won’t spam your inbox</p>
            <button
              type="submit"
              style={{ backgroundColor: Colors.blue }}
              className="flex md:hidden py-2 px-4 bg-purple-600 text-white rounded-sm hover:bg-purple-400 hover:scale-95 text-sm transition duration-1000"
            >
              Send Email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
