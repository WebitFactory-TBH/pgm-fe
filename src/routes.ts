import HomePage from './pages/Home';
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
};

const routes: RouteI[] = [
  {
    path: routeNames.home,
    title: 'Dashboard',
    component: HomePage,
    requiredAuth: false
  },
  {
    path: routeNames.userProfile,
    title: 'User profile',
    component: UserProfilePage,
    requiredAuth: true
  },
];

export default routes;
