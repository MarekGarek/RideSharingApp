import '../css/Trips.css';
import TripComponent from '../components/TripComponent';
import { useState, useEffect } from "react";
import axios from 'axios';
import {useContext} from 'react';
import AuthContext from '../AuthProvider';

export default function Trips() {
    const {auth} = useContext(AuthContext);
    const jwtToken = localStorage.getItem('jwtToken');

    const [source, setSource] = useState();
    const [destination, setDestination] = useState();
    const [time, setTime] = useState();
    const [date, setDate] = useState();

    const switchTowns = () => {
        let h = source;
        setSource(destination);
        setDestination(h);
    }

    const [trips, setTrips] = useState([]);
    const [message, setMessage] = useState("");
    const fetchItems = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:8080/trips', {
                params: { source: source, destination: destination, time: time, date: date}
            });
            setTrips(response.data);
            if (response.data.length < 1) {
                setMessage("Nenašli sa žiadne výsledky.")
            } else {
                setMessage("")
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
    }, [auth.login, jwtToken]);

    return(
        <>
        <div className="trip-search-bg">
        <hr class="featurette-divider" style={{borderWidth: '4px', marginTop: '0px', marginBottom: '0px'}}></hr>
        <br></br>
        <p className="home-page-slogan">
            <span className="slogan">Vyhľadaj cestu : </span>
        </p>
        <form onSubmit={fetchItems}>
        <div className="grid-trip trip-search-bg">
            <div className="grid-trip-switch">
                <button type="button" onClick={switchTowns} className="search-button">
                <i role="button" class="bi bi-arrow-down-up" style={{fontSize: '25px'}}></i>
                </button>
            </div>
            <div className="grid-trip-void"></div>
            <div className="grid-trip-from">
                <label className="labels-design"> Odkiaľ </label> <br/>
                <input type="text" className="inputs-design" required minLength={3} maxLength={25}
                    onChange={(e) => setSource(e.target.value)} value={source}/>
            </div>

            <div className="grid-trip-to">
                <label className="labels-design"> Kam </label> <br/>
                <input type="text" className="inputs-design" required minLength={3} maxLength={25}
                    onChange={(e) => setDestination(e.target.value)} value={destination}/>
            </div>

            <div className="grid-trip-date">
                <label className="labels-design"> Dátum </label> <br/>
                <input type="date" className="inputs-design" 
                    onChange={(e) => setDate(e.target.value)}/>
            </div>

            <div className="grid-trip-time">
                <label className="labels-design"> Čas </label> <br/>
                <input type="time" className="inputs-design" 
                    onChange={(e) => setTime(e.target.value)}/>
            </div>

            <div className="grid-trip-search">
            <button type="submit" className="search-button">
                <i role="button" class="bi bi-search" style={{fontSize: '25px'}}></i>
                <label className="labels-design" role="button" style={{fontSize: '20px'}}> &nbsp;Hľadaj  </label>
            </button>
            </div>
        </div>
        </form>
        <br></br>
        </div>
        <hr class="featurette-divider" style={{borderWidth: '4px', marginTop: '0px'}}></hr>
        
        <p className="home-page-slogan">
            <span className="slogan">Dostupné cesty : </span>
        </p>
        <p style={{textAlign: 'center'}}>{message}</p>
        <div>
        {
            trips.map((trip, index) => (
                <TripComponent 
                    data={trip} 
                    usage={1} 
                    bg={index % 2 === 0 ? 'white' : 'rgba(255, 251, 223, 0.81)'}
                    fetchItems={fetchItems}
                />
            ))
        }
        </div>
        </>
    )
}