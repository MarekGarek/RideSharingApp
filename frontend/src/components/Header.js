import '../css/Header.css';
import logo from '../images/logo2.webp';
import DropdownMenu from './DropdownMenu.js';
import NavLinks from './NavLinks.js';


export default function Header() {
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
                <DropdownMenu />
            </div>
        </header>

        </>
    )
}