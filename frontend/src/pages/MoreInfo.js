import React, { useState, useEffect, useContext } from 'react';
import CarComponent from '../components/CarComponent';
import ProfileComponent from '../components/ProfileComponent';
import TripComponent from '../components/TripComponent';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../AuthProvider';
import '../css/MoreInfo.css';

export default function MoreInfo() {
    const jwtToken = localStorage.getItem('jwtToken');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const {auth} = useContext(AuthContext);

    const driverId = queryParams.get('driver');
    const carId = queryParams.get('car');
    const tripId = queryParams.get('id');
    const use = +queryParams.get('usage');

    const [driver, setDriver] = useState();
    const fetchDriver = async () => {
        try {
            const response = await axios.get('http://localhost:8080/info', {
            params: { user: driverId },
            headers: { 'Authorization': `Bearer ${jwtToken}` }
        });
            setDriver(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const [car, setCar] = useState();
    const fetchCar = async () => {
        try {
            const response = await axios.get('http://localhost:8080/car', {
            params: { idCar: carId },
            headers: { 'Authorization': `Bearer ${jwtToken}` }
        });
            setCar(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const [trip, setTrip] = useState();
    const fetchTrip = async () => {
        try {
            const response = await axios.get('http://localhost:8080/trip', {
            params: { idTrip: tripId },
            headers: { 'Authorization': `Bearer ${jwtToken}` }
        });
            setTrip(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTrip();
        if (auth.login !== driverId) {
            fetchDriver();
            fetchCar();
        } else {
            fetchPassangers();
        }
    }, [jwtToken]);

    const [passangers, setPassangers] = useState([]);
    const fetchPassangers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/passengers', {
                params: { id: tripId },
                headers: { 'Authorization': `Bearer ${jwtToken}` }
            });
            setPassangers(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    
    return(
        <>
        {auth.login !== driverId ? 
        <>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <div style={{ width: '1000px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <br/>
                <h1 className="more-info-h">Šofér</h1>
                <div style={{backgroundColor: 'white'}}>
                <ProfileComponent hide={true} info={driver} width="special-width-for-my-profile"/>
                </div>
                <h1 className="more-info-h">Auto</h1>
                <CarComponent car={car} edit={false} hide={true}/>
                <h1 className="more-info-h">Cesta</h1>
            </div>
        </div>
        <TripComponent data={trip} usage={use} bg='white'/>
        </> : 
        <>
        <h1 className="more-info-h" style={{backgroundColor: 'white'}}>Cesta</h1>
        <TripComponent data={trip} usage={use} bg='white'/>
        <h1 className="more-info-h" style={{backgroundColor: 'white'}}>Prihlásený</h1>
        <div className="div-table">
        <table className="passengers-table">
            <tr>
                <th>Login</th>
                <th>Počet miest</th>
                <th>Batožina</th>
                <th>Platba</th> 
            </tr>
        {
            passangers.map((pass) => {
                return (
                    <tr>
                        <td>{pass.passenger}</td>
                        <td>{pass.seats}</td>
                        <td>{pass.trunkSpace}</td>
                        <td>{pass.payment == "cash" ? "hotovosť" : "online"}</td>
                    </tr>
                );
            })
        }
        </table>
        </div>
        </>}
        </>
    )
}