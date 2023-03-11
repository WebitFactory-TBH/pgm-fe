import CreatePayment from './pages/CreatePayment';
import HomePage from './pages/Home';
import Payments from './pages/Payments';
import UserProfilePage from './pages/UserProfile';

export interface RouteI {
  path: string;
  title: string;
  component: () => JSX.Element;
  requiredAuth: boolean;
}

export const routeNames = {
  home: '/',
  userProfile: '/user/profile',
  payments: '/payments',
  createPayment: '/payments/create',
};

const routes: RouteI[] = [
  {
    path: routeNames.home,
    title: 'Dashboard',
    component: HomePage,
    requiredAuth: false,
  },
  {
    path: routeNames.userProfile,
    title: 'User profile',
    component: UserProfilePage,
    // requiredAuth: true,
    requiredAuth: false,
  },
  {
    path: routeNames.payments,
    title: 'Payments',
    component: Payments,
    // requiredAuth: true,
    requiredAuth: false,
  },
  {
    path: routeNames.createPayment,
    title: 'Create payment',
    component: CreatePayment,
    // requiredAuth: true,
    requiredAuth: false,
  },
];

export default routes;
