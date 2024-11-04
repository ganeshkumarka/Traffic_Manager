// import React, { useState, useCallback, useEffect } from 'react';
// import VideoInput from './components/VideoInput';
// import TrafficLight from './components/TrafficLight';
// import ControlPanel from './components/ControlPanel';
// import Clock from './components/Clock';
// import { Activity } from 'lucide-react';

// const App: React.FC = () => {
//   const [vehicleCounts, setVehicleCounts] = useState<number[]>([0, 0, 0, 0]);
//   const [lightTimings, setLightTimings] = useState<number[]>([15, 15, 15, 15]);
//   const [activeGreen, setActiveGreen] = useState<number>(0);
//   const [emergencyVehicles, setEmergencyVehicles] = useState<boolean[]>([false, false, false, false]);

//   const updateVehicleCount = useCallback((index: number, count: number, hasEmergencyVehicle: boolean) => {
//     setVehicleCounts(prev => {
//       const newCounts = [...prev];
//       newCounts[index] = count;
//       return newCounts;
//     });

//     setEmergencyVehicles(prev => {
//       const newEmergency = [...prev];
//       newEmergency[index] = hasEmergencyVehicle;
//       return newEmergency;
//     });

//     // Update light timing based on vehicle count
//     setLightTimings(prev => {
//       const newTimings = [...prev];
//       newTimings[index] = Math.max(15, Math.min(90, count * 3)); // 3 seconds per vehicle, min 15s, max 90s
//       return newTimings;
//     });
//   }, []);

//   useEffect(() => {
//     const rotateGreenLight = () => {
//       if (emergencyVehicles.some(Boolean)) {
//         const emergencyIndex = emergencyVehicles.findIndex(Boolean);
//         setActiveGreen(emergencyIndex);
//       } else {
//         setActiveGreen((prev) => (prev + 1) % 4);
//       }
//     };

//     const interval = setInterval(rotateGreenLight, lightTimings[activeGreen] * 1000);

//     return () => clearInterval(interval);
//   }, [activeGreen, lightTimings, emergencyVehicles]);

//   return (
//     <div className="min-h-screen bg-gray-100 p-8 relative">
//       <Clock />
//       <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">
//         <Activity className="inline-block mr-2" />
//         Traffic Management System
//       </h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div className="space-y-8">
//           {[0, 1, 2, 3].map(index => (
//             <VideoInput
//               key={index}
//               index={index}
//               onVehicleCount={(count, hasEmergencyVehicle) => updateVehicleCount(index, count, hasEmergencyVehicle)}
//             />
//           ))}
//         </div>
//         <div className="space-y-8">
//           <ControlPanel 
//             vehicleCounts={vehicleCounts} 
//             lightTimings={lightTimings} 
//             emergencyVehicles={emergencyVehicles}
//           />
//           <div className="grid grid-cols-2 gap-4">
//             {[0, 1, 2, 3].map(index => (
//               <TrafficLight 
//                 key={index} 
//                 timing={lightTimings[index]} 
//                 vehicleCount={vehicleCounts[index]}
//                 isGreen={index === activeGreen}
//                 hasEmergencyVehicle={emergencyVehicles[index]}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;


// import React, { useState, useCallback, useEffect } from 'react';
// import VideoInput from './components/VideoInput';
// import TrafficLight from './components/TrafficLight';
// import ControlPanel from './components/ControlPanel';
// import Clock from './components/Clock';
// import { Activity } from 'lucide-react';

// const App: React.FC = () => {
//   const [vehicleCounts, setVehicleCounts] = useState<number[]>([0, 0, 0, 0]);
//   const [lightTimings, setLightTimings] = useState<number[]>([15, 15, 15, 15]);
//   const [activeGreen, setActiveGreen] = useState<number>(0);
//   const [emergencyVehicles, setEmergencyVehicles] = useState<boolean[]>([false, false, false, false]);
//   const [lastVehicleDetectionTime, setLastVehicleDetectionTime] = useState<number[]>([Date.now(), Date.now(), Date.now(), Date.now()]);

//   const updateVehicleCount = useCallback((index: number, count: number, hasEmergencyVehicle: boolean) => {
//     setVehicleCounts(prev => {
//       const newCounts = [...prev];
//       newCounts[index] = count;
//       return newCounts;
//     });

//     setEmergencyVehicles(prev => {
//       const newEmergency = [...prev];
//       newEmergency[index] = hasEmergencyVehicle;
//       return newEmergency;
//     });

//     setLastVehicleDetectionTime(prev => {
//       const newTimes = [...prev];
//       newTimes[index] = Date.now();
//       return newTimes;
//     });

//     // Update light timing based on vehicle count
//     setLightTimings(prev => {
//       const newTimings = [...prev];
//       newTimings[index] = Math.max(15, Math.min(90, count * 3)); // 3 seconds per vehicle, min 15s, max 90s
//       return newTimings;
//     });
//   }, []);

