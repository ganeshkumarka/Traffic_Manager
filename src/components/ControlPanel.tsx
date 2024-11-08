// import React from 'react';
// import { BarChart, Clock, AlertTriangle } from 'lucide-react';

// interface ControlPanelProps {
//   vehicleCounts: number[];
//   lightTimings: number[];
//   emergencyVehicles: boolean[];
// }

// const ControlPanel: React.FC<ControlPanelProps> = ({ vehicleCounts, lightTimings, emergencyVehicles }) => {
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
//                 {emergencyVehicles[index] && (
//                   <AlertTriangle className="text-red-500 ml-2" size={20} />
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div>
//           <h3 className="text-xl font-semibold mb-3">
//             <Clock className="inline-block mr-2" />
//             Green Light Durations
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


// import React, { useMemo } from 'react';
// import { BarChart, Clock, AlertTriangle, Car } from 'lucide-react';

// interface ControlPanelProps {
//   vehicleCounts: number[];
//   lightTimings: number[];
//   emergencyVehicles: boolean[];
// }

// const ControlPanel: React.FC<ControlPanelProps> = ({ vehicleCounts, lightTimings, emergencyVehicles }) => {
//   const totalVehicles = useMemo(() => 
//     vehicleCounts.reduce((sum, count) => sum + count, 0)
//   , [vehicleCounts]);

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6">Control Panel</h2>
      
//       <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
//         <h3 className="text-xl font-semibold mb-2 text-blue-800 flex items-center">
//           <Car className="inline-block mr-2" />
//           Total Vehicles
//         </h3>
//         <div className="text-3xl font-bold text-blue-600">
//           {totalVehicles}
//         </div>
//       </div>

//       <div className="space-y-6">
//         <div>
//           <h3 className="text-xl font-semibold mb-3">
//             <BarChart className="inline-block mr-2" />
//             Vehicle Counts
//           </h3>
//           <ul className="space-y-2">
//             {vehicleCounts.map((count, index) => (
//               <li key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
//                 <span>Intersection {index + 1}:</span>
//                 <div className="flex items-center">
//                   <span className="font-bold">{count}</span>
//                   {emergencyVehicles[index] && (
//                     <AlertTriangle className="text-red-500 ml-2" size={20} />
//                   )}
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div>
//           <h3 className="text-xl font-semibold mb-3">
//             <Clock className="inline-block mr-2" />
//             Green Light Durations
//           </h3>
//           <ul className="space-y-2">
//             {lightTimings.map((timing, index) => (
//               <li key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
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


// import React, { useMemo } from 'react';
// import { AlertTriangle, Car, Activity, Brain, Clock, AlertCircle, Siren } from 'lucide-react';

// interface ControlPanelProps {
//   vehicleCounts: number[];
//   lightTimings: number[];
//   emergencyVehicles: boolean[];
// }

// const ControlPanel: React.FC<ControlPanelProps> = ({ vehicleCounts, lightTimings, emergencyVehicles }) => {
//   const totalVehicles = useMemo(() => 
//     vehicleCounts.reduce((sum, count) => sum + count, 0)
//   , [vehicleCounts]);

//   const getTrafficDensity = (count: number) => {
//     if (count >= 15) return { label: 'High', color: 'text-red-500 bg-red-50' };
//     if (count >= 8) return { label: 'Medium', color: 'text-yellow-500 bg-yellow-50' };
//     return { label: 'Low', color: 'text-green-500 bg-green-50' };
//   };

//   const getSuggestedTiming = (count: number) => {
//     if (count >= 15) return 45;
//     if (count >= 8) return 30;
//     return 20;
//   };

//   const getPredictedCongestion = () => {
//     const highTrafficIntersections = vehicleCounts.filter(count => count >= 15).length;
//     const mediumTrafficIntersections = vehicleCounts.filter(count => count >= 8 && count < 15).length;
    
//     if (highTrafficIntersections >= 2) return 'Critical';
//     if (highTrafficIntersections === 1 && mediumTrafficIntersections >= 1) return 'High';
//     if (mediumTrafficIntersections >= 2) return 'Moderate';
//     return 'Low';
//   };

