// web_app/src/app/components/Header.tsx
import React from 'react';
import { Link } from "react-router-dom";
import Image from 'next/image';
import logo from '../imgs/logo.png';

const Header: React.FC<{ color: string }> = ({ color }) => {
  return (
    <header className={`z-10 bg-[${color}] flex h-full w-[50%] min-w-[18rem] max-w-[34.3125rem] items-center justify-between gap-[1rem] rounded-xl px-[0.74rem] py-8 xs:w-[38.125%] sm:min-w-[19rem] md:min-w-[28rem] text-black`}>
      <div className="flex items-center">
        <Image
          src={logo}
          alt="PintSwap Logo"
          className="h-8 w-12 mr-2"
        />
        <span className="font-bold text-sm leading-5" style={{ fontWeight: 600 }}>PINTSWAP</span>
      </div>
      <div className="flex space-x-4">
        <Link to="/" className={"flex items-center border-2 border-black px-4 py-2 rounded-full hover:bg-black hover:text-[" + color + "] transition-colors duration-300 hover:border-2 hover:border-black font-semibold text-sm leading-5"}>
          SWAP
        </Link>
        <Link to="/pool" className={`flex items-center bg-black text-[${color}] px-4 py-2 rounded-full border-2 border-black hover:bg-transparent hover:text-black transition-colors duration-300 font-semibold text-sm leading-5`}>
          POOL
        </Link>
      </div>
    </header>
  );
};

export default Header;
