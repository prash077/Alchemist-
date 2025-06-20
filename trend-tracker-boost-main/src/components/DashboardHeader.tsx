import React, { useState, useRef, useEffect } from 'react';
import {
  User,
  Settings,
  Search,
  TrendingUp,
  BookOpen,
  Bookmark,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export const DashboardHeader = ({ activeTab, setActiveTab, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

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

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="relative bg-white/70 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Business Digest
          </h1>
          <p className="text-slate-600 mt-1">{currentDate}</p>
        </div>

        <div className="flex items-center gap-4 relative" ref={dropdownRef}>
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

          {/* Profile Avatar */}
          <div className="relative">
            <Avatar
              onClick={() => setShowDropdown((prev) => !prev)}
              className="cursor-pointer"
            >
              <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                <User className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>

            {/* Dropdown */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <ul className="text-sm text-gray-700">
                  <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
                    <User className="w-4 h-4" />
                    Profile
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
                    <Settings className="w-4 h-4" />
                    Settings
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-500 cursor-pointer">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

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
