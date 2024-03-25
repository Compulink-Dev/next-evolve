"use client";
import { useState } from "react";
import FirstTab from "./FirstTab";
import SecondTab from "./SecondTab";
import { Colors } from "@/constant/colors";


function Tabs() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index: any) => {
    setToggleState(index);
  };

  return (
    <div className="container mx-auto max-w-7xl my-8 flex justify-center items-center px-4">
      <div
        style={{ borderColor: Colors.blue }}
        className="container2 border">
        <div className="bloc-tabs">
          <button
            className={
              toggleState === 1 ? "tabs active-tabs font-bold text-blue-900" : "tabs text-white font-bold"
            }
            onClick={() => toggleTab(1)}
          >
            First Day
          </button>
          <button
            className={
              toggleState === 2 ? "tabs active-tabs font-bold text-blue-900" : "tabs text-white font-bold"
            }
            onClick={() => toggleTab(2)}
          >
            Second Day
          </button>
        </div>

        <div className="content-tabs">
          <div
            className={
              toggleState === 1 ? "content  active-content" : "content"
            }
          >
            <FirstTab />
          </div>

          <div
            className={
              toggleState === 2 ? "content  active-content" : "content"
            }
          >
            <SecondTab />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tabs;
