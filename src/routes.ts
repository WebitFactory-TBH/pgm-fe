import HomePage from './pages/Home';
import UserProfilePage from './pages/UserProfile';

export interface RouteI {
  path: string;
  title: string;
  component: () => JSX.Element;
}

export const routeNames = {
  home: '/',
  userProfile: '/user/profile',
};

const routes: RouteI[] = [
  {
    path: routeNames.home,
    title: 'Home',
    component: HomePage,
  },
  {
    path: routeNames.userProfile,
    title: 'User profile',
    component: UserProfilePage,
  },
];

export default routes;
