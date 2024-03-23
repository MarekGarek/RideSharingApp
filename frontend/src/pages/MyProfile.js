import '../css/MyProfile.css';
import React, { useState } from 'react';
import ProfileComponent from '../components/ProfileComponent';
import PassChange from '../components/PassChange';
import axios from 'axios';
import {useContext, useEffect} from 'react';
import AuthContext from '../AuthProvider'

export default function MyProfile() {
    const {auth} = useContext(AuthContext);
    const jwtToken = localStorage.getItem('jwtToken');

    const [info, setInfo] = useState([]);
    const fetchInfo = async () => {
        try {
            const response = await axios.get('http://localhost:8080/info', {
            params: { user: auth.login },
            headers: { 'Authorization': `Bearer ${jwtToken}` }
        });
            setInfo(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, [auth.login, jwtToken]);

    return (
        <>
        <div className="grid-my-profile-heading">
            <div className="grid-my-profile-heading-h1"> 
                <h1>Môj profil</h1>
            </div>
            <div className="grid-my-profile-heading-btn"> 
            </div>
        </div>
        <hr class="featurette-divider" style={{borderWidth: '4px'}}></hr>
        <br/>
        
        <ProfileComponent info={info}/>
        <PassChange/>
        </>
    );
}
