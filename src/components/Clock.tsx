// import React, { useState, useEffect } from 'react';

// const Clock: React.FC = () => {
//   const [time, setTime] = useState(new Date());

//   useEffect(() => {
//     const timer = setInterval(() => setTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const formatDate = (date: Date) => {
//     const options: Intl.DateTimeFormatOptions = { 
//       weekday: 'long', 
//       year: 'numeric', 
//       month: 'long', 
//       day: 'numeric' 
//     };
//     return date.toLocaleDateString(undefined, options);
//   };

//   const formatTime = (date: Date) => {
//     return date.toLocaleTimeString();
//   };

//   return (
//     <div className="absolute top-4 right-4 text-right">
//       <p className="text-lg font-semibold">{formatTime(time)}</p>
//       <p className="text-sm">{formatDate(time)}</p>
//     </div>
//   );
// };

// export default Clock;

//clock for css
import React, { useState, useEffect } from 'react';
import { Clock as ClockIcon } from 'lucide-react';

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString();
  };

  return (
    <div className="flex items-center space-x-3 bg-red-700/50 p-4 rounded-lg backdrop-blur-sm border border-green-600">
      <ClockIcon className="w-6 h-6 text-green-400" />
      <div>
        <p className="text-2xl font-bold text-white tracking-wider">{formatTime(time)}</p>
        <p className="text-sm text-black-400">{formatDate(time)}</p>
      </div>
    </div>
  );
};

export default Clock;