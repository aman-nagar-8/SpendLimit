"use client";
import React, { useMemo , useState} from 'react';
import Hyperspeed from '@/components/Hyperspeed';
import {hyperspeedPresets} from '@/components/HyperSpeedPresets'


export default function Home() {

  const [presetCount, setPresetCount] = useState("one");
  const safeKey = presetCount as keyof typeof hyperspeedPresets;
  // By defining the type here, TypeScript automatically knows all the arrays below are strict tuples!
  const hyperspeedOptions: React.ComponentProps<typeof Hyperspeed>['effectOptions'] = useMemo(() => (hyperspeedPresets.four), [safeKey]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden"> 
      <div className="absolute top-0 left-0 w-full h-full z-0 flex items-center justify-center ">
        <Hyperspeed effectOptions={hyperspeedOptions} />
      </div>
      <div className="relative z-10 flex flex-col  w-full h-full ">
        <nav className="flex items-center justify-between py-6 px-10 text-sm text-gray-400 ">
          {/* left */}
          <div className="font-bold text-white text-base cursor-pointer" >Aman Nagar</div>
          {/* center */}
          <div className="flex space-x-12 items-center ">
            <div className="hover:text-white cursor-pointer">About</div>
            <div className="hover:text-white cursor-pointer">Features</div>
            <div className="hover:text-white cursor-pointer">Learn</div>
          </div>
          {/* right */}
          <div className="py-1 text-black font-normal px-6 rounded-2xl bg-white/75 cursor-pointer hover:bg-white/90" >Contact</div>
        </nav>
        
        {/* Your Heading */}
        <main className="flex flex-col items-center justify-center mt-40">

        <h1 className="text-white text-5xl md:text-6xl font-bold tracking-tight">
          SpendLimit
        </h1>
        
        {/* Optional Subheading */}
        <p className="text-gray-400 mt-5 text-xl md:text-2xl">
          Track your spending at lightspeed.
        </p>
        <button className="mt-8 px-10 py-3 bg-white text-black rounded-xl font-mono cursor-pointer">
          Track Now
        </button>
        </main>
      </div>
    </div>
  );
}
