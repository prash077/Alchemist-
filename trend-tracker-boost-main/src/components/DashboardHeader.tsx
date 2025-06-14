import React, { useState } from 'react';
import {
  User,
  Settings,
  Search,
  TrendingUp,
  BookOpen,
  Bookmark,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export const DashboardHeader = ({ activeTab, setActiveTab, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  // return (
  //   <header className="bg-white/70 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl p-6">
  //     <div className="flex justify-between items-center mb-6">
  //       <div>
  //         <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
  //           Business Digest
  //         </h1>
  //         <p className="text-slate-600 mt-1">{currentDate}</p>
  //       </div>

  //       <div className="flex items-center gap-3">
  //         {/* ✅ Search Input */}
  //         <input
  //           type="text"
  //           placeholder="Search topic like AI, Startups..."
  //           value={searchQuery}
  //           onChange={(e) => setSearchQuery(e.target.value)}
  //           className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
  //         />
  //         <Button
  //           variant="outline"
  //           size="sm"
  //           className="bg-white/50"
  //           onClick={handleSearch}
  //         >
  //           <Search className="w-4 h-4 mr-2" />
  //           Search
  //         </Button>

  //         <Button variant="outline" size="sm" className="bg-white/50">
  //           <Settings className="w-4 h-4" />
  //         </Button>

  //         <Avatar>
  //           <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
  //             <User className="w-4 h-4" />
  //           </AvatarFallback>
  //         </Avatar>
  //       </div>
  //     </div>

  //     <nav className="flex gap-2">
  //       <Button
  //         variant={activeTab === 'digest' ? 'default' : 'ghost'}
  //         onClick={() => setActiveTab('digest')}
  //         className="flex items-center gap-2"
  //       >
  //         <TrendingUp className="w-4 h-4" />
  //         Today's Digest
  //       </Button>

  //       <Button
  //         variant={activeTab === 'library' ? 'default' : 'ghost'}
  //         onClick={() => setActiveTab('library')}
  //         className="flex items-center gap-2"
  //       >
  //         <BookOpen className="w-4 h-4" />
  //         Insight Library
  //       </Button>

  //       <Button
  //         variant={activeTab === 'watchlist' ? 'default' : 'ghost'}
  //         onClick={() => setActiveTab('watchlist')}
  //         className="flex items-center gap-2"
  //       >
  //         <Bookmark className="w-4 h-4" />
  //         Watchlist
  //       </Button>
  //     </nav>
  //   </header>
  // );
  return (
  <header className="bg-white/70 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl p-6">
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Business Digest
        </h1>
        <p className="text-slate-600 mt-1">{currentDate}</p>
      </div>

      <div className="flex items-center gap-4">
        {/* ✅ Merged: search input from new header */}
        <input
          type="text"
          placeholder="Search topic like AI, Startups..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
        />

        <Button
          variant="outline"
          size="sm"
          className="bg-white/50"
          onClick={handleSearch}
        >
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>

        <Button variant="outline" size="sm" className="bg-white/50">
          <Settings className="w-4 h-4" />
        </Button>

        <Avatar>
          <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      </div>
    </div>

    {/* ✅ Merged: navigation with Watchlist tab */}
    <nav className="flex gap-2">
      <Button
        variant={activeTab === 'digest' ? 'default' : 'ghost'}
        onClick={() => setActiveTab('digest')}
        className="flex items-center gap-2"
      >
        <TrendingUp className="w-4 h-4" />
        Today's Digest
      </Button>

      <Button
        variant={activeTab === 'library' ? 'default' : 'ghost'}
        onClick={() => setActiveTab('library')}
        className="flex items-center gap-2"
      >
        <BookOpen className="w-4 h-4" />
        Insight Library
      </Button>

      <Button
        variant={activeTab === 'watchlist' ? 'default' : 'ghost'}
        onClick={() => setActiveTab('watchlist')}
        className="flex items-center gap-2"
      >
        <Bookmark className="w-4 h-4" />
        Watchlist
      </Button>
    </nav>
  </header>
);

};
