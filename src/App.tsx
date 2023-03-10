import routes, { RouteI } from './routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Routes>
          {routes.map((route: RouteI, index: number) => (
            <Route
              path={route.path}
              key={'route-key-' + index}
              element={<route.component />}
            />
          ))}
          {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
