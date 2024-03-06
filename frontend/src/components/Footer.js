import '../css/Footer.css';
import NavLinks from './NavLinks.js';

export default function Footer() {
    return (
        <>
        <footer className="py-3 my-4 my-footer">
            <NavLinks/>
            <hr class="featurette-divider"></hr>

            <ul class="nav justify-content-center pb-3 mb-3">
                <a className="btn btn-outline-light btn-floating m-1 btn-primary" href="#" role="button">
                    <i className="bi bi-facebook"></i>
                </a>
                <a className="btn btn-outline-light btn-floating m-1 btn-primary" href="#!" role="button">
                    <i className="bi bi-twitter-x"></i>
                </a>
                <a className="btn btn-outline-light btn-floating m-1 btn-primary" href="#!" role="button">
                    <i className="bi bi-google"></i>
                </a>
                <a className="btn btn-outline-light btn-floating m-1 btn-primary" href="#!" role="button">
                    <i className="bi bi-instagram"></i>
                </a>
            </ul>

            <p class="text-center text-body-secondary header-options">© 2024 RideSharingApp</p>
        </footer>
        </>
    )
}