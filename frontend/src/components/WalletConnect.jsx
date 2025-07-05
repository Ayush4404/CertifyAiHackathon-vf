import React, { useState, useEffect } from "react";

const WalletConnect = () => {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        if (accounts.length > 0) {
          setAccount(accounts[0]);
          localStorage.setItem("walletAddress", accounts[0]);
        }
      } catch (error) {
        console.error("User rejected connection:", error);
      }
    } else {
      alert("🦊 Please install MetaMask to use this feature!");
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    localStorage.removeItem("walletAddress");

    // Clear Ethereum selected address if possible (not officially supported)
    if (window.ethereum && window.ethereum.selectedAddress) {
      window.ethereum.selectedAddress = null;
    }
  };

  // ⚠️ DON'T auto-connect silently
  useEffect(() => {
    const saved = localStorage.getItem("walletAddress");
    if (saved) {
      // Optional: Ask for reconnection here instead of auto-reconnect
      setAccount(saved);
    }
  }, []);

  return (
    <>
      {account ? (
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
            {account.slice(0, 6)}...{account.slice(-4)}
          </span>
          <button
            onClick={disconnectWallet}
            className="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-black text-white px-4 py-1 rounded-full text-sm font-medium shadow transition duration-300 hover:bg-gradient-to-r from-blue-600 to-purple-600"
        >
          Connect Wallet
        </button>
      )}
    </>
  );
};

export default WalletConnect;
