import React from "react";
import {Link, useHistory} from "react-router-dom";
import {useAuth} from "../use-auth.js";

export function RootPage () {
    let history = useHistory();
    let auth = useAuth();

    let login = () => {
        auth.signin(() => {
            history.push("/dashboard");
        });
    };

    return (
        <div>
            <textarea name="login" defaultValue="This is a description." />
            <textarea name="password" defaultValue="This is a password."/>
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