//   const getPeakHourStatus = () => {
//     const averageVehicles = totalVehicles / vehicleCounts.length;
//     if (averageVehicles >= 12) return { status: 'Active', color: 'text-red-600', message: 'High traffic period' };
//     if (averageVehicles >= 8) return { status: 'Approaching', color: 'text-yellow-600', message: 'Traffic building up' };
//     return { status: 'Inactive', color: 'text-green-600', message: 'Normal traffic flow' };
//   };

//   const getEmergencyImpact = () => {
//     const activeEmergencies = emergencyVehicles.filter(Boolean).length;
//     const affectedIntersections = emergencyVehicles
//       .map((hasEmergency, idx) => hasEmergency ? vehicleCounts[idx] : 0)
//       .filter(count => count > 0);
    
//     const avgAffectedTraffic = affectedIntersections.length > 0
//       ? affectedIntersections.reduce((sum, count) => sum + count, 0) / affectedIntersections.length
//       : 0;

//     return {
//       count: activeEmergencies,
//       severity: activeEmergencies === 0 ? 'None' : 
//                 avgAffectedTraffic >= 12 ? 'Severe' :
//                 avgAffectedTraffic >= 8 ? 'Moderate' : 'Minor',
//       color: activeEmergencies === 0 ? 'text-green-600' :
//              avgAffectedTraffic >= 12 ? 'text-red-600' :
//              avgAffectedTraffic >= 8 ? 'text-yellow-600' : 'text-blue-600'
//     };
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6">Control Panel</h2>
      
//       <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
//         <h3 className="text-xl font-semibold mb-2 text-blue-800 flex items-center">
//           <Car className="inline-block mr-2" />
//           Total Vehicles
//         </h3>
//         <div className="text-3xl font-bold text-blue-600">
//           {totalVehicles}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <h3 className="text-xl font-semibold mb-3">
//             <Activity className="inline-block mr-2" />
//             Traffic Density
//           </h3>
//           <ul className="space-y-2">
//             {vehicleCounts.map((count, index) => {
//               const density = getTrafficDensity(count);
//               return (
//                 <li key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
//                   <span>Intersection {index + 1}:</span>
//                   <div className="flex items-center gap-2">
//                     <span className="font-bold">{count}</span>
//                     <span className={`px-2 py-1 rounded-full text-sm ${density.color}`}>
//                       {density.label}
//                     </span>
//                     {emergencyVehicles[index] && (
//                       <AlertTriangle className="text-red-500" size={20} />
//                     )}
//                   </div>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>

//         <div>
//           <h3 className="text-xl font-semibold mb-3">
//             <Brain className="inline-block mr-2" />
//             Smart Timing Suggestions
//           </h3>
//           <ul className="space-y-2">
//             {vehicleCounts.map((count, index) => {
//               const suggested = getSuggestedTiming(count);
//               const current = lightTimings[index];
//               const needsAdjustment = Math.abs(suggested - current) > 5;
              
//               return (
//                 <li key={index} className="p-2 bg-gray-50 rounded">
//                   <div className="flex justify-between items-center">
//                     <span>Intersection {index + 1}:</span>
//                     <span className="font-bold">{current}s</span>
//                   </div>
//                   {needsAdjustment && (
//                     <div className="mt-1 text-sm">
//                       <span className="text-blue-600">
//                         Suggested: {current}s
//                       </span>
//                       {suggested > current ? (
//                         <span className="text-green-500 ml-2">⬇ Decrease timing</span>
//                       ) : (
//                         <span className="text-red-500 ml-2"> ⬆ Increase timing</span>
//                       )}
//                     </div>
//                   )}
//                 </li>
//               );
//             })}
//           </ul>
//         </div>

//         <div className="md:col-span-2">
//           <h3 className="text-xl font-semibold mb-3">
//             <AlertCircle className="inline-block mr-2" />
//             Smart Analytics Dashboard
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {/* <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-100">
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-purple-700">Peak Hour Analysis</span>
//                 <Clock className="text-purple-500" size={20} />
//               </div>
//               <div className={`text-2xl font-bold ${getPeakHourStatus().color}`}>
//                 {getPeakHourStatus().status}
//               </div>
//               <div className="text-sm text-purple-600 mt-1">
//                 {getPeakHourStatus().message}
//               </div>
//             </div> */}

//             <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg border border-orange-100">
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-orange-700">Congestion Risk</span>
//                 <AlertCircle className="text-orange-500" size={20} />
//               </div>
//               <div className="text-2xl font-bold text-orange-600">
//                 {getPredictedCongestion()}
//               </div>
//               <div className="text-sm text-orange-600 mt-1">
//                 Predicted congestion level
//               </div>
//             </div>

