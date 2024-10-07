// import React, { useState, useCallback, useEffect } from 'react';
// import VideoInput from './components/VideoInput';
// import TrafficLight from './components/TrafficLight';
// import ControlPanel from './components/ControlPanel';
// import { Activity } from 'lucide-react';

// const App: React.FC = () => {
//   const [vehicleCounts, setVehicleCounts] = useState<number[]>([0, 0, 0, 0]);
//   const [lightTimings, setLightTimings] = useState<number[]>([30, 30, 30, 30]);
//   const [activeGreen, setActiveGreen] = useState<number>(0);

//   const updateVehicleCount = useCallback((index: number, count: number) => {
//     setVehicleCounts(prev => {
//       const newCounts = [...prev];
//       newCounts[index] = count;
//       return newCounts;
//     });

//     // Update light timing based on vehicle count
//     setLightTimings(prev => {
//       const newTimings = [...prev];
//       newTimings[index] = Math.max(30, Math.min(90, count * 3)); // 3 seconds per vehicle, min 30s, max 90s
//       return newTimings;
//     });
//   }, []);

//   useEffect(() => {
//     const rotateGreenLight = () => {
//       setActiveGreen((prev) => (prev + 1) % 4);
//     };

//     const interval = setInterval(rotateGreenLight, lightTimings[activeGreen] * 1000);

//     return () => clearInterval(interval);
//   }, [activeGreen, lightTimings]);

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
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
//               onVehicleCount={(count) => updateVehicleCount(index, count)}
//             />
//           ))}
//         </div>
//         <div className="space-y-8">
//           <ControlPanel vehicleCounts={vehicleCounts} lightTimings={lightTimings} />
//           <div className="grid grid-cols-2 gap-4">
//             {[0, 1, 2, 3].map(index => (
//               <TrafficLight 
//                 key={index} 
//                 timing={lightTimings[index]} 
//                 vehicleCount={vehicleCounts[index]}
//                 isGreen={index === activeGreen}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;


import React, { useState, useCallback, useEffect } from 'react';
import VideoInput from './components/VideoInput';
import TrafficLight from './components/TrafficLight';
import ControlPanel from './components/ControlPanel';
import { Activity } from 'lucide-react';

const App: React.FC = () => {
  const [vehicleCounts, setVehicleCounts] = useState<number[]>([0, 0, 0, 0]);
  const [lightTimings, setLightTimings] = useState<number[]>([15, 15, 15, 15]);
  const [activeGreen, setActiveGreen] = useState<number>(0);

  const updateVehicleCount = useCallback((index: number, count: number) => {
    setVehicleCounts(prev => {
      const newCounts = [...prev];
      newCounts[index] = count;
      return newCounts;
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
      setActiveGreen((prev) => (prev + 1) % 4);
    };

    const interval = setInterval(rotateGreenLight, lightTimings[activeGreen] * 1000);

    return () => clearInterval(interval);
  }, [activeGreen, lightTimings]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
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
              onVehicleCount={(count) => updateVehicleCount(index, count)}
            />
          ))}
        </div>
        <div className="space-y-8">
          <ControlPanel vehicleCounts={vehicleCounts} lightTimings={lightTimings} />
          <div className="grid grid-cols-2 gap-4">
            {[0, 1, 2, 3].map(index => (
              <TrafficLight 
                key={index} 
                timing={lightTimings[index]} 
                vehicleCount={vehicleCounts[index]}
                isGreen={index === activeGreen}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;