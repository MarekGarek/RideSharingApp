import TripComponent from '../components/TripComponent';
import { useState, useEffect } from "react";
import axios from 'axios';
import {useContext} from 'react';
import AuthContext from '../AuthProvider';

export default function CurrentRides() {
    const {auth} = useContext(AuthContext);
    const jwtToken = localStorage.getItem('jwtToken');

    const [trips, setTrips] = useState([]);
    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:8080/current-trips', {
                params: { user: auth.login },
                headers: { 'Authorization': `Bearer ${jwtToken}` }
            });
            setTrips(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [auth.login, jwtToken]);

    return(
        <>
        <div className="grid-my-profile-heading">
            <div className="grid-my-profile-heading-h1"> 
                <h1>Aktuálne jázdy</h1>
            </div>
        </div>
        <hr class="featurette-divider" style={{borderWidth: '4px'}}></hr>
        <div className="history-trip-center">
        {
            trips.map((trip, index) => (
                <TripComponent 
                    data={trip} 
                    usage={3} 
                    bg={index % 2 === 0 ? 'white' : 'rgba(255, 251, 223, 0.81)'}
                />
            ))
        }
        </div>
        </>
    )
}