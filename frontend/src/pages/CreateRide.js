import {useContext, useEffect, useState} from "react";
import MyToasts, { useToast} from '../components/MyToasts';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../AuthProvider';
import axios from 'axios';
import '../css/CreateRide.css';

export default function CreateRide() {
    const navigate = useNavigate();
    const {auth} = useContext(AuthContext);
    const jwtToken = localStorage.getItem('jwtToken');
    const [cars, setCars] = useState([]);
    const showToast = useToast();

    const [autor, setAutor] = useState();
    const [car, setCar] = useState("");
    const [date, setDate] = useState('');
    const [srcTown, setSrcTown] = useState('');
    const [dstTown, setDstTown] = useState('');
    const [srcTime, setSrcTime] = useState('');
    const [dstTime, setDstTime] = useState('');
    const [seats, setSeats] = useState('');
    const [trunk, setTrunk] = useState('');
    const [price, setPrice] = useState('');
    const [info, setInfo] = useState('');
    
    const [renderForm, setRenderForm] = useState(false);

    const fetchCars = async () => {
        try {
            const response = await axios.get('http://localhost:8080/cars', {
            params: { owner: auth.login },
            headers: { 'Authorization': `Bearer ${jwtToken}` }
        });
            return setCars(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCars();
    }, [auth.login, jwtToken]);
    
    useEffect(() => {
        if (cars.length > 0) {
            setRenderForm(true);
            setAutor(auth.login);
        } else {
            setRenderForm(false);
        }
    }, [cars]);

    const modelCar = cars.find(c => c.model === car);
    const data = modelCar ? {
        driver: autor,
        car: modelCar.idCar,
        date: date,
        srcTown: srcTown,
        dstTown: dstTown,
        srcTime: srcTime,
        dstTime: dstTime,
        seats: seats,
        trunkSpace: trunk,
        price: price,
        info: info
    } : null;

    const postData = async () => {
        try {
            const response = await axios.post('http://localhost:8080/trip', data,
            { headers: {'Authorization': `Bearer ${jwtToken}`}});
            if (response.status == 201) {
                showToast('success','Nová jazda bola úspešne vytvorená!','/profile/current-ride')
            } else {
                showToast('error', response.status);
            }
            
          } catch (error) {
            console.error(error);
            showToast('error', error.code);
          }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
//        if (id) {
//            putData();
//        } else {
            postData();
//        }
    };

    return(
        <>
        <MyToasts />
        <div className="grid-my-profile-heading">
            <div className="grid-my-profile-heading-h1"> 
                <h1>Vytvor novú jazdu </h1>
            </div>
            <div className="grid-my-profile-heading-btn"> 
            </div>
        </div>
        <hr class="featurette-divider" style={{borderWidth: '4px'}}></hr>
        {!renderForm ? 
        <>
            <h4>Na vytváranie ciest potrebuješ mať pridané auto.</h4>
            <h5>Môžeš tak urobiť v sekcii "Moje autá" alebo klikni 
                <a style={{fontWeight: 'bold'}} type="button" onClick={() => {navigate("/profile/cars")}}>&nbsp; tu!</a>
            </h5> 
        </> : 
        <>
        <form onSubmit={handleSubmit}>
        <div className="history-trip-center">        
        <div className="grid-tripc" style={{backgroundColor: 'rgba(246, 224, 60, 0.81)'}}>
            <div className="grid-tripc-author">
                <p>
                    <div>
                        <a className="label-trpc">Autor:</a> 
                    </div>
                    <div>
                        <a className="label-var" style={{color: '#333333'}}>{autor}</a>
                    </div>
                </p>
                <hr class="featurette-divider"></hr>
            </div>
            

            <div className="grid-tripc-date">
                <p>
                    <div>
                        <a className="label-trpc">Dátum cesty: </a> 
                    </div>
                    <div>
                        <input type='date' className="long-inputs form-control" required
                               onChange={(e)=>{setDate(e.target.value)}} value={date}/>
                    </div>
                </p>
            </div>

            <div className="grid-tripc-towns">
                <p>
                    <div className="grid-towns">
                        <div className="grid-towns-A"><a className="label-trpc">Odkiaľ:</a></div>
                        <div className="grid-towns-B"><a className="label-trpc">Kam: </a></div>
                    </div>
                    <div className="grid-towns">
                        <div className="grid-towns-A">
                            <input type="text" className="long-inputs form-control" required min="3" max="45" style={{ marginBottom: '3px'}}
                                   onChange={(e)=>{setSrcTown(e.target.value)}} value={srcTown}/>
                            <input type="time" className="long-inputs form-control" required
                                   onChange={(e)=>{setSrcTime(e.target.value)}} value={srcTime}/>
                        </div>
                        <div className="grid-towns-B">
                            <input type="text" className="long-inputs form-control" required min="3" max="45" style={{ marginBottom: '3px'}}
                                   onChange={(e)=>{setDstTown(e.target.value)}} value={dstTown}/>
                            <input type="time" className="long-inputs form-control" required
                                   onChange={(e)=>{setDstTime(e.target.value)}} value={dstTime}/>
                        </div>
                    </div>
                </p>
                <hr class="featurette-divider"></hr>
            </div>

            <div className="grid-tripc-info">
                <a className="label-trpc">Dodatočné informácie: </a><br/>
                <textarea id="text" name="text" rows="4" cols="60" placeholder="Zadejte text..." className="textarea-input form-control"
                            required max="2000" onChange={(e)=>{setInfo(e.target.value)}} value={info}/>
            </div>

            <div className="grid-tripc-car">
                <p>
                    <div>
                        <a className="label-trpc">Auto: </a> 
                    </div>
                    <div>
                        <select className="long-inputs form-control" value={car} onChange={(e)=>{setCar(e.target.value)}} required style={{padding: '0px 6px 0px 6px'}}>
                        <option disabled={true}></option>
                        {cars.map((car) => (
                            <option value={car.model} id={car.idCar}>{car.model}</option>
                        ))}
                        </select>
                    </div>
                    <hr class="featurette-divider"></hr>
                </p>
            </div>

            <div className="grid-tripc-capacity">
                <p>
                    <div>
                        <a className="label-trpc">Voľné miesta: </a>
                    </div>
                    <div>
                        <input type='number'className="long-inputs form-control" min="1" max="4" required
                               onChange={(e)=>{setSeats(e.target.value)}} value={seats}/>  
                    </div>
                </p>
            </div>

            <div className="grid-tripc-price create-trip-al">
                <p>
                    <div>
                        <a className="label-trpc">Voľná kapacita: </a>
                    </div>
                    <div>
                        <input type='number'className="long-inputs form-control" required
                               onChange={(e)=>{setTrunk(e.target.value)}}/>
                    </div>
                </p>
                <hr class="featurette-divider media-q"></hr>
            </div>

            <div className="grid-tripc-log" style={{marginBottom: '15px'}}>
                <div>
                        <a className="label-trpc">Cena: €</a> 
                    </div>
                    <div>
                        <input type='number' className="long-inputs form-control" step="0.2" required max="999"
                               onChange={(e)=>{setPrice(e.target.value)}}/>
                    </div>
            </div>

            <div className="grid-tripc-more" style={{textAlign: 'right'}}>
                <button type="submit" className="btn btn-outline-light btn-floating m-1 btn-primary btn btn-primary" >Vytvoriť</button>
            </div>
        </div>
        </div>
        </form>
        </>}
        </>
    )
}