// import React from 'react';
// import { BarChart, Clock } from 'lucide-react';

// interface ControlPanelProps {
//   vehicleCounts: number[];
//   lightTimings: number[];
// }

// const ControlPanel: React.FC<ControlPanelProps> = ({ vehicleCounts, lightTimings }) => {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6">Control Panel</h2>
//       <div className="space-y-6">
//         <div>
//           <h3 className="text-xl font-semibold mb-3">
//             <BarChart className="inline-block mr-2" />
//             Vehicle Counts
//           </h3>
//           <ul className="space-y-2">
//             {vehicleCounts.map((count, index) => (
//               <li key={index} className="flex justify-between items-center">
//                 <span>Intersection {index + 1}:</span>
//                 <span className="font-bold">{count}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div>
//           <h3 className="text-xl font-semibold mb-3">
//             <Clock className="inline-block mr-2" />
//             Light Timings
//           </h3>
//           <ul className="space-y-2">
//             {lightTimings.map((timing, index) => (
//               <li key={index} className="flex justify-between items-center">
//                 <span>Intersection {index + 1}:</span>
//                 <span className="font-bold">{timing}s</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ControlPanel;

import React from 'react';
import { BarChart, Clock } from 'lucide-react';

interface ControlPanelProps {
  vehicleCounts: number[];
  lightTimings: number[];
}

const ControlPanel: React.FC<ControlPanelProps> = ({ vehicleCounts, lightTimings }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Control Panel</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3">
            <BarChart className="inline-block mr-2" />
            Vehicle Counts
          </h3>
          <ul className="space-y-2">
            {vehicleCounts.map((count, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>Intersection {index + 1}:</span>
                <span className="font-bold">{count}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3">
            <Clock className="inline-block mr-2" />
            Green Light Durations
          </h3>
          <ul className="space-y-2">
            {lightTimings.map((timing, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>Intersection {index + 1}:</span>
                <span className="font-bold">{timing}s</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;