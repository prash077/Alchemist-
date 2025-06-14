import React from "react";
import { WatchlistPanel } from "@/components/WatchlistPanel";

const WatchListPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-slate-800">Your Watch List</h1>
      <WatchlistPanel />
    </div>
  );
};

export default WatchListPage;