//   useEffect(() => {
//     const rotateGreenLight = () => {
//       if (emergencyVehicles.some(Boolean)) {
//         const emergencyIndex = emergencyVehicles.findIndex(Boolean);
//         setActiveGreen(emergencyIndex);
//       } else {
//         setActiveGreen((prev) => {
//           let next = (prev + 1) % 4;
//           const currentTime = Date.now();
//           while (vehicleCounts[next] === 0 && currentTime - lastVehicleDetectionTime[next] > 5000) {
//             next = (next + 1) % 4;
//           }
//           return next;
//         });
//       }
//     };

//     const interval = setInterval(rotateGreenLight, lightTimings[activeGreen] * 1000);

//     return () => clearInterval(interval);
//   }, [activeGreen, lightTimings, emergencyVehicles, vehicleCounts, lastVehicleDetectionTime]);

//   return (
//     <div className="min-h-screen bg-gray-100 p-8 relative">
//       <Clock />
//       <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">
//         <Activity className="inline-block mr-2" />
//         Traffic Management System
//       </h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div className="space-y-8">
//           {[0, 1, 2, 3].map(index => (
//             <VideoInput
//               key={index}
//               index={index}
//               onVehicleCount={(count, hasEmergencyVehicle) => updateVehicleCount(index, count, hasEmergencyVehicle)}
//             />
//           ))}
//         </div>
//         <div className="space-y-8">
//           <ControlPanel 
//             vehicleCounts={vehicleCounts} 
//             lightTimings={lightTimings} 
//             emergencyVehicles={emergencyVehicles}
//           />
//           <div className="grid grid-cols-2 gap-4">
//             {[0, 1, 2, 3].map(index => (
//               <TrafficLight 
//                 key={index} 
//                 timing={lightTimings[index]} 
//                 vehicleCount={vehicleCounts[index]}
//                 isGreen={index === activeGreen}
//                 hasEmergencyVehicle={emergencyVehicles[index]}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;




//vip
// import React, { useState, useEffect } from 'react';
// import VideoInput from './components/VideoInput';
// import TrafficLight from './components/TrafficLight';
// import ControlPanel from './components/ControlPanel';
// import Clock from './components/Clock';

// const App: React.FC = () => {
//   const [vehicleCounts, setVehicleCounts] = useState([0, 0, 0, 0]);
//   const [emergencyVehicles, setEmergencyVehicles] = useState([false, false, false, false]);
//   const [lightTimings, setLightTimings] = useState([30, 30, 30, 30]);
//   const [activeGreen, setActiveGreen] = useState(0);
//   const [vipIntersection, setVipIntersection] = useState<number | null>(null);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setActiveGreen((prev) => {
//         if (vipIntersection !== null) {
//           return vipIntersection; // Keep VIP intersection green
//         }
//         return (prev + 1) % 4;
//       });
//     }, lightTimings[activeGreen] * 1000);

//     return () => clearInterval(timer);
//   }, [lightTimings, activeGreen, vipIntersection]);

//   const handleVehicleCount = (index: number, count: number, hasEmergency: boolean) => {
//     setVehicleCounts(prev => {
//       const newCounts = [...prev];
//       newCounts[index] = count;
//       return newCounts;
//     });
//     setEmergencyVehicles(prev => {
//       const newEmergencies = [...prev];
//       newEmergencies[index] = hasEmergency;
//       return newEmergencies;
//     });

//     // Adjust timing based on vehicle count and VIP/emergency status
//     setLightTimings(prev => {
//       const newTimings = [...prev];
//       if (hasEmergency || index === vipIntersection) {
//         newTimings[index] = Math.max(45, prev[index]); // Extend timing for emergency/VIP
//       } else {
//         newTimings[index] = count >= 15 ? 45 : count >= 8 ? 30 : 20;
//       }
//       return newTimings;
//     });
//   };

//   const handleVIPAlert = (intersection: number | null) => {
//     setVipIntersection(intersection);
//     if (intersection !== null) {
//       setActiveGreen(intersection); // Immediately switch to VIP intersection
//       // Extend timing for VIP intersection
//       setLightTimings(prev => {
//         const newTimings = [...prev];
//         newTimings[intersection] = 45; // Extended green time for VIP
//         return newTimings;
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-start mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">Traffic Management System</h1>
//           <Clock />
//         </div>

//         <div className="grid grid-cols-2 gap-6 mb-8">
//           {[0, 1, 2, 3].map((index) => (
//             <VideoInput
//               key={index}
//               index={index}
//               onVehicleCount={(count, hasEmergency) => 
//                 handleVehicleCount(index, count, hasEmergency)
//               }
//             />
//           ))}
//         </div>

//         <div className="grid grid-cols-4 gap-6 mb-8">
//           {[0, 1, 2, 3].map((index) => (
//             <TrafficLight
//               key={index}
//               timing={lightTimings[index]}
//               vehicleCount={vehicleCounts[index]}
//               isGreen={activeGreen === index}
//               hasEmergencyVehicle={emergencyVehicles[index]}
//             />
//           ))}
//         </div>

