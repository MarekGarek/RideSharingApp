import { useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

export default function NavLinks() {
    const navigate = useNavigate();

    return(
        <>
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li><a role="button" onClick={() => {navigate("home")}} className="nav-link px-3 header-options">Home</a></li>
            <HashLink to='/home#homesection'>
            <li><a className="nav-link px-3 header-options">Prečo s nami?</a></li>
            </HashLink>
            <li><a className="nav-link px-3 header-options">O nás</a></li>
            <li><a role="button" onClick={() => {navigate("trips")}} className="nav-link px-3 header-options">Cesty</a></li>
        </ul>
        </>
    )
}