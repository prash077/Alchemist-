
// import React from 'react';
// import { Trophy, X } from 'lucide-react';

// export const AchievementToast = ({ show, achievement, description }) => {
//   if (!show) return null;

//   return (
//     <div className="fixed top-4 right-4 z-50 animate-fade-in">
//       <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl shadow-2xl p-4 min-w-[300px] border border-yellow-300">
//         <div className="flex items-start gap-3">
//           <div className="bg-white/20 rounded-lg p-2">
//             <Trophy className="w-6 h-6" />
//           </div>
          
//           <div className="flex-1">
//             <div className="font-bold text-lg">Achievement Unlocked!</div>
//             <div className="font-medium">{achievement}</div>
//             <div className="text-sm opacity-90 mt-1">{description}</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import React from 'react';
import { Trophy, X } from 'lucide-react';

interface AchievementToastProps {
  show: boolean;
  achievement: string;
  description: string;
}

export const AchievementToast = ({ show, achievement, description }: AchievementToastProps) => {
  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in">
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl shadow-2xl p-4 min-w-[300px] border border-yellow-300">
        <div className="flex items-start gap-3">
          <div className="bg-white/20 rounded-lg p-2">
            <Trophy className="w-6 h-6" />
          </div>
          
          <div className="flex-1">
            <div className="font-bold text-lg">Achievement Unlocked!</div>
            <div className="font-medium">{achievement}</div>
            <div className="text-sm opacity-90 mt-1">{description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
