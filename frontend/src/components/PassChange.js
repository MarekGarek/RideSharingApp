import { useEffect, useState, useContext } from "react";
import MyToasts, { useToast} from './MyToasts';
import AuthContext from '../AuthProvider';
import axios from 'axios';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{4,20}$/; // musí obsahovať jedno male,velke pismeno a cislo

export default function PassChange() {
    const jwtToken = localStorage.getItem('jwtToken');
    const {auth} = useContext(AuthContext);
    const showToast = useToast();

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwd2, setPwd2] = useState('');
    const [validPwd2, setValidPwd2] = useState(false);
    const [oldPwd, setOldPwd] = useState('');

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === pwd2;
        setValidPwd2(match);
    },[pwd, pwd2])

    const data = {
        login: auth.login,
        oldPwd: oldPwd,
        newPwd: pwd
    };

    const [errorMessage, setErrorMessage] = useState();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8080/info`, data, {
                headers: { 'Authorization': `Bearer ${jwtToken}`}
            });
            showToast('success', 'Heslo zmenené úspešne!');
            setErrorMessage("");
            setPwd("");
            setPwd2("");
            setOldPwd("");
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data);
            } else {
                setErrorMessage("ERROR");
            } 
        }
    };

    return(
        <>
        <MyToasts />
        <br></br>
        <hr class="featurette-divider" style={{borderWidth: '4px'}}></hr>
        <br></br>
        <h3>Zmeniť heslo</h3>
        <form onSubmit={handleSubmit}>
        <div>
            <div>
                <label className="form-label">Nové heslo &nbsp;
                    { pwd == "" ? "" : <> {!validPwd ? <i className="bi bi-x-lg red"></i> : <i className="bi bi-check2 green"></i>} </> }
                </label>
                    <input type="password" className="form-control" style={{width: '240px'}}
                            required onChange={(e) => setPwd(e.target.value)} value={pwd}/>
            </div>
            <div>
                <label className="form-label">Zopakuj heslo &nbsp;
                    { pwd == "" ? "" : <> {!validPwd || !validPwd2 ? <i className="bi bi-x-lg red"></i> : <i className="bi bi-check2 green"></i>} </> }
                </label>
                    <input type="password" className="form-control form-control-lg" style={{width: '240px'}}
                            required onChange={(e) => setPwd2(e.target.value)} value={pwd2}/>
                
            </div>
            <div>
            <label className="form-label">Staré heslo &nbsp;</label>
                    <input type="password" className="form-control form-control-lg" style={{width: '240px'}}
                            required onChange={(e) => setOldPwd(e.target.value)} value={oldPwd}/>
            </div>
            <br/>
            <p style={{color: 'red'}}>{errorMessage}</p> 
            
            <div>
                <button type="submit" className="btn btn-outline-light btn-floating m-1 btn-primary btn btn-primary save-btn"
                        disabled={!validPwd || !validPwd2 ? true : false}>Zmeniť</button>
            </div>
        </div>
        </form>
        </>
    )
}