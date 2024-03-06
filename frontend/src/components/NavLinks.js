import { useNavigate } from 'react-router-dom';

export default function NavLinks() {
    const navigate = useNavigate();

    return(
        <>
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li><a role="button" onClick={() => {navigate("home")}} className="nav-link px-3 header-options">Home</a></li>
            <li><a href="#" className="nav-link px-3 header-options">Prečo s nami?</a></li>
            <li><a href="#" className="nav-link px-3 header-options">O nás</a></li>
            <li><a href="#" className="nav-link px-3 header-options">Cesty</a></li>
        </ul>
        </>
    )
}