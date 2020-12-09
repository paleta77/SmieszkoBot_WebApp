import React from "react";
import {Link} from "react-router-dom";

function RootPage ({
    login: login,
    codeRequest: codeRequest,
                   }) {

    return (
        <div>
            <textarea id="username" defaultValue="paleta77#3712" />
            <textarea id="password" defaultValue="1234"/>
            <textarea id="authCode" defaultValue="123456"/>
            <Link to="/dashboard">
                <button onClick={login}>Zaloguj</button>
            </Link>
            <Link to="/dashboard">
                <button>przejdź dalej</button>
            </Link>
            <button onClick={codeRequest}>
                generuj kod
            </button>
        </div>
    )
}

export default RootPage;