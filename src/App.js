import React, {useState} from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import RootPage from "./pages/RootPage";

export const jwtContext = React.createContext("test context");

function App() {
    const [context, setContext] = useState("default context value");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    let loggingAuthCode = "abc";
    let jwt = "";

    const login = () => {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let authCode = document.getElementById("authCode").value;

        const credentials = "Basic " + username + ":" + password;

        var myHeaders = new Headers();
        myHeaders.append("Authorization", credentials);
        myHeaders.append("VerificationCode", authCode);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:8500/login?userID=" + username.replace("#", "%23"), requestOptions)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("HTTP status " + response.status);
                }
                return response.json();
            })
            .then(function (result) {
                jwt = result;
                if (jwt.jwt !== "") {
                    setIsAuthenticated(true);
                    setContext(jwt.jwt);
                    console.log("jwt: " + jwt.jwt);
                    console.log(jwt);
                }
            })
            .catch(error => console.log('error', error));

        //setIsAuthenticated(true)//todo remove at end of work! --------------------------------------------------
    };

    const logout = () => {
        console.log("logging out");
        setIsAuthenticated(false);
    };

    const codeRequest = () => {
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

        fetch("http://localhost:8500/code?userID=" + username.replace("#", "%23") + "&guildID=164834533001134080", requestOptions)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("HTTP status " + response.status);
                }
                return response.json();
            })
            .then(function (result) {
                console.log(result);
                console.log(result.code);
                loggingAuthCode = result.code;
            })
            .catch(error => console.log('error', error));
    }

    return (
            <Router>
                <Switch>
                    <Route path="/" exact>
                        {isAuthenticated ? (
                            <Redirect to="/dashboard"/>
                        ) : (
                            <RootPage
                                login={login}
                                codeRequest={codeRequest}
                            />
                        )}
                    </Route>
                    <jwtContext.Provider value={[context, setContext]}>
                    <ProtectedRoute
                        isAuthenticated={isAuthenticated}
                        path="/dashboard"
                        logout={logout}
                        component={Dashboard}
                    />
                    </jwtContext.Provider>
                    <Route path="*">
                        <div>404 Not found</div>
                    </Route>
                </Switch>
            </Router>
    );
}


export default App;
