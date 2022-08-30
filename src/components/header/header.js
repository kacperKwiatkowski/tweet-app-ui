import './header-style.scss';

const Header = ({actionCount, setActionCount}) => {

    function logOut() {
        localStorage.clear()
        setActionCount(++actionCount)
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