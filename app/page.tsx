"use client";
import React, { useMemo, useState } from "react";
import Hyperspeed from "@/components/Hyperspeed";
import { hyperspeedPresets } from "@/components/HyperSpeedPresets";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [presetCount, setPresetCount] = useState("one");
  const safeKey = presetCount as keyof typeof hyperspeedPresets;
  // By defining the type here, TypeScript automatically knows all the arrays below are strict tuples!
  const hyperspeedOptions: React.ComponentProps<
    typeof Hyperspeed
  >["effectOptions"] = useMemo(
    () =>
      hyperspeedPresets.four as unknown as React.ComponentProps<
        typeof Hyperspeed
      >["effectOptions"],
    [safeKey],
  );

  const companyArray = [
    { name: "ChatGPT", img: "/chatgpt.png" },
    { name: "Claude", img: "/claude.png" },
    { name: "cursor", img: "/cursor.png" },
    { name: "Gemini", img: "/gemini.png" },
    { name: "Meta", img: "/meta.png" },
  ];

  return (
    <div className="relative w-full h-screen bg-black overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-0 flex items-center justify-center ">
        <Hyperspeed effectOptions={hyperspeedOptions} />
      </div>
      <div className="relative z-10 flex flex-col  w-full h-full ">
        {/* Navbar */}
        <Navbar />

        {/* Your Heading */}
        <main className="flex items-center justify-center flex-1 ">
          <div className="flex flex-col items-center justify-center ">
            <h1 className="text-white text-5xl md:text-6xl font-bold tracking-tight">
              SpendLimit
            </h1>

            {/* Optional Subheading */}
            <p className="text-gray-400 f mt-5 text-lg md:text-xl">
              <TypeAnimation
                sequence={[
                  "Track your spending at lightspeed.",
                  2000, // Waits 2 seconds
                  "Smart algorithms that catch your hidden spending habits.",
                  2000, // Deletes and types next
                  "Plug your budget leaks and start saving instantly.",
                  2000,
                ]}
                wrapper="span"
                speed={70} // Typing speed in ms
                deletionSpeed={70} // Deleting speed in ms
                repeat={Infinity} // Loops continuously
                className="text-xl text-gray-400"
              />
            </p>
            <Link href="/audit" className="mt-8 px-10 py-3  bg-white text-black rounded-xl font-mono cursor-pointer">
              Track Now
            </Link >
            <div className="relative flex h-22 w-180 mt-25 justify-center marquee-mask ">
              <Marquee
                speed={40}
                pauseOnHover
                gradient={false}
                className="flex gap-10"
              >
                {[...companyArray, ...companyArray].map((company, index) => (
                  <div key={index} className="shrin ml-14">
                    <div className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform">
                      <div className="w-12 h-12 flex items-center justify-center bg-white/75 rounded-2xl">
                        <Image
                          src={company.img}
                          alt={company.name}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-2xl"
                        />
                      </div>
                      <div className="text-sm mt-2">{company.name}</div>
                    </div>
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
