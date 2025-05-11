import React from 'react';

const StatsBar = ({ stats }) => {
  return (
    <div className="flex mb-4 gap-3">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 flex-1 transition-all duration-200 hover:shadow-md hover:cursor-pointer">
        <div className="text-xs text-gray-500 mb-1">Total Questions</div>
        <div className="text-2xl font-semibold">{stats.total}</div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 flex-1 transition-all duration-200 hover:shadow-md hover:cursor-pointer">
        <div className="text-xs text-gray-500 mb-1">Easy</div>
        <div className="text-2xl font-semibold text-green-600">{stats.easy}</div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 flex-1 transition-all duration-200 hover:shadow-md hover:cursor-pointer">
        <div className="text-xs text-gray-500 mb-1">Medium</div>
        <div className="text-2xl font-semibold text-yellow-600">{stats.medium}</div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 flex-1 transition-all duration-200 hover:shadow-md hover:cursor-pointer">
        <div className="text-xs text-gray-500 mb-1">Hard</div>
        <div className="text-2xl font-semibold text-red-600">{stats.hard}</div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 flex-1 transition-all duration-200 hover:shadow-md hover:cursor-pointer">
        <div className="text-xs text-gray-500 mb-1">Starred</div>
        <div className="text-2xl font-semibold text-yellow-500">{stats.starred}</div>
      </div>
    </div>
  );
};

export default StatsBar;