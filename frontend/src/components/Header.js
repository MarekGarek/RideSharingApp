import '../css/Header.css';
import logo from '../images/logo.webp';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();

    return(
        <>
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom
                                custome-header">
                <div className="col-md-3 mb-2 mb-md-0">
                    <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none">
                        <img className="logo-header" src={logo} alt="logo"/>
                    </a>
                </div>

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li><a role="button" onClick={() => {navigate("home")}} className="nav-link px-2">Home</a></li>
                    <li><a href="#" className="nav-link px-2">Prečo s nami?</a></li>
                    <li><a href="#" className="nav-link px-2">O nás</a></li>
                    <li><a href="#" className="nav-link px-2">Cesty</a></li>
                </ul>

                <div className="col-md-3 text-end">
                    <button type="button" onClick={() => {navigate("login")}} className="btn btn-primary me-2">Prihlásiť</button>
                    <button type="button" onClick={() => {navigate("register")}} className="btn btn-primary">Registrovať</button>
                </div>
            </header>
        </>
    )
}