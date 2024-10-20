// web_app/src/app/components/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="z-10 bg-[#FE5C5C] flex h-full w-[50%] min-w-[18rem] max-w-[34.3125rem] items-center justify-between gap-[1rem] rounded-xl px-[0.74rem] py-8 xs:w-[38.125%] sm:min-w-[19rem] md:min-w-[28rem] text-black">
      <div className="flex items-center">
        <span className="font-bold">ESSENTIAL</span>
      </div>
      <div className="flex space-x-4">
        <a href="/blog" className="flex items-center border-2 border-black px-4 py-2 rounded-full hover:bg-black hover:text-[#FE5C5C] transition-colors duration-300 hover:border-2 hover:border-black">
          Swap
        </a>
        <a href="/docs" className="flex items-center bg-black text-[#FE5C5C] px-4 py-2 rounded-full border-2 border-black hover:bg-transparent hover:text-black transition-colors duration-300">
          Pool
        </a>
      </div>
    </header>
  );
};

export default Header;
