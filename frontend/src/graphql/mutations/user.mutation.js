import { gql } from "@apollo/client";

export const SIGN_UP = gql`
    mutation SignUp($input: SignUpInput!) {
        signUp(input: $input) {
            _id
            username
            name
        }
    }
`;

export const LOGOUT = gql`
    mutation Logout {
        logout {
            message
        }
    }
`;

export const SIGN_IN = gql`
    mutation SignIn($input: SignInInput!) {
        signIn(input: $input) {
            _id
            username
            name
        }
    }
`;