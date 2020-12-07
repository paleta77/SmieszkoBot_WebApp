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
    signin() {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic admin:1234");
        //myHeaders.append("Access-Control-Allow-Origin", "localhost");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };


        fetch("http://localhost:8500/login?userID=469505275850915850&guildID=164834533001134080", requestOptions)
            .then(response => response.json())
            .then(function (result) {
                console.log(result);
                console.log(document.getElementById("login").value);
                console.log(document.getElementById("password").value);
            })
            .catch(error => console.log('error', error));

        fakeAuth.isAuthenticated = true;
        fakeAuth.username = "paleta77";

    },
    signout() {
        fakeAuth.isAuthenticated = false;
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