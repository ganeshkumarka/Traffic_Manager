import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import VideoInput from './VideoInput';
import TrafficLight from './TrafficLight';
import ControlPanel from './ControlPanel';
import Clock from './Clock';
import { LogOut, User } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [vehicleCounts, setVehicleCounts] = React.useState([0, 0, 0, 0]);
  const [emergencyVehicles, setEmergencyVehicles] = React.useState([false, false, false, false]);
  const [lightTimings, setLightTimings] = React.useState([30, 30, 30, 30]);
  const [activeGreen, setActiveGreen] = React.useState(0);
  const [vipIntersection, setVipIntersection] = React.useState<number | null>(null);
  const [pendingVipIntersection, setPendingVipIntersection] = React.useState<number | null>(null);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveGreen((prev) => {
        if (pendingVipIntersection !== null && !emergencyVehicles[prev]) {
          setVipIntersection(pendingVipIntersection);
          setPendingVipIntersection(null);
          return pendingVipIntersection;
        }

        if (vipIntersection !== null && !emergencyVehicles.some(hasEmergency => hasEmergency)) {
          return vipIntersection;
        }

        const emergencyIndex = emergencyVehicles.findIndex(hasEmergency => hasEmergency);
        if (emergencyIndex !== -1) {
          return emergencyIndex;
        }

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
      
      if (hasEmergency && vipIntersection !== null) {
        setPendingVipIntersection(vipIntersection);
        setVipIntersection(null);
      }
      return newEmergencies;
    });

    setLightTimings(prev => {
      const newTimings = [...prev];
      if (hasEmergency) {
        newTimings[index] = 45;
      } else if (index === vipIntersection) {
        newTimings[index] = 45;
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

    const hasEmergencyVehicle = emergencyVehicles.some(hasEmergency => hasEmergency);
    
    if (hasEmergencyVehicle) {
      setPendingVipIntersection(intersection);
    } else {
      setVipIntersection(intersection);
      setActiveGreen(intersection);
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Traffic Management System</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
              <User className="text-gray-500" size={20} />
              <span className="text-gray-700">{user?.username}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogOut size={20} />
              Logout
            </button>
            <Clock />
          </div>
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

export default Dashboard;