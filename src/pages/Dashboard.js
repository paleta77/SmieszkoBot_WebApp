import React from "react";
import {Link} from "react-router-dom";
import {useAuth} from "../use-auth.js";

export function Dashboard(){
    const auth = useAuth();
    return (
        <div>
            Witaj na swoim panelu
            <Link to="/">
                <button>
                    Wyloguj
                </button>
            </Link>
        </div>
    )
}

export default Dashboard;