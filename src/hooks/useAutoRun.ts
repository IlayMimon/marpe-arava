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


const fetchStatus = async (): Promise<SharepointQueryResultArray<Status>> => {
  const response = await fetch("/_api/web/lists/getbytitle('Status')/items?$select=isOver,status,step,isAssigned");
  if (!response.ok) throw new Error('Failed to fetch status');
  console.log("Fetching status from SharePoint");
  return response.json();
};

export const useStatusManager = (setModalOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
  // const [isModalOpen, setModalOpen] = useState(false);
  const [shouldPoll, setShouldPoll] = useState(true);
  const [isAutoOver, setIsAutoOver] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const queryClient = useQueryClient();

  const {
    data: status,
    refetch,
  } = GetStatus();
  // useQuery({
  //   queryKey: ['status'],
  //   queryFn: fetchStatus,
  //   enabled: true,
  //   refetchInterval: shouldPoll ? 2000 : false,
  // });

  const {
    shuttles,
    refetch: refetchShuttles,
  } = getShuttles();

  const handleStatus = useCallback(async () => {
    const { data } = await refetch();
    const { data: shuttleData } = await refetchShuttles();
    if (!data || !shuttleData) return;

    const { isOver, isAssigned } = data.d.results[0] || {};
    console.log("Status fetched:", { isOver, isAssigned });
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
      // setShouldPoll(false);
      await assignShuttlesToDrivers(shuttles || [], initDrivers(3)); // FIX number of drivers and shuttles
      queryClient.invalidateQueries({ queryKey: ['status'] });
      console.log("Shuttles assigned successfully.");
      // setIsAutoOver(true);
    } else if (!isOver) {
      setModalOpen(true);
      setShouldPoll(true);
    }
  }, [refetch, queryClient, refetchShuttles]);

  // Run once on mount
  useEffect(() => {
    if (shouldPoll) {
      // תפעיל אינטרוול חדש
      intervalRef.current = setInterval(() => {
      handleStatus();
      console.log("Polling for status updates...");
      }, 1000);
    } else {
      // תעצור את האינטרוול אם קיים
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // תוודא שב-unmount עוצרים אינטרוול
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [shouldPoll]);

  
  // Manually triggerable from outside
  const onAssignClick = () => {
  
  setShouldPoll(true);
};

  return {
    
    onAssignClick,
  };
};


