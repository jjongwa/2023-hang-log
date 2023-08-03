import App from '@/App';
import { PATH } from '@constants/path';
import { Suspense } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ExpensePage from '@pages/ExpensePage/ExpensePage';
import ExpensePageSkeleton from '@pages/ExpensePage/ExpensePageSkeleton';
import NotFoundPage from '@pages/NotFoundPage/NotFoundPage';
import TripCreatePage from '@pages/TripCreatePage/TripCreatePage';
import TripEditPage from '@pages/TripEditPage/TripEditPage';
import TripPage from '@pages/TripPage/TripPage';
import TripPageSkeleton from '@pages/TripPage/TripPageSkeleton';
import TripsPage from '@pages/TripsPage/TripsPage';
import TripsPageSkeleton from '@pages/TripsPage/TripsPageSkeleton';

const router = createBrowserRouter([
  {
    path: PATH.ROOT,
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<TripsPageSkeleton />}>
            <TripsPage />
          </Suspense>
        ),
      },
      {
        path: PATH.TRIP(':tripId'),
        element: (
          <Suspense fallback={<TripPageSkeleton />}>
            <TripPage />
          </Suspense>
        ),
      },
      {
        path: PATH.EDIT_TRIP(':tripId'),
        element: (
          <Suspense fallback={<TripPageSkeleton />}>
            <TripEditPage />
          </Suspense>
        ),
      },
      {
        path: PATH.CREATE_TRIP,
        element: (
          <Suspense>
            <TripCreatePage />
          </Suspense>
        ),
      },
      {
        path: PATH.EXPENSE(':tripId'),
        element: (
          <Suspense fallback={<ExpensePageSkeleton />}>
            <ExpensePage />
          </Suspense>
        ),
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
