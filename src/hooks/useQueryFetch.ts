import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Method } from 'axios';
import httpRequest from '../functions/httpRequest';

// Hook responsible for fetching data using useQuery. Copied from NYP and slightly modified.
const useQueryFetch = <T>(url: string, fetchFunc: () => Promise<T>, enabled = true, interval?: number) => {
  const queryClient = useQueryClient();

  return useQuery<T>({
    queryKey: [url],
    queryFn: () => fetchFunc(),
    initialData: queryClient.getQueryData([url]),
    refetchInterval: interval || undefined,
    enabled,
  });
};

export const useQueryFetchRequest = <T, B = unknown>(
  url: string,
  enabled = true,
  method: Method = 'GET',
  body?: B,
  interval?: number
) => {
  return useQueryFetch<T>(url, async () => await httpRequest<T>(url, method, body), enabled, interval);
};
