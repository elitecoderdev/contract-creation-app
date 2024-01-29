import { supabase } from "../../supabase/supabase";
import { customToastError, customToastSuccess } from "../../lib/customToasts";

// Interface for sign up data
interface SignUpData {
  email: string;
  password: string;
  company: string;
  role: string;
}

// Interface for sign in data
interface SignInData {
  email: string;
  password: string;
}

// Function to sign in with email and password
export const SignInWithEmailPassword = async (
  e: React.FormEvent<HTMLFormElement>,
  SignInData: SignInData,
  setEmailLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  e.preventDefault();
  const form = e.currentTarget;
  const invalidInput = form.querySelectorAll(
    ':invalid'
  )?.[0] as HTMLInputElement;

  if (!form.checkValidity()) {
    // Add focus styles to invalid input
    invalidInput.focus();
    invalidInput.classList.add('focus:bg-cmhq-red/30');
    invalidInput.classList.add('focus:ring-cmhq-red/50');
    invalidInput.classList.add('focus:placeholder:text-cmhq-red');
    invalidInput.classList.add('focus:text-cmhq-red');
    invalidInput.classList.add('dark:focus:bg-cmhq-red/30');
    invalidInput.classList.add('dark:focus:ring-cmhq-red/50');
    invalidInput.classList.add(
      'dark:focus:placeholder:text-cmhq-red'
    );
    invalidInput.classList.add('dark:focus:text-cmhq-red');
    invalidInput.onfocus = () => {
      // Remove focus styles when input is focused
      invalidInput.classList.remove('focus:bg-cmhq-red/30');
      invalidInput.classList.remove('focus:ring-cmhq-red/50');
      invalidInput.classList.remove(
        'focus:placeholder:text-cmhq-red'
      );
      invalidInput.classList.remove('focus:text-cmhq-red');
      invalidInput.classList.remove('dark:focus:bg-cmhq-red/30');
      invalidInput.classList.remove('dark:focus:ring-cmhq-red/50');
      invalidInput.classList.remove(
        'dark:focus:placeholder:text-cmhq-red'
      );
      invalidInput.classList.remove('dark:focus:text-cmhq-red');
    };
  } else {
    setEmailLoading(true);
    try {
      const response = await supabase.auth.signInWithPassword({
        email: SignInData.email,
        password: SignInData.password,
      });
      if (!response.error) {
        window.location.href = '/';
        customToastSuccess('Signed in successfully!');
        setEmailLoading(false);
      }

      if (response.error) {
        customToastError(response.error.message);
        setEmailLoading(false);
      }
    } catch (error) {
      console.error('Error signing in:', error);
      throw new Error('something happened, see detail log');
    }
  }
};

// Function to sign up with email and password
export const SignUpWithEmailPassword = async (
  e: React.FormEvent<HTMLFormElement>,
  SignUpData: SignUpData,
  setEmailLoading: React.Dispatch<
    React.SetStateAction<boolean>
  >
) => {
  e.preventDefault();
  const form = e.currentTarget;
  const invalidInput = form.querySelectorAll(
    ':invalid'
  )?.[0] as HTMLInputElement;

  if (!form.checkValidity()) {
    // Add focus styles to invalid input
    invalidInput.focus();
    invalidInput.classList.add('focus:bg-cmhq-red/30');
    invalidInput.classList.add('focus:ring-cmhq-red/50');
    invalidInput.classList.add('focus:placeholder:text-cmhq-red');
    invalidInput.classList.add('focus:text-cmhq-red');
    invalidInput.classList.add('dark:focus:bg-cmhq-red/30');
    invalidInput.classList.add('dark:focus:ring-cmhq-red/50');
    invalidInput.classList.add(
      'dark:focus:placeholder:text-cmhq-red'
    );
    invalidInput.classList.add('dark:focus:text-cmhq-red');
    invalidInput.onfocus = () => {
      // Remove focus styles when input is focused
      invalidInput.classList.remove('focus:bg-cmhq-red/30');
      invalidInput.classList.remove('focus:ring-cmhq-red/50');
      invalidInput.classList.remove(
        'focus:placeholder:text-cmhq-red'
      );
      invalidInput.classList.remove('focus:text-cmhq-red');
      invalidInput.classList.remove('dark:focus:bg-cmhq-red/30');
      invalidInput.classList.remove('dark:focus:ring-cmhq-red/50');
      invalidInput.classList.remove(
        'dark:focus:placeholder:text-cmhq-red'
      );
      invalidInput.classList.remove('dark:focus:text-cmhq-red');
    };
  } else {
    setEmailLoading(true);
    try {
      const response = await supabase.auth.signUp({
        email: SignUpData.email,
        password: SignUpData.password,
        options: {
          data: {
            company_name: SignUpData.company,
            role: SignUpData.role,
          },
        },
      });

      if (!response.error) {
        customToastSuccess('Signed up successfully!');
        setEmailLoading(false);
      }
      if (response.error) {
        customToastError(response.error.message);
        setEmailLoading(false);
      }
    } catch (error) {
      // Handle error
      setEmailLoading(false);
      console.error('Error signing in:', error);
      throw new Error('something happened, see detail log');
    }
  }
};

// Function to sign out
export const SignOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    window.location.href = '/login';
    customToastSuccess('Signed out successfully!');
  } catch (error) {
    console.error('Error signing out:', error);
    throw new Error('something happened, see detail log');
  }
};