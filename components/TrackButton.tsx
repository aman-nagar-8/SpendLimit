import React from "react";
type customprops = {
    fn : any;
    text: String;
}

export function TrackButton({fn, text}:customprops) {
  return (
    <button
      onClick={fn}
      className="mt-8
                  w-full
                  rounded-2xl
                  bg-linear-to-r
                from-emerald-500/50
                  to-emerald-400/50
                  px-8
                  py-4
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:scale-[1.01]
                  hover:shadow-[0_0_30px_rgba(16,185,129,0.35)]
                  active:scale-[0.99]
                  cursor-pointer"
    >
      {text}
    </button>
  );
}
