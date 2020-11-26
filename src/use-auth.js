import React, { useState, useContext, createContext } from "react";
import {Route, Redirect} from "react-router-dom";


const authContext = createContext();

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

const fakeAuth = {
    isAuthenticated: false,
    username: "",
    signin(cb) {
        fakeAuth.isAuthenticated = true;
        fakeAuth.username = "paleta77";
        cb(); // fake async
    },
    signout(cb) {
        fakeAuth.isAuthenticated = false;
        cb();
    }
};

function useProvideAuth() {
    const [user, setUser] = useState(null);

    const signin = cb => {
        return fakeAuth.signin(() => {
            setUser(fakeAuth.username);
            cb();
        });
    };

    const signout = cb => {
        return fakeAuth.signout(() => {
            setUser(null);
            cb();
        });
    };

    return {
        user,
        signin,
        signout
    };
}

export function PrivateRoute({ children, ...rest }) {
    let auth = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}