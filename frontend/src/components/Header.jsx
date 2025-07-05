import WalletConnect from "./WalletConnect";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowHeader(false); // scrolling down
      } else {
        setShowHeader(true); // scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`sticky top-0 z-50 bg-white shadow-sm transition-transform duration-300  text-2xl ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex justify-between items-center px-8 py-6">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Filecoin" className="w-6 h-6" />
          <span className="text-lg font-bold">CertifyAI</span>
        </div>

        <nav className="hidden md:flex space-x-6 text-sm text-gray-700">
          <a href="#how-it-works">How It Works</a>
          <a href="#demo">Demo</a>
          <a href="#use-cases">Use Cases</a>
          <a href="#tech">Technology</a>
          <a href="#team">Team</a>
        </nav>

        {/* Replace button with wallet connect component */}
        <div className="ml-4">
          <WalletConnect />
        </div>
      </div>
    </header>
  );
};

export default Header;
