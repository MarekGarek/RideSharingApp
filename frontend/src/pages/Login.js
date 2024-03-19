import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from "react";
import axios from 'axios';
import '../css/Login.css';

export default function Login() {
    const navigate = useNavigate();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    
    let data = {
        login: login,
        password: password
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/login', data);
            if (response.status === 200) {
                console.log("Prihlásenie úspešné");
                console.log("Cookies:", document.cookie);
            } else {
                console.log("Prihlásenie zlyhalo");
            }
        } catch (err) {
            console.log(err);
        }
    }   
  
    return (
        <> 
        <body className="login-page">
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100 padding-login">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card text-white" style={{ borderRadius: '1rem', backgroundColor: '#e3b433ec'}}>
                    <div className="card-body p-5 text-center">
                        <div className="mb-md-5 mt-md-4 pb-2">

                        <h2 className="fw-bold mb-2 text-uppercase">Prihlásiť sa</h2>
                        <p className="text-black-50 mb-5 fw-bold">Zadajte svoje prihlasovacie meno a heslo!</p>

                        <div className="form-outline form-white mb-4">
                            <input type="text"
                                   id="typeEmailX" 
                                   className="form-control form-control-lg" 
                                   onChange={(e) => setLogin(e.target.value)}
                                   value={login}
                                   required
                            />
                            <label className="form-label" htmlFor="typeEmailX">Login</label>
                        </div>

                        <div className="form-outline form-white mb-4">
                            <input type="password" 
                                   id="typePasswordX" 
                                   className="form-control form-control-lg text-black"
                                   onChange={(e) => setPassword(e.target.value)}
                                   value={password}
                                   required
                            />
                            <label className="form-label" htmlFor="typePasswordX">Heslo</label>
                        </div>

                        <button className="btn btn-outline-light btn-floating px-5 login-btn"
                                type="submit"
                                onClick= {handleSubmit}> Prihlásiť
                        </button>

                        <div className="d-flex justify-content-center text-center mt-4 pt-1 social-media-login">
                            <a href="#!" className="text-white"><i className="bi bi-facebook"> &nbsp;&nbsp; </i></a>
                            <a href="#!" className="text-white"><i className="bi bi-twitter"> &nbsp;&nbsp; </i></a>
                            <a href="#!" className="text-white"><i className="bi bi-google"> &nbsp;&nbsp; </i></a>
                        </div>

                        </div>

                        <div>
                            <p className="mb-0"> Nemáš účet ? &nbsp;
                                <a role="button" onClick={() => navigate("/register")} className="text-black-50 fw-bold">Zaregistruj sa!</a>
                            </p>
                        </div>

                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
        </body>
        </>
    )
}