import React, { ReactNode } from "react";

import { CacheHandler } from "next/dist/server/lib/incremental-cache";
import Header from "@/app/(main)/_components/header";
import Footer from "./_components/footer";
import Scroll from "./_components/scroll";


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
