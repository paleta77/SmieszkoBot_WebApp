import React from "react";
import {Link, useHistory, useLocation} from "react-router-dom";
import {useAuth} from "../use-auth.js";

export function RootPage () {
    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();

    let { from } = location.state || { from: { pathname: "/" } };
    let login = () => {
        auth.signin(() => {
            history.push("/dashboard");
        });
    };

    return (
        <div>
            <textarea> </textarea>
            <textarea> </textarea>
            <Link to="/dashboard">
                <button onClick={login}>Zaloguj</button>
            </Link>
            <Link to="/dashboard">
                <button>przejdź dalej</button>
            </Link>
        </div>
    )
}

export default RootPage;