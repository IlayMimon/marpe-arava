import { useCallback, useEffect, useRef, useState } from "react";
import useGetStatus from "./data/useGetStatus";
import { assignShuttlesToDrivers } from "../functions/assignDriversFunc/assignDrivers";
import { getShuttles } from "../functions/getSuttles";
import { initDrivers } from "../functions/initDrivers";
import { Shuttle } from "../types/assignDriversTypes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import GetStatus from "./data/useGetStatus";
import { SharepointQueryResultArray } from "../types/spFetchTypes";
import { Status } from "../components/types/Status";

// const  useAutoRun = (
//   intervalMs = 2000
// ) => {
//   console.log("useAutoRun called with intervalMs:", intervalMs);
//   const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
//   const { refetch } = useGetStatus();
//   const { refetch: refetchShuttles } = getShuttles();
//   const [ isSuccess, setIsSuccess ] = useState(false);
//   // FIX if 1.5 min has passed
//   const fetchItem = async () => {
    
//     const { data } = await refetch();
//     const status = data?.d.results[0];
//     console.log(status)

//     if (status?.isOver == true && status?.isAssigned == true) {
//         console.log("1")

//         if (intervalRef.current) {
//           clearInterval(intervalRef.current);
//           intervalRef.current = null;
//         }
//         setIsSuccess(true);

//       } else if (status?.isOver == true && status?.isAssigned != true) {
//         console.log("2")
//         const { data } = await refetchShuttles();
//         const shuttles = data?.d.results.map(
//           (shuttle) => ({
//           Id: shuttle.Id,
//           StartTime: shuttle.StartTime,
//           ArrivalTime: shuttle.ArrivalTime,
//           totalDistance: shuttle.totalDistance,
//         }));

//         assignShuttlesToDrivers(shuttles || [], initDrivers(3)); // FIX number of drivers
//         setIsSuccess(true);
//       }
//       };

//   useEffect(() => {
     
//     console.log("Starting polling with interval:", intervalMs);
//     intervalRef.current = setInterval(fetchItem, intervalMs);


//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, []);

//   return { isSuccess  };
// }

// export default useAutoRun;

const fetchStatus = async (): Promise<SharepointQueryResultArray<Status>> => {
  const response = await fetch("/_api/web/lists/getbytitle('Status')/items?$select=isOver,status,step,isAssigned");
  if (!response.ok) throw new Error('Failed to fetch status');
  return response.json();
};

export const useStatusManager = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [shouldPoll, setShouldPoll] = useState(true);
 
  const queryClient = useQueryClient();

  const {
    data: status,
    refetch,
  } = useQuery({
    queryKey: ['status'],
    queryFn: fetchStatus,
    enabled: true,
    refetchInterval: shouldPoll ? 2000 : false,
  });

  const {
    shuttles,
    refetch: refetchShuttles,
  } = getShuttles();

  const handleStatus = useCallback(async () => {
    const { data } = await refetch();
    const { data: shuttleData } = await refetchShuttles();
    if (!data || !shuttleData) return;

    const { isOver, isAssigned } = data.d.results[0] || {};
    const shuttles = shuttleData?.d.results.map((shuttle) => {
      return {
        Id: shuttle.Id,
        StartTime: shuttle.StartTime,
        ArrivalTime: shuttle.ArrivalTime,
        totalDistance: shuttle.totalDistance,
      };
    });

    if (isOver && isAssigned) {
      setModalOpen(false);
      setShouldPoll(false);
      console.log("Shuttles are already assigned and the process is over.");
    } else if (isOver && !isAssigned) {
      setModalOpen(true);
      setShouldPoll(false);
      await assignShuttlesToDrivers(shuttles || [], initDrivers(3)); // FIX number of drivers and shuttles
      queryClient.invalidateQueries({ queryKey: ['status'] });
      console.log("Shuttles assigned successfully.");
    } else if (!isOver) {
      setModalOpen(true);
      setShouldPoll(true);
    }
  }, [refetch, queryClient, refetchShuttles]);

  // Run once on mount
  useEffect(() => {
    handleStatus();
  }, [handleStatus]);

  // If polling is active, monitor updates
  useEffect(() => {
    if (status?.d.results[0]?.isOver) {
      handleStatus();
    }
  }, [status?.d.results[0]?.isOver]);

  // Manually triggerable from outside
  const onAssignClick = () => {
    handleStatus();
  };

  return {
    isModalOpen,
    onAssignClick,
  };
};


