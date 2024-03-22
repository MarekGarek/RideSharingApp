import { useNavigate } from 'react-router-dom';
import '../css/Register.css';
import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LOGIN_REGEX = /^[a-zA-Z][a-zA-Z0-9]{4,20}$/;              // [zacina] [obsahuje] {rozsah/dlzka}
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{4,20}$/; // musí obsahovať jedno male,velke pismeno a cislo

export default function Register() {   
    const navigate = useNavigate();
    const loginRef = useRef();

    const [name, setName] = useState('');
    const [surName, setSurName] = useState('');
    const [email, setEmail] = useState('');

    const [login, setLogin] = useState('');
    const [validLogin, setValidLogin] = useState(false);
    
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    
    const [pwd2, setPwd2] = useState('');
    const [validPwd2, setValidPwd2] = useState(false);

    const [reg, setReg] = useState(false);

    const toastSucc = () => {
        toast.success('Registrácia prebehla úspešne!', {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
          onClose: () => navigate("/login")
        });
      };

      const toastErr = (err) => {
        toast.error(err, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            });
      }



    //skontrolujem ci login obsahuje vsetky znaky ktore ma podla regexu
    useEffect(() => {
        const result = LOGIN_REGEX.test(login);
        setValidLogin(result);
    },[login])

    //to iste s heslami
    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === pwd2;
        setValidPwd2(match);
    },[pwd, pwd2])

    let data = {
        login: login,
        password: pwd,
        email: email,
        name: name,
        surname: surName,
        isAdmin: "N"
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/auth/register', data);
            if (response.status === 200) {
                console.log(response.data.token); // spracovať token
                toastSucc();                      // nie navigate na login ale rovno prihlásiť asi
                setReg(true);
            }
        } catch (error) {
            console.error('Chyba zo servera:', error);
            if (error.response) {
                const errorMessage = error.response.data.token || 'Neznáma chyba';
                if (error.response.status === 409) {
                    toastErr(errorMessage);
                } else {
                    toastErr(errorMessage);
                }
            } else {
                toastErr('Chyba pri odosielaní dát');
            }
        }
    };
   
    return (
        <>
        <body className="register-page">
        <div className="bottom-padding">
        <ToastContainer/>
        <section className="vh-100 bg-image">
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            <div className="card radius-register">
            <div className="card-body p-5 bg-orange pado">
                <h2 className="text-uppercase text-center mb-3 fw-bold white" style={{paddingTop: '20px'}}>Vytvor si účet</h2>
                <form onSubmit={handleSubmit}>
                <div className="form-outline mb-2">
                    <label className="form-label" htmlFor="form3Example1cg">Meno</label>
                    <input type="text" className="form-control form-control-lg" 
                            required minLength="3" maxLength="45"
                            onChange={(e)=>{setName(e.target.value)}}/>
                </div>
                <div className="form-outline mb-2">
                    <label className="form-label" htmlFor="form3Example1cg">Priezvisko</label>
                    <input type="text" className="form-control form-control-lg" 
                            required minLength="3" maxLength="45"
                            onChange={(e)=>{setSurName(e.target.value)}}/>
                </div>
                <div className="form-outline mb-2">
                    <label className="form-label" htmlFor="form3Example3cg">Email</label>
                    <input type="email" className="form-control form-control-lg"
                            required maxLength="100"
                            onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div className="form-outline mb-2">
                    <label className="form-label" htmlFor="form3Example3cg">
                        Login &nbsp;
                        {!validLogin ? <i className="bi bi-x-lg red"></i> : <i className="bi bi-check2 green"></i>}
                    </label>
                    <input type="text" id="form3Example3cg" className="form-control form-control-lg" 
                            ref={loginRef} autoComplete="off" required maxLength="15"
                            onChange={(e) => setLogin(e.target.value)}/>
                </div>
                <div className="form-outline mb-2">
                    <label className="form-label" htmlFor="form3Example4cg">
                        Heslo &nbsp;
                        {!validPwd ? <i className="bi bi-x-lg red"></i> : <i className="bi bi-check2 green"></i>}
                    </label>
                    <input type="password" id="form3Example4cg" className="form-control form-control-lg" 
                            required onChange={(e) => setPwd(e.target.value)}/>
                </div>
                <div className="form-outline mb-2">
                    <label className="form-label" htmlFor="form3Example4cdg">
                        Zopakuj heslo &nbsp;
                        {!validPwd || !validPwd2 ? <i className="bi bi-x-lg red"></i> : <i className="bi bi-check2 green"></i>}
                    </label>
                    <input type="password" id="form3Example4cdg" className="form-control form-control-lg" 
                            required onChange={(e) => setPwd2(e.target.value)}/>
                </div>
                <br/>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-outline-light btn-floating px-5 login-btn"
                        disabled={!validLogin || !validPwd || !validPwd2 || reg ? true : false} >Register
                    </button>
                </div>
                <p className="text-center text-muted mt-4 mb-0 white">Máš už vytvorený účet ? &nbsp;
                    <a role="button" onClick={() => navigate("/login")} className="fw-bold text-black-50">
                        <u>Prihlásiť sa</u>
                    </a>
                </p>
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