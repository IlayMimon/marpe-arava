import { useEffect, useRef } from "react";
import useGetStatus from "./data/useGetStatus";
import { assignShuttlesToDrivers } from "../functions/assignDriversFunc/assignDrivers";
import { getShuttles } from "../functions/getSuttles";
import { initDrivers } from "../functions/initDrivers";
import { Shuttle } from "../types/assignDriversTypes";

const  useAutoRun = (
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  intervalMs = 2000
) => {
  
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { refetch } = useGetStatus();
  const { refetch: refetchShuttles } = getShuttles();
  
  // FIX if 1.5 min has passed
  const fetchItem = async () => {
    
    const { data } = await refetch();
    const status = data?.d.results[0];
  
    if (status?.isOver == true && status?.isAssigned == true) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      
        const { data } = await refetchShuttles();
        const shuttles = data?.d.results.map((shuttle) => {
        return {
          Id: shuttle.Id,
          StartTime: shuttle.StartTime,
          ArrivalTime: shuttle.ArrivalTime,
          totalDistance: shuttle.totalDistance,
        };
      });
        assignShuttlesToDrivers(shuttles || [], initDrivers(3)); // FIX number of drivers
        setVisible(false);
      } else {
        setVisible(true);
      }
  };

  useEffect(() => {
     
    console.log("Starting polling with interval:", intervalMs);
    intervalRef.current = setInterval(fetchItem, intervalMs);

    

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  
}

export default useAutoRun;