import { FC, useCallback, useState } from 'react'
import { Building, LockKeyhole, Mail, User } from 'lucide-react';
import { useAtom } from 'jotai';
import {SignUpAtom, showTypeAtom } from '../../lib/jotai/AuthAtom';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { SignUpWithEmailPassword } from '../../lib/Auth/auth';



interface SignUpProps {
  
}

const SignUp: FC<SignUpProps> = ({}) => {
  const [, setShowType] = useAtom(showTypeAtom);
  const [emailLoading, setEmailLoading] = useState(false)
  const [signUpData, setSignUpData] = useAtom(SignUpAtom);
  const [showPassword, setShowPassword] = useState(false);

  // Function to handle input changes
  const handleInputChange = useCallback(
    (key: any, value: any) => {
      const updatedData = { ...signUpData, [key]: value };
      setSignUpData(updatedData);
    },
    [signUpData, setSignUpData]
  );



  return (
    <section className="max-w-xl mx-auto w-full">
      <div className="flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full">
          <form
            noValidate
            className=""
            onSubmit={(e) => {
              SignUpWithEmailPassword(e, signUpData, setEmailLoading);
            }}
          >
            <h4 className="font-bold dark:text-cmhq-white">
              Sign up
            </h4>
            <hr className="my-6 border dark:border-gray-600" />
            <span className="dark:text-cmhq-white">
              Continue with email address
            </span>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Your email"
              required
              icon={<Mail size={20} color="#6F767E" />}
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
                className="mt-6"
                onChange={(e) => {
                  handleInputChange('password', e.target.value);
                }}
              />
              {signUpData.password.length > 0 && (
                <div className="absolute right-5 top-5">
                  <input type='checkbox' name='show password' onChange={(e) => setShowPassword(e.target.checked)}/>
                </div>
              )}
            </div>
            <Input
              type="text"
              id="company"
              name="company"
              placeholder="Company (optional)"
              icon={<Building size={20} color="#6F767E" />}
              className="my-6"
              onChange={(e) =>
                handleInputChange('company', e.target.value)
              }
            />

            <div className="my-6">
              <Input
                type="text"
                name="role"
                id="role"
                placeholder="Lawyer, HR, etc."
                icon={<User size={20} color="#6F767E" />}
                className="my-6"
                onChange={(e) =>
                  handleInputChange('role', e.target.value)
                }
              />
             
            </div>

            <div className="my-6">
              <Button
                type="submit"
                isLoading={emailLoading}
                className="w-full"
              >
                {emailLoading ? 'Signing up...' : 'Sign up'}
              </Button>
            </div>
          </form>

          <div className="px-1">
            <span className="font-bold text-[1.4rem] text-cmhq-gray">
              Already have an account?{' '}
            </span>
            <span
              className="font-bold text-[1.4rem] px-1 text-cmhq-natural/07 dark:text-cmhq-white cursor-pointer"
              onClick={() => setShowType('login')}
            >
              Sign in
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp