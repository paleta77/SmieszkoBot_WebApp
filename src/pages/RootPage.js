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

    let codeReq = () => {
        auth.codeRequest(() => {

        });
    };



    return (
        <div>
            <textarea id="username" defaultValue="paleta77#3712" />
            <textarea id="password" defaultValue="1234"/>
            <textarea id="verificationCode" defaultValue="123456"/>
            <Link to="/dashboard">
                <button onClick={login}>Zaloguj</button>
            </Link>
            <Link to="/dashboard">
                <button>przejdź dalej</button>
            </Link>
            <button onClick={codeReq}>
                generuj kod
            </button>
        </div>
    )
}

export default RootPage;