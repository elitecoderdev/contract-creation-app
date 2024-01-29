import { FC} from 'react'
import LoginBanner from '../assets/paper.png';
import Login from '../partials/auth/Login';
import SignUp from '../partials/auth/SignUp';
import { useAtom } from 'jotai';
import { darkModeAtom } from '../lib/jotai/DarkModeAtom';
import { Button } from '../components/ui/Button';
import { Moon, Sun } from 'lucide-react';
import { showTypeAtom } from '../lib/jotai/AuthAtom';

interface AuthProps {
  
}

const Auth: FC<AuthProps> = ({}) => {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  const [showType] = useAtom(showTypeAtom)

  // Define the AuthType object to map the showType value to the corresponding JSX element
  type AuthType = {
    [key: string]: JSX.Element;
  };

  const AuthType: AuthType = {
    login: <Login />,
    signUp: <SignUp />,
  };

  const AuthComponent = AuthType[showType];
  return (
    <div
      className={`dh text-cmhq-natural/07 bg-cmhq-primary-900 overflow-hidden ${
        darkMode && 'dark'
      }`}
    >
      <div className="lg:p-5 p-0 grid grid-cols-5 box-border h-screen">
        <div className="col-span-2 xl:m-16 lg:my-16 relative h-full lg:block hidden">
          <h2 className="mb-3 text-cmhq-white/01 font-bold">
            Welcome to Contract Manager
          </h2>
          <span className="title1-medium text-gray-400">
            Sign up/Sign in to create and manage your contracts
          </span>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <img
              src={LoginBanner}
              alt=""
              className=""
            />
          </div>
        </div>
        <div className="relative lg:col-span-3 col-span-5 bg-cmhq-white lg:rounded-2xl h-full flex items-center justify-center dark:bg-cmhq-dark-main">
          <div className="absolute top-5 right-5">
            <Button
              variant="outline"
              onClick={() => setDarkMode(!darkMode)}
              size="md"
            >
              {darkMode ? (
                <Sun color="white" size={20} />
              ) : (
                <Moon size={20} color="black" />
              )}
            </Button>
          </div>
          {AuthComponent}
        </div>
      </div>
    </div>
  );
}

export default Auth