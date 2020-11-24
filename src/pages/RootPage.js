import React from "react";
import {Link} from "react-router-dom";

export function RootPage () {
    return (
        <div>
            <textarea> </textarea>
            <textarea> </textarea>
            <Link to="/dashboard">
                <button>Zaloguj</button>
            </Link>
        </div>
    )
}

export default RootPage;