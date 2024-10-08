// import React, { useState, useEffect } from 'react';

// interface TrafficLightProps {
//   timing: number;
// }

// const TrafficLight: React.FC<TrafficLightProps> = ({ timing }) => {
//   const [currentLight, setCurrentLight] = useState<'red' | 'yellow' | 'green'>('red');

//   useEffect(() => {
//     const cycle = ['red', 'green', 'yellow'];
//     let index = 0;

//     const intervalId = setInterval(() => {
//       index = (index + 1) % cycle.length;
//       setCurrentLight(cycle[index] as 'red' | 'yellow' | 'green');
//     }, timing * 1000);

//     return () => clearInterval(intervalId);
//   }, [timing]);

//   return (
//     <div className="flex flex-col items-center space-y-2 bg-gray-800 p-4 rounded-lg">
//       {['red', 'yellow', 'green'].map((color) => (
//         <div
//           key={color}
//           className={`w-12 h-12 rounded-full ${
//             currentLight === color ? `bg-${color}-500` : `bg-${color}-200`
//           }`}
//         />
//       ))}
//       <p className="text-white mt-2">Cycle: {timing}s</p>
//     </div>
//   );
// };

// export default TrafficLight;



//working

import React, { useState, useEffect, useRef } from 'react';

interface TrafficLightProps {
  timing: number;
  vehicleCount: number;
  isGreen: boolean;
}

const TrafficLight: React.FC<TrafficLightProps> = ({ timing, vehicleCount, isGreen }) => {
  const [countdown, setCountdown] = useState(timing);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isGreen) {
      setCountdown(timing);
      if (intervalRef.current) clearInterval(intervalRef.current);
      
      intervalRef.current = window.setInterval(() => {
        setCountdown((prevCount) => {
          if (prevCount <= 1) {
            return timing;
          }
          return prevCount - 1;
        });
      }, 1000);
    } else {
      setCountdown(0);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isGreen, timing]);

  const getColor = (color: string) => {
    switch (color) {
      case 'red':
        return isGreen ? 'bg-red-200' : 'bg-red-500';
      case 'yellow':
        return 'bg-yellow-200';
      case 'green':
        return isGreen ? 'bg-green-500' : 'bg-green-200';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2 bg-gray-800 p-4 rounded-lg">
      {['red', 'yellow', 'green'].map((color) => (
        <div
          key={color}
          className={`w-16 h-16 rounded-full ${getColor(color)} ${
            (isGreen && color === 'green') || (!isGreen && color === 'red')
              ? 'animate-pulse'
              : ''
          }`}
        />
      ))}
      <p className="text-white mt-2">
        Vehicles: {vehicleCount}
      </p>
      <p className="text-white text-xl font-bold">
        {isGreen ? `Green: ${countdown}s` : 'Red'}
      </p>
      <p className="text-white text-sm">
        Cycle: {timing}s
      </p>
    </div>
  );
};

export default TrafficLight;

