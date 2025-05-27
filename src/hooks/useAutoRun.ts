import { useEffect, useRef } from "react";
import useGetStatus from "./data/useGetStatus";
import { assignShuttlesToDrivers } from "../functions/assignDriversFunc/assignDrivers";
import { getShuttles } from "../functions/getSuttles";
import { initDrivers } from "../functions/initDrivers";

const useAutoRun = (
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  intervalMs = 2000
) => {
  
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { status, refetch } = useGetStatus();
 
  const fetchItem = async () => {
    const { data } = await refetch();
    const status = data?.d.results[0];

    if (status?.isOver == true && status?.isAssigned == true) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        await assignShuttlesToDrivers((getShuttles() || []), initDrivers(3));
        setVisible(false);
      }
    } 
  };

  useEffect(() => {
    if (!(status?.isOver) || !(status?.isAssigned)) {
      setVisible(true);
      console.log("Starting polling with interval:", intervalMs);
      intervalRef.current = setInterval(fetchItem, intervalMs);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  
}

export default useAutoRun;