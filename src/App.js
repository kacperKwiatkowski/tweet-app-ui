import './App.scss';

import Axios from "axios";
import React, {useEffect, useState} from "react";

import Header from './components/header/header'
import Banner from "./components/banner/banner";
import Wall from "./components/wall/wall";
import NewTweet from "./forms/newTweet/newTweet";
import Spinner from "./components/spinner/spinner";

import "./interceptors/authTokenProvider"

function App() {

    const PHASES = {
        LOADING: 0,
        NOT_AUTHENTICATED: 1,
        AUTHENTICATED: 2
    }

    const [currentPhase, setCurrentPhase] = useState(PHASES.LOADING)
    const [loggedUserData, setLoggedUserData] = useState(undefined)
    const [actionCount, setActionCount] = useState(0)
    const [wall, setWall] = useState(
        {
            threads: []
        }
    )

    useEffect(() => {
        console.log("1")
        fetchLoggedUser()
    }, []);

    useEffect(() => {
        console.log("2")
        fetchWallContent()
    }, [actionCount])

    useEffect(() => {
        console.log("3")
        updatePhase()

    }, [loggedUserData, actionCount])


    function updatePhase() {

        console.log(loggedUserData)
        switch (loggedUserData) {

            case undefined:
                setCurrentPhase(PHASES.LOADING)
                break;
            case null:
                setCurrentPhase(PHASES.NOT_AUTHENTICATED)
                break;
            default:
                setCurrentPhase(PHASES.AUTHENTICATED)
        }
    }

    const fetchWallContent = () => {
        Axios.get("http://localhost:8080/api/v.1.0/tweets/all")
            .then(response => {

                    if (response.status === 200) {
                        console.log(response.data)
                        setWall(response.data)
                    }
                }
            ).catch(error => {
                console.error(error)
            }
        )
    }

    const fetchLoggedUser = () => {
        Axios.get("http://localhost:8080/api/v.1.0/tweets/logged")
            .then(response => {
                    if (response.status === 200) {
                        setLoggedUserData(response.data)
                    }
                }
            ).catch(error => {
                console.error(error)
                setLoggedUserData(null)
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
            actionCount={actionCount}
            setActionCount={setActionCount}
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
                actionCount={actionCount}
                setActionCount={setActionCount}
            />
            {provideComponents()}
        </div>
    );
}

export default App;
