import React, { lazy } from 'react'
import ReactDOM from 'react-dom/client'
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from 'react-query';
import './index.css'
import {createStore, Provider} from 'jotai';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Auth from './pages/Auth';
import { Toaster } from 'react-hot-toast';
import { ErrorBoundary } from 'react-error-boundary';
import LoadingScreen from './components/LoadingScreen';
import { AuthProvider } from './hooks/AuthProvider';
import ProtectedRoute from './ProtectedRoute';

export const Store = createStore();

const App = lazy(() => import('./App'));
const NewDocument = lazy(() => import('./pages/NewDocument'));
const EditDocument = lazy(() => import('./pages/EditDocument'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: 0,
      staleTime: 0,
      suspense: true,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Auth />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
  {
    path: '/create',
    element: (
      <ProtectedRoute>
        <NewDocument/>
      </ProtectedRoute>
    ),
  },
  {
    path: '/edit/:id',
    element: (
      <ProtectedRoute>
        <EditDocument/>
      </ProtectedRoute>
    ),
  }
]);





ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary }) => (
              <div>
                There was an error!
                <button onClick={() => resetErrorBoundary()}>
                  Try again
                </button>
              </div>
            )}
          >
            <React.Suspense fallback={<LoadingScreen />}>
              <AuthProvider>
                <Provider store={Store}>
                    <Toaster />
                    <RouterProvider router={router} />
                </Provider>
              </AuthProvider>
            </React.Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  </React.StrictMode>
);
