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
    verificationCode: 0,
    signin(cb) {
        fakeAuth.isAuthenticated = true;
        //fakeAuth.username = "paleta77";
        console.log(fakeAuth.verificationCode);
        console.log(fakeAuth.username);
        cb(); // fake async
    },
    signout(cb) {
        fakeAuth.isAuthenticated = false;
        cb();
    },
    codeRequest(cb) {
        var myHeaders = new Headers();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const credentials = "Basic " + username + ":" + password;
        myHeaders.append("Authorization", credentials);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:8500/login?userID=469505275850915850&guildID=164834533001134080", requestOptions)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("HTTP status " + response.status);
                }
                return response.json();
            })
            .then(function (result) {
                console.log(result);
                console.log(result.code);
                fakeAuth.verificationCode = result.code;
                fakeAuth.username = result.username;
            })
            .catch(error => console.log('error', error));
        cb();
    }
};

function useProvideAuth() {
    const [user, setUser] = useState(null);
    const [code, setCode] = useState(null);

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

    const codeRequest = cb => {
        return fakeAuth.codeRequest( () => {
            setCode(fakeAuth.verificationCode);
            cb();
        });
    };

    return {
        user,
        signin,
        signout,
        codeRequest
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