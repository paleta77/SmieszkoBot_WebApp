import React from "react";
import {Link, useHistory} from "react-router-dom";
import {useAuth} from "../use-auth.js";

export function RootPage () {
    let history = useHistory();
    let auth = useAuth();

    let login = () => {
        auth.signin();
    };

    return (
        <div>
            <textarea id="login" defaultValue="This is a description." />
            <textarea id="password" defaultValue="This is a password."/>
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