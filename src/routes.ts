import HomePage from './pages/Home';
import Login from './pages/Login';
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
  login: '/login',
};

const routes: RouteI[] = [
  {
    path: routeNames.home,
    title: 'Home',
    component: HomePage,
    requiredAuth: true,
  },
  {
    path: routeNames.userProfile,
    title: 'User profile',
    component: UserProfilePage,
    requiredAuth: true,
  },
  {
    path: routeNames.login,
    title: 'Login',
    component: Login,
    requiredAuth: false,
  },
];

export default routes;
