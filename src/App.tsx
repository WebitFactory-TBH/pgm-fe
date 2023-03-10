import RequireAuth from './components/RequiresAuth';
import { WalletProvider } from './context/Wallet';
import routes, { RouteI } from './routes';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <WalletProvider>
        <QueryClientProvider client={queryClient}>
          <Routes>
            {routes.map((route: RouteI, index: number) => (
              <Route
                path={route.path}
                key={'route-key-' + index}
                element={
                  <RequireAuth requiresAuth={route.requiredAuth}>
                    <route.component />
                  </RequireAuth>
                }
              />
            ))}
            {/* <Route path="*" element={<PageNotFound />} /> */}
          </Routes>
        </QueryClientProvider>
      </WalletProvider>
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;
