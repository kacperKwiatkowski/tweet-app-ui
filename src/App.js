import './App.scss';
import Header from './components/header/header'
import Banner from "./components/banner/banner";
import Wall from "./components/wall/wall";
import Axios from "axios";
import React, {useEffect, useState} from "react";

function App() {

    const [loggedUserData, setLoggedUserData] = useState(null)

    useEffect(() => {
        fetchLoggedUser()
    }, []);


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
            <Header></Header>
            <Banner loggedUserData={loggedUserData}></Banner>
            <Wall loggedUserData={loggedUserData}></Wall>
        </div>
    );
}

export default App;
