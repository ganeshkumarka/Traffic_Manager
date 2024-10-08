import React, { useState, useCallback, useEffect } from 'react';
import VideoInput from './components/VideoInput';
import TrafficLight from './components/TrafficLight';
import ControlPanel from './components/ControlPanel';
import Clock from './components/Clock';
import { Activity } from 'lucide-react';

const App: React.FC = () => {
  const [vehicleCounts, setVehicleCounts] = useState<number[]>([0, 0, 0, 0]);
  const [lightTimings, setLightTimings] = useState<number[]>([15, 15, 15, 15]);
  const [activeGreen, setActiveGreen] = useState<number>(0);
  const [emergencyVehicles, setEmergencyVehicles] = useState<boolean[]>([false, false, false, false]);

  const updateVehicleCount = useCallback((index: number, count: number, hasEmergencyVehicle: boolean) => {
    setVehicleCounts(prev => {
      const newCounts = [...prev];
      newCounts[index] = count;
      return newCounts;
    });

    setEmergencyVehicles(prev => {
      const newEmergency = [...prev];
      newEmergency[index] = hasEmergencyVehicle;
      return newEmergency;
    });

    // Update light timing based on vehicle count
    setLightTimings(prev => {
      const newTimings = [...prev];
      newTimings[index] = Math.max(15, Math.min(90, count * 3)); // 3 seconds per vehicle, min 15s, max 90s
      return newTimings;
    });
  }, []);

  useEffect(() => {
    const rotateGreenLight = () => {
      if (emergencyVehicles.some(Boolean)) {
        const emergencyIndex = emergencyVehicles.findIndex(Boolean);
        setActiveGreen(emergencyIndex);
      } else {
        setActiveGreen((prev) => (prev + 1) % 4);
      }
    };

    const interval = setInterval(rotateGreenLight, lightTimings[activeGreen] * 1000);

    return () => clearInterval(interval);
  }, [activeGreen, lightTimings, emergencyVehicles]);

  return (
    <div className="min-h-screen bg-gray-100 p-8 relative">
      <Clock />
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">
        <Activity className="inline-block mr-2" />
        Traffic Management System
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          {[0, 1, 2, 3].map(index => (
            <VideoInput
              key={index}
              index={index}
              onVehicleCount={(count, hasEmergencyVehicle) => updateVehicleCount(index, count, hasEmergencyVehicle)}
            />
          ))}
        </div>
        <div className="space-y-8">
          <ControlPanel 
            vehicleCounts={vehicleCounts} 
            lightTimings={lightTimings} 
            emergencyVehicles={emergencyVehicles}
          />
          <div className="grid grid-cols-2 gap-4">
            {[0, 1, 2, 3].map(index => (
              <TrafficLight 
                key={index} 
                timing={lightTimings[index]} 
                vehicleCount={vehicleCounts[index]}
                isGreen={index === activeGreen}
                hasEmergencyVehicle={emergencyVehicles[index]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;


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