//         <ControlPanel
//           vehicleCounts={vehicleCounts}
//           lightTimings={lightTimings}
//           emergencyVehicles={emergencyVehicles}
//           onVIPAlert={handleVIPAlert}
//         />
//       </div>
//     </div>
//   );
// };

// export default App;



//vip2 - working
import React, { useState, useEffect } from 'react';
import VideoInput from './components/VideoInput';
import TrafficLight from './components/TrafficLight';
import ControlPanel from './components/ControlPanel';
import Clock from './components/Clock';

const App: React.FC = () => {
  const [vehicleCounts, setVehicleCounts] = useState([0, 0, 0, 0]);
  const [emergencyVehicles, setEmergencyVehicles] = useState([false, false, false, false]);
  const [lightTimings, setLightTimings] = useState([30, 30, 30, 30]);
  const [activeGreen, setActiveGreen] = useState(0);
  const [vipIntersection, setVipIntersection] = useState<number | null>(null);
  const [pendingVipIntersection, setPendingVipIntersection] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveGreen((prev) => {
        // Check if there's a pending VIP intersection and the current green light
        // is for an emergency vehicle
        if (pendingVipIntersection !== null && !emergencyVehicles[prev]) {
          // If current intersection has no emergency vehicle, switch to VIP
          setVipIntersection(pendingVipIntersection);
          setPendingVipIntersection(null);
          return pendingVipIntersection;
        }

        // If VIP mode is active and no emergency vehicles, keep VIP intersection green
        if (vipIntersection !== null && !emergencyVehicles.some(hasEmergency => hasEmergency)) {
          return vipIntersection;
        }

        // If there's an emergency vehicle, prioritize that intersection
        const emergencyIndex = emergencyVehicles.findIndex(hasEmergency => hasEmergency);
        if (emergencyIndex !== -1) {
          return emergencyIndex;
        }

        // Normal rotation if no special conditions
        return (prev + 1) % 4;
      });
    }, lightTimings[activeGreen] * 1000);

    return () => clearInterval(timer);
  }, [lightTimings, activeGreen, vipIntersection, pendingVipIntersection, emergencyVehicles]);

  const handleVehicleCount = (index: number, count: number, hasEmergency: boolean) => {
    setVehicleCounts(prev => {
      const newCounts = [...prev];
      newCounts[index] = count;
      return newCounts;
    });
    
    setEmergencyVehicles(prev => {
      const newEmergencies = [...prev];
      newEmergencies[index] = hasEmergency;
      
      // If this intersection gets an emergency vehicle and we have a VIP route,
      // temporarily suspend VIP priority
      if (hasEmergency && vipIntersection !== null) {
        setPendingVipIntersection(vipIntersection);
        setVipIntersection(null);
      }
      return newEmergencies;
    });

    // Adjust timing based on vehicle count and VIP/emergency status
    setLightTimings(prev => {
      const newTimings = [...prev];
      if (hasEmergency) {
        newTimings[index] = 45; // Maximum time for emergency vehicles
      } else if (index === vipIntersection) {
        newTimings[index] = 45; // Extended time for VIP route
      } else {
        newTimings[index] = count >= 15 ? 45 : count >= 8 ? 30 : 20;
      }
      return newTimings;
    });
  };

  const handleVIPAlert = (intersection: number | null) => {
    if (intersection === null) {
      setVipIntersection(null);
      setPendingVipIntersection(null);
      return;
    }

    // Check if there are any active emergency vehicles
    const hasEmergencyVehicle = emergencyVehicles.some(hasEmergency => hasEmergency);
    
    if (hasEmergencyVehicle) {
      // Store the VIP intersection request as pending
      setPendingVipIntersection(intersection);
    } else {
      // If no emergency vehicles, activate VIP mode immediately
      setVipIntersection(intersection);
      setActiveGreen(intersection);
      // Extend timing for VIP intersection
      setLightTimings(prev => {
        const newTimings = [...prev];
        newTimings[intersection] = 45;
        return newTimings;
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Traffic Management System</h1>
          <Clock />
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          {[0, 1, 2, 3].map((index) => (
            <VideoInput
              key={index}
              index={index}
              onVehicleCount={(count, hasEmergency) => 
                handleVehicleCount(index, count, hasEmergency)
              }
            />
          ))}
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          {[0, 1, 2, 3].map((index) => (
            <TrafficLight
              key={index}
              timing={lightTimings[index]}
              vehicleCount={vehicleCounts[index]}
              isGreen={activeGreen === index}
              hasEmergencyVehicle={emergencyVehicles[index]}
            />
          ))}
        </div>

        <ControlPanel
          vehicleCounts={vehicleCounts}
          lightTimings={lightTimings}
          emergencyVehicles={emergencyVehicles}
          onVIPAlert={handleVIPAlert}
        />
      </div>
    </div>
  );
};

export default App;

