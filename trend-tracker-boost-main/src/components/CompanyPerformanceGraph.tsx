// // components/CompanyPerformanceGraph.tsx
// import React from 'react';
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
// } from 'recharts';

// const generateMockPerformanceData = (companyName: string) => {
//   const baseline = Math.random() * 1000 + 100; // starting point
//   return Array.from({ length: 6 }, (_, i) => ({
//     month: `M${i + 1}`,
//     performance: Math.round(baseline + Math.sin(i) * 50 + Math.random() * 20)
//   }));
// };

// export const CompanyPerformanceGraph = ({ companyName }: { companyName: string }) => {
//   const data = generateMockPerformanceData(companyName);

//   return (
//     <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
//       <h3 className="text-md font-semibold mb-2">{companyName} Performance Over Time</h3>
//       <ResponsiveContainer width="100%" height={250}>
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="month" />
//           <YAxis />
//           <Tooltip />
//           <Line type="monotone" dataKey="performance" stroke="#8884d8" />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  AreaChart,
  Area,
} from 'recharts';

type CompanyPerformanceGraphProps = {
  companyName: string;
  data?: { month: string; revenue: number; users?: number }[];
};

const mockData = [
  { month: 'Jan', revenue: 4.5, users: 200 },
  { month: 'Feb', revenue: 5.0, users: 240 },
  { month: 'Mar', revenue: 6.2, users: 310 },
  { month: 'Apr', revenue: 7.0, users: 390 },
  { month: 'May', revenue: 8.1, users: 420 },
  { month: 'Jun', revenue: 8.8, users: 470 },
];

export const CompanyPerformanceGraph: React.FC<CompanyPerformanceGraphProps> = ({
  companyName,
  data = mockData,
}) => {
  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">
        {companyName} - Performance Overview
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="userColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(v) => `$${v}M`} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip formatter={(value: any) => [`$${value}M`, 'Value']} />
          <Legend />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#6366f1"
            fillOpacity={1}
            fill="url(#revenueColor)"
            name="Revenue (in $M)"
          />
          <Area
            type="monotone"
            dataKey="users"
            stroke="#10b981"
            fillOpacity={1}
            fill="url(#userColor)"
            name="Users (in thousands)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
