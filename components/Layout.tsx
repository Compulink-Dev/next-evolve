import React, { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Scroll from "./Scroll"
import Hero from "./Hero";
import { CacheHandler } from "next/dist/server/lib/incremental-cache";


function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <Header />
      <Hero />
      {children}
      <Footer />
      <Scroll />
    </div>
  );
}

export default Layout;
