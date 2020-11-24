import React from "react";
import {Link, useHistory} from "react-router-dom";
import {useAuth} from "../use-auth.js";

export function Dashboard(){
    const auth = useAuth();

    let history = useHistory();

    let logout = () => {
        auth.signout(() => {
            history.push("/");
        });
    };

    return (
        <div>
            Witaj na swoim panelu
            <Link to="/">
                <button onClick={logout}>
                    Wyloguj
                </button>
            </Link>
        </div>
    )
}

export default Dashboard;