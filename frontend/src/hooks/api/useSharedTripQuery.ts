import { useQuery } from '@tanstack/react-query';

import type { AxiosError } from 'axios';

import { getSharedTrip } from '@api/trip/getSharedTrip';

import type { TripData } from '@type/trip';

import { NETWORK } from '@constants/api';

export const useSharedQuery = (code: string) => {
  const { data } = useQuery<TripData, AxiosError>(
    ['trip', Number(code)],
    () => getSharedTrip(code),
    {
      retry: NETWORK.RETRY_COUNT,
      suspense: true,
      useErrorBoundary: true,
    }
  );

  return { tripData: data! };
};
