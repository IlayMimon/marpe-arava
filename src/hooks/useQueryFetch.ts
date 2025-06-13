import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Method } from 'axios';
import httpRequest from '../functions/httpRequest';
import { useDispatch } from 'react-redux';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useEffect } from 'react';

// Hook responsible for fetching data using useQuery. Copied from NYP and slightly modified.
export const useQueryFetchRequest = <T, B = unknown>(
  url: string,
  dispatchFunc?: ActionCreatorWithPayload<T>,
  enabled = true,
  method: Method = "GET",
  body?: B,
  interval?: number
) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  
  // add $top=4999 to all queries unless explicitly defined otherwise
  const [pathname, queryString] = url.split("?");
  const urlSearchParams = new URLSearchParams(queryString);
  if (!urlSearchParams.has("$top")) urlSearchParams.append("$top", "4999");
  url = `${pathname}?${urlSearchParams.toString()}`;

  
  const response = useQuery<T>({
    queryKey: [url],
    queryFn: async () => await httpRequest<T>(url, method, body),
    initialData: queryClient.getQueryData([url]),
    refetchInterval: interval || undefined,
    enabled,
  });
  
  useEffect(()=>{
    if (!response.isLoading && response.data) {
      dispatchFunc && dispatch(dispatchFunc(response.data))
    }
  }, [response.data, response.isLoading, dispatch, dispatchFunc])
  
  return response;
};
