import './App.scss';

import Axios from "axios";
import React, {useEffect, useState} from "react";

import Header from './components/header/header'
import Banner from "./components/banner/banner";
import Wall from "./components/wall/wall";
import NewTweet from "./forms/newTweet/newTweet";
import Spinner from "./components/spinner/spinner";

import "./interceptors/authTokenProvider"

import {PHASES} from "./constants/phases";

function App() {

    const [currentPhase, setCurrentPhase] = useState(PHASES.LOADING)
    const [loggedUserData, setLoggedUserData] = useState(undefined)
    const [actionCount, setActionCount] = useState(0)
    const [wall, setWall] = useState(
        {
            threads: []
        }
    )

    useEffect(() => {
        fetchLoggedUser()
    }, []);

    useEffect(() => {
        fetchWallContent()
    }, [actionCount])

    useEffect(() => {
        provideComponents()
    }, [currentPhase])

    const fetchLoggedUser = () => {
        Axios.get(process.env.REACT_APP_API_END_POINT + "/logged")
            .then(response => {
                    if (response.status === 200) {
                        setLoggedUserData(response.data)
                        setCurrentPhase(PHASES.AUTHENTICATED)
                    }
                }
            ).catch(error => {
                setLoggedUserData(null)
                setCurrentPhase(PHASES.NOT_AUTHENTICATED)
            }
        )
    }

    const fetchWallContent = () => {
        Axios.get(process.env.REACT_APP_API_END_POINT + "/all")
            .then(response => {
                    if (response.status === 200) {
                        setWall(null)
                        setWall(response.data)
                    }
                }
            )
    }

    function provideComponents() {
        switch (currentPhase) {
            case PHASES.LOADING:
                return <>{provideSpinner()}</>
            case PHASES.NOT_AUTHENTICATED:
                return <>{provideBanner()}</>
            default:
                return <>{provideContent()}</>
        }
    }

    function provideSpinner() {
        return <Spinner/>
    }

    function provideBanner() {
        return <Banner
            setCurrentPhase={setCurrentPhase}
        />;
    }

    function provideContent() {
        return <>
            <NewTweet
                loggedUserData={loggedUserData}
                actionCount={actionCount}
                setActionCount={setActionCount}
            />
            <Wall
                loggedUserData={loggedUserData}
                wall={wall}
                actionCount={actionCount}
                setActionCount={setActionCount}
            />
        </>;
    }

    return (
        <div id="app">
            <Header
                setCurrentPhase={setCurrentPhase}
            />
            {provideComponents()}
        </div>
    );
}

export default App;
