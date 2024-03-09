import '../css/MyProfile.css';
import React, { useState } from 'react';
import ProfileComponent from '../components/ProfileComponent';
import PassChange from '../components/PassChange';

export default function MyProfile() {
    const [editMode, setEditMode] = useState(false);

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

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
        
        <ProfileComponent/>
        <PassChange/>
        </>
    );
}
