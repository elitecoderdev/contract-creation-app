import {atom} from "jotai";

export const showTypeAtom = atom("login")

export const SignUpAtom = atom(
    {
        email : "",
        password : "",
        company : "",
        role : "",
    }
)

export const SignInAtom = atom(
    {
        email : "",
        password : "",
    }
)

export const AuthValidationError= atom(
    {
        valueMissing : false,
        validationError : ""
    }
)