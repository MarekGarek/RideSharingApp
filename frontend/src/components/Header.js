import '../css/Header.css';
import logo from '../images/logo2.webp';
import DropdownMenu from './DropdownMenu.js';
import NavLinks from './NavLinks.js';
import  { useNavigate } from 'react-router-dom';
import {useContext} from 'react';
import AuthContext from '../AuthProvider'

export default function Header() {
    const navigate = useNavigate();
    const {auth} = useContext(AuthContext);
    
    return(
        <>
        <header className="d-flex flex-wrap align-items-center justify-content-between py-3 mb-4 border-bottom custome-header">
            <div className="d-flex align-items-center">
                <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none">
                    <img className="logo-header" src={logo} alt="logo"/>
                </a>
            </div>

            <div className="d-flex flex-grow-1 justify-content-center header-navlinks">
                <NavLinks />
            </div>

            <div className="drop-down-menu">
                { auth.isLogged ?
                <>
                <p type="button" onClick={() => {navigate("/profile")}} className="header-user-login">{auth.login}</p>
                <button onClick={() => {navigate("chats")}} className="btn btn-outline-light btn-floating m-1 btn-primary btn btn-primary">Chaty</button>
                </>
                : <></>}
                <DropdownMenu />
            </div>
        </header>
        </>
    )
}