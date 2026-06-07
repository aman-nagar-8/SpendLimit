import { StyledWrapper } from "./Buttoncss";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-6 px-5 md:px-15 text-sm text-gray-400 ">
      {/* left */}
      <div className="font-bold text-white text-base cursor-pointer">
        <div className="flex items-center">
          <div className="relative w-10 h-10 flex items-center justify-center bg-white/75 rounded-full mr-3">
            <Image src="/profile.png" alt="P" fill className=" rounded-full" />
          </div>
          A N
        </div>
      </div>
      {/* center */}
      <div className="hidden md:flex space-x-12 items-center ">
        <div className="hover:text-white cursor-pointer">About</div>
        <div className="hover:text-white cursor-pointer">Features</div>
        <div className="hover:text-white cursor-pointer">Learn</div>
      </div>
      {/* right */}
      <StyledWrapper>
        <button className="btn">
          <span className="btn-text-one">Contact Us</span>
          <span className="btn-text-two">Let's Talk</span>
        </button>
      </StyledWrapper>
    </nav>
  );
};

export default Navbar;
