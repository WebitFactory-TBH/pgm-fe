import RequireAuth from './components/RequiresAuth';
import { UserProvider } from './context/user';
import { WalletProvider } from './context/wallet';
import routes, { RouteI } from './routes';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <UserProvider initialValue={null}>
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
      </UserProvider>
      <Toaster position='top-right' />
    </Router>
  );
}

export default App;
