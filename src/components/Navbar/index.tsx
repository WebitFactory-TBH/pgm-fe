import { useUser } from '../../context/user';
import LoginBtn from '../LoginComponents/LoginBtn';
import UserDropdown from './UserDropdown';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { user } = useUser();
  const links = [
    {
      label: 'Home',
      link: '/',
    },
    {
      label: 'Payments',
      link: '/payments',
    },
  ];

  return (
    <nav className="bg-gradient-to-r from-[#E5896F] to-[#3E2447] px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-10 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <div>
          <span
            className="self-center text-xl font-semibold whitespace-nowrap text-white"
            style={{ fontFamily: 'monospace' }}
          >
            Pagament.io
          </span>
        </div>
        <div className="md:order-2">
          {user ? <UserDropdown /> : <LoginBtn />}
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          {/* <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {links.map((el) => {
              return (
                <li key={el.label}>
                  <Link
                    to={el.link}
                    className="text-slate-700 hover:text-slate-500 text-xs uppercase py-3 font-bold block"
                  >
                    {el.label}
                  </Link>
                </li>
              );
            })}
          </ul> */}
        </div>
      </div>
    </nav>
  );
}
