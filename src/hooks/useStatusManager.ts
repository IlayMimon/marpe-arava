import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { assignShuttlesToDrivers } from "../functions/assignDriversFunc/assignDrivers";
import { getShuttles } from "../functions/getSuttles";
import { initDrivers } from "../functions/initDrivers";
import GetStatus from "./data/useGetStatus";


export const useStatusManager = (setModalOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
  // const [isModalOpen, setModalOpen] = useState(false);
  const [shouldPoll, setShouldPoll] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const queryClient = useQueryClient();

  const {
    data: status,
    refetch,
  } = GetStatus();

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
      
    } else if (isOver && !isAssigned) {
      setModalOpen(true);
      await assignShuttlesToDrivers(shuttles || [], initDrivers(3)); // FIX number of drivers and shuttles
     
    } else if (!isOver) {
      setModalOpen(true);
      setShouldPoll(true);
    }
  }, [refetch, queryClient, refetchShuttles]);


  useEffect(() => {
    if (shouldPoll) {
      
      intervalRef.current = setInterval(() => {
      handleStatus();
      
      }, 2000);
    } else {
      // Clear the interval if polling is disabled
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

   
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


