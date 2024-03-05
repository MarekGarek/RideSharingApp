import '../css/Footer.css';

export default function Footer() {
    return (
        <>
        <footer className="py-3 my-4 my-footer">
            <ul class="nav justify-content-center border-bottom pb-3 mb-3">
                <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Home</a></li>
                <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Prečo s nami?</a></li>
                <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">O nás</a></li>
                <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Cesty</a></li>
            </ul>

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

            <p class="text-center text-body-secondary">© 2024 RideSharingApp</p>
        </footer>
        </>
    )
}