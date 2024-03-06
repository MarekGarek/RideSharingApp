import { useNavigate } from 'react-router-dom';
import '../css/Register.css';

export default function Register() {   
    const navigate = useNavigate();
   
    return (
        <>
        <body className="register-page">
        <div className="bottom-padding">
        <section className="vh-100 bg-image">
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            <div className="card" style={{ borderRadius: "15px" }}>
            <div className="card-body p-5 bg-orange">
                <h2 className="text-uppercase text-center mb-5">Vytvor si účet</h2>
                <form>
                <div className="form-outline mb-2">
                    <label className="form-label" htmlFor="form3Example1cg">Meno</label>
                    <input type="text" id="form3Example1cg" className="form-control form-control-lg" />
                </div>
                <div className="form-outline mb-2">
                    <label className="form-label" htmlFor="form3Example1cg">Priezvisko</label>
                    <input type="text" id="form3Example1cg" className="form-control form-control-lg" />
                </div>
                <div className="form-outline mb-2">
                    <label className="form-label" htmlFor="form3Example3cg">Email</label>
                    <input type="email" id="form3Example3cg" className="form-control form-control-lg" />
                </div>
                <div className="form-outline mb-2">
                    <label className="form-label" htmlFor="form3Example3cg">Login</label>
                    <input type="email" id="form3Example3cg" className="form-control form-control-lg" />
                </div>
                <div className="form-outline mb-2">
                    <label className="form-label" htmlFor="form3Example4cg">Heslo</label>
                    <input type="password" id="form3Example4cg" className="form-control form-control-lg" />
                </div>
                <div className="form-outline mb-2">
                    <label className="form-label" htmlFor="form3Example4cdg">Zopakuj heslo</label>
                    <input type="password" id="form3Example4cdg" className="form-control form-control-lg" />
                </div>

                <div className="d-flex justify-content-center">
                    <button type="button" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                </div>
                <p className="text-center text-muted mt-4 mb-0">Máš už vytvorený účet? <a role="button" onClick={() => navigate("/login")} className="fw-bold text-body"><u>Prihlásiť sa</u></a></p>
                </form>
            </div>
            </div>
        </div>
        </div>
        </div>
        </div>
        </section>
        </div>
        </body>
        </>
    );
}