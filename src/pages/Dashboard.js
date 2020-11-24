import React from "react";
import {Link} from "react-router-dom";

export function Dashboard(){
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