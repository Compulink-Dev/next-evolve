import React, { ReactNode } from "react";
import Footer from "./Footer";

import Scroll from "./Scroll"
import Hero from "./Hero";
import { CacheHandler } from "next/dist/server/lib/incremental-cache";
import Header from "@/app/(main)/_components/header";


function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <Header />
      {/* <Hero /> */}
      {children}
      <Footer />
      <Scroll />
    </div>
  );
}

export default Layout;
