import './header-style.scss';

import React, { Component }  from 'react';
import {PHASES} from "../../constants/phases";

const Header = ({setCurrentPhase}) => {

    function logOut() {
        localStorage.clear()
        setCurrentPhase(PHASES.NOT_AUTHENTICATED)
    }

    return (
        <header>
            <menu>
                <div id="logo">TWEET</div>
                <ul>
                    <li onClick={() => logOut()}>Log out</li>
                </ul>
            </menu>
        </header>
    )
}

export default Header