//             <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-100">
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-blue-700">Emergency Impact</span>
//                 <Siren className="text-blue-500" size={20} />
//               </div>
//               <div className={`text-2xl font-bold ${getEmergencyImpact().color}`}>
//                 {getEmergencyImpact().severity}
//               </div>
//               <div className="text-sm text-blue-600 mt-1">
//                 {getEmergencyImpact().count} active emergency vehicles
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ControlPanel;



//hosted
import React, { useMemo, useState } from 'react';
import { AlertTriangle, Car, Activity, Brain, Clock, AlertCircle, Siren, Crown, XCircle } from 'lucide-react';

interface ControlPanelProps {
  vehicleCounts: number[];
  lightTimings: number[];
  emergencyVehicles: boolean[];
  onVIPAlert: (intersection: number | null) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ vehicleCounts, lightTimings, emergencyVehicles, onVIPAlert }) => {
  const [showVIPModal, setShowVIPModal] = useState(false);
  const [activeVIPIntersection, setActiveVIPIntersection] = useState<number | null>(null);

  const totalVehicles = useMemo(() => 
    vehicleCounts.reduce((sum, count) => sum + count, 0)
  , [vehicleCounts]);

  const getTrafficDensity = (count: number) => {
    if (count >= 15) return { label: 'High', color: 'text-red-500 bg-red-50' };
    if (count >= 8) return { label: 'Medium', color: 'text-yellow-500 bg-yellow-50' };
    return { label: 'Low', color: 'text-green-500 bg-green-50' };
  };

  const getSuggestedTiming = (count: number) => {
    if (count >= 15) return 45;
    if (count >= 8) return 30;
    return 20;
  };

  const getPredictedCongestion = () => {
    const highTrafficIntersections = vehicleCounts.filter(count => count >= 15).length;
    const mediumTrafficIntersections = vehicleCounts.filter(count => count >= 8 && count < 15).length;
    
    if (highTrafficIntersections >= 2) return 'Critical';
    if (highTrafficIntersections === 1 && mediumTrafficIntersections >= 1) return 'High';
    if (mediumTrafficIntersections >= 2) return 'Moderate';
    return 'Low';
  };

  const getPeakHourStatus = () => {
    const averageVehicles = totalVehicles / vehicleCounts.length;
    if (averageVehicles >= 12) return { status: 'Active', color: 'text-red-600', message: 'High traffic period' };
    if (averageVehicles >= 8) return { status: 'Approaching', color: 'text-yellow-600', message: 'Traffic building up' };
    return { status: 'Inactive', color: 'text-green-600', message: 'Normal traffic flow' };
  };

  const getEmergencyImpact = () => {
    const activeEmergencies = emergencyVehicles.filter(Boolean).length;
    const affectedIntersections = emergencyVehicles
      .map((hasEmergency, idx) => hasEmergency ? vehicleCounts[idx] : 0)
      .filter(count => count > 0);
    
    const avgAffectedTraffic = affectedIntersections.length > 0
      ? affectedIntersections.reduce((sum, count) => sum + count, 0) / affectedIntersections.length
      : 0;

    return {
      count: activeEmergencies,
      severity: activeEmergencies === 0 ? 'None' : 
                avgAffectedTraffic >= 2 ? 'Severe' :
                avgAffectedTraffic >= 1 ? 'Moderate' : 'Minor',
      color: activeEmergencies === 0 ? 'text-green-600' :
             avgAffectedTraffic >= 3 ? 'text-red-600' :
             avgAffectedTraffic >= 1 ? 'text-yellow-600' : 'text-blue-600'
    };
  };

  const handleVIPAlert = (intersection: number) => {
    setActiveVIPIntersection(intersection);
    setShowVIPModal(false);
    onVIPAlert(intersection);
  };

  const handleStopVIPAlert = () => {
    setActiveVIPIntersection(null);
    onVIPAlert(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Control Panel</h2>
      
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-800 flex items-center">
              <Car className="inline-block mr-2" />
              Total Vehicles
            </h3>
            <div className="text-3xl font-bold text-blue-600">
              {totalVehicles}
            </div>
          </div>
          <div className="flex gap-2">
            {!activeVIPIntersection ? (
              <button
                onClick={() => setShowVIPModal(true)}
                className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
              >
                <Crown className="mr-2" size={20} />
                VIP Alert
              </button>
            ) : (
              <button
                onClick={handleStopVIPAlert}
                className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <XCircle className="mr-2" size={20} />
                Stop VIP Mode
              </button>
            )}
          </div>
        </div>
        {activeVIPIntersection !== null && (
          <div className="mt-4 p-2 bg-yellow-100 rounded-lg text-yellow-800">
            VIP Mode Active: Priority given to Intersection {activeVIPIntersection + 1}
          </div>
        )}
      </div>

      {showVIPModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Crown className="mr-2 text-yellow-500" />
              Select VIP Route Intersection
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {vehicleCounts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleVIPAlert(index)}
                  className="p-4 bg-gray-100 hover:bg-yellow-100 rounded-lg text-center transition-colors"
                >
                  Intersection {index + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowVIPModal(false)}
              className="mt-4 w-full p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-3">
            <Activity className="inline-block mr-2" />
            Traffic Density
          </h3>
          <ul className="space-y-2">
            {vehicleCounts.map((count, index) => {
              const density = getTrafficDensity(count);
              return (
                <li key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>Intersection {index + 1}:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{count}</span>
                    <span className={`px-2 py-1 rounded-full text-sm ${density.color}`}>
                      {density.label}
                    </span>
                    {emergencyVehicles[index] && (
                      <AlertTriangle className="text-red-500" size={20} />
                    )}
                    {activeVIPIntersection === index && (
                      <Crown className="text-yellow-500" size={20} />
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">
            <Brain className="inline-block mr-2" />
            Timing Suggestions
          </h3>
          <ul className="space-y-2">
            {vehicleCounts.map((count, index) => {
              const suggested = getSuggestedTiming(count);
              const current = lightTimings[index];
              const needsAdjustment = Math.abs(suggested - current) > 5;
              
              return (
                <li key={index} className="p-2 bg-gray-50 rounded">
                  <div className="flex justify-between items-center">
                    <span>Intersection {index + 1}:</span>
                    <span className="font-bold">{current}s</span>
                  </div>
                  {needsAdjustment && !activeVIPIntersection && (
                    <div className="mt-1 text-sm">
                      <span className="text-blue-600">
                        Suggested: {suggested}s
                      </span>
                      {suggested < current ? (
                        <span className="text-red-500 ml-2">⬆ Increase timing</span>
                      ) : (
                        <span className="text-green-500 ml-2">⬇ Decrease timing</span>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold mb-3">
            <AlertCircle className="inline-block mr-2" />
            Analytics Dashboard
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-purple-700">Peak Hour Analysis</span>
                <Clock className="text-purple-500" size={20} />
              </div>
              <div className={`text-2xl font-bold ${getPeakHourStatus().color}`}>
                {getPeakHourStatus().status}
              </div>
              <div className="text-sm text-purple-600 mt-1">
                {getPeakHourStatus().message}
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg border border-orange-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-orange-700">Congestion Risk</span>
                <AlertCircle className="text-orange-500" size={20} />
              </div>
              <div className="text-2xl font-bold text-orange-600">
                {getPredictedCongestion()}
              </div>
              <div className="text-sm text-orange-600 mt-1">
                Predicted congestion level
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-700">Emergency Impact</span>
                <Siren className="text-blue-500" size={20} />
              </div>
              <div className={`text-2xl font-bold ${getEmergencyImpact().color}`}>
                {getEmergencyImpact().severity}
              </div>
              <div className="text-sm text-blue-600 mt-1">
                {getEmergencyImpact().count} active emergency vehicles
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;




//updated
// import React, { useMemo, useState } from 'react';
// import { AlertTriangle, Car, Activity, Brain, Clock, AlertCircle, Siren, Crown, XCircle } from 'lucide-react';
// import WeatherImpact from './WeatherImpact';
// import TrafficTrends from './TrafficTrends';

// interface ControlPanelProps {
//   vehicleCounts: number[];
//   lightTimings: number[];
//   emergencyVehicles: boolean[];
//   onVIPAlert: (intersection: number | null) => void;
// }

// const ControlPanel: React.FC<ControlPanelProps> = ({ vehicleCounts, lightTimings, emergencyVehicles, onVIPAlert }) => {
//   const [showVIPModal, setShowVIPModal] = useState(false);
//   const [activeVIPIntersection, setActiveVIPIntersection] = useState<number | null>(null);

//   const totalVehicles = useMemo(() => 
//     vehicleCounts.reduce((sum, count) => sum + count, 0)
//   , [vehicleCounts]);

//   const getTrafficDensity = (count: number) => {
//     if (count >= 15) return { label: 'High', color: 'text-red-500 bg-red-50' };
//     if (count >= 8) return { label: 'Medium', color: 'text-yellow-500 bg-yellow-50' };
//     return { label: 'Low', color: 'text-green-500 bg-green-50' };
//   };

//   const getSuggestedTiming = (count: number) => {
//     if (count >= 15) return 45;
//     if (count >= 8) return 30;
//     return 20;
//   };

//   const getPredictedCongestion = () => {
//     const highTrafficIntersections = vehicleCounts.filter(count => count >= 15).length;
//     const mediumTrafficIntersections = vehicleCounts.filter(count => count >= 8 && count < 15).length;
    
//     if (highTrafficIntersections >= 2) return 'Critical';
//     if (highTrafficIntersections === 1 && mediumTrafficIntersections >= 1) return 'High';
//     if (mediumTrafficIntersections >= 2) return 'Moderate';
//     return 'Low';
//   };

//   const getPeakHourStatus = () => {
//     const averageVehicles = totalVehicles / vehicleCounts.length;
//     if (averageVehicles >= 12) return { status: 'Active', color: 'text-red-600', message: 'High traffic period' };
//     if (averageVehicles >= 8) return { status: 'Approaching', color: 'text-yellow-600', message: 'Traffic building up' };
//     return { status: 'Inactive', color: 'text-green-600', message: 'Normal traffic flow' };
//   };

//   const getEmergencyImpact = () => {
//     const activeEmergencies = emergencyVehicles.filter(Boolean).length;
//     const affectedIntersections = emergencyVehicles
//       .map((hasEmergency, idx) => hasEmergency ? vehicleCounts[idx] : 0)
//       .filter(count => count > 0);
    
//     const avgAffectedTraffic = affectedIntersections.length > 0
//       ? affectedIntersections.reduce((sum, count) => sum + count, 0) / affectedIntersections.length
//       : 0;

//     return {
//       count: activeEmergencies,
//       severity: activeEmergencies === 0 ? 'None' : 
//                 avgAffectedTraffic >= 12 ? 'Severe' :
//                 avgAffectedTraffic >= 8 ? 'Moderate' : 'Minor',
//       color: activeEmergencies === 0 ? 'text-green-600' :
//              avgAffectedTraffic >= 12 ? 'text-red-600' :
//              avgAffectedTraffic >= 8 ? 'text-yellow-600' : 'text-blue-600'
//     };
//   };

//   const handleVIPAlert = (intersection: number) => {
//     setActiveVIPIntersection(intersection);
//     setShowVIPModal(false);
//     onVIPAlert(intersection);
//   };

//   const handleStopVIPAlert = () => {
//     setActiveVIPIntersection(null);
//     onVIPAlert(null);
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6">Control Panel</h2>
      
//       <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
//         <div className="flex justify-between items-start">
//           <div>
//             <h3 className="text-xl font-semibold mb-2 text-blue-800 flex items-center">
//               <Car className="inline-block mr-2" />
//               Total Vehicles
//             </h3>
//             <div className="text-3xl font-bold text-blue-600">
//               {totalVehicles}
//             </div>
//           </div>
//           <div className="flex gap-2">
//             {!activeVIPIntersection ? (
//               <button
//                 onClick={() => setShowVIPModal(true)}
//                 className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
//               >
//                 <Crown className="mr-2" size={20} />
//                 VIP Alert
//               </button>
//             ) : (
//               <button
//                 onClick={handleStopVIPAlert}
//                 className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//               >
//                 <XCircle className="mr-2" size={20} />
//                 Stop VIP Mode
//               </button>
//             )}
//           </div>
//         </div>
//         {activeVIPIntersection !== null && (
//           <div className="mt-4 p-2 bg-yellow-100 rounded-lg text-yellow-800">
//             VIP Mode Active: Priority given to Intersection {activeVIPIntersection + 1}
//           </div>
//         )}
//       </div>

//       {showVIPModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
//             <h3 className="text-xl font-bold mb-4 flex items-center">
//               <Crown className="mr-2 text-yellow-500" />
//               Select VIP Route Intersection
//             </h3>
//             <div className="grid grid-cols-2 gap-4">
//               {vehicleCounts.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleVIPAlert(index)}
//                   className="p-4 bg-gray-100 hover:bg-yellow-100 rounded-lg text-center transition-colors"
//                 >
//                   Intersection {index + 1}
//                 </button>
//               ))}
//             </div>
//             <button
//               onClick={() => setShowVIPModal(false)}
//               className="mt-4 w-full p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <h3 className="text-xl font-semibold mb-3">
//             <Activity className="inline-block mr-2" />
//             Traffic Density
//           </h3>
//           <ul className="space-y-2">
//             {vehicleCounts.map((count, index) => {
//               const density = getTrafficDensity(count);
//               return (
//                 <li key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
//                   <span>Intersection {index + 1}:</span>
//                   <div className="flex items-center gap-2">
//                     <span className="font-bold">{count}</span>
//                     <span className={`px-2 py-1 rounded-full text-sm ${density.color}`}>
//                       {density.label}
//                     </span>
//                     {emergencyVehicles[index] && (
//                       <AlertTriangle className="text-red-500" size={20} />
//                     )}
//                     {activeVIPIntersection === index && (
//                       <Crown className="text-yellow-500" size={20} />
//                     )}
//                   </div>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>

//         <div>
//           <h3 className="text-xl font-semibold mb-3">
//             <Brain className="inline-block mr-2" />
//             Smart Timing Suggestions
//           </h3>
//           <ul className="space-y-2">
//             {vehicleCounts.map((count, index) => {
//               const suggested = getSuggestedTiming(count);
//               const current = lightTimings[index];
//               const needsAdjustment = Math.abs(suggested - current) > 5;
              
//               return (
//                 <li key={index} className="p-2 bg-gray-50 rounded">
//                   <div className="flex justify-between items-center">
//                     <span>Intersection {index + 1}:</span>
//                     <span className="font-bold">{current}s</span>
//                   </div>
//                   {needsAdjustment && !activeVIPIntersection && (
//                     <div className="mt-1 text-sm">
//                       <span className="text-blue-600">
//                         Suggested: {suggested}s
//                       </span>
//                       {suggested > current ? (
//                         <span className="text-red-500 ml-2">⬆ Increase timing</span>
//                       ) : (
//                         <span className="text-green-500 ml-2">⬇ Decrease timing</span>
//                       )}
//                     </div>
//                   )}
//                 </li>
//               );
//             })}
//           </ul>
//         </div>

//         <div className="md:col-span-2">
//           <h3 className="text-xl font-semibold mb-3">
//             <AlertCircle className="inline-block mr-2" />
//             Smart Analytics Dashboard
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//             <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-100">
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-purple-700">Peak Hour Analysis</span>
//                 <Clock className="text-purple-500" size={20} />
//               </div>
//               <div className={`text-2xl font-bold ${getPeakHourStatus().color}`}>
//                 {getPeakHourStatus().status}
//               </div>
//               <div className="text-sm text-purple-600 mt-1">
//                 {getPeakHourStatus().message}
//               </div>
//             </div>

//             <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg border border-orange-100">
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-orange-700">Congestion Risk</span>
//                 <AlertCircle className="text-orange-500" size={20} />
//               </div>
//               <div className="text-2xl font-bold text-orange-600">
//                 {getPredictedCongestion()}
//               </div>
//               <div className="text-sm text-orange-600 mt-1">
//                 Predicted congestion level
//               </div>
//             </div>

//             <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-100">
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-blue-700">Emergency Impact</span>
//                 <Siren className="text-blue-500" size={20} />
//               </div>
//               <div className={`text-2xl font-bold ${getEmergencyImpact().color}`}>
//                 {getEmergencyImpact().severity}
//               </div>
//               <div className="text-sm text-blue-600 mt-1">
//                 {getEmergencyImpact().count} active emergency vehicles
//               </div>
//             </div>

//             <WeatherImpact vehicleCounts={vehicleCounts} />
//             <TrafficTrends vehicleCounts={vehicleCounts} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ControlPanel;