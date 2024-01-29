import { FC, useCallback, useState } from 'react';
import { LockKeyhole, Mail} from 'lucide-react';
import { useAtom } from 'jotai';
import { SignInAtom, showTypeAtom } from '../../lib/jotai/AuthAtom';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { SignInWithEmailPassword } from '../../lib/Auth/auth';

interface LoginProps {}

const Login: FC<LoginProps> = ({}) => {
  const [emailLoading, setEmailLoading] = useState(false);
  const [, setShowType] = useAtom(showTypeAtom);
  const [signInData, setSignInData] = useAtom(SignInAtom);
  const [showPassword, setShowPassword] = useState(false);


  // Function to handle input changes
  const handleInputChange = useCallback(
    (key: any, value: any) => {
      const updatedData = { ...signInData, [key]: value };
      setSignInData(updatedData);
    },
    [signInData, setSignInData]
  );

  return (
    <section className="max-w-xl mx-auto w-full">
      <div className="flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full">
          <form
            noValidate
            className=""
            onSubmit={(e) =>
              SignInWithEmailPassword(e, signInData, setEmailLoading)
            }
          >
            <h4 className="font-bold dark:text-cmhq-white">
              Sign in
            </h4>
            <hr className="my-6 border dark:border-gray-600" />
            <span className="base2 dark:text-cmhq-white">
              Continue with email address
            </span>

            <Input
              type="email"
              id="email"
              placeholder="Your email"
              required
              icon={<Mail size={20} className="stroke-cmhq-gray" />}
              className="my-6"
              onChange={(e) =>
                handleInputChange('email', e.target.value)
              }
            />

            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Password"
                required
                icon={
                  <LockKeyhole
                    size={20}
                    className="stroke-cmhq-gray"
                  />
                }
                maxLength={16}
                minLength={7}
                // pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{4,}$"
                className="my-6"
                onChange={(e) => {
                  handleInputChange('password', e.target.value);
                  // checkPasswordStrength(e.target.value);
                }}
              />
              {signInData.password.length > 0 && (
                <div className="absolute right-5 top-5">
                  <input
                    type="checkbox"
                    name="show password"
                    onChange={(e) =>
                      setShowPassword(e.target.checked)
                    }
                  />
                </div>
              )}
            </div>
            <div className="my-6">
              <Button
                type="submit"
                isLoading={emailLoading}
                className="w-full"
              >
                {emailLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </div>
          </form>
          <div className="px-1">
            <span className="font-bold text-[1.4rem] text-cmhq-gray">
              Don't have an account?{' '}
            </span>
            <span
              className="font-bold text-[1.4rem] px-1 text-cmhq-natural/07 dark:text-cmhq-white cursor-pointer"
              onClick={() => setShowType('signUp')}
            >
              Sign up
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
