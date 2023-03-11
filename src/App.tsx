import DefaultLayout from './components/Layouts/Default';
import RequireAuth from './components/RequiresAuth';
import { ContractProvider } from './context/contract';
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
        <ContractProvider>
          <WalletProvider>
            <QueryClientProvider client={queryClient}>
              <DefaultLayout>
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
              </DefaultLayout>
            </QueryClientProvider>
          </WalletProvider>
        </ContractProvider>
      </UserProvider>
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;
