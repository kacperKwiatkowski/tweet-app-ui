import './App.scss';
import Header from './components/header/header'
import Banner from "./components/banner/banner";
import Wall from "./components/wall/wall";

function App() {
    return (
        <div id="app">
            <Header></Header>
            <Banner></Banner>
            <Wall></Wall>
        </div>
    );
}

export default App;
