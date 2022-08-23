import './App.scss';
import Header from './components/header/header'
import Banner from "./components/banner/banner";
import Wall from "./components/wall/wall";
import Axios from "axios";
import React, {useEffect, useState} from "react";

function App() {

    const [loggedUserData, setLoggedUserData] = useState(null)
    const [actionCount, setActionCount] = useState(0)
    const [wall, setWall] = useState(
        {
            threads: []
        }
    )

    useEffect(() => {
        console.log("LOGGED")
        fetchLoggedUser()
    }, []);

    useEffect(() => {
        console.log("WALL")
        fetchWallContent()
    }, [actionCount])

    const fetchWallContent = () => {
        Axios.get("http://localhost:8080/api/v.1.0/tweets/all")
            .then(response => {
                    console.log("REFRESHED")

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


    return (
        <div id="app">
            <Header/>
            <Banner
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
        </div>
    );
}

export default App;
