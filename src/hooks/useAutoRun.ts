import { useEffect, useRef, useState } from "react";
import useGetStatus from "./data/useGetStatus";
import { assignShuttlesToDrivers } from "../functions/assignDriversFunc/assignDrivers";
import { getShuttles } from "../functions/getSuttles";
import { initDrivers } from "../functions/initDrivers";
import { Shuttle } from "../types/assignDriversTypes";

const  useAutoRun = (
  intervalMs = 2000
) => {
  console.log("useAutoRun called with intervalMs:", intervalMs);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { refetch } = useGetStatus();
  const { refetch: refetchShuttles } = getShuttles();
  const [ isSuccess, setIsSuccess ] = useState(false);
  // FIX if 1.5 min has passed
  const fetchItem = async () => {
    
    const { data } = await refetch();
    const status = data?.d.results[0];
    console.log(status)

    if (status?.isOver == true && status?.isAssigned == true) {
        console.log("1")

        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setIsSuccess(true);

      } else if (status?.isOver == true && status?.isAssigned != true) {
        console.log("2")
        const { data } = await refetchShuttles();
        const shuttles = data?.d.results.map(
          (shuttle) => ({
          Id: shuttle.Id,
          StartTime: shuttle.StartTime,
          ArrivalTime: shuttle.ArrivalTime,
          totalDistance: shuttle.totalDistance,
        }));

        assignShuttlesToDrivers(shuttles || [], initDrivers(3)); // FIX number of drivers
        setIsSuccess(true);
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

  return { isSuccess  };
}

export default useAutoRun;